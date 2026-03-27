"use client";

import { useState } from "react";
import Header from "../components/Header";
import LocationTimeCard from "../components/current_weather/LocationTimeCard";
import WeatherWidget from "../components/current_weather/WeatherWidget";

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
      <div className="max-w-[1400px] mx-auto px-8 flex flex-col pt-8">
        <Header 
          onCurrentLocation={handleCurrentLocation}
          onCitySelected={handleCitySelected}
        />
        <div className="flex justify-center mt-[60px] gap-[30px]">
          <LocationTimeCard 
            cityName={displayCity}
            timezone={displayTimezone}
          />
          <WeatherWidget
            unit="metric"
            currentLocationTrigger={currentLocationTrigger}
            searchedCity={searchedCity}
            onWeatherUpdate={handleWeatherUpdate}
          />
        </div>
      </div>
    </main>
  );
}