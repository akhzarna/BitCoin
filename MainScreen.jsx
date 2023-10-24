import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useBitcoinData } from './Components/BitcoinFetchAPI056';

const MainScreen = () => {
  const bitcoinTaimoor056 = useBitcoinData();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bitcoin Prices</Text>
      <FlatList
        data={bitcoinTaimoor056 ? Object.entries(bitcoinTaimoor056.bpi) : []}
        keyExtractor={(item) => item[0]}
        renderItem={({ item }) => (
          <View style={styles.dataItem}>
            <Text>
              {item[0]}: {item[1].rate} {item[1].description}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    backgroundColor:"#dee2e6"

  },
  dataItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
});

export default MainScreen;
