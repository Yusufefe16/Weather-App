import { useCity } from "../context/haftalıkContext";
import React, { useEffect } from "react";

function Selectday() {
  const { minTemp, maxTemp, gun, setGun,xx,  } = useCity();
  const days = [
    "Pazar",
    "Pazartesi",
    "Salı",
    "Çarşamba",
    "Perşembe",
    "Cuma",
    "Cumartesi",
  ];

  const ucuncugun = days[new Date().getDay() + 2];
  const dorduncugun = days[new Date().getDay() + 3];
  const songun = days[new Date().getDay() + 4];
  useEffect(() => {
    console.log(gun); // state değiştikten sonra log atar
    console.log(xx);
  }, [gun],[xx]);
  return (
    <div className="container text-center mt-4">
      <div className="row">
        <div class="col">
          <button
            onClick={() => {setGun(0); }}
            className="d-flex flex-column align-items-center border rounded"
          >
            <span>Bugün</span>
            {xx[0] === "Clear" ? (
              <img
                src="https://cdn-icons-png.flaticon.com/512/869/869869.png"
                alt="Güneşli"
                style={{ height: "85px" }}
              />
            ) : xx[0] === "Clouds" ? (
              <img
                src="https://cdn-icons-png.flaticon.com/512/414/414825.png"
                alt="Bulutlu"
                style={{ height: "85px" }}
              />
            ) : xx[0] === "Rain" ? (
              <img
                src="https://cdn-icons-png.flaticon.com/512/3351/3351979.png"
                alt="Yağmurlu"
                style={{ height: "85px" }}
              />
            ) : null}
            <span>
              {minTemp[0]}°C - {maxTemp[0]}°C
            </span>
          </button>
        </div>
        <div class="col">
          <button
            className="d-flex flex-column align-items-center border rounded"
            onClick={() => setGun(1)}
          >
            <span>Yarın</span>
            {xx[1] === "Clear" ? (
              <img
                src="https://cdn-icons-png.flaticon.com/512/869/869869.png"
                alt="Güneşli"
                style={{ height: "85px" }}
              />
            ) : xx[1] === "Clouds" ? (
              <img
                src="https://cdn-icons-png.flaticon.com/512/414/414825.png"
                alt="Bulutlu"
                style={{ height: "85px" }}
              />
            ) : xx[1] === "Rain" ? (
              <img
                src="https://cdn-icons-png.flaticon.com/512/3351/3351979.png"
                alt="Yağmurlu"
                style={{ height: "85px" }}
              />
            ) : null}
            <span>
              {minTemp[1]}°C - {maxTemp[1]}°C
            </span>
          </button>
        </div>
        <div class="col">
          <button
            className="d-flex flex-column align-items-center border rounded"
            onClick={() => setGun(2)}
          >
            <span>{ucuncugun}</span>
            {xx[2] === "Clear" ? (
              <img
                src="https://cdn-icons-png.flaticon.com/512/869/869869.png"
                alt="Güneşli"
                style={{ height: "85px" }}
              />
            ) : xx[2] === "Clouds" ? (
              <img
                src="https://cdn-icons-png.flaticon.com/512/414/414825.png"
                alt="Bulutlu"
                style={{ height: "85px" }}
              />
            ) : xx[2] === "Rain" ? (
              <img
                src="https://cdn-icons-png.flaticon.com/512/3351/3351979.png"
                alt="Yağmurlu"
                style={{ height: "85px" }}
              />
            ) : null}
            <span>
              {minTemp[2]}°C - {maxTemp[2]}°C
            </span>
          </button>
        </div>
        <div class="col">
          <button
            className="d-flex flex-column align-items-center border rounded"
            onClick={() => setGun(3)}
          >
            <span>{dorduncugun}</span>
            {xx[3] === "Clear" ? (
              <img
                src="https://cdn-icons-png.flaticon.com/512/869/869869.png"
                alt="Güneşli"
                style={{ height: "85px" }}
              />
            ) : xx[3] === "Clouds" ? (
              <img
                src="https://cdn-icons-png.flaticon.com/512/414/414825.png"
                alt="Bulutlu"
                style={{ height: "85px" }}
              />
            ) : xx[3] === "Rain" ? (
              <img
                src="https://cdn-icons-png.flaticon.com/512/3351/3351979.png"
                alt="Yağmurlu"
                style={{ height: "85px" }}
              />
            ) : null}
            <span>
              {minTemp[3]}°C - {maxTemp[3]}°C
            </span>
          </button>
        </div>
        <div class="col">
          <button
            className="d-flex flex-column align-items-center border rounded"
            onClick={() => {
              setGun(4);
            }}
          >
            <span>{songun}</span>
            {xx[4] === "Clear" ? (
              <img
                src="https://cdn-icons-png.flaticon.com/512/869/869869.png"
                alt="Güneşli"
                style={{ height: "85px" }}
              />
            ) : xx[4] === "Clouds" ? (
              <img
                src="https://cdn-icons-png.flaticon.com/512/414/414825.png"
                alt="Bulutlu"
                style={{ height: "85px" }}
              />
            ) : xx[4] === "Rain" ? (
              <img
                src="https://cdn-icons-png.flaticon.com/512/3351/3351979.png"
                alt="Yağmurlu"
                style={{ height: "85px" }}
              />
            ) : null}
            <span>
              {minTemp[4]}°C - {maxTemp[4]}°C
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Selectday;
