import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  ViewPropTypes,
} from 'react-native';

let styles;

export default function LocationCard(props) {
  const {
    title,
    address,
    style,
  } = props;
  return (
    <View style={[styles.container, style]}>
      <Text>{title}</Text>
      <Text>{address}</Text>
    </View>
  );
}

LocationCard.propTypes = {
  title: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  // onPress: PropTypes.function,
  // onDelete: PropTypes.function,
  style: ViewPropTypes.style,
};
LocationCard.defaultProps = {
  style: {},
};

styles = StyleSheet.create({
  container: {
    // margin: 10,
    borderRadius: 5,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    opacity: 0.8,
  },
});
