import React from 'react'
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


const CustomApiHook = () => {
    const [bitcoinData, setBitcoinData] = useState([]);
    const STORAGE_KEY = "bitcoinData";
  
    useEffect(() => {
        // 1. Send an HTTP GET request using fetch
        AsyncStorage.getItem(STORAGE_KEY).then((bitcoinData) => {
          if (bitcoinData) {
            setBitcoinData(JSON.parse(bitcoinData));
            console.log(`Data ALready`)
          } else {
            fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
              .then((response) => response.json())
              .then((bitcoinData) => {
                // 2. Fetch records and save them locally using Async Storage
                AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(bitcoinData.bpi));
                setBitcoinData(bitcoinData.bpi);
                console.log(`First Time Data Stored`)
              })
              .catch((error) => console.error("API Error:", error));
          }
        });
      }, []);

      return {bitcoinData}
}

export default CustomApiHook