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

export default class Prompt extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <View>
        <FlatList
          keyboardShouldPersistTaps='handled'
          data={this.props.itemsToShow}
          renderItem={({item}) =>
            <Text
              key={item}
              onPress={() => {this.props.itemSelected(item)}}
              style={styles.listItem}>{item.name}
            </Text>}
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
  }
});
