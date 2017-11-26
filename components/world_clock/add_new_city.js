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

import Prompt from '../prompt';

const keysConfig = require('../../config.json');

export default class AddNewCity extends Component {
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
      })
      .then(this.props.navigation.navigate('CitiesList', { reloadCities: true }));
  };

  searchForCity = (text) => {
    this.setState({text: text});
    if(text.length > 2) {
      this.fetchAutocompleteFromApi(this.state.text);
    }
  };

  fetchAutocompleteFromApi = (queryText) => {
    fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${queryText}
      &types=geocode&key=${keysConfig['googlePlaceApiKey']}`)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({citiesAutocompleteResults: responseJson.predictions.map(c => c['description'])});
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  };

  render() {
    const { navigate } = this.props.navigation;
    return(
      <View>
        <TextInput
          value={this.state.text}
          placeholder={'Search...'}
          onChangeText={(text) => { this.searchForCity(text) }} />
        <Prompt
          itemsToShow={this.state.citiesAutocompleteResults}
          itemSelected={(item) => this.newItemSelected(item)} />
      </View>
    )
  }
}