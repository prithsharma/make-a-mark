import React, { Component } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewPropTypes,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Snackbar from 'react-native-snackbar';
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
      this.setState({
        results: response.body.features,
        showResults: true,
      });
    } catch (e) {
      Snackbar.show({
        title: 'Error fetching location results. Please try again later.',
        duration: Snackbar.LENGTH_LONG,
      });
    }
  }

  clearCallback = () => {
    const { onPressClear } = this.props;
    this.input.clear();
    this.input.blur();
    onPressClear();
  }

  resultSelectCallback(item) {
    const {
      onResultSelect,
    } = this.props;
    this.setState({
      showResults: false,
    });
    this.input.clear();
    this.input.blur();
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
        <View style={styles.inputContainer}>
          <TextInput
            onChangeText={text => this.onQuery(text)}
            style={styles.input}
            ref={(ref) => { this.input = ref; }}
          />
          <Icon
            name="md-refresh"
            size={25}
            onPress={this.clearCallback}
          />
        </View>
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
  onPressClear: PropTypes.func,
};
Geocoder.defaultProps = {
  style: {},
  onResultSelect: Function.prototype,
  onPressClear: Function.prototype,
};

styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'rgba(216, 216, 216, 0.8)',
  },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  input: {
    borderRadius: 5,
    flex: 1,
  },
  resultList: {
    maxHeight: 100,
  },
});
