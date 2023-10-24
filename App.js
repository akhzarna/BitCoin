import React, { useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import useGetApiHook from './useGetApiHook';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {

  const {data, getData} = useGetApiHook()
  const [screenData, setScreenData] = useState(null)

  const getBitcoinRecords = () => {
    getData("https://api.coindesk.com/v1/bpi/currentprice.json")
  }

  useEffect(()=>{
    getDataFromLocalStorage()  //getting data from the local storage
    getBitcoinRecords()
  },[])

  useEffect(()=>{
    if(!screenData){
      setScreenData(data)    //setting data in screen state from api
    }
  },[data])

  const getDataFromLocalStorage = async() => {
    const data = await AsyncStorage.getItem("bitcoinData")
    if(data){
      setScreenData(JSON.parse(data)) //setting data in screen state from local storage
    }
  }

  useEffect(()=>{
    if(screenData){
    }
  },[screenData])


  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={{
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 64,
        marginLeft: 16
      }}>Bitcoin Price Index</Text>
      <FlatList
        data={screenData}
        renderItem={({item})=>{
          return(
            <View style={{
              padding: 10,
              borderBottomWidth: 1,
              borderBottomColor: '#ccc',
              marginLeft: 8,

            }}>
              <Text style={{
                fontSize: 20,
                fontWeight: 'bold'
              }}>{item[1].code}</Text>
              <Text>{item[1].rate}</Text>
            </View>
          )
        }}
        keyExtractor={(item, index)=>index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
