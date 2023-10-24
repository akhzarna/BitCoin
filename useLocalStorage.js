// useLocalStorage.js

import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(defaultValue);

  const saveToLocalStorage = async (data) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
      setValue(data);
    } catch (error) {
      console.error('Error saving to local storage:', error);
    }
  };

  const clearLocalStorage = async () => {
    try {
      await AsyncStorage.removeItem(key);
      setValue(defaultValue);
    } catch (error) {
      console.error('Error clearing local storage:', error);
    }
  };

  useEffect(() => {
    const loadFromLocalStorage = async () => {
      try {
        const storedValue = await AsyncStorage.getItem(key);
        if (storedValue !== null) {
          setValue(JSON.parse(storedValue));
        }
      } catch (error) {
        console.error('Error loading from local storage:', error);
      }
      
    };

    loadFromLocalStorage();
  }, [key]);

  return { value, saveToLocalStorage, clearLocalStorage };
};

export default useLocalStorage;
