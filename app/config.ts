export const bgColorMap = {
  50: "bg-[#10B981]",
  100: "bg-[#F59E0B]",
  150: "bg-[#F97316]",
  200: "bg-[#EF4444]",
  300: "bg-[#8B5CF6]",
  default: "bg-[#7C3AED]",
};

export const textColorMap = {
  50: "text-[#10B981]",
  100: "text-[#F59E0B]",
  150: "text-[#F97316]",
  200: "text-[#EF4444]",
  300: "text-[#8B5CF6]",
  default: "text-[#7C3AED]",
};

export function getTextColor(intAQI: number) {
  return intAQI <= 50
    ? textColorMap[50]
    : intAQI <= 100
    ? textColorMap[100]
    : intAQI <= 150
    ? textColorMap[150]
    : intAQI <= 200
    ? textColorMap[200]
    : intAQI <= 300
    ? textColorMap[300]
    : textColorMap.default;
}

export function getBgColor(intAQI: number) {
  return intAQI <= 50
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
}

export const DefaultZoomLevel = 8;
// This latlng value is taken from L.geoJSON(nepalGeoJson).getBounds().getCenter();
export const latLng: [number, number] = [28.410267309834403, 84.13210629881814];
