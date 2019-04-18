import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

let styles;

export default function Geocoder() {
  // eslint-disable-next-line react/prop-types
  function renderResultItem({ item }) {
    return (
      <Text>
        {item.title}
      </Text>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} />
      <FlatList
        data={[
          { key: 'result1', title: 'Place 1' },
          { key: 'result2', title: 'Place 2' },
          { key: 'result3', title: 'Place 3' },
        ]}
        renderItem={renderResultItem}
        style={styles.resultList}
      />
    </View>
  );
}

styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
  },
  resultList: {
    maxHeight: 100,
  },
});
