import AsyncStorage from '@react-native-async-storage/async-storage';
import apiHook from './ApiHook';

const fetchData = async (URL) => {
    let localData = await AsyncStorage.getItem(URL);
    if(localData){
        console.log("localData --- ",localData);
        return JSON.parse(localData);
    }
    else{
        let apiData = await apiHook(URL)
        console.log("api Data --- ",apiData);
        await AsyncStorage.setItem(URL, JSON.stringify(apiData));
        return apiData;
    }
}

export default fetchData;
