import Header from "../components/Header"; // 1. Import component vào
import LocationTimeCard from "../components/current_weather/LocationTimeCard"; // 2. Import component vào
import WeatherDetailCard from "../components/current_weather/WeatherDetailCard"; // 3. Import component vào
export default function Home() {
  return (
    <main className="min-h-screen bg-[#222222]">

      <div className="max-w-[1400px] mx-auto px-8 flex flex-col pt-8"> 
        <Header />
        <div className="flex justify-center mt-[60px] gap-[30px]">
          <LocationTimeCard />
          <WeatherDetailCard />
        </div>
      </div>
    </main>
  );
}