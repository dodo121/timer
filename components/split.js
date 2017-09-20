import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';

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
    for(let time of this.state.times) {
      timesList.push(
        <Text>
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
        {timesList}
      </View>
    )
  }
}