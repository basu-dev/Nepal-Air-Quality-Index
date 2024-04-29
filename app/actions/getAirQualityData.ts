import { promises as fs } from "fs";
import { TAirQuality } from "../types/aqi";

export const token = "927b29a7ac2487eb96d79fa401815c0e39a9cf8b";
export const bounds = "26.3978980576,80.0884245137,30.4227169866,88.1748043151";

export async function getData(bounds: string) {
  return fetch(
    "https://api.waqi.info/v2/map/bounds/?latlng=" + bounds + "&token=" + token
  ).then((res) => res.json());
}

export async function getNepalGeoJson() {
  const file = await fs.readFile(
    process.cwd() + "/public/nepal.geojson",
    "utf8"
  );
  return JSON.parse(file);
}

export function getAirQualityData(): Promise<{
  status: number;
  data: TAirQuality[];
}> {
  return getData(bounds);
}
