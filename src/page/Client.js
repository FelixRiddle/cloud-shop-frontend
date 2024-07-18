import React, { useEffect, useState } from 'react'
import axiosClient from '../config/axios';

/**
 * Client page
 */
export default function Client() {
	const [clients, setClients] = useState({});
	
	const updateClients = async () => {
		const response = await axiosClient.get("/client")
			.then((res) => {
				const responseData = res.data;
				setClients(responseData.clients);
				console.log(`Response: `, responseData);
			})
			.catch((err) => {
				console.error(err);
			});
	}
	
	useEffect(() => {
		updateClients();
	}, []);
	
	return (
		<div>
			<h2>Client</h2>
		</div>
	);
}
