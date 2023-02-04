import "./App.css";
import axios from "axios";
import React from "react";

function App() {
  const [state, setState] = React.useState();
  const [address, setAddress] = React.useState("");
  const [timeS, setTimeS] = React.useState();
  const [stateName, setStateName] = React.useState();
  const [show, setShow] = React.useState(false);
  const [current, setCurrent] = React.useState();
  const [background, setBg] = React.useState(
    "https://images.unsplash.com/photo-1542349314-b0ceb4d90f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80"
  );
  const [svgIcon, setSvgIcon] = React.useState("");

  React.useEffect(() => {
    axios
      .get(
        `https://nominatim.openstreetmap.org/?addressdetails=1&q=${address}&format=json`
      )
      .then((response) => {
        setState(response.data);
      })
      .catch((error) => console.error(error));
  }, [address]);

  const getWeather = async (lon, lat, stateName) => {
    setStateName(stateName);
    await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m&current_weather=true`
    )
      .then((response) => response.json())
      .then((data) => {
        setTimeS([data.hourly]);
        setCurrent(data.current_weather);
        setAddress("");
      });
    setShow(true);
  };

  const weatherGet = () => {
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
  };

  React.useEffect(() => {
    if (current) {
      switch (current.weathercode) {
        case 0:
          setBg(
            "https://images.unsplash.com/photo-1601297183305-6df142704ea2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
          );
          setSvgIcon(
            "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/clear-day.svg"
          );
          break;
        case 1:
        case 2:
        case 3:
          setBg(
            "https://images.unsplash.com/photo-1500740516770-92bd004b996e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80"
          );
          setSvgIcon(
            "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/cloudy.svg"
          );
          break;
        case 45:
        case 48:
          setBg(
            "https://images.unsplash.com/photo-1605008356762-16b8d39babad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1025&q=80"
          );
          setSvgIcon(
            "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/fog.svg"
          );
          break;
        case 51:
        case 53:
        case 55:
        case 56:
        case 57:
          setBg(
            "https://images.unsplash.com/photo-1599738874797-d1632738da20?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          );
          setSvgIcon(
            "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/drizzle.svg"
          );
          break;
        case 61:
        case 63:
        case 65:
        case 66:
        case 67:
          setBg(
            "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"
          );
          setSvgIcon(
            "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/rain.svg"
          );
          break;
        case 71:
        case 73:
        case 75:
        case 77:
          setBg(
            "https://images.unsplash.com/photo-1507181179506-598491b53db4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80"
          );
          setSvgIcon(
            "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/snow.svg"
          );
          break;
        case 80:
        case 81:
        case 82:
          setBg(
            "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"
          );
          setSvgIcon(
            "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/extreme-rain.svg"
          );
          break;
        case 85:
        case 86:
          setBg(
            "https://images.unsplash.com/photo-1547576962-9f4ee7e7a7c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
          );
          setSvgIcon(
            "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/extreme-snow.svg"
          );
          break;
        case 95:
        case 96:
        case 99:
          setBg(
            "https://images.unsplash.com/photo-1613114016545-8352ff5b8d9c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
          );
          setSvgIcon(
            "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/thunderstorms-extreme.svg"
          );
          break;
        default:
          setBg(
            "https://images.unsplash.com/photo-1542349314-b0ceb4d90f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80"
          );
          setSvgIcon("");
          break;
      }
    }
  }, [current]);

  const showTimes = () => {
    const times = timeS.map(({ time, temperature_2m }, index) => {
      const returntime = time.map((rtTime, index) => {
        const dates = rtTime.split("-");
        const hours = dates[2].split("T");
        const date = `${hours[0]}.${dates[1]}.${dates[0]}`;
        const day = new Date(`${dates[0]}-${dates[1]}-${hours[0]}`);
        const daytime = day.toLocaleString("en-US", { weekday: "long" });
        return (
          <li
            className="p-6 list-none rounded bg-opacity-40 bg-white"
            key={index}
          >
            <h2 className="font-bold text-2xl">{daytime}</h2>
            <h2 className="">{date}</h2>
            <h2 className="">{hours[1]}</h2>
            <h2 className="font-bold text-xl">{temperature_2m[index]}°C</h2>
          </li>
        );
      });
      return returntime;
    });

    return (
      <div className="flex flex-col overflow-auto w-72 xl:w-[562px]">
        <div className="flex xl:p-4 text-center gap-2">{times}</div>
      </div>
    );
  };

  const currentData = () => {
    const dates = current.time.split("-");
    const hours = dates[2].split("T");
    const date = `${hours[0]}.${dates[1]}.${dates[0]}`;
    const day = new Date(`${dates[0]}-${dates[1]}-${hours[0]}`);
    const daytime = day.toLocaleString("en-US", { weekday: "long" });
    const hourCo = new Date();
    var currentHour = hourCo.getHours() + ":" + hourCo.getMinutes();
    return (
      <h2 className="p-1 xl:text-xl">{`${currentHour} - ${daytime}, ${date}`}</h2>
    );
  };

  return (
    <div
      className={`flex overflow-hidden flex-col bg-cover bg-center h-screen`}
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <div className="flex justify-center items-center mt-6 flex-col">
        <div className="flex w-full justify-evenly items-center">
          <h2 className="font-bold xl:text-7xl text-4xl mt-24 mb-12 text-white">
            GetWeather
          </h2>
        </div>
        <input
          type={"text"}
          placeholder="City"
          value={address}
          onFocus={() => setShow(false)}
          onChange={(e) => {
            setAddress(e.target.value);
            setShow(false);
          }}
          className={"p-4 border rounded xl:w-[800px]"}
        />
        {current && show && (
          <div className="flex flex-col xl:flex-row p-4 justify-around w-full items-center text-white absolute bottom-8">
            <div className="flex items-center">
              <h2 className="font-bold text-5xl xl:text-8xl text-white">
                {current.temperature}°
              </h2>
              <div className="xl:p-8 p-6">
                <h2 className="font-bold xl:text-4xl text-white">
                  {stateName}
                </h2>
                <div>{currentData()}</div>
              </div>
              <img src={svgIcon} width={75} height={75} alt="svg" />
            </div>
            <div>
              <h2 className="xl:text-2xl text-white">Weekly ---&gt;</h2>
              <div className="text-black">{show && showTimes()}</div>
            </div>
          </div>
        )}
      </div>
      <div className="h-full flex justify-center">
        <ul
          className={`h-[180px] w-[210px] xl:w-[800px] ${
            address.length > 0 ? "" : "hidden"
          } overflow-auto bg-white`}
        >
          {address.length > 0 && !show && weatherGet()}
        </ul>
      </div>
    </div>
  );
}

export default App;
