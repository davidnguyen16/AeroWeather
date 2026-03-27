'use client'

import React, { useEffect, useState } from 'react'
import { Poppins } from 'next/font/google';
import { useWeather } from '../../context/WeatherContext';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '700', '800'],
});

const LocationTimeCard: React.FC = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const { cityName, isLoadingLocation } = useWeather();

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        });
    }

    const formatDate = (date: Date) => {
        const weekday = date.toLocaleDateString('en-GB', { weekday: 'long' });
        const day = date.toLocaleDateString('en-GB', { day: 'numeric' });
        const month = date.toLocaleDateString('en-GB', { month: 'short' });

        return `${weekday}, ${day} ${month}`;
    };

    const displayName = isLoadingLocation ? 'Detecting location...' : (cityName || 'Unknown Location');

    return (
        <div className={`${poppins.className} bg-[#444444] text-white p-10 rounded-[30px] h-[260px] w-[400px] text-center shadow-[10px_15px_40px_rgba(0,0,0,0.9)]`}>
            <h2 className="text-[36px] font-bold mb-5 leading-tight break-words">{displayName}</h2>

            <div className="text-[96px] font-extrabold leading-none tracking-tighter">
              {formatTime(currentTime)}
            </div>

            <div className="text-[30px] text-gray-400 font-normal -mt-2">
              {formatDate(currentTime)}
            </div>
        </div>
    );
};

export default LocationTimeCard;