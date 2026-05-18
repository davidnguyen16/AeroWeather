'use client';

import React from 'react';
import { Poppins } from 'next/font/google';
import WeatherIcon from '@/components/ui/WeatherIcon';
import { useHourly } from '@/hooks/useHourly';
import type { Unit } from '@/types/weather';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '600', '700', '800'],
});

interface HourlyForecastCardProps {
    unit?: Unit;
    currentLocationTrigger?: number;
    searchedCity?: string | null;
    isLightMode?: boolean;
}

const WindArrow = ({ direction }: { direction: number }) => (
    <svg
        width="48"
        height="48"
        viewBox="0 0 16 16"
        style={{ transform: `rotate(${direction}deg)` }}
        className="transition-transform duration-300"
    >
        <polygon
            points="8,2 12,12 8,9 4,12"
            fill="#60A5FA"
            stroke="#3B82F6"
            strokeWidth="0.5"
        />
    </svg>
);

const getLightCardColor = (time: string) => {
    if (time === '21:00' || time === '00:00') return 'bg-[#6E5A9E]';
    return 'bg-[#F88508]';
};

const getLightCardTextColor = (time: string) => {
    if (time === '21:00' || time === '00:00') return 'text-white';
    return 'text-[#292929]';
};

const HourlyForecastCard: React.FC<HourlyForecastCardProps> = ({
    unit = 'metric',
    currentLocationTrigger = 0,
    searchedCity = null,
    isLightMode = false,
}) => {
    const { data: hourly, loading } = useHourly({ unit, currentLocationTrigger, searchedCity });

    const tempUnit = unit === 'metric' ? '°C' : '°F';
    const speedUnit = unit === 'metric' ? 'km/h' : 'mph';

    const containerStyle = {
        width: '730px',
        marginLeft: '-30px',
        minWidth: '730px',
        height: '323px',
    };

    if (loading) {
        return (
            <div
                style={containerStyle}
                className={`${poppins.className} ${
                    isLightMode ? 'bg-white text-[#292929]' : 'bg-[#444444] text-white'
                } rounded-[30px] p-6 shadow-[10px_15px_40px_rgba(0,0,0,0.9)] flex items-center justify-center`}
            >
                <span className={`${isLightMode ? 'text-[#292929]' : 'text-gray-300'} text-base animate-pulse`}>
                    Loading hourly forecast...
                </span>
            </div>
        );
    }

    if (!hourly || hourly.length === 0) return null;

    return (
        <div
            style={{ ...containerStyle, padding: '2px 30px 8px 30px' }}
            className={`
                ${poppins.className}
                ${isLightMode ? 'bg-white text-[#292929]' : 'bg-[#444444] text-white'}
                rounded-[30px] flex flex-col
                shadow-[10px_15px_40px_rgba(0,0,0,0.9)]
            `}
        >
            <h3 className="text-[22px] font-bold text-center mb-1 tracking-wide">
                Hourly Forecast:
            </h3>

            <div className="flex justify-between gap-[8px] flex-1 min-h-0">
                {hourly.map((slot, idx) => {
                    const smallCardBg = isLightMode
                        ? getLightCardColor(slot.time)
                        : 'bg-[#2a2a2a]/70 hover:bg-[#333333]/80';

                    const smallCardText = isLightMode
                        ? getLightCardTextColor(slot.time)
                        : 'text-white';

                    return (
                        <div
                            key={idx}
                            className={`
                                flex flex-col items-center justify-evenly
                                ${smallCardBg}
                                backdrop-blur-md
                                rounded-[20px] px-3 py-3
                                flex-1 min-w-0
                                transition-all duration-300
                                hover:scale-[1.03]
                            `}
                        >
                            <span className={`text-[20px] font-bold ${smallCardText} tracking-wider`}>
                                {slot.time}
                            </span>

                            <WeatherIcon condition={slot.condition} size={52} />

                            <span className={`text-[18px] font-bold ${smallCardText}`}>
                                {slot.temp}{tempUnit}
                            </span>

                            <div className="flex flex-col items-center mt-2 gap-1">
                                <WindArrow direction={slot.windDirection} />
                                <span className="text-[13px] font-bold text-blue-300">
                                    {slot.windSpeed} {speedUnit}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default HourlyForecastCard;
