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

class Dial extends Component {
  constructor(props) {
    super(props);
    //this.state = {
    //  miliseconds_counter: 0,
    //  minutes_counter: 0,
    //  seconds_counter: 0
    //};
  }
  render() {
    return(
      <Text style={styles.dial}>
        {this.getStr()}
      </Text>
    )
  }

  formatNumber = (number) => {
    if (number < 10) {
      return(`0${number}`);
    } else {
      return(number);
    }
  }

  getStr = () => {
    return `${this.formatNumber(this.props.minutes_counter)}:${this.formatNumber(this.props.seconds_counter)}:${this.props.miliseconds_counter+'0'}`
  }
}

class Split extends Component {
  constructor(props) {
    super(props);
    this.state = {
      times: []
    }
  }

  splitTime = (ss) => {
    currentTimes = this.state.times;
    currentTimes.push(ss);
    this.setState({times: currentTimes});
  };

  render() {
    let timesList = [];
    for(let time of this.state.times) {
      timesList.push(
        <Text>
          {time}
        </Text>
      );
    };

    return(
      <View>
        <Button
          onPress={() => this.splitTime(this.props.currentCounterState)}
          title='Split'
        />
        {timesList}
      </View>
    )
  }
}

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
        <View>
          <Split currentCounterState={this.dial.getStr()}/>
        </View>
      </View>
      )
    }
    userControls.push(
      <View style={styles.controlButton} key='2'>
        <Button
          onPress={() => this.resetTimer()}
          title='Reset'
        />
      </View>
    )

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
    width: 150
  }
});