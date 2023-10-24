

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomHooks from './CustomHooks';


const App = () => {
  const [res, setResponseData] = useState({});
  const [currData, setCurrencyData] = useState([]);
  const {responseData, currencyData, GetAPIHooks} = CustomHooks();


  useEffect(() => {

    GetAPIHooks('https://api.coindesk.com/v1/bpi/currentprice.json');

    }, []);
  

  // const renderItem = ({ item }) => (
    
  // );

  return (
    <View style={styles.container}>
      <FlatList
        data={currencyData}
        renderItem={({item}) =>
         
          <View style={styles.card}>
      <Text style={styles.currency}>{item.currency}</Text>
      <Text style={styles.rate}>{item.rate}</Text>
    </View>
        }
        keyExtractor={(item) => item.currency}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:40
  },
  card: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  currency: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  rate: {
    fontSize: 16,
    color: 'green',
  },
  symbol: {
    fontSize: 16,
  },
});

export default App;
