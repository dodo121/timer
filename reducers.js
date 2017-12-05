import { combineReducers } from 'redux';
import citiesReducer from './data/cities';

const dataReducer = combineReducers({
  cities: citiesReducer
});

const reducers = {
  data: dataReducer
};
console.log(reducers);
export default reducers;