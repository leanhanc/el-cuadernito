import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export default function HomeTab() {
	return (
		<View style={styles.container}>
			<Text>Home Tab</Text>
		</View>
	);
}

const styles = StyleSheet.create((theme) => ({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: theme.colors.background,
	},
}));
