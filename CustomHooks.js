import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

const CustomHooks = () => {

    const [responseData, setResponseData] = useState({});
  const [currencyData, setCurrencyData] = useState([]);


const GetAPIHooks = async(url) => {
  AsyncStorage.getItem('responsedata').then((data) => {
      if (data) {
        const locallyFetchedData = JSON.parse(data)
        setResponseData(locallyFetchedData);
      const currencies = locallyFetchedData.bpi;
      setCurrencyData(Object.keys(currencies).map((currency) => ({
        currency: currency,
        rate: currencies[currency].rate,
        symbol: currencies[currency].symbol,
      })))
      
      }
      else{
        axios.get(url).then((data) => {
      AsyncStorage.setItem('responsedata',JSON.stringify(data.data))  
      setResponseData(data.data);
      const currencies = data.data.bpi;
      setCurrencyData(Object.keys(currencies).map((currency) => ({
        currency: currency,
        rate: currencies[currency].rate,
        symbol: currencies[currency].symbol,
      })))
      })}
    })
}
    
    return {responseData, currencyData, GetAPIHooks}
}
export default CustomHooks;