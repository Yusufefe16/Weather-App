import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import data from "../City/Cities.json";

const CityContext = createContext();

export const CityProvider = ({ children }) => {
  const cities = data.name;
  const [city, setCity] = useState(localStorage.getItem("city") ||"Ankara");
  const [minTemp, setMinTemp] = useState(null);
  const [maxTemp, setMaxTemp] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [rain, setRain] = useState(null);



  useEffect(() => {
    const apiKey = "964e084575afeec500b461a77f6dee92";
    const units = "metric"; // Celsius units leri

    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;

    axios
      .get(forecastUrl)
      .then((response) => {
        const forecastData = response.data;


        

        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowStr = tomorrow.toISOString().slice(0, 10);

        const tomorrowWeather = forecastData.list
          .filter((item) => {
            const dateStr = item.dt_txt.slice(0, 10);
            return dateStr === tomorrowStr;
          })
          .map((item) => ({
            temperature: item.main.temp,
            humidity: item.main.humidity,
            rain: item.rain ? item.rain["3h"] : 0, // '3h' yağış miktarı 3 saatlik bir süreyi temsil eder
            windSpeed: item.wind.speed,
            mainWeather: item.weather[0].main, // genel hava durumu
            weatherDescription: item.weather[0].description, // hava durumu açıklaması
          }));

        const weatherCounts = {};
        tomorrowWeather.forEach((weather) => {
          if (weatherCounts[weather.mainWeather]) {
            weatherCounts[weather.mainWeather]++;
          } else {
            weatherCounts[weather.mainWeather] = 1;
          }
        });

        // En sık görülen hava durumunu bul
        let maxCount = 0;
        let mostCommonWeather = "";
        for (const weather in weatherCounts) {
          if (weatherCounts[weather] > maxCount) {
            maxCount = weatherCounts[weather];
            mostCommonWeather = weather;
          }
        }
        console.log(`Yarınki en sık görülen hava durumu: ${mostCommonWeather}`);

        const minTemp = Math.min(
          ...tomorrowWeather.map((item) => item.temperature)
        );
        setMinTemp(minTemp);
        const maxTemp = Math.max(
          ...tomorrowWeather.map((item) => item.temperature)
        );
        setMaxTemp(maxTemp);

        console.log(`Yarının en düşük sıcaklığı: ${minTemp}°C`);
        console.log(`Yarının en yüksek sıcaklığı: ${maxTemp}°C`);
        const averageHumidity = (
          tomorrowWeather.reduce((sum, item) => sum + item.humidity, 0) /
          tomorrowWeather.length
        ).toFixed(2);

        setHumidity(averageHumidity);

        const totalRain = tomorrowWeather
          .reduce((sum, item) => sum + item.rain, 0)
          .toFixed(2);

        setRain(totalRain);
        const averageWindSpeed = (
          tomorrowWeather.reduce((sum, item) => sum + item.windSpeed, 0) /
          tomorrowWeather.length
        ).toFixed(2);
        console.log(`Yarının ortalama nem oranı: ${averageHumidity}%`);
        console.log(`Yarının toplam yağış miktarı: ${totalRain}mm`);
        console.log(`Yarının ortalama rüzgar hızı: ${averageWindSpeed}m/s`);
      })
      .catch((error) => {
        console.error("Hava durumu tahmini alınamadı:", error);
      });
  }, [city]);

  const values = {city, setCity, cities,minTemp, maxTemp, humidity,rain };

  return (
    <CityContext.Provider value={values}>{children}</CityContext.Provider>
  );
};

export const useCity = () => useContext(CityContext);
