'use client';

import { fetchWeatherByCity, fetchWeatherByCoords } from '@/services/weatherApi';
import type { Unit, WeatherData } from '@/types/weather';
import { useWeatherData, type UseWeatherDataState } from './useWeatherData';

const FALLBACK_COORDS = { lat: 21.0285, lon: 105.8542 };

interface UseWeatherOptions {
    unit: Unit;
    currentLocationTrigger: number;
    searchedCity: string | null;
    onSuccess?: (data: WeatherData) => void;
}

export function useWeather(options: UseWeatherOptions): UseWeatherDataState<WeatherData> {
    return useWeatherData<WeatherData>({
        ...options,
        fetchByCoords: fetchWeatherByCoords,
        fetchByCity: fetchWeatherByCity,
        fallbackCoords: FALLBACK_COORDS,
    });
}