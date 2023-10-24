// useBitcoinData.js
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@bitcoinData';

export function useBitcoinData() {
  const [bitcoinData, setBitcoinData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const savedData = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedData) {
          setBitcoinData(JSON.parse(savedData));
        }

        const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
        const data = await response.json();
        const bpiData = data.bpi;
        const bitcoinRecords = Object.values(bpiData);
        setBitcoinData(bitcoinRecords);

        // Save the data in local storage
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(bitcoinRecords));
      } catch (error) {
        console.error('Error fetching or saving data:', error);
      }
    };

    fetchData();
  }, []);

  return bitcoinData;
}
