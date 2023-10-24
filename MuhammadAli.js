import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import useApi from './useApi';
import useLocalStorage from './useLocalStorage';

const MuhammadAli = () => {
  const apiUrl = 'https://api.coindesk.com/v1/bpi/currentprice.json';
  const { data: apiBitcoinData, loading: apiLoading } = useApi(apiUrl);
  const { value: localBitcoinData, saveToLocalStorage } = useLocalStorage('bitcoinData', []);

  const [bitcoinData, setBitcoinData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      console.log('Fetching data...');
      try {
        if (!apiLoading && localBitcoinData.length === 0) {
          // Fetch from API and save to local storage
          await saveToLocalStorage(apiBitcoinData);
          console.log('Data fetched from API and saved to local storage:', apiBitcoinData);
          // Set the state with the fetched data
          setBitcoinData(apiBitcoinData);
        } else {
          console.log('Data already fetched from local storage:', localBitcoinData);
          // Set the state with the local storage data
          setBitcoinData(localBitcoinData);
        }
      } catch (error) {
        console.error('Error fetching Bitcoin data:', error);
      }
    };

    fetchData();
  }, [apiLoading, apiBitcoinData, localBitcoinData, saveToLocalStorage]);

  const clearData = async () => {
    try {
      // Clear the data from local storage
      await saveToLocalStorage([]);
      // Update the state after clearing local storage
      setBitcoinData([]);
      console.log('Data cleared from local storage');
    } catch (error) {
      console.error('Error clearing Bitcoin data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bitcoin Price Index</Text>
      {apiLoading ? (
        <Text>Loading from API...</Text>
      ) : (
        <FlatList
          data={bitcoinData}
          keyExtractor={(item) => item.currency}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.currency}>{item.currency}</Text>
              <Text style={styles.rate}>{item.rate}</Text>
            </View>
          )}
        />
      )}
      <TouchableOpacity onPress={clearData} style={styles.clearButton}>
        <Text style={styles.clearButtonText}>Clear Data</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  currency: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  rate: {
    marginLeft: 10,
    fontSize: 16,
  },
  clearButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  clearButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },

});

export default MuhammadAli;
