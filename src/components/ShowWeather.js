import React from "react";
import CurrentData from "./CurrentData";
import ShowTimes from "./ShowTimes";

export default function ShowWeather({
  current,
  show,
  svgIcon,
  stateName,
  timeS,
}) {
  return (
    <div className="flex flex-col xl:flex-row p-4 justify-around w-full items-center text-white absolute bottom-8">
      <div className="flex items-center">
        <h2 className="font-bold text-5xl xl:text-8xl text-white">
          {current.temperature}°
        </h2>
        <div className="xl:p-8 p-6">
          <h2 className="font-bold xl:text-4xl text-white">{stateName}</h2>
          <CurrentData current={current} />
        </div>
        <img src={svgIcon} width={75} height={75} alt="svg" />
      </div>
      <div>
        <h2 className="xl:text-2xl text-white">Weekly ---&gt;</h2>
        <div className="text-black">{show && <ShowTimes timeS={timeS} />}</div>
      </div>
    </div>
  );
}
