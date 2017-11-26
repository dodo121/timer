import React, { Component } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';

export default class Split extends Component {
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
    for(let [index, time] of this.state.times.entries()) {
      timesList.push(
        <Text style={styles.timeEntry} key={index}>
          {time}
        </Text>
      );
    }

    return(
      <View>
        <Button
          onPress={() => this.splitTime(this.props.currentCounterState)}
          title='Split'
          />
        <View style={styles.timeEntryView}>
          {timesList}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  timeEntryView: {
    alignItems: 'center'
  },

  timeEntry: {
    fontSize: 20
  }
});