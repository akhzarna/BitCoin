import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native'; // Import necessary modules
import { useBitcoinData } from './useBitcoinData'; // Import the custom hook

const App = () => {
  const bitcoinData = useBitcoinData();

  return (
    <View style={styles.container}>
      <FlatList
        data={bitcoinData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.currencyText}>Currency: {item.code}</Text>
            <Text style={styles.priceText}>Price: {item.rate}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0', // Background color
  },
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  currencyText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  priceText: {
    fontSize: 16,
  },
});

export default App;
