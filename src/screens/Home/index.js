import React, { Component } from 'react';
import {
  Dimensions,
  View,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Geocoder from '../../components/Geocoder';
import MapView from '../../components/MapView';
import LocationCard from '../../components/LocationCard';
import styles from './index.styles';
import { addMarker, removeMarker } from './actions';


const { width: vpWidth } = Dimensions.get('window');
const CAROUSEL_WIDTH = vpWidth;
const CAROUSEL_ITEM_WIDTH = vpWidth * 0.67;
const HELP_SLIDE = { id: 'HELP' };

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: null,
      markers: [],
    };
  }

  onLocationSelect = (locationObj) => {
    this.setState(
      (state) => {
        let newMarkers = state.markers;
        if (!state.markers.map(m => m.id).includes(locationObj.id)) {
          newMarkers = [...state.markers, locationObj];
        }
        return {
          center: locationObj.center,
          markers: newMarkers,
          carouselIndex: newMarkers.length,
        };
      },
      () => {
        const { markers } = this.state;
        const index = markers.findIndex(marker => marker.id === locationObj.id);
        setTimeout(() => this.carousel.snapToItem(index + 1, true, false), 50);
      },
    );

    addMarker(locationObj);
  }

  reset = () => {
    this.setState({
      center: null,
    });
    this.carousel.snapToItem(0, true, false);
  }

  loadMarker = (slideIndex) => {
    if (slideIndex === 0) {
      this.reset();
    } else {
      this.setState(
        ({ markers }) => ({
          center: markers[slideIndex - 1].center,
        }),
      );
    }
  }

  removeFromState(item) {
    const newCarouselIndex = this.carousel.currentIndex - 1;
    this.carousel.snapToPrev();
    this.loadMarker(newCarouselIndex);

    this.setState(
      (state) => {
        const newMarkers = state.markers.filter(marker => marker.id !== item.id);
        return {
          ...state,
          markers: newMarkers,
        };
      },
    );

    removeMarker(item);
  }

  renderLocationCard = ({ item }) => {
    if (item.id === 'HELP') {
      return (
        <LocationCard
          style={styles.markersCarousel}
          title="All your markers"
          address="Search and select a location from the search bar to start marking"
        />
      );
    }

    return (
      <LocationCard
        style={styles.markersCarousel}
        title={item.text}
        address={item.place_name}
        showDelete
        onDelete={() => this.removeFromState(item)}
      />
    );
  }

  render() {
    const { center, markers } = this.state;
    return (
      <View style={styles.container}>
        <MapView
          center={center}
          markedLocations={markers}
        />
        <Geocoder
          style={styles.searchBar}
          onResultSelect={this.onLocationSelect}
          onPressClear={this.reset}
        />
        <Carousel
          ref={(c) => { this.carousel = c; }}
          data={[HELP_SLIDE, ...markers]}
          renderItem={this.renderLocationCard}
          sliderWidth={CAROUSEL_WIDTH}
          slideStyle={styles.slideStyle}
          itemWidth={CAROUSEL_ITEM_WIDTH}
          containerCustomStyle={styles.markersCarousel}
          onSnapToItem={this.loadMarker}
        // contentContainerCustomStyle={{ flex: 1 }}
        />
      </View>
    );
  }
}
