import { TabNavigator, StackNavigator } from 'react-navigation';
import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  TextInput,
  FlatList,
  StyleSheet,
  AsyncStorage
} from 'react-native';

class CitiesList extends Component {
  static navigationOptions = {
    title: 'World Clock'
  };

  constructor(props) {
    super(props);
    this.state = {
      itemsSelected: []
    };
    AsyncStorage.getItem('citiesSelected').then(itemsSelected => {
      this.setState({itemsSelected: JSON.parse(itemsSelected)});
    });
  };

  render() {
    const { navigate } = this.props.navigation;
    return(
      <View>
        <Button title='+' onPress={() => {navigate('AddNewCity')}} />
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

  render() {
    return(
      <View>
        <FlatList
          data={['a', 'b']}
          renderItem={({item}) => <Text key={item} onPress={() => {this.props.newItemSelected(item)}}
          style={styles.listItem}>{item}</Text>}
        />
      </View>
    )
  }
}

class AddNewCity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      showPrompt: false
    }
  }

  newItemSelected = (item) => {
//    items = this.state.itemsSelected;
//    items.push(item);
//    this.setState({itemsSelected: items});
//    return new Promise(async (resolve, reject) => {
      AsyncStorage.getItem('citiesSelected')
        .then((currentSavedData) => {
          if(currentSavedData == undefined) {
            newArray = [item];
          } else {
            newArray = JSON.parse(currentSavedData);
            newArray.push(item);
          };
          AsyncStorage.setItem('citiesSelected', JSON.stringify(newArray));
        });
//        .then(req => JSON.parse(req));
//        .then(json => console.log(json));
//        .then(json => json.push(item))
//        .then(newArray => ));
    this.props.navigation.navigate('CitiesList');
//    };
  };

  showPrompt = () => {
    this.setState({showPrompt: true});
  };

  hidePrompt = () => {
    this.setState({showPrompt: false});
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
          onFocus={() => { this.showPrompt() }}/>
        {prompt}
      </View>
    )
  }
}

const WorldClock = StackNavigator({
  CitiesList: { screen: CitiesList },
  AddNewCity: { screen: AddNewCity }
});

export default WorldClock;

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