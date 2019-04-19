import PropTypes from 'prop-types';
import React from 'react';
import { ActivityIndicator } from 'react-native';


export default function SectionSpinner(props) {
  const {
    visible,
    ...rest
  } = props;

  const spinner = visible ? <ActivityIndicator {...rest} /> : null;
  return spinner;
}
SectionSpinner.propTypes = {
  color: PropTypes.string,
  visible: PropTypes.bool,
};
SectionSpinner.defaultProps = {
  color: '#0C161C',
  visible: false,
};
