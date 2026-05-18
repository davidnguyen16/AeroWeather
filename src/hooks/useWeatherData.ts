'use client';

import { useEffect, useRef, useState } from 'react';
import type { Unit } from '@/types/weather';

interface UseWeatherDataOptions<T> {
    fetchByCoords: (lat: number, lon: number, unit: Unit) => Promise<T>;
    fetchByCity: (city: string, unit: Unit) => Promise<T>;
    unit: Unit;
    currentLocationTrigger: number;
    searchedCity: string | null;
    fallbackCoords?: { lat: number; lon: number };
    onSuccess?: (data: T) => void;
}

export interface UseWeatherDataState<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}

export function useWeatherData<T>({
    fetchByCoords,
    fetchByCity,
    unit,
    currentLocationTrigger,
    searchedCity,
    fallbackCoords,
    onSuccess,
}: UseWeatherDataOptions<T>): UseWeatherDataState<T> {
    const [state, setState] = useState<UseWeatherDataState<T>>({
        data: null,
        loading: true,
        error: null,
    });

    const onSuccessRef = useRef(onSuccess);
    useEffect(() => {
        onSuccessRef.current = onSuccess;
    }, [onSuccess]);

    useEffect(() => {
        let cancelled = false;

        const fetchAndSet = async (lat: number, lon: number) => {
            try {
                const data = await fetchByCoords(lat, lon, unit);
                if (cancelled) return;
                setState({ data, loading: false, error: null });
                onSuccessRef.current?.(data);
            } catch (err) {
                if (cancelled) return;
                setState({
                    data: null,
                    loading: false,
                    error: err instanceof Error ? err.message : 'Failed to fetch weather data',
                });
            }
        };

        if (!navigator.geolocation) {
            Promise.resolve().then(() => {
                if (cancelled) return;
                setState({
                    data: null,
                    loading: false,
                    error: 'Geolocation is not supported by your browser',
                });
            });
            return () => {
                cancelled = true;
            };
        }

        navigator.geolocation.getCurrentPosition(
            (pos) => fetchAndSet(pos.coords.latitude, pos.coords.longitude),
            () => {
                if (fallbackCoords) {
                    fetchAndSet(fallbackCoords.lat, fallbackCoords.lon);
                    return;
                }
                if (cancelled) return;
                setState({
                    data: null,
                    loading: false,
                    error: 'Unable to access your location',
                });
            },
        );

        return () => {
            cancelled = true;
        };
    }, [unit, fetchByCoords, fallbackCoords]);

    useEffect(() => {
        if (currentLocationTrigger === 0) return;

        let cancelled = false;

        if (!navigator.geolocation) {
            Promise.resolve().then(() => {
                if (cancelled) return;
                setState((prev) => ({
                    ...prev,
                    loading: false,
                    error: 'Geolocation is not supported by your browser',
                }));
            });
            return () => {
                cancelled = true;
            };
        }

        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                try {
                    const data = await fetchByCoords(pos.coords.latitude, pos.coords.longitude, unit);
                    if (cancelled) return;
                    setState({ data, loading: false, error: null });
                    onSuccessRef.current?.(data);
                } catch (err) {
                    if (cancelled) return;
                    setState({
                        data: null,
                        loading: false,
                        error: err instanceof Error ? err.message : 'Failed to fetch weather data',
                    });
                }
            },
            () => {
                if (cancelled) return;
                setState((prev) => ({
                    ...prev,
                    loading: false,
                    error: 'Unable to access your location. Please enable location services.',
                }));
            },
        );

        return () => {
            cancelled = true;
        };
    }, [currentLocationTrigger, unit, fetchByCoords]);

    useEffect(() => {
        if (!searchedCity || searchedCity.trim().length === 0) return;

        let cancelled = false;

        fetchByCity(searchedCity, unit)
            .then((data) => {
                if (cancelled) return;
                setState({ data, loading: false, error: null });
                onSuccessRef.current?.(data);
            })
            .catch((err: unknown) => {
                if (cancelled) return;
                setState({
                    data: null,
                    loading: false,
                    error: err instanceof Error ? err.message : 'Failed to fetch weather data for the city',
                });
            });

        return () => {
            cancelled = true;
        };
    }, [searchedCity, unit, fetchByCity]);

    return state;
}