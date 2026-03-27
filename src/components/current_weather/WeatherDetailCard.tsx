'use client'

// WeatherDetailCard.tsx
// Chỉ lo 1 việc: render UI, không biết gì về API

import React from 'react'
import { Poppins } from 'next/font/google'
import Image from 'next/image'
import { WeatherData } from '../current_weather/WeatherAPI'

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '600', '700', '800', '900'],
});

const getConditionLabel = (condition: string): string => {
    const map: Record<string, string> = {
        'clear': 'Sunny',
        'clouds': 'Cloudy',
        'rain': 'Rainy',
        'drizzle': 'Drizzle',
        'thunderstorm': 'Thunderstorm',
        'snow': 'Snowy',
        'mist': 'Misty',
        'fog': 'Foggy',
        'haze': 'Hazy',
        'smoke': 'Smoky',
        'dust': 'Dusty',
        'tornado': 'Tornado',
    };
    return map[condition.toLowerCase()] ?? condition;
};

const WeatherDetailCard = ({
    temp,
    feelsLike,
    condition,
    iconCode,
    humidity,
    windSpeed,
    pressure,
    uvi,
    sunrise,
    sunset,
    unit = 'metric',
}: WeatherData) => {
    const tempUnit = unit === 'metric' ? '°C' : '°F';
    const speedUnit = unit === 'metric' ? 'km/h' : 'mph';

    return (
        <div className={`
            ${poppins.className}
            bg-[#444444] text-white
            p-8 rounded-[30px] h-[260px] w-[700px]
            shadow-[10px_15px_40px_rgba(0,0,0,0.9)]
            flex flex-row items-stretch justify-between gap-6
        `}>
            {/* CỘT TRÁI */}
            <div className="flex flex-col justify-between items-start h-full my-[12px] ml-[10px]">
                <div>
                    <div className="text-[65px] font-[600] leading-none tracking-tighter mb-[2px]">
                        {Math.round(temp)}{tempUnit}
                    </div>
                    <div className="text-[18px] text-gray-300 font-[400] mb-[35px] text-center">
                        Feels like: {Math.round(feelsLike)}{tempUnit}
                    </div>

                    {/* Sunrise */}
                    <div className="flex items-center gap-3 ml-[30px] mb-[4px]">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[40px] h-[40px]">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M3 17h1m16 0h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7m-9.7 5.7a4 4 0 0 1 8 0" />
                            <path d="M3 21l18 0" />
                            <path d="M12 9v-6l3 3m-6 0l3 -3" />
                        </svg>
                        <div className="flex flex-col items-start">
                            <span className="text-[14px] text-gray-300 font-[700] tracking-tight">Sunrise</span>
                            <span className="text-[13px] font-[700] leading-tight mt-[1px]">{sunrise}</span>
                        </div>
                    </div>

                    {/* Sunset */}
                    <div className="flex items-center gap-3 ml-[30px]">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[40px] h-[40px]">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M3 17h1m16 0h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7m-9.7 5.7a4 4 0 0 1 8 0" />
                            <path d="M3 21l18 0" />
                            <path d="M12 3v6l3 -3m-6 0l3 3" />
                        </svg>
                        <div className="flex flex-col items-start">
                            <span className="text-[14px] text-gray-300 font-[700] tracking-tight">Sunset</span>
                            <span className="text-[13px] font-[700] leading-tight mt-[1px]">{sunset}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* CỘT GIỮA: Icon từ OpenWeatherMap */}
            <div className="flex flex-col items-center justify-start pt-4">
                <img
                    src={`https://openweathermap.org/img/wn/${iconCode}@2x.png`}
                    alt={condition}
                    className="w-[180px] h-[180px]"
                />
                <span className={`${poppins.className} text-[24px] font-[600] tracking-wide -mt-2`}>
                    {getConditionLabel(condition)}
                </span>
            </div>

            {/* CỘ PHẢI: 4 thông số */}
            <div className="grid grid-cols-2 gap-x-12 gap-y-4 items-center justify-items-center h-full">
                <div className="flex flex-col items-center mr-[30px]">
                    <svg className="w-8 h-8 mb-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <mask id="SVGk33K9cMQ" width="18" height="22" x="3" y="1" fill="#000" maskUnits="userSpaceOnUse">
                            <path d="M19 14.571C19 18.121 15.866 21 12 21s-7-2.878-7-6.429c0-4.52 4.644-9.353 6.367-10.99a.913.913 0 0 1 1.266 0C14.356 5.217 19 10.05 19 14.57"/>
                        </mask>
                        <g fill="none" stroke="currentColor">
                            <path strokeWidth="4" d="M19 14.571C19 18.121 15.866 21 12 21s-7-2.878-7-6.429c0-4.52 4.644-9.353 6.367-10.99a.913.913 0 0 1 1.266 0C14.356 5.217 19 10.05 19 14.57Z" mask="url(#SVGk33K9cMQ)"/>
                            <path strokeLinecap="round" strokeWidth="2" d="M12 18a4 4 0 0 1-4-4"/>
                        </g>
                    </svg>
                    <span className="font-bold text-base">{humidity}%</span>
                    <span className="text-xs text-gray-300">Humidity</span>
                </div>

                <div className="flex flex-col items-center mr-[20px]">
                    <svg className="w-[60px] h-[60px] mb-1 ml-[10px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 24" fill="currentColor">
                        <path d="M8.417 19.246a1.005 1.005 0 0 1 2.01 0a2.75 2.75 0 0 0 2.745 2.745a3.296 3.296 0 0 0 3.292-3.292a3.92 3.92 0 0 0-3.919-3.917H1.005a1.005 1.005 0 0 1 0-2.01h11.54a5.936 5.936 0 0 1 5.928 5.928a5.31 5.31 0 0 1-5.3 5.301a4.76 4.76 0 0 1-4.756-4.754zm5.702-8.015a1.005 1.005 0 0 1 0-2.01h6.156a3.92 3.92 0 0 0 3.918-3.92a3.296 3.296 0 0 0-3.292-3.292a2.75 2.75 0 0 0-2.745 2.745a1.005 1.005 0 0 1-2.01 0A4.76 4.76 0 0 1 20.901 0a5.31 5.31 0 0 1 5.301 5.3a5.936 5.936 0 0 1-5.928 5.929zm-13.114 0a1.005 1.005 0 0 1 0-2.01h6.158a3.92 3.92 0 0 0 3.917-3.92a3.296 3.296 0 0 0-3.292-3.29a2.75 2.75 0 0 0-2.745 2.745a1.005 1.005 0 0 1-2.01 0A4.76 4.76 0 0 1 7.788 0a5.31 5.31 0 0 1 5.301 5.3a5.936 5.936 0 0 1-5.932 5.929z"/>
                    </svg>
                    <span className="font-bold text-base">{windSpeed} m/s</span>
                    <span className="text-xs text-gray-300">Wind Speed</span>
                </div>

                <div className="flex flex-col items-center mr-[30px]">
                    <svg className="w-8 h-8 mb-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.693 17.33a9 9 0 1 0-17.386 0"/>
                        <path d="M12.766 15.582c.487.71.144 1.792-.766 2.417c-.91.626-2.043.558-2.53-.151c-.52-.756-2.314-5.007-3.403-7.637c-.205-.495.4-.911.79-.542c2.064 1.96 5.39 5.157 5.909 5.913Z"/>
                        <path d="M12 6v2m-6.364.636L7.05 10.05m11.314-1.414L16.95 10.05m3.743 7.28l-1.931-.518m-15.455.518l1.931-.518"/>
                    </svg>
                    <span className="font-bold text-base">{pressure}hPa</span>
                    <span className="text-xs text-gray-300">Pressure</span>
                </div>

                <div className="flex flex-col items-center mr-[20px]">
                    <svg className="w-[65px] h-[65px] mb-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h1m16 0h1M5.6 5.6l.7.7m12.1-.7l-.7.7M8 12a4 4 0 1 1 8 0m-4-8V3m1 13l2 5h1l2-5M6 16v3a2 2 0 1 0 4 0v-3"/></svg>
                    <span className="font-bold text-base">{uvi}</span>
                    <span className="text-xs text-gray-300">UV</span>
                </div>
            </div>
        </div>
    );
};

export default WeatherDetailCard;