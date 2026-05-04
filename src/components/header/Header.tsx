"use client";
import React, { useState, useEffect } from 'react';
import { Poppins } from 'next/font/google';
import { FaSearch } from 'react-icons/fa';
import { TbCurrentLocation } from "react-icons/tb";
import { MdLocationOn } from "react-icons/md";
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['800'],
});
interface CityResult {
  id: number;
  name: string;
  country: string;
  admin1?: string; 
}
interface HeaderProps {
  onCurrentLocation?: () => void;
  onCitySelected?: (cityName: string) => void;
  isLightMode: boolean;
  onToggleTheme: () => void;
}

export default function Header({ 
  onCurrentLocation, 
  onCitySelected,
  isLightMode,
  onToggleTheme
}: HeaderProps) {

  const [query, setQuery] = useState(""); 
  const [results, setResults] = useState<CityResult[]>([]); 
  const [isFocused, setIsFocused] = useState(false);
  const [isSearching, setIsSearching] = useState(false); 
  useEffect(() => {
    if (query.trim().length < 1) {
      setResults([]);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setIsSearching(true);

      try {
        const res = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=20&language=en&format=json`
        );

        const data = await res.json();

        if (data.results) {
          setResults(data.results);
        } else {
          setResults([]); 
        }
      } catch (error) {
        console.error("Error fetching cities:", error);
      } finally {
        setIsSearching(false); 
      }
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [query]);
  return (
    <header className="w-full flex items-center pt-[20px] pl-[7.2%]">

      {/* 1. SWITCH MODE */}
      <div className={`flex flex-col items-center relative z-0`}>
        <div 
          onClick={onToggleTheme}
          className={`w-[70px] h-[30px] bg-[#D9D9D9] rounded-full relative cursor-pointer shadow-[2px_4px_10px_rgba(0,0,0,0.3)] ${isLightMode ? 'border-1 border-black' : 'border border-transparent'}`}
        >
          <div 
            className={`w-[20px] h-[20px] bg-[#111111] rounded-full shadow-[2px_2px_5px_rgba(0,0,0,0.5)] absolute top-[5px] transition-all duration-300 ${
              isLightMode ? 'left-[46px]' : 'left-[4px]'
            }`}
          >
          </div>
        </div>

        <span 
          className={`absolute top-full mt-1 text-[12px] ${
            isLightMode ? 'text-[#292929]' : 'text-white'
          } ${poppins.className}`}
        >
          {isLightMode ? 'Light Mode' : 'Dark Mode'}
        </span>
      </div>

      {/* 2. SEARCH BAR */}
      <div className="relative ml-[12.9%] w-[50%] z-50">
        <div className={`
          w-full h-[40px] ${isLightMode ? 'bg-[#D9D9D9]' : 'bg-[#444444]'}
          flex items-center pl-[20px] pr-6
          shadow-[4px_6px_15px_rgba(0,0,0,0.4)] transition-all duration-200
          ${isFocused && query.length >= 1 
            ? `rounded-t-[20px] border-b ${isLightMode ? 'border-[#bdbdbd]' : 'border-[#555]'}` 
            : 'rounded-[30px]'
          }
        `}>
          <FaSearch 
            className={`${isLightMode ? 'text-[#292929]' : 'text-gray-200'} text-[20px] mr-[13px]`} 
          />

          <input 
            type="text" 
            value={query}
            autoComplete="off"
            spellCheck="false"
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)} 
            placeholder="Search for your preffered city..." 
            style={{ color: isLightMode ? '#292929' : 'white' }}
            className={`w-full h-full bg-transparent outline-none border-none text-[20px] font-medium ${
              isLightMode ? 'placeholder-gray-600' : 'placeholder-gray-400'
            }`}
          />
        </div>

        {/* DROPDOWN */}
        {isFocused && query.length >= 1 && (
          <div 
            className={`absolute top-full left-0 w-full rounded-b-[20px] shadow-[4px_10px_20px_rgba(0,0,0,0.6)] max-h-[300px] overflow-y-auto flex flex-col py-2 ${
              isLightMode ? 'bg-[#D9D9D9]' : 'bg-[#444444]'
            }`}
          >

            {isSearching && (
               <div className={`px-5 py-4 text-center text-sm italic ${
                isLightMode ? 'text-[#292929]' : 'text-gray-400'
               }`}>
                Searching world map...
               </div>
            )}

            {!isSearching && results.length > 0 && (
              results.map((item) => (
                <div 
                  key={item.id}
                  className={`px-5 py-3 flex items-center gap-3 cursor-pointer transition-colors ${
                    isLightMode 
                      ? 'hover:bg-[#cfcfcf] text-[#292929]' 
                      : 'hover:bg-[#555555] text-white'
                  }`}
                  onClick={() => {
                    const fullCityName = item.name;
                    setQuery(fullCityName);
                    setIsFocused(false);
                    onCitySelected?.(fullCityName);
                  }}
                >
                  <MdLocationOn 
                    className={`${isLightMode ? 'text-[#292929]' : 'text-gray-400'} text-xl flex-shrink-0`} 
                  />

                  <span className="flex flex-col leading-tight">
                    <span className={`font-bold text-[16px] ${
                      isLightMode ? 'text-[#292929]' : 'text-white'
                    }`}>
                      {item.name}
                    </span>

                    <span className={`text-[12px] ${
                      isLightMode ? 'text-[#292929]' : 'text-gray-400'
                    }`}>
                      {item.admin1 ? `${item.admin1}, ` : ''}{item.country}
                    </span>
                  </span>
                </div>
              ))
            )}

            {!isSearching && results.length === 0 && (
              <div className={`px-5 py-4 text-center text-sm italic ${
                isLightMode ? 'text-[#292929]' : 'text-gray-400'
              }`}>
                No cities found
              </div>
            )}
          </div>
        )}
      </div>

      {/* 3. CURRENT LOCATION */}
      <button 
        onClick={onCurrentLocation}
        className="ml-[12.8%] w-fit px-5 h-[40px] bg-[#4CBB17] hover:bg-[#3D9612] transition-colors duration-200 border-none outline-none cursor-pointer items-center justify-center rounded-[30px] flex text-[14px] whitespace-nowrap shadow-[4px_6px_15px_rgba(0,0,0,0.4)]"
      >
        <TbCurrentLocation className="text-white text-[18px] mr-[4px]"/>
        <span className={`text-white ${poppins.className}`}>
          Current Location
        </span>
      </button>

    </header>
  );
}