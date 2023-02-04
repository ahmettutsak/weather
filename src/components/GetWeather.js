import React from "react";

export default function GetWeather({ getWeather, state }) {
  return state.map((weather, index) => {
    return (
      <li
        className="border p-4 text-center cursor-pointer"
        onClick={() => {
          if (weather.address.town) {
            getWeather(weather.lon, weather.lat, weather.address.town);
          } else if (weather.address.province) {
            getWeather(weather.lon, weather.lat, weather.address.province);
          } else {
            getWeather(weather.lon, weather.lat, weather.address.country);
          }
        }}
        key={index}
      >
        {weather.display_name}
      </li>
    );
  });
}
