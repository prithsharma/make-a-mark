import React, { Component } from 'react';
import Config from 'react-native-config';
import MapboxGL from '@mapbox/react-native-mapbox-gl';
import {
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

MapboxGL.setAccessToken(Config.MAPBOX_ACCESS_TOKEN);
let styles;

export default class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <MapboxGL.MapView
        style={styles.mapContainer}
        styleURL="mapbox://styles/mapbox/dark-v9"
      />
    );
  }
}

MapView.propTypes = {
  center: PropTypes.arrayOf(PropTypes.number),
};
MapView.defaultProps = {
  center: null,
};

styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
  },
});
