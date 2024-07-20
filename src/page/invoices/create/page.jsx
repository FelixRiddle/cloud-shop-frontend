import React, { useEffect, useState } from 'react';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

import ProductView from './ProductView';
import { useParams } from 'react-router-dom';
import { getClient } from '../../../lib/requestTypes';
import SearchProduct from './SearchProduct';

/**
 * Create invoice page
 */
export default function CreateInvoicePage() {
	const params = useParams();
	const [client, setClient] = useState({});
	const [products, setProducts] = useState([]);
	
	/**
	 * Append product
	 */
	function appendProduct(newProduct) {
		setProducts([...products, newProduct]);
	}
	
	/**
	 * Fetch client
	 */
	async function fetchClient() {
		const response = await getClient(params.id);
		if(!response) {
			withReactContent(Swal).fire({
				icon: "error",
				title: "Error",
				text: "Unknown error",
				footer: '<a href="/help/error">Why do I have this issue?</a>'		  
			});
			
			return;
		}
		
		const clientData = response.client;
		const messages = response.messages;
		if(!clientData && messages) {
			const messages = response.messages;
			withReactContent(Swal).fire({
				icon: "error",
				title: "Error",
				text: messages[0].message,
				footer: '<a href="/help/error">Why do I have this issue?</a>'		  
			});
			
			return;
		}
		
		setClient(clientData);
	}
	
	useEffect(() => {
		fetchClient();
	}, []);
	
	return (
		<>
			<h2>Create invoice</h2>
			
			{/* Client */}
			<div className="ficha-cliente">
				<h3>Client information</h3>
				<p>Last name and name: {client.surname} {client.name}</p>
				<p>Company: {client.company}</p>
				<h4>Communication</h4>
				<p>Email: {client.email}</p>
				<p>Phone number: {client.phoneNumber}</p>
			</div>
			
			<SearchProduct
				appendProduct={appendProduct}
			/>
			
			<form>
				{/* Products */}
				<ul className="resumen">
					<li>
						<ProductView />
					</li>
				</ul>
				
				<div className="campo">
					<label htmlFor="total">Total</label>
					<input
						type="text"
						name="total"
						id="total"
						placholder="Price"
						readOnly={true}
					/>
				</div>
				
				<div className="enviar">
					<input
						type="submit"
						className="btn btn-azul"
						value="Create product"
					/>
				</div>
			</form>
		</>
	);
}
