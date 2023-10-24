import React, { useEffect, useState } from "react";
import { Text, View, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomApiHook from "./CustomApiHook";
const ApiComponent = () => {
  //   const [bitcoinData, setBitcoinData] = useState([]);
  //   const STORAGE_KEY = "bitcoinData";

  const { bitcoinData } = CustomApiHook();

  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ flex: 0.2, marginTop: 30, fontSize: 20 }}>
        Bitcoin Price Data:
      </Text>
      {/* 3. Use Custom Hooks to fetch data and save it to local DB */}
      <FlatList
        style={{ flex: 0.7 }}
        data={Object.entries(bitcoinData)}
        keyExtractor={(item) => item[0]}
        renderItem={({ item }) => (
          <Text style={{ fontSize: 30 }}>
            {/* {item.chartName} */}
            {item[0]}: {item[1].rate}
            {item[1].description}
          </Text>
        )}
      />
    </View>
  );
};

export default ApiComponent;
