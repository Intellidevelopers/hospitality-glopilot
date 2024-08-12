import axios from 'axios';
const apiUrl = process.env.EXPO_PUBLIC_API_URL;
// api.js
const API_BASE_URL = 'https://jsonplaceholder.typicode.com/';
// Replace with your API base URL
export const fetchUsers = async () => {
	try {
		const response = await fetch(`${API_BASE_URL}/users`);
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		return await response.json();
	} catch (error) {
		console.error('API request error:', error);
		throw error;
	}
};

export const fetchReservations = async (props) => {
	const config = {
		headers: {
			Authorization: `Bearer ${props?.accessToken}`,
		},
	};
	try {
		const { data } = await axios
			// .get(`https://backend-pil9.onrender.com/api/v1/students/notes`, config)
			.get(`${apiUrl}/vendor-house/reservations`, config)
			.then((res) => res.data);
		// console.log('fetchuser data', data);
		return data;
	} catch (error) {
		console.log('errormgf', error);
		console.log(error.message);
		return error;
	}
};
export const fetchReservation = async (props) => {
	const config = {
		headers: {
			Authorization: `Bearer ${props?.accessToken}`,
		},
	};
	try {
		const data = await axios
			.get(`${apiUrl}/vendor-house/reservations${props.id}`, config)
			.then((res) => res.data);
		// console.log('fetchuser data', data);
		return data;
	} catch (error) {
		console.log(error.message);
		return error;
	}
};
export const fetchListings = async (props) => {
	const config = {
		headers: {
			Authorization: `Bearer ${props?.accessToken}`,
		},
	};
	try {
		const data = await axios
			.get(`${apiUrl}/listings/${props.id}`, config)
			.then((res) => res.data);
		// console.log('fetchuser data', data);
		return data;
	} catch (error) {
		console.log(error.message);
		return error;
	}
};
export const fetchListing = async (props) => {
	const config = {
		headers: {
			Authorization: `Bearer ${props?.accessToken}`,
		},
	};
	try {
		const data = await axios
			.get(`${apiUrl}/listings/${props.id}`, config)
			.then((res) => res.data);
		// console.log('fetchuser data', data);
		return data;
	} catch (error) {
		console.log(error.message);
		return error;
	}
};
export const fetchWallet = async (props) => {
	const config = {
		headers: {
			Authorization: `Bearer ${props?.accessToken}`,
		},
	};
	try {
		const data = await axios
			.get(`${apiUrl}/vendor-wallet`, config)
			.then((res) => res.data);
		// console.log('fetchuser data', data);
		return data;
	} catch (error) {
		console.log(error.message);
		return error;
	}
};
