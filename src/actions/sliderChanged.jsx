const SliderChanged = (value, geoJson) => {
  //console.log("ACTION");
  var nconn = 0;
  var bconn = 0;
  var aconn = 0;
  var noData = 0;
  // Here the values are calculated that are in the pie chart
  // values abouve the threshold, below, no data, and zero connection
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
