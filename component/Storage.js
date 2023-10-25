// Storage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const DATA_STORAGE_KEY = 'apiData';

export const saveDataToStorage = async (data) => {
  try {
    await AsyncStorage.setItem(DATA_STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving data to AsyncStorage:', error);
  }
};

export const getDataFromStorage = async () => {
  try {
    const storedData = await AsyncStorage.getItem(DATA_STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : null;
  } catch (error) {
    console.error('Error retrieving data from AsyncStorage:', error);
    return null;
  }
};
