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

import CitiesList from './cities_list'
import AddNewCity from './add_new_city'

const WorldClock = StackNavigator({
  CitiesList: { screen: CitiesList },
  AddNewCity: { screen: AddNewCity }
});

export default WorldClock;