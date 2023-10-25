import React from 'react';
import { View, Text, FlatList, SafeAreaView, StyleSheet } from 'react-native';
import FetchData from './hook/FetchData';

const API_URL = "https://api.coindesk.com/v1/bpi/currentprice.json";

const App = () => {
  const { data, loading } = FetchData(API_URL);

  if (loading) {
    return <Text style={styles.loadingText}>Loading...</Text>;
  }

  const currencies = Object.values(data.bpi);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Cryptocurrency Rates</Text>
      <FlatList
        data={currencies}
        keyExtractor={(item) => item.code}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.codeText}>Code: {item.code}</Text>
            <Text style={styles.rateText}>Rate: {item.rate}</Text>
            <Text style={styles.descriptionText}>Description: {item.description}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    marginTop:20
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  card: {
    backgroundColor: '#FFF',
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  codeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  rateText: {
    fontSize: 16,
    marginTop: 10,
    color: '#8E44AD',
  },
  descriptionText: {
    fontSize: 14,
    marginTop: 10,
    color: '#7F8C8D',
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: '#34495E',
  },
});

export default App;
