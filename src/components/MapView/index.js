import React, { Component } from 'react';
import Config from 'react-native-config';
import MapboxGL from '@mapbox/react-native-mapbox-gl';
import {
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

MapboxGL.setAccessToken(Config.MAPBOX_ACCESS_TOKEN);
let styles;
const DEFAULT_CENTER = [10.018343, 51.133481];

export default class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps(newProps) {
    const { center } = this.props;

    if (!newProps.center) {
      this.map.setCamera({
        centerCoordinate: DEFAULT_CENTER,
        duration: 700,
        zoom: 5,
      });
    } else if (center !== newProps.center) {
      this.map.setCamera({
        centerCoordinate: newProps.center,
        duration: 700,
        zoom: 12,
      });
    }
  }

  renderMarkers() {
    const {
      markedLocations,
    } = this.props;

    const markers = markedLocations.map(({ center: coordinate }) => {
      const key = `${coordinate[0]},${coordinate[1]}`;
      return (
        <MapboxGL.PointAnnotation
          key={key}
          id={`marker${key}`}
          coordinate={coordinate}
        />
      );
    });

    return markers;
  }

  render() {
    return (
      <MapboxGL.MapView
        style={styles.mapContainer}
        styleURL="mapbox://styles/mapbox/dark-v9"
        visibleCoordinateBounds={[
          [10.018343 - 5, 51.133481 - 5],
          [10.018343 + 5, 51.133481 + 5],
        ]}
        ref={(ref) => { this.map = ref; }}
      >
        {this.renderMarkers()}
      </MapboxGL.MapView>
    );
  }
}

MapView.propTypes = {
  center: PropTypes.arrayOf(PropTypes.number),
  markedLocations: PropTypes.arrayOf(PropTypes.object),
};
MapView.defaultProps = {
  center: null,
  markedLocations: [],
};

styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
  },
});
