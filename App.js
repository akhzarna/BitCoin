import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ApiComponent from "./component/ApiComponent";

export default function App() {
  return (
		<View style={styles.container}>
			
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
