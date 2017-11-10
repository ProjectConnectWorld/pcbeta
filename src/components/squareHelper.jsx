import L from 'leaflet';
const squareHelper = (latlng, radius) => {
  var lat1 = latlng.lat - radius,
    lng1 = latlng.lng - radius,
    lat2 = latlng.lat + radius,
    lng2 = latlng.lng + radius
  // console.log(latlng.lat);
  // console.log(latlng.lat - radius);
  // console.log(latlng.lng);
  // console.log(latlng.lng - radius);
  var corner1 = L.latLng(lat1, lng1),
    corner2 = L.latLng(lat2, lng2)
  return L.latLngBounds(corner1, corner2)

}
export default squareHelper;
