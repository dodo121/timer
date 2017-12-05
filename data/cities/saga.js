import { takeLatest, call, put, take } from 'redux-saga/effects';
import {
  LOAD_CITIES,
  loadCitiesSuccess,
  NEW_CITY_ADDED,
  newCityAddedSuccess
} from './index';
import { AsyncStorage } from 'react-native';

export default function* citiesSaga() {
  yield takeLatest(LOAD_CITIES, onLoadCities);
  yield takeLatest(NEW_CITY_ADDED, onNewCityAdded);
}

function* onLoadCities() {
  try {
    const itemsSelectedAsString = yield AsyncStorage.getItem('citiesSelected');
    yield put(loadCitiesSuccess(JSON.parse(itemsSelectedAsString)));
  } catch(error) {
    console.log('error', error);
  }
}

function* onNewCityAdded({ payload: city }) {
  //yield getLocationInfo(city);
  const citiesStored = yield AsyncStorage.getItem('citiesSelected');
  if(citiesStored == undefined) {
    newArray = [city];
  } else {
    newArray = JSON.parse(citiesStored);
    newArray.push(city);
  }
  yield AsyncStorage.setItem('citiesSelected', JSON.stringify(newArray));
  yield put(newCityAddedSuccess(city));
}

//getLocationInfo = (city) => {
//  fetch(
//    `https://maps.googleapis.com/maps/api/place/details/json?placeid=${city['placeId']}&key=${keysConfig['googlePlaceDetailsApiKey']}`
//  ).then((response) => response.json()).
//  then((responseJson) => {
//    return responseJson.result.geometry.location;
//  }).catch((error) => console.log('ERROR:', error));
//};


