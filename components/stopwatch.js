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
        {`${this.props.minutes_counter.toPrecision(2)}::${this.props.seconds_counter}::${this.props.miliseconds_counter}`}
      </Text>
    )
  }
}

export default class StopWatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      action: 'idle',
      miliseconds_counter: 0,
      minutes_counter: 0,
      seconds_counter: 0
    };
  }

  static navigationOptions = {
    tabBarLabel: 'Stop-Watch'
  };

  startCounting = () => {
    this.setState({action: 'counting'});
    this.coutingInterval = setInterval(() => this.updateCounter(), 1000);
  };

  stopCounting = () => {
    this.setState({action: 'idle'});
    clearInterval(this.coutingInterval);
  };

  updateCounter = () => {
    this.setState({miliseconds_counter: this.nextValue()});
  };

  nextValue = () => {
    return(this.state.miliseconds_counter + 1);
  };

  render() {
    let userControls = [];
    if(this.state.action == 'idle') {
      userControls.push(
        <Button
          onPress={() => this.startCounting()}
          title='Start'
          style={styles.startButton}
        />
      )
    } else {
      userControls.push(
        <Button
          onPress={() => this.stopCounting()}
          title='Stop'
          style={styles.startButton}
        />)
    }

    //Alert.alert(this.state.minutes_counter);
    const { navigate } = this.props.navigation;
    return(
      <View>
        <Dial
          miliseconds_counter={this.state.miliseconds_counter}
          minutes_counter={this.state.minutes_counter}
          seconds_counter={this.state.seconds_counter}/>
        <View style={styles.startButton}>
          {userControls}
        </View>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  startButton: {
    width: 250,
    height: 100,
    paddingLeft: 30,
    paddingRight: 30
  },
  dial: {
    fontWeight: 'bold',
    fontSize: 70,
    textAlign: 'center'
  }
});