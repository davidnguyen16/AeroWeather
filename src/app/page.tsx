"use client";

import { useState } from "react";
import Header from "../components/header/Header";
import LocationTimeCard from "../components/current_weather/LocationTimeCard";
import WeatherWidget from "../components/current_weather/WeatherWidget";
import ForecastCard from "../components/forecast/ForecastCard";
import HourlyForecastCard from "../components/hourly/HourlyForecastCard";

export default function Home() {
  const [currentLocationTrigger, setCurrentLocationTrigger] = useState(0);
  const [searchedCity, setSearchedCity] = useState<string | null>(null);
  const [displayCity, setDisplayCity] = useState<string>('Sydney, Australia');
  const [displayTimezone, setDisplayTimezone] = useState<string>('UTC');

  const handleCurrentLocation = () => {
    setCurrentLocationTrigger(prev => prev + 1);
  };

  const handleCitySelected = (cityName: string) => {
    setSearchedCity(cityName);
  };

  const handleWeatherUpdate = (cityName: string, timezone: string) => {
    setDisplayCity(cityName);
    setDisplayTimezone(timezone);
  };

  return (
    <main className="min-h-screen bg-[#222222]">
      <div className="max-w-[1400px] mx-auto px-8 flex flex-col pt-8 pb-[24px]">
        <Header 
          onCurrentLocation={handleCurrentLocation}
          onCitySelected={handleCitySelected}
        />
        <div className="flex justify-center mt-[40px] gap-[30px]">
          <div className="flex flex-col gap-[30px]">
            <LocationTimeCard 
              cityName={displayCity}
              timezone={displayTimezone}
            />
            <ForecastCard
              unit="metric"
              currentLocationTrigger={currentLocationTrigger}
              searchedCity={searchedCity}
            />
          </div>
          <div className="flex flex-col gap-[30px]">
            <WeatherWidget
              unit="metric"
              currentLocationTrigger={currentLocationTrigger}
              searchedCity={searchedCity}
              onWeatherUpdate={handleWeatherUpdate}
            />
            <HourlyForecastCard
              unit="metric"
              currentLocationTrigger={currentLocationTrigger}
              searchedCity={searchedCity}
            />
          </div>
        </div>
      </div>
    </main>
  );
}