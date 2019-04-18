import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import { getStorybookUI, configure } from '@storybook/react-native';
import { loadStories } from './storyLoader';

import './rn-addons';

// import stories
configure(() => {
  loadStories();
}, module);

// Refer to https://github.com/storybooks/storybook/tree/master/app/react-native#start-command-parameters
// To find allowed options for getStorybookUI
const StorybookUIRoot = getStorybookUI({});

/* eslint-disable-next-line react/prefer-stateless-function */
class StorybookUIHMRRoot extends Component {
  render() {
    return <StorybookUIRoot />;
  }
}

// If you are using React Native vanilla write your app name here.
// If you use Expo you can safely remove this line.
AppRegistry.registerComponent('makeAmark', () => StorybookUIHMRRoot);

export default StorybookUIRoot;
