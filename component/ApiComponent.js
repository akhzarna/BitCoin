import axios from "axios";
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ApiComponent = () => {
  const [data, setData] = useState(); // Initialize data as an empty array
  const [screenData, setScreenData] = useState(null)

  useEffect(() => {
    // Define the API endpoint
    const apiUrl = "https://api.coindesk.com/v1/bpi/currentprice.json"; // Example API

    // Make an API request
    axios
      .get(apiUrl)
      .then((response) => {
        console.log("API Response:", response.data);
		setData(response.data);           //converting into array
        const arr = Object.entries(response.data.bpi);
        // AsyncStorage.setItem("bitcoinData", JSON.stringify(arr));
      })
      .catch((error) => {
        console.error("API Error:", error);
      });

	  getDataFromLocalStorage() 

  }, []);




  useEffect(()=>{
    if(!screenData){
      setScreenData(data)    //setting data in screen state from api
    }
  },[data])

  const getDataFromLocalStorage = async() => {
    const data = await AsyncStorage.getItem("bitcoinData")
    if(data){
		console.log("Getting data from async storage")
      setScreenData(JSON.parse(data)) //setting data in screen state from local storage
    }
  }

  useEffect(()=>{
    if(screenData){
    }
  },[screenData])

  return (
    <View style={styles.container}>
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default ApiComponent;
