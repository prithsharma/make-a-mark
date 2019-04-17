/**
 * @format
 */

import 'react-native';
import React from 'react';
import { shallow } from 'react-native-testing-library';
import App from '../App';

// Note: test renderer must be required after react-native.
// import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const comp = shallow(<App />);

  expect(comp.output).toMatchSnapshot();
});
