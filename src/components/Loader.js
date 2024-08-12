import { View, StyleSheet, ActivityIndicator } from 'react-native';
import React from 'react';
import { colors } from '../utils/colors';

const Loader = () => {
	return (
		<View style={styles.container}>
			<ActivityIndicator size={'large'} color={colors.primary} />
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white',
	},
});
export default Loader;
