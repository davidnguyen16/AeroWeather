<div align="center">

  <h1>⛅ AeroWeather</h1>

  <p>A sleek real-time weather application built with Next.js 16 — no API key, no config, just clone and run.</p>

  <p>
    <img src="https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  </p>

  <p>
    <img src="https://img.shields.io/github/stars/davidnguyen16/AeroWeather?style=for-the-badge&color=FFD700" alt="Stars" />
    <img src="https://img.shields.io/github/forks/davidnguyen16/AeroWeather?style=for-the-badge&color=94A3B8" alt="Forks" />
    <img src="https://img.shields.io/github/issues/davidnguyen16/AeroWeather?style=for-the-badge&color=F87171" alt="Issues" />
    <img src="https://img.shields.io/github/license/davidnguyen16/AeroWeather?style=for-the-badge&color=34D399" alt="License" />
  </p>

  <p>
    <a href="https://github.com/davidnguyen16/AeroWeather"><strong>Explore the code »</strong></a>
    &nbsp;·&nbsp;
    <a href="https://github.com/davidnguyen16/AeroWeather/issues/new?labels=bug">Report a Bug</a>
    &nbsp;·&nbsp;
    <a href="https://github.com/davidnguyen16/AeroWeather/issues/new?labels=enhancement">Request a Feature</a>
  </p>

