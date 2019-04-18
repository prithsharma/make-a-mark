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
      showResults: true,
    };
  }

  async onQuery(text) {
    if (text.trim() === '') {
      this.setState({
        results: [],
      });
      return;
    }

    try {
      const response = await GeocodingClient.forwardGeocode({
        query: text,
        countries: ['DE'],
      }).send();
      console.log(response.body.features);
      this.setState({
        results: response.body.features,
        showResults: true,
      });
    } catch (e) {
      // TODO: tell the user about it
    }
  }

  resultSelectCallback(item) {
    const {
      onResultSelect,
    } = this.props;
    this.setState({
      showResults: false,
    });
    onResultSelect(item);
  }

  renderResultItem = ({ item }) => (
    <Text onPress={() => this.resultSelectCallback(item)}>
      {item.place_name}
    </Text>
  )

  render() {
    const {
      results,
      showResults,
    } = this.state;
    const { style } = this.props;

    return (
      <View style={[styles.container, style]}>
        <TextInput
          onChangeText={text => this.onQuery(text)}
          style={styles.input}
        />
        {
          showResults && (
            <FlatList
              data={results.map(result => ({ key: result.id, ...result }))}
              renderItem={this.renderResultItem}
              style={styles.resultList}
            />
          )
        }
      </View>
    );
  }
}

Geocoder.propTypes = {
  style: ViewPropTypes.style,
  onResultSelect: PropTypes.func,
  // showResults: PropTypes.bool,
};
Geocoder.defaultProps = {
  style: {},
  // showResults: true,
  onResultSelect: Function.prototype,
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
