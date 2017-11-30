import axios from 'axios';
import bStates from '../data/brazilStates'
import arrToGeo from '../components/2dToGeo'
var iso3311a2 = require('iso-3166-1-alpha-2')

// This code runs when a country is selected (clicked on)
export function ClickedCountry(country, sliderVal, admin1, admin1L) {
  console.log("YOU CLICKED ON COUNTRY: ", country);
  var extra = ""
  var stateName = ""
  // Gets the state name( admin 1) from brazilStates file
  // This is just for brazil at the moment
  if (admin1 !== null) {
    extra = '?id_1=' + admin1;
    stateName = bStates[admin1L];
    console.log(stateName);
  }

  // Here we se axios to submit the GET request
  // axios calls localhost:3000/schools/countries/...
  // which then gets ported to localhost:3001/schools/countries/...
  return function(dispatch) {
    console.log('About to fetch', country + extra);
    axios.defaults.withCredentials = true;
    axios.get('/schools/countries/' + country + extra)
      .catch(err => {
        alert('There was an error trying to fetch. Please check your internet connection', country)
      })
      .then(response => {

        var countryname = iso3311a2.getCountry(country)
        var newGeo = null;
        var geojson = null;
        var geojsoncount = null;
        var schoolcount = null;

        try {
          newGeo = arrToGeo(response.data.result[0], response.data.result.slice(1))
          geojson = newGeo;
          geojsoncount = response.datacount;
          schoolcount = geojson.features.length
        } catch (e) {
          alert("Please reload page")
        }

        var totalteachers = 0;
        var totalstudents = 0;
        var totalelec = 0;
        var totalspeed = 0;
        var totalconnectedschools = 0;
        var nconn = 0;
        var bconn = 0;
        var aconn = 0;
        var noData = 0;
        var showSpeed = false;
        var b_nconn = 0;
        var b_2gconn = 0;
        var b_3gconn = 0;
        var b_noData = 0;
        var avgspeed = 0;

        // Here ncountry averages and totals are computed
        // ex: schools with no connection, 2G, ETC
        for (var i = 0; i < schoolcount; i++) {
          if (geojson.features[i].properties.speed_connectivity === null) {
            noData++;

          } else if (geojson.features[i].properties.speed_connectivity === 0) {
            nconn++;
            // totalconnectedschools++;

          } else if (geojson.features[i].properties.speed_connectivity < sliderVal) {
            bconn++;
            totalconnectedschools++;

          } else if (geojson.features[i].properties.speed_connectivity >= sliderVal) {
            aconn++;
            totalconnectedschools++;
          }
          ///GGGG Connectivity
          if (geojson.features[i].properties.type_connectivity === null) {
            b_noData++;

          } else if (geojson.features[i].properties.type_connectivity === "No Service") {
            b_nconn++;

          } else if (geojson.features[i].properties.type_connectivity === "2G") {
            b_2gconn++;

          } else if (geojson.features[i].properties.type_connectivity === "3G") {
            b_3gconn++;
          }

          if (geojson.features[i].properties.num_teachers !== null) {
            totalteachers += geojson.features[i].properties.num_teachers;
          }
          if (geojson.features[i].properties.num_students !== null) {
            totalstudents += geojson.features[i].properties.num_students;
          }
          if (geojson.features[i].properties.electricity !== null && geojson.features[i].properties.electricity === true) {
            totalelec++;
          }
          if (geojson.features[i].properties.speed_connectivity !== null) {
            totalspeed += geojson.features[i].properties.speed_connectivity;
          }
        }
        var avgspeed = Math.round(100 * (totalspeed / schoolcount)) / 100;

        if (totalteachers === 0) {
          totalteachers = "-";
        }
        if (avgspeed === 0) {
          avgspeed = "-";
        }
        if (schoolcount === 0) {
          schoolcount = "-";
        }
        if (totalstudents === 0) {
          totalstudents = "-";
        }
        if (totalconnectedschools === 0) {
          totalconnectedschools = "-";
        }
        if (totalteachers === 0) {
          totalteachers = "-";
        }
        if (totalelec === 0) {
          totalelec = "-";
        }
        if (totalconnectedschools / schoolcount > .3) {
          showSpeed = true;
        }
        // Using a reducer to dispatch the payload
        dispatch({
          type: 'COUNTRY_FETCHED',
          payload: {
            country: country,
            geojson: geojson,
            geojsoncount: geojsoncount,
            admin1: admin1,
            adminName: stateName,
            countryname: countryname,
            schoolcount: schoolcount,
            totalconnectedschools: totalconnectedschools,
            totalstudents: totalstudents,
            totalteachers: totalteachers,
            totalelec: totalelec,
            avgspeed: avgspeed,
            showSpeed: showSpeed,
            b_nconn: b_nconn,
            b_2gconn: b_2gconn,
            b_3gconn: b_3gconn,
            b_noData: b_noData,
          }
        })
        dispatch({
          type: "SLIDER_CHANGED",
          payload: {
            value: sliderVal,
            noConn: nconn,
            belowConn: bconn,
            aboveConn: aconn,
            noData: noData,
          }
        })
      })
  }
}




//curl -i magicboxapi.azurewebsites.net/api/v1/schools/countries/RW/?country_code=RW -H "Token: Bearer R_PudvUD8xTb4N-m"
