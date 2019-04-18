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
      markers: [],
    };
  }

  onLocationSelect = (locationObj) => {
    this.setState(state => ({
      center: locationObj.center,
      markers: [...state.markers, locationObj],
    }));
  }

  render() {
    const { center, markers } = this.state;
    console.log('home', markers);
    return (
      <View style={styles.container}>
        <MapView
          center={center}
          markedLocations={markers}
        />
        <Geocoder
          style={styles.searchBar}
          onResultSelect={this.onLocationSelect}
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
