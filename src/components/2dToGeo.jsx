var GeoJSON = require('geojson');
const arrToGeo = (params, data) => {
  //console.log("params: " + params[0]);
  var toGeo = []
  for (var i = 0; i < data.length; i++) {
    var o = new Object();
    for (var j = 0; j < params.length; j++) {
      o[params[j]] = data[i][j]
    }
    //console.log(o);
    toGeo[i] = o;
  }
  return GeoJSON.parse(toGeo, {
    Point: ['lat', 'lon']
  });

}
export default arrToGeo;
