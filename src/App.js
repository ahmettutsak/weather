import "./App.css";
import axios from "axios";
import React from "react";

function App() {
  const [state, setState] = React.useState();
  const [address, setAddress] = React.useState("");
  const [time, setTime] = React.useState();
  const [stateName, setStateName] = React.useState();
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    axios
      .get(
        `https://nominatim.openstreetmap.org/search?q=${address}&format=json`
      )
      .then((response) => {
        setState(response.data);
      })
      .catch((error) => console.error(error));
  }, [address]);

  const getWeather = async (lon, lat, stateName) => {
    setStateName(stateName);
    await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m`
    )
      .then((response) => response.json())
      .then((data) => {
        setTime(data.hourly);
        setAddress("");
      });
    setShow(true);
  };

  const weatherGet = () => {
    return state.map((weather, index) => {
      return (
        <li
          className="border p-4 text-center cursor-pointer"
          onClick={() =>
            getWeather(weather.lon, weather.lat, weather.display_name)
          }
          key={index}
        >
          {weather.display_name}
        </li>
      );
    });
  };

  const showTimes = () => {
    const times = time.time.map((items, index) => {
      return (
        <li className="p-4 border list-none" key={index}>
          {items}
        </li>
      );
    });
    const degrees = time.temperature_2m.map((items, index) => {
      return (
        <li className="p-4 border list-none" key={index}>
          {items}
        </li>
      );
    });
    return (
      <div>
        <h2>{stateName}</h2>
        <div className="flex justify-center">
          <div>{times}</div>
          <div>{degrees}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="App">
      <div>
        <input
          type={"text"}
          placeholder="City"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
            setShow(false);
          }}
          className={"p-4 border rounded"}
        />
      </div>
      <ul>{address.length > 0 && !show && weatherGet()}</ul>
      <div>{show && showTimes()}</div>
    </div>
  );
}

export default App;
