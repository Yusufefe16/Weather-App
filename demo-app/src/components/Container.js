import SelectCity from "./Button";
import Cityinfo from "./Cityinfo";
import Selectday from "./Selectday";
/* import Header from "./Header";
import Profile from "./Profile"; */

import { useCity } from "../context/haftalıkContext";

function Container() {
  const { city } = useCity();

  return (
    <div
      style={{ backgroundColor: "#5585b5", color: "#fcfefe" }}
      className="container row col-8 offset-md-2 border border-black rounded mt-4 pb-4"
    >
      <h1 className="mt-3">{city}</h1>
          <SelectCity /> <br />
          <Cityinfo />
          <Selectday />
    </div>
  );
}

export default Container;
