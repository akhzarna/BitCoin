import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const FetchData = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const localData = await AsyncStorage.getItem(url);

        if (localData) {
          setData(JSON.parse(localData));
          setLoading(false);
        } else {
          const response = await axios.get(url);
          await AsyncStorage.setItem(url, JSON.stringify(response.data));
          setData(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading };
};

export default FetchData;
