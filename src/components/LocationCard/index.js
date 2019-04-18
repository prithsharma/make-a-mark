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
      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
      <Text style={styles.subtext} numberOfLines={3}>
        {address}
      </Text>
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
    width: '98%',
    margin: 2,
    borderRadius: 5,
    padding: 10,
    justifyContent: 'space-evenly',
    height: 120,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  subtext: {
    fontSize: 16,
    marginTop: 10,
  },
});
