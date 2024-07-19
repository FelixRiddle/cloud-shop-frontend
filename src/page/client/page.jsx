import React, { useEffect, useState } from 'react';
import Client from './Client';
import { Link } from 'react-router-dom';
import { getClients } from '../../lib/requestTypes';
import Spinner from '../../components/layout/Spinner';

/**
 * Client page
 */
export default function ClientPage() {
	const [clients, setClients] = useState([]);
	
	const updateClients = async () => {
		const data = await getClients();
		if(data && data.clients) {
			setClients(data.clients);
		}
	}
	
	useEffect(() => {
		updateClients();
	}, [clients]);
	
	if(!(clients.length > 0)) {
		return (
			<Spinner />
		);
	}
	
	return (
		<>
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
		</>
	);
}
