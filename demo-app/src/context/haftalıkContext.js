import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import data from "../City/Cities.json";

const CityContext = createContext();

export const CityProvider = ({ children }) => {
  const cities = data.name;
  const [minTemp, setMinTemp] = useState([]);
  const [wind, setwind] = useState([]);
  const [maxTemp, setMaxTemp] = useState([]);
  const [humidity, setHumidity] = useState([]);
  const [rain, setRain] = useState([]);
  const [city, setCity] = useState(localStorage.getItem("city") || "Ankara");
  const [weatherData, setWeatherData] = useState([]);
  const [xx,setX] = useState([]);
  const [gun,setGun] = useState(0);

  useEffect(() => {
    const apiKey = "964e084575afeec500b461a77f6dee92";
    const units = "metric"; // Celsius birimleri

    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;


    axios
      .get(forecastUrl)
      .then((response) => {
        const forecastData = response.data;

        // Haftanın her günü için verileri filtreleyip işleme
        const haftalikHavaDurumu = [];
        const haftalıkminsıcaklık = [];
        const haftalıkmaxsıcaklık = [];
        const haftalikhumidity = [];
        const haftalıkrain = [];
        const haftalikruzgar = [];
        const x = [];

        for (let i = 0; i < 5; i++) {
          let totalRain = 0;
          let averageHumidity = 0;
          let averageWindSpeed = 0;
          let gunlukHavaDurumu = [];
          const gun = new Date();
          gun.setDate(gun.getDate() + i);
          const gunStr = gun.toISOString().slice(0, 10);

          gunlukHavaDurumu = forecastData.list
            .filter((item) => {
              const tarihStr = item.dt_txt.slice(0, 10);
              return tarihStr === gunStr;
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
          gunlukHavaDurumu.forEach((weather) => {
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
          console.log(
            `Yarınki en sık görülen hava durumu: ${mostCommonWeather}`
          );
          

          const minTemp = Math.min(
            ...gunlukHavaDurumu.map((item) => item.temperature)
          );

          const maxTemp = Math.max(
            ...gunlukHavaDurumu.map((item) => item.temperature)
          );

          console.log(`Yarının en düşük sıcaklığı: ${minTemp}°C`);
          console.log(`Yarının en yüksek sıcaklığı: ${maxTemp}°C`);

          averageHumidity = (
            gunlukHavaDurumu.reduce((sum, item) => sum + item.humidity, 0) /
            gunlukHavaDurumu.length
          ).toFixed(2);

          totalRain = gunlukHavaDurumu
            .reduce((sum, item) => sum + item.rain, 0)
            .toFixed(2);

          averageWindSpeed = (
            gunlukHavaDurumu.reduce((sum, item) => sum + item.windSpeed, 0) /
            gunlukHavaDurumu.length
          ).toFixed(2);
          console.log(" rüzgar",averageWindSpeed);
          console.log(`Yarının ortalama nem oranı: ${humidity[1]}%`);
          console.log(`Yarının toplam yağış miktarı: ${rain[1]}mm`);

          haftalikHavaDurumu.push(gunlukHavaDurumu);
          haftalıkminsıcaklık.push(minTemp);
          haftalıkmaxsıcaklık.push(maxTemp);
          haftalikhumidity.push(averageHumidity);
          haftalıkrain.push(totalRain);
          haftalikruzgar.push(averageWindSpeed);
          x.push(mostCommonWeather);
        }

        setWeatherData(haftalikHavaDurumu);
        setMinTemp(haftalıkminsıcaklık);
        setMaxTemp(haftalıkmaxsıcaklık);
        setHumidity(haftalikhumidity);
        setwind(haftalikruzgar);
        setRain(haftalıkrain);
        setX(x);
      })
      .catch((error) => {
        console.error("Hava durumu tahmini alınamadı:", error);
      });
  }, [city]);

  const values = {
    city,
    setCity,
    cities,
    minTemp,
    maxTemp,
    humidity,
    rain,
    weatherData,
    xx,
    setX,
    wind,
    setwind,
    gun,
    setGun
  };

  return <CityContext.Provider value={values}>{children}</CityContext.Provider>;
};

export const useCity = () => useContext(CityContext);
