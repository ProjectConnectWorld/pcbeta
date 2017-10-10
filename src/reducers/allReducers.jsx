import {
  combineReducers
} from 'redux';
import mapReducer from './mapReducer';
import countrySelectedReducer from './countrySelectedReducer';
import sliderChanged from './sliderReducer';



const allReducers = combineReducers({
  mapData: mapReducer,
  countrySelected: countrySelectedReducer,
  sliderChanged: sliderChanged,
});


export default allReducers;
