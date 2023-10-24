import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import getData from './CustomHooks/GetHook';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { endAsyncEvent } from 'react-native/Libraries/Performance/Systrace';
export default function App() {
  const [currency, setCurrency] = useState([])
  useEffect(() => {
    const saveDataToDB = async (data) => {
      await AsyncStorage.setItem('data', JSON.stringify(data))
    }
    const getDataFromDB = async () => {
      const data = await AsyncStorage.getItem('data')
      return JSON.parse(data)
    }
    getDataFromDB().then(data => {
      if (data) {
        setCurrency(data)
      } else {
        getData().then(data => {
          const currencyData = Object.keys(data.bpi).map((currencyCode) => ({
            code: data.bpi[currencyCode].code,
            symbol: data.bpi[currencyCode].symbol,
            rate: data.bpi[currencyCode].rate,
            description: data.bpi[currencyCode].description,
            rate_float: data.bpi[currencyCode].rate_float,
          }));
          setCurrency(currencyData)
          saveDataToDB(currencyData)
        })

      }
    })

  }, [])
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={currency}
        renderItem={({ item, index }) => {
          return (
            <>
              <Text style={{ color: 'black', fontSize: 15, flex: 1 }}>{item.code}</Text>
              <Text style={{ color: 'black', fontSize: 15, flex: 1 }}>{item.rate}</Text>
            </>
          )
        }}
        keyExtractor={item => item.code}
      />
      <StatusBar style="auto" />
    </View>
  );
}

