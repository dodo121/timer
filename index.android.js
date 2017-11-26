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
import WorldClock from './components/world_clock/world_clock'

//export default class HomeScreen extends Component {
//
//}
//  static navigationOptions = {
//    title: 'Welcome'
//  };
//
//  state = {
//    backgroundColor: 'greyBackground'
//  };
//
//  componentDidMount = () => {
//    AsyncStorage.getItem('backgroundColor').then((value) => {
//      if(value !== undefined) {
//        this.switchToColor(value);
//      }
//    });
//  };
//
//  switchToColor = (color) => {
//    this.setState({backgroundColor: color});
//    AsyncStorage.setItem('backgroundColor', color.toString());
//  };
//
//  render() {
//    const { navigate } = this.props.navigation;
//    return (
//      <View style={[styles.container, styles[this.state.backgroundColor]]}>
//        <View style={{padding: 20}}>
//          <Text style={styles.helloText}>Hello, Navigation!</Text>
//        </View>
//        <Button onPress={() => navigate('SubView1', { user: 'Dodo' })} title='Go to Sub View 1' />
//        <Button onPress={() => this.switchToColor('greyBackground')} title='Color 1' color='#808080' />
//        <Button onPress={() => this.switchToColor('blackBackground')} title='Color 2' color='#000000' />
//        <Button onPress={() => this.switchToColor('maroonBackground')} title='Color 3' color='#800000' />
//      </View>
//    );
//  }
//}
//
//class SubView1 extends Component {
//  static navigationOptions = ({ navigation }) => ({
//    title: `SubView1 ${navigation.state.params.user}`
//  });
//
//  render() {
//    const { params } = this.props.navigation.state;
//    return(
//      <View>
//        <Text>Sub View 1 {params.user}</Text>
//      </View>
//    )
//  }
//}
//
//const styles = StyleSheet.create({
//  helloText: {
//    color: '#ffffff',
//    paddingBottom: 100
//  },
//  container: {
//    flex: 1,
//    justifyContent: 'center',
//    alignItems: 'center',
//    backgroundColor: '#F5FCFF',
//    height: 2000
//  },
//  welcome: {
//    fontSize: 20,
//    textAlign: 'center',
//    margin: 10
//  },
//  instructions: {
//    textAlign: 'center',
//    color: '#333333',
//    marginBottom: 5
//  },
//  greyBackground: {
//    backgroundColor: '#808080'
//  },
//  blackBackground: {
//    backgroundColor: '#000000'
//  },
//  maroonBackground: {
//    backgroundColor: '#800000'
//  }
//});

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
  WorldClock: { screen: WorldClock }
});

AppRegistry.registerComponent('timer', () => timer);
