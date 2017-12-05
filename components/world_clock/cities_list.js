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
import { connect } from 'react-redux'

import { loadCities } from '../../data/cities';
import keysConfig from '../../config.js';
//import City from '../City.js';

class CitiesList extends Component {
  static navigationOptions = {
    title: 'World Clock',
    header: null
  };

  constructor(props) {
    super(props);
    //this.state = {
    //  itemsSelected: [],
    //  citiesLoaded: false
    //};
  };

  componentWillMount = () => {
    this.props.onLoadCities();
    //this.loadCities(true);
  };

  //loadCities = (fetchTimeOffset = false) => {
  //  AsyncStorage.getItem('citiesSelected').then((itemsSelectedAsString) => {
  //    let citiesSelected = JSON.parse(itemsSelectedAsString);
  //    if(fetchTimeOffset) {
  //      for(let city of citiesSelected) {
  //        let currentTime = new Date().getTime();
  //        console.log('city in loop', city);
  //        let cityLocation = Object.values(city.location).join(',');
  //        fetch(
  //          `https://maps.googleapis.com/maps/api/timezone/json?location=${cityLocation}&timestamp=${currentTime}&key=${keysConfig['googleTimeZoneApiKey']}`
  //        ).then((response) =>
  //            response.json()
  //        ).then((responseJson) => {
  //            console.log('time response', responseJson);
  //          })
  //      }
  //    }
  //    this.setState({
  //      itemsSelected: citiesSelected,
  //      citiesLoaded: true
  //    });
  //  });
        //  for(let [index, city] of itemsSelected.entries()) {
        //
        //  }
        //
        //  console.log(itemsSelected);
        //  for(let [index, city] of itemsSelected.entries()) {
        //    debugger;
        //    let location = Object.values(city.location).join(',');
      //  }
      //}
  //};

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

  //shouldComponentUpdate = (nextProps, nextState) => {
  //  AsyncStorage.getItem('citiesSelected').then(itemsSelectedStored => {
  //    if(nextState['itemsSelected'] && itemsSelectedStored) {
  //      if(nextState['itemsSelected'].length != JSON.parse(itemsSelectedStored).length) {
  //        this.loadCities();
  //      }
  //    } else {
  //      this.loadCities();
  //    }
  //  });
  //  return true;
  //};

  render() {
    const { navigate } = this.props.navigation;
    if(this.props.loading) {
      cities = <Text>'Loading data please wait...'</Text>;
    } else {
      cities = <FlatList
        data={this.props.itemsSelected}
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
        extraData={this.props}/>;
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

const mapStateToProps = (state) => ({
  itemsSelected: state.value,
  loading: state.loading
})

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadCities: () => { dispatch(loadCities())}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CitiesList);

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