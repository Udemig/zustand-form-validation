import {View, Text} from 'react-native';
import React from 'react';
import useCounterStore from '../app/store';

export default function Counter() {
  const count = useCounterStore(state => state.count);

  return (
    <View>
      <Text>Counter {count}</Text>
    </View>
  );
}
