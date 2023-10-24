import React from 'react';
import { View, Text, FlatList, SafeAreaView } from 'react-native';
import FetchData from './hook/FetchData';


const API_URL = "https://api.coindesk.com/v1/bpi/currentprice.json";

const App = () => {
  const { data, loading } = FetchData(API_URL);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  const currencies = Object.values(data.bpi);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={currencies}
        keyExtractor={(item) => item.code}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomColor: '#ccc', borderBottomWidth: 1 }}>
            <Text>Code: {item.code}</Text>
            <Text>Rate: {item.rate}</Text>
            <Text>Description: {item.description}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default App;
