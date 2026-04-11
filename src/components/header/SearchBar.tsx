'use client'

import React, { useState, useRef, useEffect } from 'react';
import { Poppins } from 'next/font/google';
import cities from '../../data/cities';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '700'],
});

interface SearchBarProps {
    onCitySelect: (cityName: string, timezone: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onCitySelect }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<typeof cities>([]);
    const [isOpen, setIsOpen] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);

        if (value.length > 0) {
            const filtered = cities
                .filter(city => city.name.toLowerCase().includes(value.toLowerCase()))
                .slice(0, 10);
            setSuggestions(filtered);
            setIsOpen(true);
        } else {
            setSuggestions([]);
            setIsOpen(false);
        }
    };

    const handleSelect = (city: typeof cities[0]) => {
        setQuery('');
        setSuggestions([]);
        setIsOpen(false);
        onCitySelect(city.name, city.timezone);
    };

    return (
        <div ref={searchRef} className={`${poppins.className} relative w-[400px]`}>
            <div className="relative">
                <svg
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    placeholder="Search for a city..."
                    className="w-full pl-12 pr-4 py-3 rounded-[15px] bg-[#444444] text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 shadow-[10px_15px_40px_rgba(0,0,0,0.9)]"
                />
            </div>

            {isOpen && suggestions.length > 0 && (
                <ul className="absolute z-50 w-full mt-2 bg-[#3a3a3a] rounded-[15px] shadow-[10px_15px_40px_rgba(0,0,0,0.9)] overflow-hidden">
                    {suggestions.map((city, index) => (
                        <li
                            key={index}
                            onClick={() => handleSelect(city)}
                            className="px-5 py-3 cursor-pointer hover:bg-[#555555] text-white text-[16px] border-b border-[#4a4a4a] last:border-none transition-colors"
                        >
                            {city.name}
                        </li>
                    ))}
                </ul>
            )}

            {isOpen && query.length > 0 && suggestions.length === 0 && (
                <div className="absolute z-50 w-full mt-2 bg-[#3a3a3a] rounded-[15px] shadow-[10px_15px_40px_rgba(0,0,0,0.9)] px-5 py-4 text-gray-400 text-center">
                    No cities found
                </div>
            )}
        </div>
    );
};

export default SearchBar;