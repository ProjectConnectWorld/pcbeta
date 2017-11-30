
import axios from 'axios';
import bStates from '../data/brazilStates'
import arrToGeo from '../components/2dToGeo'
var iso3311a2 = require('iso-3166-1-alpha-2')

// This code runs when a country is selected (clicked on)
export function ClickedSchool(probeId) {
    console.log("YOU CLICKED ON COUNTRY SCHOOL");
    return function(dispatch) {
      console.log('About to fetch');
      axios.defaults.withCredentials = true;
      axios.get('/oneschool/' + probeId)
        .catch(err => {
          alert('There was an error trying to fetch. Please check your internet connection')
        })
        .then(response => {
          console.log(response);
        })
    }



}




//curl -i magicboxapi.azurewebsites.net/api/v1/schools/countries/RW/?country_code=RW -H "Token: Bearer R_PudvUD8xTb4N-m"
