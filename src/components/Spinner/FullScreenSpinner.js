import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import SectionSpinner from './SectionSpinner';

const colors = {
  white: '#FFFFFF',
  background: '#304550',
};

let styles;
export default function FullScreenSpinner(props) {
  const {
    visible,
  } = props;

  if (visible) {
    return (
      <View style={styles.container}>
        <SectionSpinner
          color={colors.white}
          size="large"
          visible
        />
      </View>
    );
  }
  return null;
}
styles = {
  container: {
    backgroundColor: colors.background,
    opacity: 0.7,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'center',
  },
};

FullScreenSpinner.propTypes = {
  visible: PropTypes.bool,
  // style: View.propTypes.style,
};
FullScreenSpinner.defaultProps = {
  visible: false,
  // style: {},
};
