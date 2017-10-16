import {
  combineReducers
} from 'redux';
import mapReducer from './mapReducer';
import countrySelectedReducer from './countrySelectedReducer';
import sliderChanged from './sliderReducer';
import loadingChanged from './loadingReducer';



const allReducers = combineReducers({
  mapData: mapReducer,
  countrySelected: countrySelectedReducer,
  sliderChanged: sliderChanged,
  loadingChanged: loadingChanged,

});


export default allReducers;
