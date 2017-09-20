import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Alert,
  Button,
} from 'react-native';
import { TabNavigator } from 'react-navigation';
import Split from './split.js';
import Dial from './dial.js';

export default class StopWatch extends Component {
  constructor(props) {
    super(props);
    this._init_state = {
      action: 'idle',
      miliseconds_counter: 0,
      minutes_counter: 0,
      seconds_counter: 0
    };
    this.dial = {
      getStr() {}
    };
    this.state = this._init_state;
  }

  static navigationOptions = {
    tabBarLabel: 'Stop-Watch'
  };

  startCounting = () => {
    this.setState({action: 'counting'});
    this.coutingInterval = setInterval(() => this.updateCounter(), 100);
  };

  stopCounting = () => {
    clearInterval(this.coutingInterval);
    this.setState({action: 'idle'});
  };

  updateCounter = () => {
    if (this.nextMillisecondsValue() == 10) {
      this.setState({
        miliseconds_counter: 0,
        seconds_counter: this.nextSecondsValue()
      });
    } else {
      this.setState({miliseconds_counter: this.nextMillisecondsValue()});
    }
  };

  nextMillisecondsValue = () => {
    return(this.state.miliseconds_counter + 1);
  };

  nextSecondsValue = () => {
    if (this.state.seconds_counter < 59) {
      return(this.state.seconds_counter + 1);
    } else {
      return 0;
    }
  }

  resetTimer = () => {
    clearInterval(this.coutingInterval);
    this.setState(this._init_state);
  }

  buttonColors = {
    startButton: '#6AF23D',
    stopButton: '#F50000'
  }

  render() {
    let userControls = [];
    if(this.state.action == 'idle') {
      userControls.push(
        <View style={styles.controlButton} key='1'>
          <Button
            onPress={() => this.startCounting()}
            title='Start'
            color={this.buttonColors['startButton']}
          />
        </View>
      )
    } else {
      userControls.push(
        <View>
          <View style={styles.controlButton} key='1'>
            <Button
              onPress={() => this.stopCounting()}
              title='Stop'
              color={this.buttonColors['stopButton']}
            />
          </View>
          <View style={styles.controlButton} key='2'>
            <Button
              onPress={() => this.resetTimer()}
              title='Reset'
              />
          </View>
          <View>
            <Split currentCounterState={this.dial.getStr()}/>
          </View>
        </View>
      )
    }

    //Alert.alert(this.state.minutes_counter);
    const { navigate } = this.props.navigation;
    return(
      <View>
        <Dial
          miliseconds_counter={this.state.miliseconds_counter}
          minutes_counter={this.state.minutes_counter}
          seconds_counter={this.state.seconds_counter}
          ref={(instance) => { this.dial = instance; }}
        />
        <View style={styles.controls}>
          {userControls}
        </View>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },

  dial: {
    fontWeight: 'bold',
    fontSize: 70,
    textAlign: 'center'
  },

  controlButton: {
    //width: 150
  }
});