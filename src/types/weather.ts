export type Unit = 'metric' | 'imperial';

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
    unit: Unit;
    cityName: string;
    timezone: string;
}

export interface ForecastDay {
    date: string;
    tempMax: number;
    tempMin: number;
    condition: string;
    iconCode: string;
}

export interface HourlyForecast {
    time: string;
    temp: number;
    condition: string;
    iconCode: string;
    windSpeed: number;
    windDirection: number;
    unit: Unit;
}