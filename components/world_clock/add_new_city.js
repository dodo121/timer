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
  Keyboard
} from 'react-native';
import { connect } from 'react-redux'
import { newCityAdded } from '../../data/cities';

import Prompt from '../prompt';

import keysConfig from '../../config.js';

class AddNewCity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      showPrompt: false
    }
  }

  newItemSelected = (city) => {
    Keyboard.dismiss();
    this.props.onNewCityAdded(city);
    this.props.navigation.navigate('CitiesList')
  };

  searchForCity = (text) => {
    this.setState({text: text});
    if(text.length > 2) {
      this.fetchAutocompleteFromApi(this.state.text);
    }
  };

  fetchAutocompleteFromApi = (queryText) => {
    fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${queryText}
      &types=geocode&key=${keysConfig['googlePlaceAutocompleteApiKey']}`)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          citiesAutocompleteResults: responseJson.predictions.map(
            c => ({ name: c['description'], placeId: c['place_id'] })
          )
        });
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

const mapStateToProps = (state) => {
  //itemsSelected: state.value,
  //loading: state.loading
};

const mapDispatchToProps = (dispatch) => {
  return {
    onNewCityAdded: (city) => { dispatch(newCityAdded(city))}
  }
};

export default connect(null, mapDispatchToProps)(AddNewCity);
