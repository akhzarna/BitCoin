import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BitcoinData = () => {
  const [data, setData] = useState(null);

  const getDataFromApi = async () => {
    try {
      const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
      const responseData = await response.json();
      await AsyncStorage.setItem('BCD', JSON.stringify(responseData));
      setData(responseData);
    } catch (error) {
      console.error('Error fetching and storing data in local DB:', error);
    }
  };

  const getDataLocally = async () => {
    try {
      const storedData = await AsyncStorage.getItem('BCD');
      if (storedData !== null) {
        setData(JSON.parse(storedData));
      } else {
        getDataFromApi();
      }
    } catch (error) {
      console.error('Error retrieving data from local DB:', error);
    }
  };

  useEffect(() => {
    getDataLocally();
  }, []);

  return { data };
};

const App = () => {
  const { data } = BitcoinData();

  return (
    <View style={{ flex: 1, padding: 16, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 35, fontWeight: 'bold', paddingTop: 100, paddingBottom: 20 }}>Data from API</Text>
      {data ? (
        <FlatList
          horizontal
          data={Object.entries(data.bpi)}
          keyExtractor={(item) => item[0]}
          renderItem={({ item }) => (
            <View style={{ padding: 100, backgroundColor: '#e8e8e8', margin: 10, borderRadius: 20 }}>
              <Text style={{ paddingBottom: 10, textAlign: 'center', fontWeight: 'bold', fontSize: 40 }}>Data</Text>
              <Text>
                {item[1].code}: {item[1].rate}
              </Text>
            </View>
          )}
        />
      ) : (
        <Text>Getting data from API</Text>
      )}
    </View>
  );
};

export default App;
