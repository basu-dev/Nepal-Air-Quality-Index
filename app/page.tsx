import dynamic from "next/dynamic";
import { getAirQualityData, getNepalGeoJson } from "./actions/getAirQualityData";
const DynamicMap = dynamic(()=>import('./components/Map'),{ssr:false});
import {point,inside, polygon} from "@turf/turf";
import MapSummary from "./components/MapSummary";

export default async function Home() {
  try{
const [data,nepalGeoJson]= await Promise.all([getAirQualityData(),getNepalGeoJson()]);
 const filteredDta = data.data.filter(item=>{
    if(item.aqi=='-')return false;
    const {lat,lon} = item;
    const point1 =point([lon,lat]);
    const nepalPolygon = polygon(nepalGeoJson.features[0].geometry.coordinates);
    const isInside = inside(point1,nepalPolygon);
    return isInside 
  }).map((item)=>{
    const nepalTextIndex = item.station.name.indexOf(', Nepal');
    if(nepalTextIndex<0)return item;
    return {...item,station:{name:item.station.name.slice(0,nepalTextIndex),time:item.station.time}}
  })

  return (
    <main className="p-2 flex flex-col h-[100dvh]">
      <header className="text-gray-700 font-bold text-xl border-b-2 my-3 pb-2">Nepal Air Quality Index </header>
      <div className="flex flex-col md:flex-row gap-2 h-full">
        <div className="flex-1">
          <DynamicMap data={filteredDta} nepalGeoJson={nepalGeoJson} />
        </div>
      <MapSummary data={filteredDta}/> 
      </div>
      <footer className="fixed bottom-1 right-2 text-xs">
        All the data are taken from <a className="text-blue-700" target="_blank" href="https://waqi.info">waqi.info</a>
      </footer>
    </main>
  );
  }catch(e){
    console.error(e);
    return (
    <div className="text-center my-3 text-md">
      Could not fetch air quality data. Please try again later.
    </div>
    )
  }
}
