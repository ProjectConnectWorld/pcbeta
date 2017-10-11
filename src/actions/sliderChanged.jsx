const SliderChanged = (value, geoJson) => {
  //console.log("ACTION");
  var nconn = 0;
  var bconn = 0;
  var aconn = 0;
  var noData = 0;

  for (var i = 0; i < geoJson.features.length; i++) {
    if (geoJson.features[i].properties.speed_connectivity === null) {
      noData++;

    } else if (geoJson.features[i].properties.speed_connectivity === 0) {
      nconn++;

    } else if (geoJson.features[i].properties.speed_connectivity < value) {
      bconn++;

    } else if (geoJson.features[i].properties.speed_connectivity >= value) {
      aconn++;
    }
  }
  console.log(nconn);
  console.log(bconn);
  console.log(aconn);
  console.log(noData);

  return {
    type: "SLIDER_CHANGED",
    payload: {
      value: value,
      noConn: nconn,
      belowConn: bconn,
      aboveConn: aconn,
      noData: noData,

    }

  }

}

export default SliderChanged;
