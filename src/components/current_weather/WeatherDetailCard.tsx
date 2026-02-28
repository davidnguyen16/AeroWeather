'use client'

import React from 'react'
import { Poppins } from 'next/font/google';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '600', '700', '800', '900'],
});

const WeatherDetailCard = () => {
    return (
        <div
            className={`
                ${poppins.className}
                bg-[#444444] text-white 
                p-8 
                rounded-[30px] 
                h-[260px] 
                w-[700px] 
                shadow-[10px_15px_40px_rgba(0,0,0,0.9)]
                flex flex-row items-stretch justify-between gap-6
            `}
        >
            {/* --- CỘT TRÁI: Nhiệt độ & Bình minh/Hoàng hôn --- */}
            <div className={`${poppins.className} flex flex-col justify-between items-start h-full my-[12px] ml-[10px] text-center`}>
                
                {/* Phần 1: Nhiệt độ */}
                <div>
                    <div className="text-[65px] font-[600] leading-none tracking-tighter flex items-start mb-[2px]">24°C</div>
                    <div className="text-[18px] text-gray-300 font-[400] mb-[35px]">Feels like: 26°C</div>
                    <div className="flex items-center gap-3 ml-[30px] mb-[4px]">
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            className="w-[40px] h-[40px] text-white"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M3 17h1m16 0h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7m-9.7 5.7a4 4 0 0 1 8 0" />
                            <path d="M3 21l18 0" />
                            <path d="M12 9v-6l3 3m-6 0l3 -3" />
                        </svg>

                        <div className="flex flex-col items-start text-center">
                            <span className="text-[14px] text-gray-300 font-[700] tracking-tight pl-[2px]">Sunrise</span>
                            <span className="text-[13px] font-[700] text-white leading-tight mt-[1px]">06:37 AM</span>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-3 ml-[30px] mb-[4px]">
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            className="w-[40px] h-[40px] text-white"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M3 17h1m16 0h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7m-9.7 5.7a4 4 0 0 1 8 0" />
                            <path d="M3 21l18 0" />
                            <path d="M12 3v6l3 -3m-6 0l3 3" />
                        </svg>

                        <div className="flex flex-col items-start text-center">
                            <span className="text-[14px] text-gray-300 font-[700] tracking-tight pl-[2px]">Sunset</span>
                            <span className="text-[13px] font-[700] text-white leading-tight mt-[1px]">20:37 PM</span>
                        </div>
                    </div>
                </div>

                {/* Phần 2: Sunrise & Sunset */}
                
                </div>
            {/* --- CỘT GIỮA: Icon Thời tiết chính --- */}
            <div className="flex flex-col items-center justify-center">
                <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
 <path d="M12 2V4M12 20V22M4 12H2M6.31412 6.31412L4.8999 4.8999M17.6859 6.31412L19.1001 4.8999M6.31412 17.69L4.8999 19.1042M17.6859 17.69L19.1001 19.1042M22 12H20M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z" stroke="#FFB300" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
 </svg>
                <span className="mt-2 text-2xl font-bold tracking-wide">Sunny</span>
            </div>

            {/* --- CỘT PHẢI: Grid 4 Thông số --- */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-6 content-center">
                
                {/* Độ ẩm */}
                <div className="flex flex-col items-center">
                    <svg 
                        className="w-8 h-8 text-white mb-1" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        viewBox="0 0 24 24" 
                        opacity="0.5"
                    >
                        <path d="M3 12h18M3 6h18M3 18h18" />
                    </svg>
                    <span className="font-bold text-base">41%</span>
                    <span className="text-xs text-gray-300">Humidity</span>
                </div>

                {/* Tốc độ gió */}
                <div className="flex flex-col items-center">
                    <svg 
                        className="w-8 h-8 text-white mb-1" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        viewBox="0 0 24 24"
                    >
                        <path d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2" />
                    </svg>
                    <span className="font-bold text-base">2km/h</span>
                    <span className="text-xs text-gray-300">Wind Speed</span>
                </div>

                {/* Áp suất */}
                <div className="flex flex-col items-center">
                    <svg 
                        className="w-8 h-8 text-white mb-1" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        viewBox="0 0 24 24"
                    >
                        <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-bold text-base">997hPa</span>
                    <span className="text-xs text-gray-300">Pressure</span>
                </div>

                {/* Chỉ số UV */}
                <div className="flex flex-col items-center">
                    <svg 
                        className="w-8 h-8 text-white mb-1" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        viewBox="0 0 24 24" 
                        opacity="0.5"
                    >
                        <path d="M12 2v20m-7-7h14m-12.5-4h11m-9.5-4h8" />
                    </svg>
                    <span className="font-bold text-base">8</span>
                    <span className="text-xs text-gray-300">UV</span>
                </div>
                
            </div>
        </div>
    )
}

export default WeatherDetailCard;