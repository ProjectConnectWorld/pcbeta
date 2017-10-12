var initialstate = {
  country: null,
  geojson: null,
  geojsoncount: null,
  countryname: "Country",
  schoolcount: "-",
  totalconnectedschools: "-",
  totalstudents: "-",
  totalteachers: "-",
  totalelec: "-",
  avgspeed: "-",
  showSpeed: false,
  noConn: 0,
  belowConn: 0,
  aboveCnn: 0,
  noData: 0,
  b_nconn: 0,
  b_2gconn: 0,
  b_3gconn: 0,
  b_noData: 0,

}

export default function(state = initialstate, action) {
  switch (action.type) {
    case "COUNTRY_FETCHED":
      return action.payload;
  }
  return state;

}
