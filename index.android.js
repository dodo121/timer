import './ReactotronConfig';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Alert,
  Button,
  AsyncStorage
} from 'react-native';
import { TabNavigator } from 'react-navigation';
import {Provider} from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
//import reducers from './reducers';
import sagas from './sagas';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

import citiesReducer from './data/cities';

const dataReducer = combineReducers({
  cities: citiesReducer
});

const reducers = {
  data: dataReducer
};

console.log('store get state', reducers);
const store = createStore(
  citiesReducer,
  applyMiddleware(
    sagaMiddleware
  )
);
sagaMiddleware.run(sagas);

import StopWatch from './components/stopwatch';
import WorldClockScreen from './components/world_clock/world_clock_screen'

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home'
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text>Hello!</Text>
      </View>
    );
  }
}

const App = TabNavigator({
  HomeScreen: { screen: HomeScreen },
  StopWatchScreen: { screen: StopWatch },
  WorldClockScreen: {
    screen: WorldClockScreen,
    navigationOptions: () => ({
      title: 'World Clock'
    })
  }
});

class timer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}
AppRegistry.registerComponent('timer', () => timer);