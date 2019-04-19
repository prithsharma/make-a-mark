import React, { Component } from 'react';
import {
  Dimensions,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import Geocoder from '../../components/Geocoder';
import MapView from '../../components/MapView';
import LocationCard from '../../components/LocationCard';
import {
  markLocation,
  // unmarkLocation,
  getMarkedLocations,
} from '../../state';
import styles from './index.styles';

const { width: vpWidth } = Dimensions.get('window');
const CAROUSEL_WIDTH = vpWidth;
const CAROUSEL_ITEM_WIDTH = vpWidth * 0.67;
const HELP_SLIDE = { id: 'HELP' };

export class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: null,
      markers: [],
    };
  }

  onLocationSelect = (locationObj) => {
    const { dispatch } = this.props;

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
        setTimeout(() => this.carousel.snapToItem(index + 1, true, false), 100);
      },
    );
    dispatch(markLocation(locationObj));
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

  static renderLocationCard({ item }) {
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
          renderItem={this.constructor.renderLocationCard}
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

HomeScreen.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    markers: getMarkedLocations(state),
  };
}

export default connect(mapStateToProps)(HomeScreen);
