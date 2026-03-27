'use client';

import { WeatherProvider } from '../context/WeatherContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  return <WeatherProvider>{children}</WeatherProvider>;
}
