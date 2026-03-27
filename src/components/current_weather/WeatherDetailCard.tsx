'use client'

import React, { useEffect, useState } from 'react'
import { Poppins } from 'next/font/google';
import { useWeather } from '../../context/WeatherContext';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '600', '700', '800', '900'],
});

interface WeatherData {
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  pressure: number;
  uvIndex: number;
  weatherCode: number;
  sunrise: string;
  sunset: string;
}

function getWeatherDescription(code: number): string {
  if (code === 0) return 'Clear Sky';
  if (code === 1) return 'Mainly Clear';
  if (code === 2) return 'Partly Cloudy';
  if (code === 3) return 'Overcast';
  if (code === 45 || code === 48) return 'Foggy';
  if (code >= 51 && code <= 55) return 'Drizzle';
  if (code >= 61 && code <= 65) return 'Rainy';
  if (code >= 71 && code <= 75) return 'Snowy';
  if (code === 77) return 'Snow Grains';
  if (code >= 80 && code <= 82) return 'Rain Showers';
  if (code >= 85 && code <= 86) return 'Snow Showers';
  if (code === 95) return 'Thunderstorm';
  if (code === 96 || code === 99) return 'Thunderstorm w/ Hail';
  return 'Unknown';
}

function WeatherIcon({ code }: { code: number }) {
  // Clear / mainly clear → sun
  if (code === 0 || code === 1) {
    return (
      <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2V4M12 20V22M4 12H2M6.31412 6.31412L4.8999 4.8999M17.6859 6.31412L19.1001 4.8999M6.31412 17.69L4.8999 19.1042M17.6859 17.69L19.1001 19.1042M22 12H20M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z" stroke="#FFB300" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  }
  // Partly cloudy / overcast → cloud with sun
  if (code === 2 || code === 3) {
    return (
      <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 5.07001C13.5 4.97001 14.03 4.91998 14.5 4.91998C18.09 4.91998 21 7.83002 21 11.42C21 15.01 18.09 17.92 14.5 17.92H6C3.79 17.92 2 16.13 2 13.92C2 11.71 3.79 9.92001 6 9.92001C6.19 9.92001 6.38 9.93001 6.57 9.96001C7.1 7.72001 9.09 6.07001 11.5 6.07001C11.67 6.07001 11.84 6.08002 12 6.09002" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 11C9.55 9.83 10.67 9 12 9C13.34 9 14.46 9.84 15 11" stroke="#FFB300" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 4V2M16.24 5.76L17.66 4.34M18 9H20M16.24 12.24L17.66 13.66M12 14V16" stroke="#FFB300" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  }
  // Rain / drizzle / showers
  if ((code >= 51 && code <= 65) || (code >= 80 && code <= 82)) {
    return (
      <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 15.51C20 18.04 17.96 20.08 15.43 20.08H6.36C4.1 20.08 2.27 18.24 2.27 15.98C2.27 14.17 3.39 12.62 4.97 12.02C4.97 11.98 4.97 11.95 4.97 11.91C4.97 9.10 7.24 6.83 10.05 6.83C12.17 6.83 13.99 8.06 14.85 9.85C15.25 9.7 15.68 9.62 16.13 9.62C18.27 9.62 20 11.36 20 13.5V15.51Z" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 16L7 19M12 16L11 19M16 16L15 19" stroke="#60A5FA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  }
  // Snow
  if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) {
    return (
      <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 15.51C20 18.04 17.96 20.08 15.43 20.08H6.36C4.1 20.08 2.27 18.24 2.27 15.98C2.27 14.17 3.39 12.62 4.97 12.02C4.97 11.98 4.97 11.95 4.97 11.91C4.97 9.10 7.24 6.83 10.05 6.83C12.17 6.83 13.99 8.06 14.85 9.85C15.25 9.7 15.68 9.62 16.13 9.62C18.27 9.62 20 11.36 20 13.5V15.51Z" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 16.5L8 19.5M12 16L12 20M16 16.5L16 19.5M10 18L14 18" stroke="#BAE6FD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  }
  // Thunderstorm
  if (code >= 95) {
    return (
      <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 12.1C19 14.6 17 16.6 14.5 16.6H5.5C3.3 16.6 1.5 14.8 1.5 12.6C1.5 10.8 2.6 9.3 4.2 8.7C4.2 8.65 4.2 8.6 4.2 8.55C4.2 5.79 6.44 3.55 9.2 3.55C11.3 3.55 13.1 4.77 13.95 6.55C14.35 6.4 14.78 6.32 15.23 6.32C17.33 6.32 19 7.99 19 10.09V12.1Z" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M13 13L10 17H14L11 21" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  }
  // Fog
  if (code === 45 || code === 48) {
    return (
      <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 8H21M3 12H21M5 16H19M7 20H17" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  }
  // Default fallback → sun
  return (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2V4M12 20V22M4 12H2M6.31412 6.31412L4.8999 4.8999M17.6859 6.31412L19.1001 4.8999M6.31412 17.69L4.8999 19.1042M17.6859 17.69L19.1001 19.1042M22 12H20M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z" stroke="#FFB300" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function formatSunTime(isoString: string): string {
  if (!isoString) return '--:--';
  const date = new Date(isoString);
  return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false });
}

const WeatherDetailCard = () => {
  const { latitude, longitude, isLoadingLocation } = useWeather();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (latitude === null || longitude === null) return;

    const fetchWeather = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,surface_pressure,uv_index,weather_code&daily=sunrise,sunset&timezone=auto&forecast_days=1`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('Failed to fetch weather data');
        const data = await res.json();
        const c = data.current;
        setWeather({
          temperature: Math.round(c.temperature_2m),
          feelsLike: Math.round(c.apparent_temperature),
          humidity: Math.round(c.relative_humidity_2m),
          windSpeed: Math.round(c.wind_speed_10m),
          pressure: Math.round(c.surface_pressure),
          uvIndex: Math.round(c.uv_index),
          weatherCode: c.weather_code,
          sunrise: data.daily?.sunrise?.[0] ?? '',
          sunset: data.daily?.sunset?.[0] ?? '',
        });
      } catch (err) {
        console.error('Error fetching weather:', err);
        setError('Unable to load weather data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();
  }, [latitude, longitude]);

  const isAnyLoading = isLoadingLocation || isLoading;

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
            {isAnyLoading && (
              <div className="flex items-center justify-center w-full text-gray-400 text-lg italic">
                Loading weather...
              </div>
            )}

            {!isAnyLoading && error && (
              <div className="flex items-center justify-center w-full text-red-400 text-lg italic">
                {error}
              </div>
            )}

            {!isAnyLoading && !error && !weather && !latitude && (
              <div className="flex items-center justify-center w-full text-gray-400 text-lg italic">
                Enable location or search for a city to see weather
              </div>
            )}

            {!isAnyLoading && !error && weather && (
              <>
            {/* --- LEFT COLUMN: Temperature & Sunrise/Sunset --- */}
            <div className={`${poppins.className} flex flex-col justify-between items-start h-full my-[12px] ml-[10px] text-center`}>
                
                {/* Temperature */}
                <div>
                    <div className="text-[65px] font-[600] leading-none tracking-tighter flex items-start mb-[2px]">{weather.temperature}°C</div>
                    <div className="text-[18px] text-gray-300 font-[400] mb-[35px]">Feels like: {weather.feelsLike}°C</div>
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
                            <span className="text-[13px] font-[700] text-white leading-tight mt-[1px]">{formatSunTime(weather.sunrise)}</span>
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
                            <span className="text-[13px] font-[700] text-white leading-tight mt-[1px]">{formatSunTime(weather.sunset)}</span>
                        </div>
                    </div>
                </div>
                </div>

            {/* --- MIDDLE COLUMN: Weather Icon --- */}
            <div className="flex flex-col items-center justify-center">
                <WeatherIcon code={weather.weatherCode} />
                <span className="mt-2 text-2xl font-bold tracking-wide">{getWeatherDescription(weather.weatherCode)}</span>
            </div>

            {/* --- RIGHT COLUMN: 4 metrics grid --- */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-6 content-center">
                
                {/* Humidity */}
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
                    <span className="font-bold text-base">{weather.humidity}%</span>
                    <span className="text-xs text-gray-300">Humidity</span>
                </div>

                {/* Wind Speed */}
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
                    <span className="font-bold text-base">{weather.windSpeed}km/h</span>
                    <span className="text-xs text-gray-300">Wind Speed</span>
                </div>

                {/* Pressure */}
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
                    <span className="font-bold text-base">{weather.pressure}hPa</span>
                    <span className="text-xs text-gray-300">Pressure</span>
                </div>

                {/* UV Index */}
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
                    <span className="font-bold text-base">{weather.uvIndex}</span>
                    <span className="text-xs text-gray-300">UV</span>
                </div>
                
            </div>
              </>
            )}
        </div>
    )
}

export default WeatherDetailCard;