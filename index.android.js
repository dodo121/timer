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

const timer = TabNavigator({
  HomeScreen: { screen: HomeScreen },
  StopWatchScreen: { screen: StopWatch },
  WorldClockScreen: {
    screen: WorldClockScreen,
    navigationOptions: (_) => ({
      title: 'World Clock'
    })
  }
});

AppRegistry.registerComponent('timer', () => timer);
