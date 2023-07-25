import { useCity } from "../context/haftalıkContext";
import cities from "../City/Cities.json";
import { useEffect,useState } from "react";

function SelectCity() {
  const { setCity, city } = useCity();
  const [inputValue, setInputValue] = useState("");

  const handleCityChange = (event) => {
    const selectedCity = cities.find((cityItem) => cityItem.name === event.target.value);
    if (selectedCity) {
      setCity(selectedCity.name); // Eşleşen şehir adını state'e atama
      setInputValue(selectedCity.name); // Seçilen şehir adını input içeriğine yazma
    }
    setInputValue(event.target.value);
  };
  const handleClearInput = () => {
    setInputValue(""); // Input değerini temizle
  };
  useEffect(() => {
    localStorage.setItem("city", city);
  }, [city]);
  return (
    <div className="mt-2" >
      <span
        className="border rounded d-flex justify-content-between align-items-center"
        style={{ display: "flex", alignItems: "center", width: "250px" }}
      >
        <svg
          style={{ height: "25px" }}
          focusable="false"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
        </svg>
        <div className="form-group border-0">
          <input
            onChange={handleCityChange}
            value={inputValue}
            list="citynames"
            className="border-0 flex-grow-1"
            style={{
              backgroundColor: "transparent",
              color: "black",
              border: "none",
            }}
            name="city"
          />
          {inputValue && ( 
            <button
              className="clear-button border-0"
              style={{backgroundColor: "transparent",}}
              onClick={handleClearInput}
            >
              X
            </button>
          )}
          <datalist id="citynames">
            {cities.map((city, index) => (
              <option key={index} value={city.name}>
                {city.name}
              </option>
            ))}
          </datalist>
        </div>
      </span>
    </div>
  );
}

export default SelectCity;
