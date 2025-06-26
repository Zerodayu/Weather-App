"use server";
import { WeatherData } from "@/types/weather";

export async function getWeatherData(city: string): Promise<{
    data?: WeatherData,
    error?: string
}> {
    try {
        if (!city.trim()) {
            return { error: "City name cannot be empty." };
        }
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.OPENWEATHER_API_KEY}`);
        if (!res.ok) {
            return { error: "City not found" };
        }

        const data = await res.json();
        return { data };
    } catch (error) {
        console.error(error);
        return {}
    }
}