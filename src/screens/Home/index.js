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
  addMarker,
  removeMarker,
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
      selectedLocationId: null,
      // settleCarousel:
    };
  }

  onLocationSelect = (locationObj) => {
    const { dispatch } = this.props;

    dispatch(addMarker(locationObj));
    this.setState(
      {
        // center: locationObj.center,
        selectedLocationId: locationObj.id,
      }, () => {
        const { markers } = this.props;
        const index = markers.findIndex(marker => marker.id === locationObj.id);
        setTimeout(() => this.carousel.snapToItem(index + 1, true, false), 300);
      },
    );
  }

  reset = () => {
    this.setState({
      // center: null,
      selectedLocationId: null,
    });
    this.carousel.snapToItem(0, true, false);
  }

  loadMarker = (slideIndex) => {
    if (slideIndex === 0) {
      this.reset();
    } else {
      const { markers } = this.props;
      this.setState({
        // center: markers[slideIndex - 1].center,
        selectedLocationId: markers[slideIndex - 1].id,
      });
    }
  }

  deleteMarker(locationObj) {
    const { dispatch } = this.props;
    dispatch(removeMarker(locationObj.id));
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
        onDelete={() => this.deleteMarker(item)}
        showDelete
      />
    );
  }

  render() {
    const { selectedLocationId } = this.state;
    const { markers } = this.props;
    let center;
    if (!selectedLocationId) {
      center = null;
    } else {
      const indexInStore = markers.findIndex(location => location.id === selectedLocationId);
      if (indexInStore > -1) {
        // eslint-disable-next-line prefer-destructuring
        center = markers[indexInStore].center;
      } else {
        console.log('BOOM');
      }
    }

    // if (indexInStore > -1) {
    //   const selectedIndex = indexInStore + 1;
    //   center = markers[indexInStore].center;
    //   setTimeout(() => this.carousel.snapToItem(selectedIndex + 1, true, false), 50);
    // } else {
    //   console.log('SKCSDLMCLSMCLDMLSD');
    //   center = null;
    // }

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

HomeScreen.propTypes = {
  dispatch: PropTypes.func.isRequired,
  markers: PropTypes.arrayOf(PropTypes.object).isRequired,
};

function mapStateToProps(state) {
  return {
    markers: getMarkedLocations(state),
  };
}

export default connect(mapStateToProps)(HomeScreen);
