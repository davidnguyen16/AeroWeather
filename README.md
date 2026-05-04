<!-- PROJECT SHIELDS -->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![Unlicense License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/your_username/AeroWeather">
    <img src="public/globe.svg" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">AeroWeather</h3>

  <p align="center">
    A sleek, real-time weather application with city search, geolocation, hourly & 5-day forecasts, and dark/light mode — all powered by free APIs with zero setup required.
    <br />
    <a href="https://github.com/your_username/AeroWeather"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/your_username/AeroWeather">View Demo</a>
    &middot;
    <a href="https://github.com/your_username/AeroWeather/issues/new?labels=bug">Report Bug</a>
    &middot;
    <a href="https://github.com/your_username/AeroWeather/issues/new?labels=enhancement">Request Feature</a>
  </p>
</div>

---

## Table of Contents

- [About The Project](#about-the-project)
- [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Reference](#api-reference)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgments](#acknowledgments)

---

## About The Project

![AeroWeather Screenshot](public/screenshot.png)

AeroWeather is a modern, full-featured weather application that gives you instant access to real-time weather data for any location in the world. Whether you want to check the current conditions outside your window or plan a trip weeks ahead, AeroWeather has you covered.

**Why AeroWeather?**

- **Zero API key setup** — powered entirely by free, open APIs (Open-Meteo & OpenStreetMap). Clone it and run it immediately.
- **Real-time geolocation** — one click to detect your current location and pull weather instantly.
- **Rich data display** — current conditions, a 5-day forecast, and fixed hourly time slots (12:00, 15:00, 18:00, 21:00, 00:00) with wind direction arrows.
- **Live local clock** — the clock in the location card ticks in real time in the searched city's correct timezone.
- **Dark & Light mode** — a polished toggle that themes every card and element across the entire UI.
- **Intelligent city search** — autocomplete backed by the Open-Meteo Geocoding API, not a static list.

<p align="right">(<a href="#table-of-contents">back to top</a>)</p>

---

## Built With

| Category | Technology |
|----------|-----------|
| Framework | [![Next.js][Next.js]][Next-url] |
| UI Library | [![React][React.js]][React-url] |
| Language | [![TypeScript][TypeScript]][TypeScript-url] |
| Styling | [![Tailwind CSS][TailwindCSS]][Tailwind-url] |
| Icons | [![Lucide][Lucide]][Lucide-url] |
| Weather Data | [![Open-Meteo][OpenMeteo]][OpenMeteo-url] |
| Geocoding | [![Nominatim][Nominatim]][Nominatim-url] |

<p align="right">(<a href="#table-of-contents">back to top</a>)</p>

---

## Getting Started

Follow these steps to get a local copy up and running in under two minutes.

### Prerequisites

You need **Node.js 18+** and **npm** installed on your machine.

- Check your Node version:
  ```sh
  node -v
  ```
- Update npm to the latest version:
  ```sh
  npm install npm@latest -g
  ```

### Installation

> **No API keys are required.** AeroWeather uses fully free, open APIs.

1. **Clone the repository**
   ```sh
   git clone https://github.com/your_username/AeroWeather.git
   ```

2. **Navigate into the project folder**
   ```sh
   cd AeroWeather
   ```

3. **Install dependencies**
   ```sh
   npm install
   ```

4. **Start the development server**
   ```sh
   npm run dev
   ```

5. **Open the app**

   Navigate to [http://localhost:3000](http://localhost:3000) in your browser. That's it — no environment variables, no configuration files.

6. **(Optional) Change the git remote to your own fork**
   ```sh
   git remote set-url origin https://github.com/your_username/AeroWeather.git
   git remote -v   # confirm the change
   ```

<p align="right">(<a href="#table-of-contents">back to top</a>)</p>

---

## Usage

### Search a City
Type any city name into the search bar in the header. A dropdown will appear with matching results powered by the Open-Meteo Geocoding API. Click a result to load its weather instantly.

### Use Your Current Location
Click the green **"Current Location"** button in the header. Your browser will ask for permission to access your location. Once granted, AeroWeather will reverse-geocode your coordinates and display the local weather.

> If geolocation is denied by the browser, the app falls back to **Hanoi, Vietnam** as the default location.

### Toggle Dark / Light Mode
Click the theme toggle button in the top-right of the header to switch between dark and light mode. The entire UI — cards, backgrounds, icons — transitions instantly.

### Reading the Weather Cards

| Card | What it shows |
|------|---------------|
| **Location & Time** | City name + a live clock in the city's local timezone |
| **Current Weather** | Temperature, feels-like, condition, humidity, wind speed, pressure, UV index, sunrise & sunset |
| **5-Day Forecast** | Daily max temperature and weather icon for the next 5 days |
| **Hourly Forecast** | Weather icon, temperature, wind arrow and speed at 12:00, 15:00, 18:00, 21:00, and 00:00 |

<p align="right">(<a href="#table-of-contents">back to top</a>)</p>

---

## Project Structure

```
AeroWeather/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Root page — state management hub
│   │   ├── layout.tsx            # Root layout (fonts, metadata)
│   │   └── globals.css           # Tailwind directives + global CSS
│   │
│   ├── components/
│   │   ├── header/
│   │   │   └── Header.tsx        # Search bar, theme toggle, location button
│   │   │
│   │   ├── current_weather/
│   │   │   ├── WeatherWidget.tsx      # Fetches and orchestrates current weather
│   │   │   ├── WeatherDetailCard.tsx  # Displays all current weather metrics
│   │   │   └── LocationTimeCard.tsx   # Live clock + city name display
│   │   │
│   │   ├── forecast/
│   │   │   └── ForecastCard.tsx       # 5-day forecast grid
│   │   │
│   │   ├── hourly/
│   │   │   └── HourlyForecastCard.tsx # Hourly forecast with wind arrows
│   │   │
│   │   └── weather_api/
│   │       └── WeatherAPI.tsx         # All API call functions + type definitions
│   │
│   └── data/
│       └── cities.ts             # Static list of 87 world cities (fallback)
│
├── public/                       # Static assets (SVGs, favicon)
├── package.json
├── tsconfig.json                 # TypeScript config (strict mode, path aliases)
├── next.config.ts                # Next.js config (React Compiler enabled)
├── postcss.config.mjs            # PostCSS / Tailwind config
└── eslint.config.mjs             # ESLint rules
```

### Data Flow

```
page.tsx  (state: isLightMode, searchedCity, displayCity, displayTimezone)
    │
    ├──▶ Header.tsx
    │       ├── Search input → Open-Meteo Geocoding API → city dropdown
    │       ├── Location button → browser Geolocation API
    │       └── Theme toggle → isLightMode state
    │
    ├──▶ LocationTimeCard.tsx
    │       └── Renders city name + live ticking clock (updates every 1s)
    │
    ├──▶ WeatherWidget.tsx  →  WeatherAPI.tsx  →  Open-Meteo Forecast API
    │       └── WeatherDetailCard.tsx (renders fetched data)
    │
    ├──▶ ForecastCard.tsx   →  WeatherAPI.tsx  →  Open-Meteo Forecast API
    │
    └──▶ HourlyForecastCard.tsx  →  WeatherAPI.tsx  →  Open-Meteo Forecast API
```

<p align="right">(<a href="#table-of-contents">back to top</a>)</p>

---

## API Reference

AeroWeather is powered by **three fully free, no-auth APIs**:

### 1. Open-Meteo Forecast API
Used for current weather, 5-day forecast, and hourly data.

```
GET https://api.open-meteo.com/v1/forecast
```

Key parameters used:

| Parameter | Description |
|-----------|-------------|
| `latitude`, `longitude` | Target coordinates |
| `current` | `temperature_2m`, `weather_code`, `wind_speed_10m`, `relative_humidity_2m`, `surface_pressure`, `uv_index`, `apparent_temperature`, `sunrise`, `sunset` |
| `daily` | `weather_code`, `temperature_2m_max`, `temperature_2m_min` |
| `hourly` | `temperature_2m`, `weather_code`, `wind_speed_10m`, `wind_direction_10m` |
| `temperature_unit` | `celsius` or `fahrenheit` |
| `timezone` | `auto` (resolved from coordinates) |

### 2. Open-Meteo Geocoding API
Used to convert a city name to coordinates.

```
GET https://geocoding-api.open-meteo.com/v1/search?name=Tokyo&count=5&language=en&format=json
```

### 3. Nominatim Reverse Geocoding (OpenStreetMap)
Used to convert coordinates (from geolocation) back to a readable city name.

```
GET https://nominatim.openstreetmap.org/reverse?lat={lat}&lon={lon}&format=json
```

### WMO Weather Code Mapping

AeroWeather maps standard WMO weather codes to human-readable conditions and icons:

| Code Range | Condition |
|------------|-----------|
| `0` | Clear sky |
| `1 – 3` | Mainly clear → Overcast |
| `45, 48` | Fog / Icy fog |
| `51 – 57` | Drizzle (light → freezing) |
| `61 – 67` | Rain (slight → heavy / freezing) |
| `71 – 77` | Snow (slight → heavy / grains) |
| `80 – 82` | Rain showers |
| `85, 86` | Snow showers |
| `95` | Thunderstorm |
| `96, 99` | Thunderstorm with hail |

<p align="right">(<a href="#table-of-contents">back to top</a>)</p>

---

## Roadmap

- [x] Current weather display (temp, humidity, wind, UV, pressure)
- [x] 5-day forecast card
- [x] Hourly forecast with wind direction arrows
- [x] City search with autocomplete
- [x] Geolocation support
- [x] Dark / Light mode
- [x] Live local timezone clock
- [ ] Celsius / Fahrenheit unit toggle in UI
- [ ] Persistent theme preference (localStorage)
- [ ] Air quality index display
- [ ] Weather alerts / warnings
- [ ] PWA support (installable on mobile)
- [ ] Animated weather backgrounds
- [ ] Multiple saved locations / favorites

See the [open issues](https://github.com/your_username/AeroWeather/issues) for a full list of proposed features and known issues.

<p align="right">(<a href="#table-of-contents">back to top</a>)</p>

---

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make AeroWeather better, please fork the repo and create a pull request. You can also open an issue with the tag `enhancement`. Don't forget to give the project a star — it means a lot!

1. **Fork** the repository
2. **Create** your feature branch
   ```sh
   git checkout -b feature/AmazingFeature
   ```
3. **Commit** your changes
   ```sh
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push** to the branch
   ```sh
   git push origin feature/AmazingFeature
   ```
5. **Open** a Pull Request

<p align="right">(<a href="#table-of-contents">back to top</a>)</p>

---

## License

Distributed under the **MIT License**. See `LICENSE.txt` for more information.

<p align="right">(<a href="#table-of-contents">back to top</a>)</p>

---

## Contact

Your Name — [@your_twitter](https://twitter.com/your_twitter) — email@example.com

Project Link: [https://github.com/your_username/AeroWeather](https://github.com/your_username/AeroWeather)

<p align="right">(<a href="#table-of-contents">back to top</a>)</p>

---

## Acknowledgments

Resources and tools that made this project possible:

- [Open-Meteo](https://open-meteo.com/) — Free weather API, no key required
- [Nominatim / OpenStreetMap](https://nominatim.openstreetmap.org/) — Free reverse geocoding
- [Lucide React](https://lucide.dev/) — Beautiful, consistent icon library
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework
- [Next.js](https://nextjs.org/) — The React framework for the web
- [WMO Weather Codes](https://open-meteo.com/en/docs) — Standard weather code definitions
- [Img Shields](https://shields.io/) — Badges for README
- [Choose an Open Source License](https://choosealicense.com/)
- [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
- [Best-README-Template](https://github.com/othneildrew/Best-README-Template) — Inspiration for this README

<p align="right">(<a href="#table-of-contents">back to top</a>)</p>

---

<!-- MARKDOWN LINKS & IMAGES -->
[contributors-shield]: https://img.shields.io/github/contributors/your_username/AeroWeather.svg?style=for-the-badge
[contributors-url]: https://github.com/your_username/AeroWeather/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/your_username/AeroWeather.svg?style=for-the-badge
[forks-url]: https://github.com/your_username/AeroWeather/network/members
[stars-shield]: https://img.shields.io/github/stars/your_username/AeroWeather.svg?style=for-the-badge
[stars-url]: https://github.com/your_username/AeroWeather/stargazers
[issues-shield]: https://img.shields.io/github/issues/your_username/AeroWeather.svg?style=for-the-badge
[issues-url]: https://github.com/your_username/AeroWeather/issues
[license-shield]: https://img.shields.io/github/license/your_username/AeroWeather.svg?style=for-the-badge
[license-url]: https://github.com/your_username/AeroWeather/blob/main/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/your_linkedin

[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[TypeScript]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[TailwindCSS]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[Tailwind-url]: https://tailwindcss.com/
[Lucide]: https://img.shields.io/badge/Lucide-F56565?style=for-the-badge&logo=lucide&logoColor=white
[Lucide-url]: https://lucide.dev/
[OpenMeteo]: https://img.shields.io/badge/Open--Meteo-00BFFF?style=for-the-badge&logo=cloud&logoColor=white
[OpenMeteo-url]: https://open-meteo.com/
[Nominatim]: https://img.shields.io/badge/Nominatim-7EBC6F?style=for-the-badge&logo=openstreetmap&logoColor=white
[Nominatim-url]: https://nominatim.openstreetmap.org/