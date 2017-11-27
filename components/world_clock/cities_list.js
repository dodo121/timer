import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  TextInput,
  FlatList,
  StyleSheet,
  AsyncStorage,
  TouchableOpacity,
  TouchableHighlight,
  Alert
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
    console.log('load cities');
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

  deleteCityAlert = (city) => {
    Alert.alert(
      city.name,
      'Do you want to remove?',
      [
        {text: 'Yes', onPress: () => this.deleteCity(city)},
        {text: 'Cancel'}
      ]
    );
  };

  deleteCity = (city) => {
    AsyncStorage.getItem('citiesSelected').then((citiesSelectedAsString) => {
      let citiesSelected = JSON.parse(citiesSelectedAsString);
      indexOfCityToRemove = citiesSelected.findIndex((el) => el['placeId'] == city['placeId']);
      citiesSelected.splice(indexOfCityToRemove, 1);
      AsyncStorage.setItem('citiesSelected', JSON.stringify(citiesSelected), this.loadCities());
    });
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
        renderItem={({item}) =>
          <View>
            <TouchableHighlight
              onLongPress={() => this.deleteCityAlert(item)}
              underlayColor='#D3D3D3'>
              <Text
                key={item}
                style={styles.selectedListItem}>
                {item.name}
              </Text>
            </TouchableHighlight>
          </View>
        }
        extraData={this.state}/>;
    } else {
      cities = <Text>'Loading data please wait...'</Text>;
    }
    return(
      <View>
        <Add
          onPressCallback={() => {navigate('AddNewCity')}}
          backgroundStyle={styles.addButtonBackgroundStyle}
          style={styles.addButtonStyle} />
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

//const CitiesList = props =>

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