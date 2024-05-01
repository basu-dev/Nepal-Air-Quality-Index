import React from "react";
import { TAirQuality } from "../types/aqi";
import { bgColorMap } from "../config";
import Image from "next/image";
import SummaryTile from "./SummaryTile";

interface IProps {
  data: TAirQuality[];
}
const MapSummary: React.FC<IProps> = ({ data }) => {
  return (
    <div className="rounded-md h-fit min-w-[300px]">
      <Image
        src="/AQI.jpg"
        alt="AQI"
        height={200}
        width={400}
        className="p-2"
      />
      <ul className="mt-2 border-t pt-2">
        {data.map((item) => {
          return <SummaryTile key={item.uid} item={item} />;
        })}
      </ul>
    </div>
  );
};

export default MapSummary;
