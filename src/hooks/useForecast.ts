'use client';

import { fetchForecastByCity, fetchForecastByCoords } from '@/services/weatherApi';
import type { ForecastDay, Unit } from '@/types/weather';
import { useWeatherData, type UseWeatherDataState } from './useWeatherData';

const FALLBACK_COORDS = { lat: 21.0285, lon: 105.8542 };

interface UseForecastOptions {
    unit: Unit;
    currentLocationTrigger: number;
    searchedCity: string | null;
}

export function useForecast(options: UseForecastOptions): UseWeatherDataState<ForecastDay[]> {
    return useWeatherData<ForecastDay[]>({
        ...options,
        fetchByCoords: fetchForecastByCoords,
        fetchByCity: fetchForecastByCity,
        fallbackCoords: FALLBACK_COORDS,
    });
}