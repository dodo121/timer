import { TabNavigator, StackNavigator } from 'react-navigation';
import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  TextInput,
  FlatList,
  StyleSheet,
  AsyncStorage,
  TouchableOpacity
} from 'react-native';

class CitiesManager extends Component {
//  static navigationOptions = {
//    title: 'test',
//    header: null
//  };

  constructor(props) {
    super(props);
  }

  render() {
    return(<Text></Text>);
  }
}

class CitiesList extends Component {
  static navigationOptions = {
    title: 'World Clock',
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      itemsSelected: [],
      citiesLoaded: false
    };
    AsyncStorage.getItem('citiesSelected').then(itemsSelected => {
      this.setState({
        itemsSelected: JSON.parse(itemsSelected),
        citiesLoaded: true
      });
    });
  };

  render() {
    const { navigate } = this.props.navigation;
    if(this.state.citiesLoaded) {
      cities = <FlatList
                 data={this.state.itemsSelected}
                 renderItem={({item}) => <Text key={item} style={styles.selectedListItem}>{item}</Text>}
                 extraData={this.state}
               />;
    } else {
      cities = <Text>'Loading data please wait...'</Text>;
    }
    return(
      <View>
        <TouchableOpacity
          onPress={() => {navigate('AddNewCity')}}
          style={{width: 50, height: 50, marginTop: 5, marginLeft: 5, backgroundColor: '#808080'}} >
          <Text style={{fontSize: 35, color: '#FFF', alignSelf: 'center'}}>+</Text>
        </TouchableOpacity>
        <View>
          {cities}
        </View>
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
    this.props.navigation.navigate('CitiesList');
  };

  showPrompt = () => {
    this.setState({showPrompt: true});
  };

  hidePrompt = () => {
    this.setState({showPrompt: false});
  };

  searchForCity = (text) => {
    this.setState({text: text})
//    fetch('http://gd.geobytes.com/GetCityDetails?callback=?&fqcn=' + text + '.json', {
//      headers: {
//        'Accept': 'application/json',
//        'Content-Type': 'application/json'
//      },
//      body: JSON.stringify({
//
//      })
//    })
    fetch('http://gd.geobytes.com/AutoCompleteCity?callback=?&q=' + text)
//    fetch('https://jsonplaceholder.typicode.com/users/1')
      .then((response) => { console.log(response.text()) })
      .catch((error) => {
        console.log('Error:', error);
      });
  }

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
          onChangeText={(text) => { this.searchForCity(text) }} />
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
    fontSize: 20,
    borderColor: '#808080',
    borderBottomWidth: 0.25,
    padding: 10
  },
  addNewCity: {
    height: 100,
    width: 200
  }
});