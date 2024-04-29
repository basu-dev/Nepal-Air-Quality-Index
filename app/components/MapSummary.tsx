import React from 'react'
import { TAirQuality } from '../types/aqi';
import {  textColorMap } from '../config';
import Image from 'next/image';

interface IProps{
    data:TAirQuality[]
}
const MapSummary:React.FC<IProps> = ({data}) => {
  return (
    <div className='border rounded-md p-2 h-fit min-w-[300px]'>
        <Image src="/AQI.jpg" alt='AQI' height={200} width={400} objectFit='contain'/>
        <ul className='mt-2 border-t pt-2'>
       {data.map((item)=>{
    const intAQI = parseInt(item.aqi);
    const color = intAQI <= 50 ? textColorMap[50] : intAQI <= 100 ? textColorMap[100] : intAQI <= 150 ? textColorMap[150] : intAQI <= 200 ? textColorMap[200] : intAQI <= 300 ? textColorMap[300] : textColorMap.default;
        return <li key={item.uid} className='flex justify-between gap-2 pb-1 last:pb-0 pt-1 border-b border-gray-200 last:border-none'>
            <div className='text-sm'>
            {item.station.name} 
            </div>
            <b className={color} >
                {item.aqi}
            </b>
    </li>
  })}
  </ul>
  </div>)
}

export default MapSummary