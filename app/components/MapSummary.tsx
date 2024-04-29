import React from 'react'
import { TAirQuality } from '../types/aqi';
import {  textColorMap } from '../config';

interface IProps{
    data:TAirQuality[]
}
const MapSummary:React.FC<IProps> = ({data}) => {
  return (
    <div className='border rounded-md p-2 h-fit min-w-[300px]'>
        <div className="text-gray-700 font-bold text-md border-b mb-2 pb-2">Summary </div>
       {data.map((item)=>{
    const intAQI = parseInt(item.aqi);
    const color = intAQI <= 50 ? textColorMap[50] : intAQI <= 100 ? textColorMap[100] : intAQI <= 150 ? textColorMap[150] : intAQI <= 200 ? textColorMap[200] : intAQI <= 300 ? textColorMap[300] : textColorMap.default;
        return <div key={item.uid} className='flex justify-between gap-2 pb-2'>
            <div className='text-sm'>
            {item.station.name} 
            </div>
            <b className={color} >
                {item.aqi}
            </b>
    </div>
  })}
  </div>)
}

export default MapSummary