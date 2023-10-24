import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useBitcoinData = () => {
  const [dataTaimoor056, setDataTaimoor056] = useState(null);

  useEffect(() => {
    const loadBitcoinData = async () => {
      
      const existingData = await AsyncStorage.getItem('bitcoinData');

      if (existingData) {
        console.log("Fetching Data from AsyncStorage");
        setDataTaimoor056(JSON.parse(existingData));
      } else {
        console.log("Fetching Data from API");
        const apiUrl = 'https://api.coindesk.com/v1/bpi/currentprice.json';

        try {
          const response = await fetch(apiUrl);
          const data = await response.json();

       
          await AsyncStorage.setItem('bitcoinData', JSON.stringify(data));
          setDataTaimoor056(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    loadBitcoinData();
  }, []);

  return dataTaimoor056;
};
