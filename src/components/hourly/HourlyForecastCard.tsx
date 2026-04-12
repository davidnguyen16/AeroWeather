'use client'

import React, { useEffect, useState } from 'react'
import { Poppins } from 'next/font/google'
import { HourlyForecast, fetchHourlyByCoords, fetchHourlyByCity } from '../weather_api/WeatherAPI'
import { Sun, Cloud, CloudRain, CloudDrizzle, CloudLightning, CloudSnow, CloudFog } from 'lucide-react';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '600', '700', '800'],
});

interface HourlyForecastCardProps {
    unit?: 'metric' | 'imperial';
    currentLocationTrigger?: number;
    searchedCity?: string | null;
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

const HourlyForecastCard: React.FC<HourlyForecastCardProps> = ({
    unit = 'metric',
    currentLocationTrigger = 0,
    searchedCity = null,
}) => {
    const [hourly, setHourly] = useState<HourlyForecast[] | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchFromCoords = (lat: number, lon: number) => {
        fetchHourlyByCoords(lat, lon, unit)
            .then(setHourly)
            .catch(() => setHourly(null))
            .finally(() => setLoading(false));
    };

    
    useEffect(() => {
        if (!navigator.geolocation) {
            setLoading(false);
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (pos) => fetchFromCoords(pos.coords.latitude, pos.coords.longitude),
            () => fetchFromCoords(21.0285, 105.8542)
        );
    }, [unit]);

    
    useEffect(() => {
        if (currentLocationTrigger > 0 && navigator.geolocation) {
            setLoading(true);
            navigator.geolocation.getCurrentPosition(
                (pos) => fetchFromCoords(pos.coords.latitude, pos.coords.longitude),
                () => setLoading(false)
            );
        }
    }, [currentLocationTrigger]);

    
    useEffect(() => {
        if (searchedCity && searchedCity.trim().length > 0) {
            setLoading(true);
            fetchHourlyByCity(searchedCity, unit)
                .then(setHourly)
                .catch(() => setHourly(null))
                .finally(() => setLoading(false));
        }
    }, [searchedCity, unit]);

    const tempUnit = unit === 'metric' ? '°C' : '°F';
    const speedUnit = unit === 'metric' ? 'km/h' : 'mph';

    if (loading) {
        return (
            <div style={{ width: '730px', marginLeft: '-30px', minWidth: '730px', height: '323px' }} className={`${poppins.className} bg-[#444444] text-white rounded-[30px] p-6 shadow-[10px_15px_40px_rgba(0,0,0,0.9)] flex items-center justify-center`}>
                <span className="text-gray-300 text-base animate-pulse">Loading hourly forecast...</span>
            </div>
        );
    }

    if (!hourly || hourly.length === 0) return null;

    return (
        <div style={{ width: '730px', marginLeft: '-30px', minWidth: '730px', height: '323px', padding: '2px 30px 8px 30px' }} className={`
            ${poppins.className}
            bg-[#444444]
            text-white rounded-[30px]
            flex flex-col
            shadow-[10px_15px_40px_rgba(0,0,0,0.9)]
        `}>
            
            <h3 className="text-[22px] font-bold text-center mb-1 tracking-wide">
                Hourly Forecast:
            </h3>

            
            <div className="flex justify-between gap-[8px] flex-1 min-h-0">
                {hourly.map((slot, idx) => (
                    <div
                        key={idx}
                        className="
                            flex flex-col items-center justify-evenly
                            bg-[#2a2a2a]/70 backdrop-blur-md
                            rounded-[20px] px-3 py-3
                            flex-1 min-w-0
                            transition-all duration-300
                            hover:bg-[#333333]/80 hover:scale-[1.03]
                        "
                    >
                        {/* Time */}
                        <span style={{ fontWeight: 700 }} className="text-[20px] text-gray-200 tracking-wider">
                            {slot.time}
                        </span>

                        {/* Weather icon */}
                                                {(() => {
                                                    const cond = slot.condition.toLowerCase();
                                                    let Icon = Cloud;
                                                    let color = '#a3a3a3'; // gray for clouds by default
                                                    if (cond === 'clear') { Icon = Sun; color = '#facc15'; } // yellow
                                                    else if (cond === 'clouds') { Icon = Cloud; color = '#a3a3a3'; } // gray
                                                    else if ([ 'rain', 'drizzle', 'thunderstorm' ].includes(cond)) { Icon = CloudRain; color = '#38bdf8'; } // blue
                                                    else if (cond === 'snow') { Icon = CloudSnow; color = '#e0e7ef'; } // white
                                                    else if ([ 'mist', 'fog', 'haze', 'smoke' ].includes(cond)) { Icon = CloudFog; color = '#cbd5e1'; } // light gray
                                                    return <Icon className="w-[48px] h-[48px] my-1 drop-shadow-[0_2px_6px_rgba(255,200,50,0.3)]" color={color} strokeWidth={1.5} />;
                                                })()}

                        {/* Temperature */}
                        <span style={{ fontWeight: 700 }} className="text-[18px] text-white">
                            {slot.temp}{tempUnit}
                        </span>

                        {/* Wind direction arrow + speed */}
                        <div className="flex flex-col items-center mt-2 gap-1">
                            <WindArrow direction={slot.windDirection} />
                            <span style={{ fontWeight: 700 }} className="text-[13px] text-blue-300">
                                {slot.windSpeed}{speedUnit}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HourlyForecastCard;
