import React, { Component } from 'react';
import Config from 'react-native-config';
import MapboxGL from '@mapbox/react-native-mapbox-gl';
import {
  StyleSheet,
} from 'react-native';

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
      />
    );
  }
}

styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
  },
});