</div>

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Data Flow](#data-flow)
- [API Reference](#api-reference)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Features

- **Zero setup** — powered entirely by [Open-Meteo](https://open-meteo.com/) and [OpenStreetMap](https://nominatim.openstreetmap.org/). No API key, no `.env` file.
- **Geolocation** — one-click current location detection via the browser Geolocation API; falls back gracefully if denied.
- **Live city search** — autocomplete backed by the Open-Meteo Geocoding API with real-time debounce.
- **Current conditions** — temperature, feels-like, humidity, wind speed + direction, pressure, UV index, sunrise/sunset.
- **5-day forecast** — daily max temperature and weather icon for the next 5 days.
- **Hourly forecast** — fixed time slots (12:00, 15:00, 18:00, 21:00, 00:00) with animated wind arrows.
- **Live local clock** — ticks in real time using the searched city's IANA timezone.
- **Dark / Light mode** — smooth theme toggle applied across every card and element.
- **WMO-accurate icons** — condition icons from the dedicated `react-icons/wi` weather set, colored per condition type.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| UI Library | [React 19](https://react.dev/) |
| Language | [TypeScript 5](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| Icons | [react-icons/wi](https://react-icons.github.io/react-icons/icons/wi/) — WMO weather icon set |
| Weather API | [Open-Meteo](https://open-meteo.com/) — free, no auth |
| Geocoding | [Open-Meteo Geocoding](https://open-meteo.com/en/docs/geocoding-api) |
| Reverse Geocoding | [Nominatim (OpenStreetMap)](https://nominatim.openstreetmap.org/) |

---

## Getting Started

> **No API keys required.** AeroWeather uses fully free, open APIs.

### Prerequisites

- Node.js **18+**
- npm **9+**

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/davidnguyen16/AeroWeather.git
cd AeroWeather

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — that's it.

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Root page — owns all shared state
│   ├── layout.tsx            # Root layout (fonts, metadata)
│   └── globals.css           # Tailwind directives + global CSS
│
├── components/
│   ├── header/
│   │   └── Header.tsx        # Search bar, theme toggle, current location button
│   │
│   ├── weather/              # Current weather section
│   │   ├── WeatherWidget.tsx      # Connects useWeather hook → WeatherDetailCard
│   │   ├── WeatherDetailCard.tsx  # Renders temp, humidity, wind, UV, sunrise/sunset
│   │   └── LocationTimeCard.tsx   # Live ticking clock in local timezone
│   │
│   ├── forecast/
│   │   └── ForecastCard.tsx       # 5-day forecast (useForecast hook)
│   │
│   ├── hourly/
│   │   └── HourlyForecastCard.tsx # Hourly slots with wind arrows (useHourly hook)
│   │
│   └── ui/
│       └── WeatherIcon.tsx        # Centralised WMO condition → react-icons/wi mapping
│
├── hooks/
│   ├── useWeatherData.ts     # Generic hook — geolocation, city search, unit handling
│   ├── useWeather.ts         # Current weather (wraps useWeatherData)
│   ├── useForecast.ts        # 5-day forecast (wraps useWeatherData)
│   └── useHourly.ts          # Hourly forecast (wraps useWeatherData)
│
├── services/
│   └── weatherApi.ts         # All fetch functions (Open-Meteo + Nominatim)
│
├── types/
│   └── weather.ts            # Shared TypeScript interfaces (WeatherData, ForecastDay, …)
│
└── utils/
    ├── weatherCodes.ts       # WMO code → { condition, icon } map
    └── formatTime.ts         # ISO datetime → 12-hour display string
```

---

## Data Flow

```
page.tsx  (state: searchedCity, currentLocationTrigger, displayCity, displayTimezone, isLightMode)
│
├── Header
│     ├── Search input ──► Open-Meteo Geocoding API ──► results dropdown
│     ├── "Current Location" button ──► sets currentLocationTrigger
│     └── Theme toggle ──► isLightMode
│
├── weather/LocationTimeCard
│     └── Intl.DateTimeFormat (local timezone) ──► live clock (1s interval)
│
├── weather/WeatherWidget
│     └── useWeather ──► weatherApi.fetchWeather* ──► Open-Meteo Forecast + Nominatim
│           └── WeatherDetailCard
│
├── forecast/ForecastCard
│     └── useForecast ──► weatherApi.fetchForecast* ──► Open-Meteo Forecast API
│
└── hourly/HourlyForecastCard
      └── useHourly ──► weatherApi.fetchHourly* ──► Open-Meteo Forecast API
```

Each data hook (`useWeather`, `useForecast`, `useHourly`) is a thin wrapper over the generic `useWeatherData<T>` hook, which handles three triggers in isolation: initial geolocation load, city search, and current-location refresh.

---

## API Reference

All three APIs are **free and require no authentication**.

### Open-Meteo Forecast API

```
GET https://api.open-meteo.com/v1/forecast
```

| Parameter | Value used |
|-----------|-----------|
| `latitude`, `longitude` | From geolocation or geocoding |
| `current` | `temperature_2m`, `apparent_temperature`, `relative_humidity_2m`, `wind_speed_10m`, `surface_pressure`, `weather_code`, `uv_index` |
| `daily` | `sunrise`, `sunset`, `temperature_2m_max`, `temperature_2m_min`, `weather_code` |
| `hourly` | `temperature_2m`, `weather_code`, `wind_speed_10m`, `wind_direction_10m` |
| `temperature_unit` | `celsius` or `fahrenheit` |
| `wind_speed_unit` | `kmh` or `mph` |
| `timezone` | `auto` |

### Open-Meteo Geocoding API

```
GET https://geocoding-api.open-meteo.com/v1/search?name={city}&count=20&language=en&format=json
```

### Nominatim Reverse Geocoding

```
GET https://nominatim.openstreetmap.org/reverse?lat={lat}&lon={lon}&format=json
```

### WMO Code Mapping

| Code(s) | Condition |
|---------|-----------|
| `0` | Clear |
| `1` | Mostly Clear |
| `2` | Partly Cloudy |
| `3` | Overcast |
| `45, 48` | Foggy |
| `51 – 55` | Drizzle |
| `61, 63` | Rain |
| `65` | Heavy Rain |
| `71, 73, 77` | Snow / Snow Grains |
| `75` | Heavy Snow |
| `80 – 82` | Rain Showers / Heavy Showers |
| `85, 86` | Snow Showers / Heavy Snow Showers |
| `95, 96, 99` | Thunderstorm |


