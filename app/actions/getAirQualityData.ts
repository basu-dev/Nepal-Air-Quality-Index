import { TAirQuality } from "../types/aqi";

export const token = "927b29a7ac2487eb96d79fa401815c0e39a9cf8b";
export const bounds = "26.3978980576,80.0884245137,30.4227169866,88.1748043151";

export async function getData(bounds: string) {
  return fetch(
    "https://api.waqi.info/v2/map/bounds/?latlng=" + bounds + "&token=" + token
  ).then((res) => res.json());
}

export function getNepalGeoJson() {
  return fetch(`${process.env.SERVER_URL}/nepal.geojson`).then((res) =>
    res.json()
  );
}

export function getAirQualityData(): Promise<{
  status: number;
  data: TAirQuality[];
}> {
  return getData(bounds);
}
