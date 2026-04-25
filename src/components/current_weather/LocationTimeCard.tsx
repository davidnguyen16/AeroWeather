'use client'

import React, { useEffect, useState } from 'react'
import { Poppins } from 'next/font/google';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '700', '800'],
});

interface LocationTimeCardProps {
    cityName?: string;
    timezone?: string;
    isLightMode: boolean;
}

const LocationTimeCard: React.FC<LocationTimeCardProps> = ({ 
    cityName = 'Sydney, Australia', 
    timezone = 'UTC',
    isLightMode
}) => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const getLocalTime = () => {
        try {
            const formatter = new Intl.DateTimeFormat('en-US', {
                timeZone: timezone,
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
            });

            const parts = formatter.formatToParts(currentTime);
            const timeObj: Record<string, string> = {};
            
            parts.forEach((part) => {
                if (part.type !== 'literal') {
                    timeObj[part.type] = part.value;
                }
            });

            return {
                hour: timeObj.hour || '00',
                minute: timeObj.minute || '00',
                year: timeObj.year || '2026',
                month: timeObj.month || '01',
                day: timeObj.day || '01',
            };
        } catch {
            return {
                hour: currentTime.getUTCHours().toString().padStart(2, '0'),
                minute: currentTime.getUTCMinutes().toString().padStart(2, '0'),
                year: currentTime.getUTCFullYear().toString(),
                month: (currentTime.getUTCMonth() + 1).toString().padStart(2, '0'),
                day: currentTime.getUTCDate().toString().padStart(2, '0'),
            };
        }
    };

    const formatTime = (time: ReturnType<typeof getLocalTime>) => {
        return `${time.hour}:${time.minute}`;
    };

    const formatDate = (time: ReturnType<typeof getLocalTime>) => {
        const date = new Date(`${time.year}-${time.month}-${time.day}`);
        const weekday = date.toLocaleDateString('en-GB', { weekday: 'long' });
        const day = parseInt(time.day);
        const month = new Date(`2026-${time.month}-01`).toLocaleDateString('en-GB', { month: 'short' });

        return `${weekday}, ${day} ${month}`;
    };

    const localTime = getLocalTime();
    
    const getFontSize = (name: string) => {
        if (name.length > 25) return "text-[22px]";
        if (name.length > 15) return "text-[28px]";
        return "text-[32px] sm:text-[36px]";
    };

    return (
        <div className={`${poppins.className} ${
            isLightMode 
                ? 'bg-[#D9D9D9] text-[#292929]' 
                : 'bg-[#444444] text-white'
        } p-10 rounded-[30px] h-[260px] w-[400px] flex flex-col justify-center text-center shadow-[10px_15px_40px_rgba(0,0,0,0.9)]`}>
            
            <h2 className={`${getFontSize(cityName)} font-bold mb-5 leading-tight break-words`}>
                {cityName}
            </h2>

            <div className="text-[96px] font-extrabold leading-none tracking-tighter">
                {formatTime(localTime)}
            </div>

            <div className={`text-[30px] font-normal -mt-2 ${
                isLightMode ? 'text-[#292929]' : 'text-gray-400'
            }`}>
                {formatDate(localTime)}
            </div>
        </div>
    );
};

export default LocationTimeCard;