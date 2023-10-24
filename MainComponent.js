import React from 'react';
import { View, Text, FlatList, StyleSheet} from 'react-native';
import { useBitcoinData } from './useBitcoinData';

export default function MainComponent() {
  const bitcoinData = useBitcoinData();

  return (
    <View style={styles.container}>
      <Text>Bitcoin Rate Data:</Text>
      {bitcoinData ? (
        <FlatList
          data={Object.entries(bitcoinData.bpi)}
          keyExtractor={(item) => item[0]}
          renderItem={({ item }) => (
            <View>
              <Text>{item[1].description}</Text>
              <Text>Rate: {item[1].rate}</Text>
            </View>
          )}
        />
      ) : (
        <Text>Loading data...</Text>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
