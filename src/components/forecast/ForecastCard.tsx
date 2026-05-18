'use client';

import React from 'react';
import { Poppins } from 'next/font/google';
import WeatherIcon from '@/components/ui/WeatherIcon';
import { useForecast } from '@/hooks/useForecast';
import type { Unit } from '@/types/weather';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '600', '700'],
});

interface ForecastCardProps {
    unit?: Unit;
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
    const { data: forecast, loading } = useForecast({ unit, currentLocationTrigger, searchedCity });

    const tempUnit = unit === 'metric' ? '°C' : '°F';

    const cardClass = isLightMode
        ? 'bg-[#D9D9D9] text-[#292929]'
        : 'bg-[#444444] text-white';

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

    const formatDayDate = (dateStr: string) => {
        const date = new Date(dateStr + 'T00:00:00');
        const day = date.toLocaleDateString('en-US', { weekday: 'long' });
        const dateNum = date.getDate();
        const month = date.toLocaleDateString('en-US', { month: 'short' });
        return `${day}, ${dateNum} ${month}`;
    };

    return (
        <div className={`${poppins.className} ${cardClass} rounded-[30px] w-[340px] p-6 shadow-[10px_15px_40px_rgba(0,0,0,0.9)]`}>
            <h3 className="text-[27px] font-bold text-center mb-0">
                5 Days Forecast:
            </h3>

            <div className="flex flex-col gap-[10px] mt-0 ml-[-10px]">
                {forecast.map((day) => (
                    <div key={day.date} className="grid grid-cols-3 items-center">
                        <div className="flex justify-center">
                            <WeatherIcon condition={day.condition} size={46} />
                        </div>

                        <span className="text-[17px] font-bold text-center" style={{ marginLeft: '-35px', marginRight: '8px' }}>
                            {day.tempMax}{tempUnit}
                        </span>

                        <span className="text-[15px] font-bold text-center whitespace-nowrap" style={{ marginLeft: '-38px', marginRight: '12px' }}>
                            {formatDayDate(day.date)}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ForecastCard;
