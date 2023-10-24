import { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useFetchAndStore = (url) => {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('apiData');
      if (storedData) {
        setData(JSON.parse(storedData));
      } else {
        const response = await axios.get(url);
        setData(response.data);
        await AsyncStorage.setItem('apiData', JSON.stringify(response.data));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return data;
};

export default useFetchAndStore;