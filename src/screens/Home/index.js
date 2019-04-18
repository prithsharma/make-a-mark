import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import Geocoder from '../../components/Geocoder';
import MapView from '../../components/MapView';
import LocationCard from '../../components/LocationCard';

let styles;

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: null,
    };
  }

  render() {
    const { center } = this.state;
    return (
      <View style={styles.container}>
        <MapView
          center={center}
        />
        <Geocoder
          style={styles.searchBar}
        />
        <LocationCard style={styles.markersCarousel} />
      </View>
    );
  }
}

styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    position: 'absolute',
    top: 10,
  },
  markersCarousel: {
    position: 'absolute',
    bottom: 10,
    width: '70%',
    alignSelf: 'center',
  },
});
