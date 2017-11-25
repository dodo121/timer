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
import { string, object } from 'prop-types'

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
      this.setState({minutes_counter: this.state.minutes_counter + 1});
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
        <View style={styles.wideButtonView} key='1'>
          <StartButton
            onPressCallback={this.startCounting}
            color={this.buttonColors['startButton']}
            style={styles.splitButton}/>
        </View>
      )
    } else {
      userControls.push(
        <View>
          <View style={styles.controls}>
            <View style={styles.controlButton}>
              <StopButton
                onPressCallback={this.stopCounting}
                color={this.buttonColors['stopButton']}/>
            </View>
            <View style={styles.controlButton}>
              <ResetButton
                onPressCallback={this.resetTimer}
                style={styles.controlButton}/>
            </View>
          </View>
          <View style={styles.wideButtonView}>
            <Split currentCounterState={this.dial.getStr()}/>
          </View>
        </View>
      )
    }

    const { navigate } = this.props.navigation;
    return(
      <View>
        <Dial
          miliseconds_counter={this.state.miliseconds_counter}
          minutes_counter={this.state.minutes_counter}
          seconds_counter={this.state.seconds_counter}
          ref={(instance) => { this.dial = instance; }}
        />
        {userControls}
      </View>
    )
  }
};

const StartButton = props =>
  <Button
    onPress={props.onPressCallback}
    title='Start'
    color={props.color}
    style={props.style}
  />;

const StopButton = props =>
  <Button
    onPress={props.onPressCallback}
    title='Stop'
    color={props.color}
    style={props.style}
  />;

const ResetButton = props =>
  <Button
    onPress={props.onPressCallback}
    title='Reset'
    color={props.color}
    style={props.style}
  />;

const styles = StyleSheet.create({
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start'
  },

  controlButton: {
    width: 130,
    height: 50
  },

  wideButtonView: {
    flexDirection: 'column',
    alignItems: 'stretch',
    marginLeft: 25,
    marginRight: 25
  }
});