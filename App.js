import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native';
import { fetchApiData } from './component/Api';
import * as Storage from './component/Storage';

export default function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedData = await Storage.getDataFromStorage();
        if (storedData) {
          setData(storedData);
          setIsLoading(false);
        } else {
          fetchDataAndStoreData();
        }
      } catch (error) {
        console.error('Error retrieving data from AsyncStorage:', error);
        fetchDataAndStoreData();
      }
    };

    loadData();
  }, []);

  const fetchDataAndStoreData = async () => {
    try {
      const apiData = await fetchApiData('https://api.coindesk.com/v1/bpi/currentprice.json');
      setData(apiData);
      setIsLoading(false);
      await Storage.saveDataToStorage(apiData);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginTop: 30 }}>
        {isLoading ? (
          <Text>Loading data...</Text>
        ) : data && data.bpi ? (
          <FlatList
            data={Object.keys(data.bpi).map((currency) => data.bpi[currency])}
            renderItem={({ item }) => (
              <View>
                <View style={{ flex: 0.50 }}>
                  <Text style={{ fontSize: 20, color: 'red' }}>{item.code}</Text>
                  <Text style={{ fontSize: 20 }}>{item.description}</Text>
                </View>
                <View style={{ flex: 0.25 }}>
                  <Text>{item.rate_float}</Text>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.code}
          />
        ) : (
          <Text>No data available.</Text>
        )}

        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
