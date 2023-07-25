import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Container from "./components/Container";
import { CityProvider } from "./context/haftalıkContext";
import data from "./City/Cities.json";

function App() {
/*   const cities = data.name;
  const [minTemp, setMinTemp] = useState([]);
  const [city, setCity] = useState(localStorage.getItem("city") || "Ankara");

  useEffect(() => {
    const apiKey = "964e084575afeec500b461a77f6dee92";
    const units = "metric"; // Celsius birimleri

    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;

    axios
      .get(forecastUrl)
      .then((response) => {
        const forecastData = response.data;

        // Haftanın her günü için verileri filtreleyip işleme
        const haftalıkminsıcaklık = [];

        for (let i = 0; i < 7; i++) {
          const gun = new Date();
          gun.setDate(gun.getDate() + i);
          const gunStr = gun.toISOString().slice(0, 10);

          const gunlukHavaDurumu = forecastData.list
            .filter((item) => {
              const tarihStr = item.dt_txt.slice(0, 10);
              return tarihStr === gunStr;
            })
            .map((item) => item.main.temp);

          const minTemp = Math.min(...gunlukHavaDurumu);

          haftalıkminsıcaklık.push(minTemp);
        }

        setMinTemp(haftalıkminsıcaklık);
      })
      .catch((error) => {
        console.error("Hava durumu tahmini alınamadı:", error);
      });

      console.log(minTemp[1]);
  }, [city]); */

  return (
    <div className="app">
      <CityProvider>
        <Container />
      </CityProvider>
    </div>
  );
}

export default App;
