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

export default class CitiesList extends Component {
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
    this.loadCities();
  };

  loadCities = () => {
    AsyncStorage.getItem('citiesSelected').then(itemsSelected => {
      this.setState({
        itemsSelected: JSON.parse(itemsSelected),
        citiesLoaded: true
      });
    });
  };

  removeAllCities = () => {
    AsyncStorage.removeItem('citiesSelected', this.loadCities);
  };

  shouldComponentUpdate = (nextProps, nextState) => {
    AsyncStorage.getItem('citiesSelected').then(itemsSelectedStored => {
      if(nextState['itemsSelected'] && itemsSelectedStored) {
        if(nextState['itemsSelected'].length != JSON.parse(itemsSelectedStored).length) {
          this.loadCities();
        }
      } else {
        this.loadCities();
      }
    });
    return true;
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
        <Add
          onPressCallback={() => {navigate('AddNewCity')}}
          backgroundStyle={styles.addButtonBackgroundStyle}
          style={styles.addButtonStyle}
          />
        <TouchableOpacity onPress={this.removeAllCities}>
          <Text>Remove all!</Text>
        </TouchableOpacity>
        <View>
          {cities}
        </View>
      </View>
    )
  }
}

const Add = props =>
  <TouchableOpacity
    onPress={props.onPressCallback}
    style={props.backgroundStyle} >
    <Text style={props.style}>+</Text>
  </TouchableOpacity>

const styles = StyleSheet.create({
  selectedListItem: {
    fontSize: 20,
    borderColor: '#808080',
    borderBottomWidth: 0.25,
    padding: 10
  },

  addButtonBackgroundStyle: {
    width: 50,
    height: 50,
    marginTop: 5,
    marginLeft: 5,
    backgroundColor: '#808080'
  },

  addButtonStyle: {
    fontSize: 35,
    color: '#FFF',
    alignSelf: 'center'
  }
});