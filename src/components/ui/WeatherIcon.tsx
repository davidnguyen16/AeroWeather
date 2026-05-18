'use client';

import React from 'react';
import {
    WiDaySunny,
    WiDayCloudy,
    WiCloudy,
    WiFog,
    WiSprinkle,
    WiRain,
    WiSnow,
    WiSnowflakeCold,
    WiShowers,
    WiStormShowers,
    WiThunderstorm,
    WiSleet,
} from 'react-icons/wi';
import type { IconType } from 'react-icons';

interface WeatherIconProps {
    condition: string;
    size?: number;
    className?: string;
}

interface IconConfig {
    Icon: IconType;
    color: string;
}

const CONDITION_MAP: Record<string, IconConfig> = {
    'clear':               { Icon: WiDaySunny,       color: '#FFD700' },
    'mostly clear':        { Icon: WiDaySunny,       color: '#FFD700' },
    'partly cloudy':       { Icon: WiDayCloudy,      color: '#93C5FD' },
    'overcast':            { Icon: WiCloudy,         color: '#94A3B8' },
    'foggy':               { Icon: WiFog,            color: '#CBD5E1' },
    'drizzle':             { Icon: WiSprinkle,       color: '#60A5FA' },
    'rain':                { Icon: WiRain,           color: '#3B82F6' },
    'heavy rain':          { Icon: WiRain,           color: '#1D4ED8' },
    'snow':                { Icon: WiSnow,           color: '#BAE6FD' },
    'heavy snow':          { Icon: WiSnowflakeCold,  color: '#93C5FD' },
    'snow grains':         { Icon: WiSnow,           color: '#BAE6FD' },
    'rain showers':        { Icon: WiShowers,        color: '#60A5FA' },
    'heavy showers':       { Icon: WiStormShowers,   color: '#2563EB' },
    'snow showers':        { Icon: WiSleet,          color: '#BAE6FD' },
    'heavy snow showers':  { Icon: WiSnowflakeCold,  color: '#7DD3FC' },
    'thunderstorm':        { Icon: WiThunderstorm,   color: '#818CF8' },
};

const WeatherIcon: React.FC<WeatherIconProps> = ({ condition, size = 64, className = '' }) => {
    const { Icon, color } = CONDITION_MAP[condition.toLowerCase()] ?? { Icon: WiCloudy, color: '#94A3B8' };
    return <Icon size={size} color={color} className={className} />;
};

export default WeatherIcon;
