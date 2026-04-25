'use client'

import React, { useEffect, useState } from 'react'
import { Poppins } from 'next/font/google'
import { ForecastDay, fetchForecastByCoords, fetchForecastByCity } from '../weather_api/WeatherAPI'
import { Sun, Cloud, CloudRain, CloudSnow, CloudFog } from 'lucide-react';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '600', '700'],
});

interface ForecastCardProps {
    unit?: 'metric' | 'imperial';
    currentLocationTrigger?: number;
    searchedCity?: string | null;
    isLightMode?: boolean;
}

const ForecastCard: React.FC<ForecastCardProps> = ({
    unit = 'metric',
    currentLocationTrigger = 0,
    searchedCity = null,
    isLightMode = false,
}) => {
    const [forecast, setForecast] = useState<ForecastDay[] | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchFromCoords = (lat: number, lon: number) => {
        fetchForecastByCoords(lat, lon, unit)
            .then(setForecast)
            .catch(() => setForecast(null))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        if (!navigator.geolocation) {
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (pos) => fetchFromCoords(pos.coords.latitude, pos.coords.longitude),
            () => fetchFromCoords(21.0285, 105.8542)
        );
    }, [unit]);

    useEffect(() => {
        if (currentLocationTrigger > 0 && navigator.geolocation) {
            setLoading(true);
            navigator.geolocation.getCurrentPosition(
                (pos) => fetchFromCoords(pos.coords.latitude, pos.coords.longitude),
                () => setLoading(false)
            );
        }
    }, [currentLocationTrigger]);

    useEffect(() => {
        if (searchedCity && searchedCity.trim().length > 0) {
            setLoading(true);
            fetchForecastByCity(searchedCity, unit)
                .then(setForecast)
                .catch(() => setForecast(null))
                .finally(() => setLoading(false));
        }
    }, [searchedCity, unit]);

    const formatDayDate = (dateStr: string) => {
        const date = new Date(dateStr + 'T00:00:00');
        const day = date.toLocaleDateString('en-US', { weekday: 'long' });
        const dateNum = date.getDate();
        const month = date.toLocaleDateString('en-US', { month: 'short' });
        return `${day}, ${dateNum} ${month}`;
    };

    const tempUnit = unit === 'metric' ? '°C' : '°F';

    const cardClass = isLightMode
        ? 'bg-[#D9D9D9] text-[#292929]'
        : 'bg-[#444444] text-white';

    const subTextClass = isLightMode
        ? 'text-[#292929]'
        : 'text-white';

    if (loading) {
        return (
            <div className={`${poppins.className} ${cardClass} rounded-[30px] w-[340px] p-6 shadow-[10px_15px_40px_rgba(0,0,0,0.9)] flex items-center justify-center`}>
                <span className={`${isLightMode ? 'text-[#292929]' : 'text-gray-300'} text-base animate-pulse`}>
                    Loading forecast...
                </span>
            </div>
        );
    }

    if (!forecast || forecast.length === 0) return null;

    return (
        <div className={`${poppins.className} ${cardClass} rounded-[30px] w-[340px] p-6 shadow-[10px_15px_40px_rgba(0,0,0,0.9)]`}>
            <h3 style={{ marginBottom: '0px' }} className="text-[27px] font-bold text-center">
                5 Days Forecast:
            </h3>

            <div style={{ marginTop: '0px', marginLeft: '-10px' }} className="flex flex-col gap-[10px]">
                {forecast.map((day) => (
                    <div
                        key={day.date}
                        className="grid grid-cols-3 items-center"
                    >
                        <div className="flex justify-center">
                            {(() => {
                                const cond = day.condition.toLowerCase();
                                let Icon = Cloud;
                                let color = '#a3a3a3';

                                if (cond === 'clear') {
                                    Icon = Sun;
                                    color = '#facc15';
                                } else if (cond === 'clouds') {
                                    Icon = Cloud;
                                    color = '#a3a3a3';
                                } else if (['rain', 'drizzle', 'thunderstorm'].includes(cond)) {
                                    Icon = CloudRain;
                                    color = '#38bdf8';
                                } else if (cond === 'snow') {
                                    Icon = CloudSnow;
                                    color = '#e0e7ef';
                                } else if (['mist', 'fog', 'haze', 'smoke'].includes(cond)) {
                                    Icon = CloudFog;
                                    color = '#cbd5e1';
                                }

                                return <Icon className="w-[42px] h-[42px]" color={color} strokeWidth={1.5} />;
                            })()}
                        </div>

                        <span
                            style={{ marginLeft: '-35px', marginRight: '8px', fontWeight: 700 }}
                            className="text-[17px] text-center"
                        >
                            {day.tempMax}{tempUnit}
                        </span>

                        <span
                            style={{ marginLeft: '-38px', marginRight: '12px', fontWeight: 700, whiteSpace: 'nowrap' }}
                            className={`text-[15px] ${subTextClass} text-center`}
                        >
                            {formatDayDate(day.date)}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ForecastCard;