import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import ApiComponent from "./component/ApiComponent";

export default function App() {

  const [data057, setData057] = useState(null);
  async function dbData(){
    const res = await AsyncStorage.getItem("btc");
    if (res !== null){
      
      setData057(JSON.parse(res));

    } 
  }
  useEffect(()=>{
    

    dbData();
  },[])

  const renderItem = ({ item }) => (
    <View style={ }>
      
      
      
      
      <Text > {item.rate} </Text>
      <Text > {item.symbol} </Text>
      
    </View>
  );


  return (
		<View style={styles.container}>
			
			<ApiComponent/>


      <View style={{flex: 1, paddingTop: '20%'}}>
      <FlatList
        data={data057}
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
