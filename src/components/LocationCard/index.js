import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewPropTypes,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

let styles;

export default function LocationCard(props) {
  const {
    title,
    address,
    style,
    showDelete,
    onDelete,
  } = props;
  return (
    <View style={[styles.container, style]}>
      <View style={styles.row}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        {showDelete && (
          <TouchableOpacity onPress={onDelete}>
            <Icon
              name="md-trash"
              size={24}
              style={styles.icon}
            />
          </TouchableOpacity>
        )}
      </View>
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
  showDelete: PropTypes.bool,
  onDelete: PropTypes.func,
  style: ViewPropTypes.style,
};
LocationCard.defaultProps = {
  style: {},
  showDelete: false,
  onDelete: Function.prototype,
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 20,
  },
  subtext: {
    fontSize: 16,
    marginTop: 10,
  },
  icon: {
    paddingHorizontal: 5,
  },
});
