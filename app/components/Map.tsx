"use client";
import React, { useRef } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import L,{ DivIcon,Map as MapType } from 'leaflet';
import { TAirQuality } from '../types/aqi';
import { DefaultZoomLevel, bgColorMap, latLng } from '../config';



interface IProps{
    data:TAirQuality[]
    nepalGeoJson:GeoJSON.FeatureCollection<any>;
}

const Map:React.FC<IProps> = ({data,nepalGeoJson}) => {

  const mapRef = useRef<MapType>(null);

  const mapReady = ()=>{
    if(!mapRef.current) return;
    const map = mapRef.current;
    const nepalJSON = L.geoJSON(nepalGeoJson).addTo(map);
    const bounds = nepalJSON.getBounds();
    map.fitBounds(bounds);
    requestAnimationFrame(()=>{
      map.setMinZoom(map.getZoom())
      map.setMaxBounds(bounds);
    })
  }

  return (
    <MapContainer  className='h-full rounded-md' whenReady={()=>requestAnimationFrame(mapReady)} style={{ height: '100%',width:'100%' }}
    ref={mapRef}
    center={latLng}
    zoom={DefaultZoomLevel}
    minZoom={6}
    >
       <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />
                {data.map((item)=>{
                    const intAQI = parseInt(item.aqi);
                    const bgColor = intAQI <= 50 ? bgColorMap[50] : intAQI <= 100 ? bgColorMap[100] : intAQI <= 150 ? bgColorMap[150] : intAQI <= 200 ? bgColorMap[200] : intAQI <= 300 ? bgColorMap[300] : bgColorMap.default;
                return <Marker key={item.uid} icon={new DivIcon({html:`<b>${item.aqi}</b>`, iconAnchor:[0,12],className:`w-fit ${bgColor}  !flex justify-center items-center`,iconSize:[28,17]})}  position={{lat:item.lat,lng:item.lon}}>
                  <Popup >
                    <p>{item.station.name}</p>
                    <b className='text-md font-bold text-red'>{item.aqi}</b>
                  </Popup>
                </Marker> 
                })}
    </MapContainer>
  )
}

export default Map