import React, { useEffect, useState } from 'react';
import axiosClient from '../../config/axios';
import Client from './Client';

/**
 * Client page
 */
export default function ClientPage() {
	const [clients, setClients] = useState([]);
	
	const updateClients = async () => {
		await axiosClient.get("/client")
			.then((res) => {
				const responseData = res.data;
				setClients(responseData.clients);
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
			
			<Link
				to="/client/create"
				className="btn btn-verde nvo-cliente"
			>
				<i className="fas fa-plus-circle"></i>
				New client
			</Link>
			
			<ul className="listado-clientes">
				{clients.map((client) => {
					return (
						<Client key={client._id} client={client} />
					);
				})}
			</ul>
		</div>
	);
}
