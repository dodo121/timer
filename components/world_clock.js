import { TabNavigator } from 'react-navigation';
import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  FlatList,
  StyleSheet
} from 'react-native';

export default class WorldClock extends Component {
  static naviationOptions = {
    title: 'World Clock'
  };

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      showPrompt: false,
      itemsSelected: []
    }
  }

  showPrompt = () => {
    this.setState({showPrompt: true});
  };

  hidePrompt = () => {
    this.setState({showPrompt: false});
  };

  newItemSelected = (item) => {
    items = this.state.itemsSelected;
    items.push(item);
    this.setState({itemsSelected: items});
  };

  render() {
    prompt = null;
    if(this.state.showPrompt) {
      prompt = <Prompt newItemSelected={(item) => this.newItemSelected(item)}/>;
    }
    const { navigate } = this.props.navigation;
    return(
      <View>
        <TextInput
          value={this.state.text}
          placeholder={'Search...'}
          onFocus={() => { this.showPrompt() }}
          onBlur={() => { this.hidePrompt() }} />
        {prompt}
        <FlatList
          data={this.state.itemsSelected}
          renderItem={({item}) => <Text key={item} style={styles.selectedListItem}>{item}</Text>}
          extraData={this.state}
        />
      </View>
    )
  }
}

class Prompt extends Component {
  constructor(props) {
    super(props);
  }

  selected = (e) => {
    this.props.newItemSelected(e);
  };

  render() {
    return(
      <View>
        <FlatList
          data={['a', 'b']}
          renderItem={({item}) => <Text key={item} onPress={() => { this.selected(item) }} style={styles.listItem}>{item}</Text>}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  listItem: {
    fontSize: 25,
    paddingLeft: 5,
    borderColor: '#808080',
    borderBottomWidth: 0.25
  },
  selectedListItem: {
    fontSize: 20
  }
});