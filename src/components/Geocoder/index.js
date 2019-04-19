import React, { Component } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewPropTypes,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Snackbar from 'react-native-snackbar';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import { SectionSpinner as Spinner } from '../Spinner';
import GeocodingClient from '../../lib/mapsClient';


let styles;

export default class Geocoder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      isLoading: false,
      showResults: true,
    };
  }

  async onQuery(text) {
    this.setState({
      isLoading: true,
    });

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

    this.setState({
      isLoading: false,
    });
  }

  clearCallback = () => {
    const { onPressClear } = this.props;
    this.input.clear();
    this.input.blur();
    onPressClear();
    this.setState({
      showResults: false,
    });
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

  static renderResultSeparator() {
    return (
      <View style={styles.separator} />
    );
  }

  renderResultItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => this.resultSelectCallback(item)}
      style={styles.resultItem}
    >
      <Text>
        {item.place_name}
      </Text>
    </TouchableOpacity>
  )

  renderIcon() {
    const { isLoading } = this.state;
    if (isLoading) {
      return <Spinner visible />;
    }

    return (
      <Icon
        name="md-expand"
        size={25}
        onPress={this.clearCallback}
      />
    );
  }

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
            onChangeText={debounce(text => this.onQuery(text), 400)}
            style={styles.input}
            ref={(ref) => { this.input = ref; }}
          />
          {this.renderIcon()}
        </View>
        {
          showResults && (
            <FlatList
              data={results.map(result => ({ key: result.id, ...result }))}
              renderItem={this.renderResultItem}
              ItemSeparatorComponent={this.constructor.renderResultSeparator}
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
    maxHeight: 250,
  },
  resultItem: {
    padding: 8,
  },
  separator: {
    backgroundColor: 'rgba(0, 0, 0, 0.12)',
    height: 1,
  },
});
