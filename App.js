import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import ApiComponent from "./component/ApiComponent";

export default function App() {

  const [data070, setData070] = useState(null);
  async function getData(){
    const res = await AsyncStorage.getItem("data");
    if (res !== null){
      console.log("Response in app")
      setData070(JSON.parse(res));

    } 
  }
  useEffect(()=>{
    

    getData();
  },[])

  const renderItem = ({ item }) => (
    <View>
        <Text> Bitcoin exchange rate for {item.symbol} </Text>
      
      <Text > {item.rate} </Text>
    </View>
  );


  return (
		<View style={styles.container}>
			
			<ApiComponent/>


        

      <View style={{flex: 1, paddingTop: '40%'}}>
      <FlatList
        data={data070}
        renderItem={renderItem}
      />
      </View>
 
    
      

			<StatusBar style="auto" />

      
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
