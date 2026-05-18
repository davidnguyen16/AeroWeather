import type { Unit, WeatherData, ForecastDay, HourlyForecast } from '@/types/weather';
import { WMO_MAP } from '@/utils/weatherCodes';
import { formatTime } from '@/utils/formatTime';

export const fetchWeatherByCoords = async (
    lat: number,
    lon: number,
    unit: Unit = 'metric'
): Promise<WeatherData> => {
    const tempUnit = unit === 'metric' ? 'celsius' : 'fahrenheit';

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
        fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`),
    ]);

    if (!weatherRes.ok) throw new Error('Failed to fetch weather data');
    const data = await weatherRes.json();
    const geoData = await geoRes.json();

    const timezone = data.timezone || 'UTC';
    const city =
        geoData?.address?.city ||
        geoData?.address?.town ||
        geoData?.address?.village ||
        geoData?.address?.county ||
        'Unknown Location';
    const country = geoData?.address?.country || 'Unknown';

    const current = data.current;
    const daily = data.daily;
    const mapped = WMO_MAP[current.weather_code as number] ?? { condition: 'Unknown', icon: '01d' };

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
        cityName: `${city}, ${country}`,
        timezone,
    };
};

export const fetchWeatherByCity = async (
    cityName: string,
    unit: Unit = 'metric'
): Promise<WeatherData> => {
    const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`
    );
    if (!geoRes.ok) throw new Error('Geocoding failed');
    const geoData = await geoRes.json();
    if (!geoData.results || geoData.results.length === 0) {
        throw new Error(`City "${cityName}" not found`);
    }
    const { latitude, longitude, name, country } = geoData.results[0];
    const weatherData = await fetchWeatherByCoords(latitude, longitude, unit);
    return {
        ...weatherData,
        cityName: country ? `${name}, ${country}` : name,
    };
};

export const fetchForecastByCoords = async (
    lat: number,
    lon: number,
    unit: Unit = 'metric'
): Promise<ForecastDay[]> => {
    const tempUnit = unit === 'metric' ? 'celsius' : 'fahrenheit';
    const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?` +
        `latitude=${lat}&longitude=${lon}` +
        `&daily=temperature_2m_max,temperature_2m_min,weather_code` +
        `&temperature_unit=${tempUnit}` +
        `&timezone=auto` +
        `&forecast_days=6`
    );
    if (!res.ok) throw new Error('Failed to fetch forecast data');
    const data = await res.json();
    const daily = data.daily;

    return daily.time.slice(1, 6).map((date: string, i: number) => {
        const idx = i + 1;
        const mapped = WMO_MAP[daily.weather_code[idx] as number] ?? { condition: 'Unknown', icon: '01d' };
        return {
            date,
            tempMax: Math.round(daily.temperature_2m_max[idx]),
            tempMin: Math.round(daily.temperature_2m_min[idx]),
            condition: mapped.condition,
            iconCode: mapped.icon,
        };
    });
};

export const fetchForecastByCity = async (
    cityName: string,
    unit: Unit = 'metric'
): Promise<ForecastDay[]> => {
    const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`
    );
    if (!geoRes.ok) throw new Error('Geocoding failed');
    const geoData = await geoRes.json();
    if (!geoData.results || geoData.results.length === 0) {
        throw new Error(`City "${cityName}" not found`);
    }
    const { latitude, longitude } = geoData.results[0];
    return fetchForecastByCoords(latitude, longitude, unit);
};

export const fetchHourlyByCoords = async (
    lat: number,
    lon: number,
    unit: Unit = 'metric'
): Promise<HourlyForecast[]> => {
    const tempUnit = unit === 'metric' ? 'celsius' : 'fahrenheit';
    const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?` +
        `latitude=${lat}&longitude=${lon}` +
        `&hourly=temperature_2m,weather_code,wind_speed_10m,wind_direction_10m` +
        `&temperature_unit=${tempUnit}` +
        `&wind_speed_unit=${unit === 'metric' ? 'kmh' : 'mph'}` +
        `&timezone=auto` +
        `&forecast_days=2`
    );
    if (!res.ok) throw new Error('Failed to fetch hourly data');
    const data = await res.json();
    const hourly = data.hourly;

    const targetHours = [12, 15, 18, 21, 0];
    const slots: HourlyForecast[] = [];

    for (const targetHour of targetHours) {
        const idx = hourly.time.findIndex((t: string) => new Date(t).getHours() === targetHour);
        if (idx === -1) continue;

        const mapped = WMO_MAP[hourly.weather_code[idx] as number] ?? { condition: 'Unknown', icon: '01d' };
        slots.push({
            time: targetHour.toString().padStart(2, '0') + ':00',
            temp: Math.round(hourly.temperature_2m[idx]),
            condition: mapped.condition,
            iconCode: mapped.icon,
            windSpeed: Math.round(hourly.wind_speed_10m[idx]),
            windDirection: hourly.wind_direction_10m[idx],
            unit,
        });
    }
    return slots;
};

export const fetchHourlyByCity = async (
    cityName: string,
    unit: Unit = 'metric'
): Promise<HourlyForecast[]> => {
    const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`
    );
    if (!geoRes.ok) throw new Error('Geocoding failed');
    const geoData = await geoRes.json();
    if (!geoData.results || geoData.results.length === 0) {
        throw new Error(`City "${cityName}" not found`);
    }
    const { latitude, longitude } = geoData.results[0];
    return fetchHourlyByCoords(latitude, longitude, unit);
};
