// App.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import useCustomFetch from './useCustomFetch';

const App = () => {
  const { data, loading, error, fetchData } = useCustomFetch();

  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 60000); // Fetch data every minute

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error fetching data</Text>
      </View>
    );
  }

  console.log("Fetched data:", data); // Add this line to log the fetched data

  return (
    <View style={styles.container}>
      <FlatList
        data={Object.keys(data.bpi)}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.currencyText}>Currency: {data.bpi[item].code}</Text>
            <Text style={styles.updatedText}>Updated: {data.time.updated}</Text>
            <Text style={styles.rateText}>Bitcoin Rate: {data.bpi[item].rate}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 300,
    backgroundColor:'cyan',
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  currencyText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  updatedText: {
    fontSize: 16,
  },
  rateText: {
    fontSize: 14,
  },
});

export default App;
