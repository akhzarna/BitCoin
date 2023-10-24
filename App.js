import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ApiComponent from "./component/ApiComponent";

export default function App() {
  return (
		<View style={styles.container}>
			<Text>hello from Rafia sajid (Fa20-bse-103)
        hello second time updates
        
      </Text>
			<ApiComponent />
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
