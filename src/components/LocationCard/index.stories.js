import React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import LocationCard from './index';

storiesOf('LocationCard', module).add(
  'default',
  () => (
    <View style={{ backgroundColor: '#1E1919' }}>
      <LocationCard
        title="St. Hedwig Hospital"
        address="Große Hamburger Str. 5-11, 10115 Berlin, Germany"
      />
    </View>
  ),
);
