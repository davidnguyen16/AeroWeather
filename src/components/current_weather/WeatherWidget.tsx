'use client'

import React, { useEffect, useState } from 'react'
import { fetchWeatherByCoords, fetchWeatherByCity, WeatherData } from '../weather_api/WeatherAPI'
import WeatherDetailCard from './WeatherDetailCard'

interface WeatherWidgetProps {
    unit?: 'metric' | 'imperial';
    currentLocationTrigger?: number;
    searchedCity?: string | null;
    onWeatherUpdate?: (cityName: string, timezone: string) => void;
}

const WeatherWidget = ({ unit = 'metric', currentLocationTrigger = 0, searchedCity = null, onWeatherUpdate }: WeatherWidgetProps) => {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCurrentLocation = () => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser');
            return;
        }

        setLoading(true);
        setError(null);
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const { latitude, longitude } = position.coords;
                    const data = await fetchWeatherByCoords(latitude, longitude, unit);
                    setWeather(data);
                    onWeatherUpdate?.(data.cityName, data.timezone);
                } catch (err: unknown) {
                    setError(err instanceof Error ? err.message : 'Failed to fetch weather');
                } finally {
                    setLoading(false);
                }
            },
            () => {
                setError('Unable to access your location. Please enable location services.');
                setLoading(false);
            }
        );
    };

    useEffect(() => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser');
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const { latitude, longitude } = position.coords;
                    const data = await fetchWeatherByCoords(latitude, longitude, unit);
                    setWeather(data);
                    onWeatherUpdate?.(data.cityName, data.timezone);
                } catch (err: unknown) {
                    setError(err instanceof Error ? err.message : 'Failed to fetch weather');
                } finally {
                    setLoading(false);
                }
            },
            async () => {
                try {
                    const data = await fetchWeatherByCoords(21.0285, 105.8542, unit); // Sydney fallback
                    setWeather(data);
                    onWeatherUpdate?.(data.cityName, data.timezone);
                } catch (err: unknown) {
                    setError(err instanceof Error ? err.message : 'Failed to fetch weather');
                } finally {
                    setLoading(false);
                }
            }
        );
    }, [unit]);

    useEffect(() => {
        if (currentLocationTrigger > 0) {
            fetchCurrentLocation();
        }
    }, [currentLocationTrigger]);

    useEffect(() => {
        if (searchedCity && searchedCity.trim().length > 0) {
            setLoading(true);
            setError(null);
            fetchWeatherByCity(searchedCity, unit)
                .then((data) => {
                    setWeather(data);
                    onWeatherUpdate?.(data.cityName, data.timezone);
                    setError(null);
                })
                .catch((err: unknown) => {
                    const errorMsg = err instanceof Error ? err.message : 'Failed to fetch weather for the city';
                    setError(errorMsg);
                    setWeather(null);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [searchedCity, unit]);

    if (loading) {
        return (
            <div className="bg-[#444444] text-white rounded-[30px] h-[260px] w-[700px] flex items-center justify-center shadow-[10px_15px_40px_rgba(0,0,0,0.9)]">
                <span className="text-gray-300 text-lg animate-pulse">Detecting location...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-[#444444] text-white rounded-[30px] h-[260px] w-[700px] flex items-center justify-center shadow-[10px_15px_40px_rgba(0,0,0,0.9)]">
                <span className="text-red-400 text-lg">{error}</span>
            </div>
        );
    }

    if (!weather) return null;

    return <WeatherDetailCard {...weather} />;
};

export default WeatherWidget;