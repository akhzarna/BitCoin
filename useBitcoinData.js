import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useBitcoinData = () => {
  const [bitcoinData, setBitcoinData] = useState(null);

  const fetchBitcoinData = async () => {
    try {
      const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
      const data = await response.json();

    
      await AsyncStorage.setItem('bitcoinData', JSON.stringify(data));
      setBitcoinData(data);
    } catch (error) {
      console.error('Error fetching Bitcoin data:', error);
    }
  };

  const loadBitcoinDataFromStorage = async () => {
    const storedData = await AsyncStorage.getItem('bitcoinData');
    if (storedData) {
      setBitcoinData(JSON.parse(storedData));
    } else {
      fetchBitcoinData();
    }
  };

  useEffect(() => {
    loadBitcoinDataFromStorage();
  }, []);

  return bitcoinData;
};
