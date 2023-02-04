import React from "react";

export default function CurrentData({ current }) {
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
}
