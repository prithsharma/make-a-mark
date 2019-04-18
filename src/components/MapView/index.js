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

  componentWillReceiveProps(newProps) {
    const { center } = this.props;
    if (center !== newProps.center) {
      this.map.setCamera({
        centerCoordinate: newProps.center,
        duration: 1000,
        zoom: 10,
      });
    }
  }

  render() {
    const {
      center,
    } = this.props;

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
        {
          center && (
            <MapboxGL.PointAnnotation
              id="marker"
              coordinate={center}
            />
          )
        }
      </MapboxGL.MapView>
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
