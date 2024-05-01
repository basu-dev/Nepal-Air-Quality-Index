"use client";
import React, { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { DivIcon, Map as MapType, map } from "leaflet";
import { TAirQuality } from "../types/aqi";
import { DefaultZoomLevel, bgColorMap, latLng } from "../config";
import { getStorage, setStorage } from "../utils/storage";
import { getBounds, getNearestPoint } from "../utils/getBounds";
import { useRouter } from "next/navigation";

interface IProps {
  data: TAirQuality[];
  nepalGeoJson: any;
  selectedUid?: number;
}

async function userHasRejectedLocationPermission() {
  return (
    (await navigator.permissions.query({ name: "geolocation" })).state ===
    "denied"
  );
}

const Map: React.FC<IProps> = ({ data, nepalGeoJson, selectedUid }) => {
  const mapRef = useRef<MapType>(null);
  const [currentLocation, setCurrentLocation] = useState<
    [number, number] | null
  >(null);
  const router = useRouter();

  const fitCurrentLocationBound = (
    map: MapType,
    coordinates: [number, number]
  ) => {
    const currentLocationBounds = getBounds(coordinates, 1000);
    map.fitBounds(currentLocationBounds, { maxZoom: 13 });
  };

  function flyToStation(initial = true) {
    if (!mapRef.current) return;
    const map = mapRef.current;
    if (selectedUid) {
      let foundData = data.find((item) => item.uid === selectedUid);
      if (!foundData) return;
      requestAnimationFrame(() =>
        map.flyTo([foundData!.lat, foundData!.lon], 14)
      );
    } else if (!initial && currentLocation) {
      setCurrentLocation(currentLocation);
      fitCurrentLocationBound(map, currentLocation);
    }
  }

  useEffect(() => {
    flyToStation(false);
  }, [selectedUid, currentLocation, mapRef]);

  const selectNearestStationIfNotSelected = (
    currentLocation: [number, number]
  ) => {
    if (!selectedUid || isNaN(selectedUid)) {
      const nearestStationCoordinates = getNearestPoint(
        currentLocation,
        data.map((item) => [item.lat, item.lon])
      );
      const nearestStationUId = data.find(
        (item) =>
          item.lat == nearestStationCoordinates[0] &&
          item.lon == nearestStationCoordinates[1]
      )?.uid;
      setTimeout(() => {
        router.replace(`?station=${nearestStationUId}`);
      }, 1000);
    }
  };

  const mapReady = async () => {
    if (!mapRef.current) return;
    const map = mapRef.current;
    const nepalJSON = L.geoJSON(nepalGeoJson).addTo(map);
    const nepalBounds = nepalJSON.getBounds();
    const currentLocation = getStorage<[number, number]>("currentLocation");
    if (currentLocation) {
      setCurrentLocation(currentLocation);
      fitCurrentLocationBound(map, currentLocation);
      selectNearestStationIfNotSelected(currentLocation);
    } else {
      if (await userHasRejectedLocationPermission()) {
        map.fitBounds(nepalBounds);
      }
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setStorage("currentLocation", [latitude, longitude]);
        fitCurrentLocationBound(map, [latitude, longitude]);
      });
    }
    requestAnimationFrame(() => {
      map.setMinZoom(6);
      map.setMaxBounds(nepalBounds);
      flyToStation();
    });
  };

  return (
    <MapContainer
      className="h-full rounded-md"
      whenReady={() => requestAnimationFrame(mapReady)}
      style={{ height: "100%", width: "100%" }}
      ref={mapRef}
      center={latLng}
      zoom={DefaultZoomLevel}
      minZoom={6}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <>
        {currentLocation && (
          <Marker
            icon={
              new L.Icon({
                iconUrl: "/location.png",
                iconSize: [32, 32],
              })
            }
            position={{ lat: currentLocation[0], lng: currentLocation[1] }}
          ></Marker>
        )}
        {data.map((item) => {
          const intAQI = parseInt(item.aqi);
          const bgColor =
            intAQI <= 50
              ? bgColorMap[50]
              : intAQI <= 100
              ? bgColorMap[100]
              : intAQI <= 150
              ? bgColorMap[150]
              : intAQI <= 200
              ? bgColorMap[200]
              : intAQI <= 300
              ? bgColorMap[300]
              : bgColorMap.default;

          return (
            <Marker
              key={item.uid}
              icon={
                new DivIcon({
                  html: `<b>${item.aqi}</b>`,
                  iconAnchor: [0, 12],
                  className: `w-fit ${bgColor}  !flex justify-center items-center`,
                  iconSize: [28, 17],
                })
              }
              position={{ lat: item.lat, lng: item.lon }}
            >
              <Popup>
                <p>{item.station.name}</p>
                <b className="text-md font-bold text-red">{item.aqi}</b>
              </Popup>
            </Marker>
          );
        })}
      </>
    </MapContainer>
  );
};

export default Map;
