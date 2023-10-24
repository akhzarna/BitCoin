import { useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useGetApiHook = () => {
  const [data, setData] = useState(null);

  const getData = async (url) => {
    axios
      .get(url)
      .then(function (response) {
        setData(response.data);           //converting into array
        const arr = Object.entries(response.data.bpi);
        AsyncStorage.setItem("bitcoinData", JSON.stringify(arr));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return { data, getData };
};

export default useGetApiHook;
