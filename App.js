import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import FlatListComponent from './component/FlatListComponent';
export default function App() {
  return (
		<View style={styles.container}>
      <FlatListComponent/>
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
