// BitcoinPriceTracker.js
import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useBitcoinData } from './useBitcoinData';

const BitcoinPriceTracker = () => {
  const bitcoinData = useBitcoinData();

  return (
    <View>
      <Text>Bitcoin Price Tracker</Text>
      <FlatList
        data={bitcoinData}
        keyExtractor={(item) => item.code}
        renderItem={({ item }) => (
          <Text>{`${item.code}: ${item.rate}`}</Text>
        )}
      />
    </View>
  );
};

export default BitcoinPriceTracker;
