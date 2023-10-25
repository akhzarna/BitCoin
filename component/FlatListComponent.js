import React, { useEffect } from "react";
import { useState } from "react";
import { FlatList, Text, View, StyleSheet } from "react-native";
import fetchData from "../hooks/StorageHook";
import he from "he";

const API_URL = "https://api.coindesk.com/v1/bpi/currentprice.json";

const FlatListComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData(API_URL)
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);


  return !data ? (
    <View style={styles.loadingContainer}>
      <Text style={styles.loadingText}>Loading ...</Text>
    </View>
  ) : (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.timeText}>{data.time.updated}</Text>
        <Text style={styles.title}>{data.chartName}</Text>
        <Text style={styles.disclaimer}>
          <Text
            style={{ fontSize: 18, fontWeight: "bold", fontStyle: "italic" }}
          >
            Disclaimer
          </Text>
          {"\n"}
          {data.disclaimer}
        </Text>
      </View>
      <FlatList
        data={data ? Object.keys(data.bpi) : []}
        keyExtractor={(item) => item}
        renderItem={({ item }) => {
          return (
            <View style={styles.listItem}>
              <Text style={styles.itemTitle}>{data.bpi[item].description}</Text>
              <Text style={styles.itemSymbol}>{he.decode(data.bpi[item].symbol)+" "+data.bpi[item].code}</Text>
              <Text style={styles.itemRate}>{data.bpi[item].rate}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "italic",
  },
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  timeText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#007AFF", // Blue color for the time
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  disclaimer: {
    backgroundColor: "green",
    padding: 20,
    borderRadius: 15,
    fontSize: 16,
    color: "#fff",
    fontStyle: "italic",
    marginTop: 10,
    textAlign: "center",
  },
  listItem: {
    backgroundColor: "#007AFF", 
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.62,
    elevation: 4,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF", 
    marginBottom: 5,
  },
  itemSymbol: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
    marginTop: 5,
  },
  itemRate: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
  },
});

export default FlatListComponent;
