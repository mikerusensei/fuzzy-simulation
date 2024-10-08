const key = process.env.PARCEL_WEATHER_API;
const lat = 14.865350
const lon = 120.957100

const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`


export async function getData(){
    const result = await fetch(url);
    const data = await result.json();

    return data;
}
