import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const useCustomFetch = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json');
      const result = response.data;
      await AsyncStorage.setItem('bitcoinData', JSON.stringify(result));
      setData(result);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data: ', error);
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('bitcoinData');
        if (storedData) {
          setData(JSON.parse(storedData));
          setLoading(false);
        } else {
          await fetchData();
        }
      } catch (error) {
        console.error('Error retrieving data: ', error);
        setError(error);
        setLoading(false);
      }
    };

    getData();
  }, []);

  return { data, loading, error, fetchData };
};

export default useCustomFetch;
