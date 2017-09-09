import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';

export default class Dial extends Component {
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

const styles = StyleSheet.create({
  dial: {
    fontWeight: 'bold',
    fontSize: 70,
    textAlign: 'center'
  }
});