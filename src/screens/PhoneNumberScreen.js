import React, { useState } from 'react';
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	TextInput,
	Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Loader from '../components/Loader';
import { token } from '../utils/getToken';
import axios from 'axios';
import { getAxiosError } from './../utils/getError';
const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const PhoneNumberScreen = ({ navigation, route }) => {
	const [phoneNumber, setPhoneNumber] = useState('');
	const [isValid, setIsValid] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const validatePhoneNumber = (number) => {
		const phoneRegex = /^\d{11}$/; // Adjust this regex based on your phone number format requirements
		setIsValid(phoneRegex.test(number));
		setPhoneNumber(number);
	};
	const handleNext = async () => {
		if (!isValid) {
			return Alert.alert(
				'Invalid Phone Number',
				'Please enter a valid phone number.'
			);
		}
		try {
			setIsLoading(true);

			const options = {
				...route.params,
				phone: phoneNumber,
			};
			console.log('options', options);
			const { data } = await axios.post(
				`${apiUrl}/vendor-house/listing-stage-3`,
				options,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			if (data) {
				Alert.alert(
					'Verification link sent',
					`Verification link sent to ${phoneNumber} successfully`
				);
				// console.log('hello data.data', data?.data);
				navigation.navigate('VerificationScreen', {
					...route.params,
					phoneNumber,
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
					<TouchableOpacity
						style={styles.backButton}
						onPress={() => navigation.goBack()}
					>
						<Ionicons name="arrow-back-outline" size={25} color="#000" />
					</TouchableOpacity>

					<View style={styles.progressBarContainer}>
						<View style={styles.progressBar} />
					</View>

					<Text style={styles.title}>Add your phone number</Text>
					<Text style={styles.subtitle}>
						We'll send you booking requests, reminders, and other notifications.
						Ensure this number can receive calls or texts.
					</Text>

					<TextInput
						style={styles.input}
						placeholder="Enter phone number"
						keyboardType="phone-pad"
						value={phoneNumber}
						onChangeText={validatePhoneNumber}
					/>

					<Text style={styles.disclaimer}>
						By proceeding, you consent to get call, Whatsapp or SMS messages,
						including by automated means, from GloPilots and its affiliates to
						the number provided.
					</Text>

					<TouchableOpacity
						style={[styles.nextButton, isValid && styles.nextButtonActive]}
						onPress={handleNext}
						disabled={!isValid}
					>
						<Text style={styles.nextButtonText}>Next</Text>
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
	backButton: {
		backgroundColor: '#fff',
		height: 50,
		width: 50,
		borderRadius: 25,
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 1,
		borderColor: '#ccc',
		marginBottom: 20,
	},
	progressBarContainer: {
		height: 9,
		backgroundColor: '#e0e0e0',
		borderRadius: 5,
		overflow: 'hidden',
		marginBottom: 20,
	},
	progressBar: {
		width: '90%',
		height: '100%',
		backgroundColor: '#4460EF',
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 10,
	},
	subtitle: {
		fontSize: 16,
		color: '#666',
		marginBottom: 20,
		fontWeight: '600',
	},
	input: {
		height: 50,
		borderColor: '#ccc',
		borderWidth: 1,
		borderRadius: 8,
		paddingHorizontal: 10,
		marginBottom: 20,
	},
	disclaimer: {
		fontSize: 15,
		color: '#666',
		width: 326,
	},
	nextButton: {
		backgroundColor: '#d3d3d3',
		paddingVertical: 15,
		borderRadius: 5,
		alignItems: 'center',
		marginVertical: 20,
	},
	nextButtonActive: {
		backgroundColor: '#4460EF',
	},
	nextButtonText: {
		color: '#fff',
		fontSize: 18,
	},
});

export default PhoneNumberScreen;
