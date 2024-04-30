import L from "leaflet";

// get bounds from latlng with 10 km radius
/**
 *
 * @param coordinates
 * @param radius in terms of meter
 * @returns
 */
export function getBounds(coordinates: [number, number], radius: number) {
  return L.latLng(coordinates).toBounds(radius);
}

export function getNearestPoint(
  location: [number, number],
  coordinates: [number, number][]
) {
  const latlng = L.latLng(location);
  const distances: number[] = [];
  coordinates.forEach((coordinate) => {
    distances.push(latlng.distanceTo(coordinate));
  });
  return coordinates[distances.indexOf(Math.min(...distances))];
}
