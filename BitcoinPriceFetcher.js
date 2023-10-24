// BitcoinPriceFetcher.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BitcoinPriceFetcher = () => {
  const [bitcoinData, setBitcoinData] = useState([]);
  const STORAGE_KEY = '@bitcoinData';

  useEffect(() => {
    const fetchBitcoinData = async () => {
      try {
        const savedData = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedData) {
          setBitcoinData(JSON.parse(savedData));
        } else {
          const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
          const data = await response.json();
          const bpiData = data.bpi;
          const bitcoinRecords = Object.values(bpiData);
          setBitcoinData(bitcoinRecords);
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(bitcoinRecords));
        }
      } catch (error) {
        console.error('Error fetching or saving data:', error);
      }
    };

    fetchBitcoinData();
  }, []);

  return (
    <View>
      <FlatList
        data={bitcoinData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>Currency: {item.code}</Text>
            <Text>Price: {item.rate}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default BitcoinPriceFetcher;
