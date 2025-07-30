import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export default function SettingsTab() {
	return (
		<View style={styles.container}>
			<Text>Settings Tab</Text>
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
