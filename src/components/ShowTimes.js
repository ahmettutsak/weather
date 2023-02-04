import React from "react";

export default function ShowTimes({ timeS }) {
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
}
