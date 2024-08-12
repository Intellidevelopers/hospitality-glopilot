import React, { useEffect, useState } from 'react';
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	Alert,
} from 'react-native';
import Checkbox from 'expo-checkbox';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../utils/colors';
import Loader from '../components/Loader';
import { token } from '../utils/getToken';
import axios from 'axios';
import { getAxiosError } from './../utils/getError';
const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const AmenityScreen = ({ route, navigation }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [checkedAmenities, setCheckedAmenities] = useState([]);
	const [amenities, setAmenities] = useState({
		essentials: true,
		airConditioner: false,
		heating: false,
		hairDryer: false,
		iron: false,
		tv: false,
		wifi: false,
	});

	const handleCheckboxChange = (amenity) => {
		setAmenities({ ...amenities, [amenity]: !amenities[amenity] });
	};
	useEffect(() => {
		const trueAmenities = Object.keys(amenities)
			.filter((key) => amenities[key])
			.map((key) => ({
				name: key
					.replace(/([A-Z])/g, ' $1') // Insert space before capital letters (for camelCase keys)
					.replace(/^./, (str) => str.toUpperCase()) // Capitalize the first letter
					.replace('Ac', 'AC'), // Special case for "AC"
			}));

		setCheckedAmenities(() => trueAmenities);
	}, [amenities]);
	const validateAndProceed = async () => {
		if (
			!amenities.essentials &&
			!amenities.airConditioner &&
			!amenities.heating &&
			!amenities.hairDryer &&
			!amenities.iron &&
			!amenities.tv &&
			!amenities.wifi
		) {
			Alert.alert('Please select at least one amenity before proceeding.');
			return;
		}

		try {
			setIsLoading(true);

			const options = {
				...route.params,
				amenities: checkedAmenities,
			};
			const { data } = await axios.post(
				`${apiUrl}/vendor-house/listing-stage-1`,
				options,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			if (data) {
				Alert.alert('Listing sent', 'Listing sent successfully');
				// console.log('hello data.data', data?.data);
				navigation.navigate('AddPhotoScreen', {
					houseId: data?.data?.newVendorHouse?._id,
				});
			}
		} catch (error) {
			const message = getAxiosError(error);
			console.log(message);
			return Alert.alert('Something went wrong', message);
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<View style={styles.container}>
					<View style={styles.header}>
						<TouchableOpacity
							style={styles.BackButton}
							onPress={() => navigation.goBack()}
						>
							<Ionicons name="arrow-back-outline" color="#000" size={25} />
						</TouchableOpacity>
					</View>

					<View style={styles.progressBarContainer}>
						<View style={styles.progressBar} />
					</View>

					<Text style={styles.title}>What amenities do you provide?</Text>
					<Text style={styles.subtitle}>
						Guests typically expect these amenities, but you can add more later.
					</Text>

					<ScrollView
						contentContainerStyle={styles.scrollContainer}
						showsVerticalScrollIndicator={false}
					>
						<Text style={{ fontWeight: '600', fontSize: 17 }}>Essentials</Text>
						<View style={styles.checkboxContainer}>
							<Text style={styles.sub}>Guests typically expect these</Text>
							<Checkbox
								value={amenities.essentials}
								onValueChange={() => handleCheckboxChange('essentials')}
								style={styles.checkbox}
								color={amenities.essentials ? '#007bff' : undefined}
							/>
						</View>

						<View
							style={{ flexDirection: 'row', width: 330, alignItems: 'center' }}
						>
							<View
								style={{
									flex: 1,
									width: 20,
									height: 1,
									backgroundColor: colors.gray,
								}}
							/>
						</View>

						<View style={styles.divider} />

						<View style={styles.checkboxContainer}>
							<Text style={styles.Essentials}>Air Conditioner</Text>
							<Checkbox
								value={amenities.airConditioner}
								onValueChange={() => handleCheckboxChange('airConditioner')}
								style={styles.checkbox}
								color={amenities.airConditioner ? '#007bff' : undefined}
							/>
						</View>

						<View
							style={{ flexDirection: 'row', width: 330, alignItems: 'center' }}
						>
							<View
								style={{
									flex: 1,
									width: 20,
									height: 1,
									backgroundColor: colors.gray,
								}}
							/>
						</View>

						<View style={styles.checkboxContainer}>
							<Text style={styles.Essentials}>Heating</Text>
							<Checkbox
								value={amenities.heating}
								onValueChange={() => handleCheckboxChange('heating')}
								style={styles.checkbox}
								color={amenities.heating ? '#007bff' : undefined}
							/>
						</View>

						<View
							style={{ flexDirection: 'row', width: 330, alignItems: 'center' }}
						>
							<View
								style={{
									flex: 1,
									width: 20,
									height: 1,
									backgroundColor: colors.gray,
								}}
							/>
						</View>

						<View style={styles.checkboxContainer}>
							<Text style={styles.Essentials}>Hair Dryer</Text>
							<Checkbox
								value={amenities.hairDryer}
								onValueChange={() => handleCheckboxChange('hairDryer')}
								style={styles.checkbox}
								color={amenities.hairDryer ? '#007bff' : undefined}
							/>
						</View>

						<View
							style={{ flexDirection: 'row', width: 330, alignItems: 'center' }}
						>
							<View
								style={{
									flex: 1,
									width: 20,
									height: 1,
									backgroundColor: colors.gray,
								}}
							/>
						</View>

						<View style={styles.checkboxContainer}>
							<Text style={styles.Essentials}>Iron</Text>
							<Checkbox
								value={amenities.iron}
								onValueChange={() => handleCheckboxChange('iron')}
								style={styles.checkbox}
								color={amenities.iron ? '#007bff' : undefined}
							/>
						</View>

						<View
							style={{ flexDirection: 'row', width: 330, alignItems: 'center' }}
						>
							<View
								style={{
									flex: 1,
									width: 20,
									height: 1,
									backgroundColor: colors.gray,
								}}
							/>
						</View>

						<View style={styles.checkboxContainer}>
							<Text style={styles.Essentials}>TV</Text>
							<Checkbox
								value={amenities.tv}
								onValueChange={() => handleCheckboxChange('tv')}
								style={styles.checkbox}
								color={amenities.tv ? '#007bff' : undefined}
							/>
						</View>

						<View
							style={{ flexDirection: 'row', width: 330, alignItems: 'center' }}
						>
							<View
								style={{
									flex: 1,
									width: 20,
									height: 1,
									backgroundColor: colors.gray,
								}}
							/>
						</View>

						<View style={styles.checkboxContainer}>
							<Text style={styles.Essentials}>WiFi</Text>
							<Checkbox
								value={amenities.wifi}
								onValueChange={() => handleCheckboxChange('wifi')}
								style={styles.checkbox}
								color={amenities.wifi ? '#007bff' : undefined}
							/>
						</View>

						<View
							style={{ flexDirection: 'row', width: 330, alignItems: 'center' }}
						>
							<View
								style={{
									flex: 1,
									width: 20,
									height: 1,
									backgroundColor: colors.gray,
								}}
							/>
						</View>
					</ScrollView>

					<TouchableOpacity style={styles.button} onPress={validateAndProceed}>
						<Text style={styles.buttonText}>Next</Text>
					</TouchableOpacity>
				</View>
			)}
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		paddingTop: 50,
		paddingHorizontal: 20,
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	backButton: {
		marginRight: 10,
	},
	progressBarContainer: {
		height: 10,
		backgroundColor: '#e0e0e0',
		borderRadius: 5,
		overflow: 'hidden',
		marginVertical: 10,
	},
	progressBar: {
		width: '60%',
		height: '100%',
		backgroundColor: '#4460EF',
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginVertical: 20,
	},
	subtitle: {
		fontSize: 16,
		color: '#666',
		marginBottom: 20,
		marginTop: -10,
	},
	scrollContainer: {
		flexGrow: 1,
		paddingHorizontal: 1,
		paddingBottom: 20,
	},
	checkboxContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 15,
		justifyContent: 'space-between',
		marginVertical: 10,
	},
	checkbox: {
		marginRight: 10,
		borderRadius: 5,
		borderColor: colors.gray,
	},
	checkboxLabel: {
		fontSize: 16,
	},
	button: {
		backgroundColor: colors.primary,
		paddingVertical: 10,
		alignItems: 'center',
		borderRadius: 5,
		marginVertical: 20,
	},
	buttonText: {
		color: '#fff',
		fontSize: 18,
	},
	Essentials: {
		fontSize: 17,
		fontWeight: '400',
		marginVertical: 5,
	},
	BackButton: {
		backgroundColor: colors.white,
		marginTop: 15,
		left: -5,
		height: 50,
		width: 50,
		borderRadius: 25,
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 1,
		borderColor: colors.gray,
		marginVertical: 10,
	},
	divider: {
		flexDirection: 'row',
		width: 330,
		alignItems: 'center',
		marginVertical: 5,
	},
});

export default AmenityScreen;
