"use client";

import { WeatherData } from "@/types/weather";
import { getWeatherData } from "./actions";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { Icons } from "@/ui/icons";

function SearchBtn() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      <h1 className={` ${pending ? 'animate-spin' : ''} text-2xl font-bold text-white`}>
        {pending ? <Icons.Loading /> : <Icons.Search />}
      </h1>
    </button>
  )
}

export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (formData: FormData) => {
   

    const city = formData.get("city") as string;
    const { data, error: weatherError } = await getWeatherData(city);
    console.log(error);

    if (weatherError) {
      setError(weatherError);
      setWeather(null);
    }

    if (data) {
      setWeather(data);
      setError(null);
    }
  }

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: 'url(bg.jpg)' }}>
      <div className="min-h-screen bg-black/30 p-8 text-white flex flex-col items-center">
        <form action={handleSearch} className="flex w-fit rounded-full bg-white/5 backdrop-blur outline-2 outline-white/20 py-2 px-4 gap-4 items-center justify-center ">
          <input  className="border-b-1" name="city" type="text" placeholder="Search City..." />
          <SearchBtn />
        </form>

        {error && (
          <div className="text-red-500 items-center justify-center flex flex-col">
            <p>{error}</p>
          </div>
        )}

        {weather && (
          <div className="flex flex-col w-fit bg-white/5 backdrop-blur rounded-lg outline-2 outline-white/20 p-6 mt-15 items-center justify-center">
            <h2 className="text-3xl font-bold mb-8">{weather.name}</h2>
            <div className="flex items-center justify-center">
              <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} sizes="64"/>
              <p className="text-4xl font-bold">{weather.main.temp}°C</p>
            </div>

            <div className="flex flex-col items-center mb-10">
              <p className="text-lg capitalize opacity-50">{weather.weather[0].description}</p>
            </div>

            <div className="grid grid-cols-3 gap-8 items-center justify-center">
              <div className="flex flex-col items-center">
                <Icons.Humid className="text-2xl" />
                <p className="text-center opacity-50">Humidity: </p>
                <h1>{weather.main.humidity}%</h1>
              </div>

              <div className="flex flex-col items-center">
                <Icons.Temp className="text-2xl" />
                <p className="text-center opacity-50">Feels Like: </p>
                <h1>{weather.main.feels_like} °C</h1>
              </div>

              <div className="flex flex-col items-center">
                <Icons.Wind className="text-2xl" />
                <p className="text-center opacity-50">Wind Speed: </p>
                <h1>{weather.wind.speed} m/s</h1>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
