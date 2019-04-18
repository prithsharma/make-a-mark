import React, { Component } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';
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
    const { style } = this.props;
    return (
      <View style={[styles.container, style]}>
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

Geocoder.propTypes = {
  style: ViewPropTypes.style,
  // showResults: PropTypes.bool,
};
Geocoder.defaultProps = {
  style: {},
  // showResults: true,
};

styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'rgba(216, 216, 216, 0.8)',
  },
  input: {
    borderRadius: 5,
  },
  resultList: {
    maxHeight: 100,
  },
});
