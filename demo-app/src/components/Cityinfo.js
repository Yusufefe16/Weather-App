import { useCity } from "../context/haftalıkContext";
import React from "react";

function Cityinfo() {
  const { minTemp,maxTemp, rain, humidity, xx, wind,gun } = useCity();

  const days = [
    "Pazar",
    "Pazartesi",
    "Salı",
    "Çarşamba",
    "Perşembe",
    "Cuma",
    "Cumartesi",
  ];
  const currentDay = days[new Date().getDay()];

  return (
    <div
      className="container  rounded mt-4"
      style={{ backgroundColor: "#5585b5" }}
    >
      <div class="row justify-content-start">
        <span
          class="col-7 border  rounded p-4 d-flex flex-row justify-content-between align-items-center "
          style={{ backgroundColor: "#bbe4e9" }}
        >
          <div>
            {xx[gun] === "Clear" ? (
              <img
                src="https://cdn-icons-png.flaticon.com/512/869/869869.png"
                alt="Güneşli"
                style={{ height: "85px" }}
              />
            ) : xx[gun] === "Clouds" ? (
              <img
                src="https://cdn-icons-png.flaticon.com/512/414/414825.png"
                alt="Bulutlu"
                style={{ height: "85px" }}
              />
            ) : xx[gun] === "Rain" ? (
              <img
                src="https://cdn-icons-png.flaticon.com/512/3351/3351979.png"
                alt="Yağmurlu"
                style={{ height: "85px" }}
              />
            ) : null}
          </div>
          <div className="ms-4 justify-content-start ">
            <h4>{minTemp[gun]}°C - {maxTemp[gun]}°C</h4>
          </div>

          <div className="d-flex flex-column ">
            <h5 style={{ fontSize: "12px" }}>Yağış: {rain[gun]}%</h5>
            <br/>
            <h5 style={{ fontSize: "12px" }}>Nem: {humidity[gun]}</h5>
            <br/>
            <h5 style={{ fontSize: "12px" }}>Rüzgar: {wind[gun]}</h5>
          </div>
        </span>

        <div class="col-2" style={{ backgroundColor: "#5585b5" }}></div>
        <div
          class="col-3 border rounded p-4 d-flex justify-content-end"
          style={{ backgroundColor: "#bbe4e9" }}
        >
          <div className="d-flex flex-column text-end">
            <h2>Hava durumu</h2>
            <h3>{currentDay}</h3>
            <h5>{xx[gun] === "Clear" ? "Güneşli": xx[gun] === "Clouds" ? "Bulutlu": "Yağmurlu"}</h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cityinfo;
