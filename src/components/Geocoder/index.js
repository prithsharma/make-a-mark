import React, { Component } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import GeocodingClient from '../../lib/mapsClient';

let styles;

export default class Geocoder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
    };
  }

  static renderResultItem({ item }) {
    return (
      <Text>
        {item.title}
      </Text>
    );
  }

  async onQuery(text) {
    try {
      const response = await GeocodingClient.forwardGeocode({
        query: text,
      }).send();
      this.setState({ results: response.body.features.map(f => f.place_name) });
    } catch (e) {
      // TODO: tell the user about it
    }
  }

  render() {
    const { results } = this.state;
    return (
      <View style={styles.container}>
        <TextInput
          onChangeText={text => this.onQuery(text)}
          style={styles.input}
        />
        <FlatList
          data={results.map(f => ({ key: f, title: f }))}
          renderItem={this.constructor.renderResultItem}
          style={styles.resultList}
        />
      </View>
    );
  }
}

styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
  },
  resultList: {
    maxHeight: 100,
  },
});
