import { handleActions, createAction } from 'redux-actions';

export const LOAD_CITIES = 'data/cities/load_cities';
export const LOAD_CITIES_SUCCESS = 'data/cities/login-success';
export const LOAD_CITIES_FAILURE = 'data/cities/login-failure';

export const NEW_CITY_ADDED = 'data/cities/new_city_added';
export const NEW_CITY_ADDED_SUCCESS = 'data/cities/new_city_added_success';

const initialState = {
  loading: false,
  error: null,
  value: null
};

export default handleActions({
  [LOAD_CITIES]: () => ({
    ...initialState,
    loading: true
  }),

  [LOAD_CITIES_SUCCESS]: (state, action) => ({
    ...state,
    value: action.payload,
    loading: false
  }),

  [NEW_CITY_ADDED]: () => ({
    ...initialState,
    loading: true
  }),

  [NEW_CITY_ADDED_SUCCESS]: (state, action) => ({
    ...state,
    value: [...state.value, action.payload],
    loading: false
  })
  //
  //[LOGIN_USER]: () => ({
  //  ...initialState,
  //  loading: true
  //}),
  //
  //[LOGIN_USER_SUCCESS]: (state, { payload }) => ({
  //  ...initialState,
  //  value: payload
  //}),
  //
  //[LOGIN_USER_FAILURE]: (state, { payload }) => ({
  //  ...initialState,
  //  error: payload
  //})
}, initialState);

export const loadCities = createAction(LOAD_CITIES);
export const loadCitiesSuccess = createAction(LOAD_CITIES_SUCCESS);

export const newCityAdded = createAction(NEW_CITY_ADDED);
export const newCityAddedSuccess = createAction(NEW_CITY_ADDED_SUCCESS);

