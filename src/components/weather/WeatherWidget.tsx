'use client';

import React from 'react';
import { useWeather } from '@/hooks/useWeather';
import WeatherDetailCard from './WeatherDetailCard';
import type { Unit } from '@/types/weather';

interface WeatherWidgetProps {
    unit?: Unit;
    currentLocationTrigger?: number;
    searchedCity?: string | null;
    onWeatherUpdate?: (cityName: string, timezone: string) => void;
    isLightMode: boolean;
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({
    unit = 'metric',
    currentLocationTrigger = 0,
    searchedCity = null,
    onWeatherUpdate,
    isLightMode,
}) => {
    const { data: weather, loading, error } = useWeather({
        unit,
        currentLocationTrigger,
        searchedCity,
        onSuccess: (data) => onWeatherUpdate?.(data.cityName, data.timezone),
    });

    const containerClass = `w-[700px] h-[260px] rounded-[30px] flex items-center justify-center shadow-[10px_15px_40px_rgba(0,0,0,0.9)] ${
        isLightMode ? 'bg-[#D9D9D9] text-[#292929]' : 'bg-[#444444] text-gray-300'
    }`;

    if (loading) {
        return (
            <div className={containerClass}>
                <span className="text-lg animate-pulse">Detecting location...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className={containerClass}>
                <span className="text-red-400 text-lg">{error}</span>
            </div>
        );
    }

    if (!weather) return null;

    return <WeatherDetailCard {...weather} isLightMode={isLightMode} />;
};

export default WeatherWidget;
