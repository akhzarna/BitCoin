import React from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import useFetchAndStore from './useFetchAndStore';

const App = () => {
  const data = useFetchAndStore('https://api.coindesk.com/v1/bpi/currentprice.json');

  if (!data) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <FlatList
        data={Object.values(data.bpi)}
        keyExtractor={item => item.code}
        renderItem={({ item }) => (
          <View style={[styles.item, { backgroundColor: getRandomColor() }]}>
            <Text style={styles.text}>{item.description} ({item.code}): {item.rate}</Text>
          </View>
        )}
      />
    </View>
  );
};

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 8,
    borderRadius: 8,
  },
  text: {
    color: 'white', // Text color in the colored boxes
    fontSize: 16,
  },
});

export default App;






// import React from 'react';
// import { StatusBar } from 'expo-status-bar';
// import { SafeAreaView,StyleSheet, Text, View, FlatList } from 'react-native';
// import BitcoinDataScreen from "./component/BitcoinDataScreen";
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import useBitcoinData from './hooks/useBitcoinData';

// export default function App() {
//   const Stack = createStackNavigator();
//   const bitcoinData = useBitcoinData();

//   // Check if bitcoinData is null or undefined, show loading if it is
//   if (!bitcoinData) {
//     return (
//       <View style={styles.loadingContainer}>
//         <Text>Loading...</Text>
//       </View>
//     );
//   }

//   // bitcoinData is not null or undefined, proceed with rendering
//   return (
//     <SafeAreaView style={styles.container}>
//       <Text>Bitcoin Price</Text>
//       <FlatList
//         data={Object.entries(bitcoinData.bpi)}
//         keyExtractor={(item) => item[0]}
//         renderItem={({ item }) => (
//           <Text>{`${item[1].description}: ${item[1].rate}`}</Text>
//         )}
//       />
//     </SafeAreaView>
//   );
  
//   // const bitcoinData = useBitcoinData();
//   // console.log(bitcoinData);
//   // return (
//   //   <View>
//   //     <Text>Bitcoin Price</Text>
//   //     {bitcoinData ?  <FlatList
//   //         data={Object.entries(bitcoinData.bpi)}
//   //         keyExtractor={(item) => item[0]}
//   //         renderItem={({ item }) => (
//   //           <Text>{`${item[1].description}: ${item[1].rate}`}</Text>
//   //         )}
//   //       />:
//   //       <Text>Loading</Text>}
//   //   </View>
//   // );

//   // return (
//   //   <SafeAreaView style={{ flex: 1 }}>
//   //     <FlatList
//   //       data={Object.values(data)}
//   //       keyExtractor={(item, index) => index.toString()}
//   //       renderItem={({ item }) => (
//   //         <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
//   //           <Text>{`${item.code}: ${item.rate}`}</Text>
//   //         </View>
//   //       )}
//   //     />
//   //   </SafeAreaView>

//     // <SafeAreaView style={styles.container}>
//     //   <View style={styles.container}>
//     //     <BitcoinDataScreen /> {/* Render BitcoinDataStorage component */}
//     //   </View>
//     // </SafeAreaView>
//   //);
// }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// // });

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });