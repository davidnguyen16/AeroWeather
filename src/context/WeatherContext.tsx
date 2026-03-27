'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface WeatherContextType {
  latitude: number | null;
  longitude: number | null;
  cityName: string;
  isLoadingLocation: boolean;
  locationError: string | null;
  setSearchedCity: (latitude: number, longitude: number, name: string) => void;
  clearSearch: () => void;
  requestCurrentLocation: () => void;
}

const WeatherContext = createContext<WeatherContextType | null>(null);

export function WeatherProvider({ children }: { children: React.ReactNode }) {
  const [searchedCity, setSearchedCityState] = useState<{
    latitude: number;
    longitude: number;
    cityName: string;
  } | null>(null);
  const [geoCoords, setGeoCoords] = useState<{ latitude: number; longitude: number } | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const requestCurrentLocation = useCallback(() => {
    if (!('geolocation' in navigator)) {
      setLocationError('Geolocation is not supported by your browser');
      return;
    }
    setIsLoadingLocation(true);
    setLocationError(null);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setGeoCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setIsLoadingLocation(false);
      },
      (error) => {
        setLocationError(error.message);
        setIsLoadingLocation(false);
      }
    );
  }, []);

  useEffect(() => {
    if (!('geolocation' in navigator)) return;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setGeoCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        setLocationError(error.message);
      }
    );
  }, []);

  const setSearchedCity = useCallback((latitude: number, longitude: number, cityName: string) => {
    setSearchedCityState({ latitude, longitude, cityName });
  }, []);

  const clearSearch = useCallback(() => {
    setSearchedCityState(null);
  }, []);

  const latitude = searchedCity?.latitude ?? geoCoords?.latitude ?? null;
  const longitude = searchedCity?.longitude ?? geoCoords?.longitude ?? null;
  const cityName = searchedCity?.cityName ?? (geoCoords ? 'Current Location' : '');

  return (
    <WeatherContext.Provider
      value={{
        latitude,
        longitude,
        cityName,
        isLoadingLocation,
        locationError,
        setSearchedCity,
        clearSearch,
        requestCurrentLocation,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeather() {
  const context = useContext(WeatherContext);
  if (!context) throw new Error('useWeather must be used within WeatherProvider');
  return context;
}
