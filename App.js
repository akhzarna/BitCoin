// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
// import ApiComponent from "./component/ApiComponent";

// export default function App() {
//   return (
// 		<View style={styles.container}>
// 			<Text>Open up App.js to start working on your app!</Text>
// 			<ApiComponent />
// 			<StatusBar style="auto" />
// 		</View>
// 	);
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import React from "react";
import { View, Text, FlatList } from "react-native";
import ApiComponent from "./component/ApiComponent";

export default function App() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* <Text>Open up App.js to start working on your app!</Text> */}
      <ApiComponent />
    </View>
  );
}
