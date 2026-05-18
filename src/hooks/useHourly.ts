'use client';

import { fetchHourlyByCity, fetchHourlyByCoords } from '@/services/weatherApi';
import type { HourlyForecast, Unit } from '@/types/weather';
import { useWeatherData, type UseWeatherDataState } from './useWeatherData';

const FALLBACK_COORDS = { lat: 21.0285, lon: 105.8542 };

interface UseHourlyOptions {
    unit: Unit;
    currentLocationTrigger: number;
    searchedCity: string | null;
}

export function useHourly(options: UseHourlyOptions): UseWeatherDataState<HourlyForecast[]> {
    return useWeatherData<HourlyForecast[]>({
        ...options,
        fetchByCoords: fetchHourlyByCoords,
        fetchByCity: fetchHourlyByCity,
        fallbackCoords: FALLBACK_COORDS,
    });
}