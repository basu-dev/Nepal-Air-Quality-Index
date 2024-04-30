import dynamic from "next/dynamic";
import {
  getAirQualityData,
  getNepalGeoJson,
} from "./actions/getAirQualityData";
const DynamicMap = dynamic(() => import("./components/Map"), { ssr: false });
import { point, inside, polygon } from "@turf/turf";
import MapSummary from "./components/MapSummary";
import Link from "next/link";
interface IParams {
  params: any;
  searchParams: {
    [key: string]: string;
  };
}
export default async function Home(params: IParams) {
  try {
    const [data, nepalGeoJson] = await Promise.all([
      getAirQualityData(),
      getNepalGeoJson(),
    ]);
    const filteredDta = data.data
      .filter((item) => {
        if (item.aqi == "-") return false;
        const { lat, lon } = item;
        const point1 = point([lon, lat]);
        const nepalPolygon = polygon(
          nepalGeoJson.features[0].geometry.coordinates
        );
        const isInside = inside(point1, nepalPolygon);
        return isInside;
      })
      .sort((a, b) => a.uid - b.uid)
      .map((item) => {
        const nepalTextIndex = item.station.name.indexOf(", Nepal");
        if (nepalTextIndex < 0) return item;
        return {
          ...item,
          station: {
            name: item.station.name.slice(0, nepalTextIndex),
            time: item.station.time,
          },
        };
      });

    return (
      <main className="p-2 flex flex-col h-[100dvh]">
        <header className="text-gray-800 font-bold text-xl border-b-2 mb-3 pb-2">
          <Link href={"/"}>Nepal Air Quality Index</Link>
        </header>
        <div className="flex flex-col md:flex-row gap-2 h-full">
          <div className="min-h-[300px] flex-1">
            <DynamicMap
              selectedUid={Number(params?.searchParams?.station) ?? undefined}
              data={filteredDta}
              nepalGeoJson={nepalGeoJson}
            />
          </div>
          <MapSummary data={filteredDta} />
        </div>
        <footer className="fixed bottom-1 right-2 text-xs">
          All the data are taken from{" "}
          <a className="text-blue-700" target="_blank" href="https://waqi.info">
            waqi.info
          </a>
        </footer>
      </main>
    );
  } catch (e) {
    console.error(e);
    return (
      <div className="text-center my-3 text-md">
        Could not fetch air quality data. Please try again later.
      </div>
    );
  }
}
