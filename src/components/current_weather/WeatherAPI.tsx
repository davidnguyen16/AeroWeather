// WeatherAPI.tsx
// Dùng Open-Meteo — free, không cần API key
// Nhận lat/lon trực tiếp từ Geolocation API

export interface WeatherData {
    temp: number;
    feelsLike: number;
    condition: string;
    iconCode: string;
    humidity: number;
    windSpeed: number;
    pressure: number;
    uvi: number;
    sunrise: string;
    sunset: string;
    unit: 'metric' | 'imperial';
    cityName: string;   // ✅ City, Country format
    timezone: string;   // ✅ IANA timezone
}

const WMO_MAP: Record<number, { condition: string; icon: string }> = {
    0:  { condition: 'Clear',              icon: '01d' },
    1:  { condition: 'Mostly Clear',       icon: '01d' },
    2:  { condition: 'Partly Cloudy',      icon: '02d' },
    3:  { condition: 'Overcast',           icon: '04d' },
    45: { condition: 'Foggy',             icon: '50d' },
    48: { condition: 'Foggy',             icon: '50d' },
    51: { condition: 'Drizzle',           icon: '09d' },
    53: { condition: 'Drizzle',           icon: '09d' },
    55: { condition: 'Drizzle',           icon: '09d' },
    61: { condition: 'Rain',              icon: '10d' },
    63: { condition: 'Rain',              icon: '10d' },
    65: { condition: 'Heavy Rain',        icon: '10d' },
    71: { condition: 'Snow',              icon: '13d' },
    73: { condition: 'Snow',              icon: '13d' },
    75: { condition: 'Heavy Snow',        icon: '13d' },
    77: { condition: 'Snow Grains',       icon: '13d' },
    80: { condition: 'Rain Showers',      icon: '09d' },
    81: { condition: 'Rain Showers',      icon: '09d' },
    82: { condition: 'Heavy Showers',     icon: '09d' },
    85: { condition: 'Snow Showers',      icon: '13d' },
    86: { condition: 'Heavy Snow Showers',icon: '13d' },
    95: { condition: 'Thunderstorm',      icon: '11d' },
    96: { condition: 'Thunderstorm',      icon: '11d' },
    99: { condition: 'Thunderstorm',      icon: '11d' },
};

const formatTime = (isoTime: string): string => {
    const date = new Date(isoTime);
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const h = hours % 12 || 12;
    return `${h.toString().padStart(2, '0')}:${minutes} ${ampm}`;
};

// ✅ Fetch thời tiết từ lat/lon (dùng với Geolocation API)
export const fetchWeatherByCoords = async (
    lat: number,
    lon: number,
    unit: 'metric' | 'imperial' = 'metric'
): Promise<WeatherData> => {
    const tempUnit = unit === 'metric' ? 'celsius' : 'fahrenheit';

    // Fetch weather + reverse geocoding song song
    const [weatherRes, geoRes] = await Promise.all([
        fetch(
            `https://api.open-meteo.com/v1/forecast?` +
            `latitude=${lat}&longitude=${lon}` +
            `&current=temperature_2m,apparent_temperature,relative_humidity_2m,` +
            `wind_speed_10m,surface_pressure,weather_code,uv_index` +
            `&daily=sunrise,sunset` +
            `&temperature_unit=${tempUnit}` +
            `&wind_speed_unit=${unit === 'metric' ? 'kmh' : 'mph'}` +
            `&timezone=auto` +
            `&forecast_days=1`
        ),
        // ✅ Reverse geocoding — lấy tên city từ lat/lon (dùng Open-Meteo geocoding)
        fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
        ),
    ]);

    if (!weatherRes.ok) throw new Error('Failed to fetch weather data');

    const data = await weatherRes.json();
    const geoData = await geoRes.json();

    // Extract timezone from API response
    const timezone = data.timezone || 'UTC';

    // Get city and country from reverse geocoding
    const city =
        geoData?.address?.city ||
        geoData?.address?.town ||
        geoData?.address?.village ||
        geoData?.address?.county ||
        'Unknown Location';
    
    const country = geoData?.address?.country || 'Unknown';
    const cityName = `${city}, ${country}`;

    const current = data.current;
    const daily = data.daily;
    const wmoCode = current.weather_code as number;
    const mapped = WMO_MAP[wmoCode] ?? { condition: 'Unknown', icon: '01d' };

    return {
        temp: current.temperature_2m,
        feelsLike: current.apparent_temperature,
        condition: mapped.condition,
        iconCode: mapped.icon,
        humidity: current.relative_humidity_2m,
        windSpeed: Math.round(current.wind_speed_10m),
        pressure: Math.round(current.surface_pressure),
        uvi: Math.round(current.uv_index ?? 0),
        sunrise: formatTime(daily.sunrise[0]),
        sunset: formatTime(daily.sunset[0]),
        unit,
        cityName,
        timezone,
    };
};
// ✅ Fetch thời tiết từ city name (dùng với search bar)
export const fetchWeatherByCity = async (
    cityName: string,
    unit: 'metric' | 'imperial' = 'metric'
): Promise<WeatherData> => {
    try {
        // Step 1: Geocode city name to get lat/lon
        const geoRes = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`
        );

        if (!geoRes.ok) throw new Error('Geocoding failed');

        const geoData = await geoRes.json();
        if (!geoData.results || geoData.results.length === 0) {
            throw new Error(`City "${cityName}" not found`);
        }

        const { latitude, longitude, name, country } = geoData.results[0];

        // Step 2: Fetch weather data using the coordinates
        const weatherData = await fetchWeatherByCoords(latitude, longitude, unit);
        
        // Override cityName with the searched city name in City, Country format
        const formattedCityName = country ? `${name}, ${country}` : name;
        return {
            ...weatherData,
            cityName: formattedCityName,
        };
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('Failed to fetch weather for the city');
    }
};