import React, { ReactNode } from 'react';
import {
  GestureResponderEvent,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';

import style from './Button.style';

type Props = {
  onPress: (event: GestureResponderEvent) => void;
  children: ReactNode;
};

const Button = ({ onPress, children }: Props) => (
  <TouchableOpacity onPress={onPress}>
    <View style={style.container}>
      <Text>{children}</Text>
    </View>
  </TouchableOpacity>
);

export default Button;
