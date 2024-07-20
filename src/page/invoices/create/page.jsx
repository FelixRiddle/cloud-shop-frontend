import React, { useEffect, useState } from 'react';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

import ProductView from './ProductView';
import { useParams } from 'react-router-dom';
import { createInvoice, getClient } from '../../../lib/requestTypes';
import SearchProduct from './SearchProduct';
import { requestWasSuccessful } from '../../../lib/status';

/**
 * Create invoice page
 */
export default function CreateInvoicePage() {
	const params = useParams();
	const [client, setClient] = useState({});
	const [products, setProducts] = useState([]);
	const [total, setTotal] = useState(0);
	
	/**
	 * Update total price
	 */
	function updateTotal() {
		let newTotal = 0;
		products.map((product) => {
			newTotal = (product.price * product.quantity);
		});
		
		setTotal(newTotal);
	}
	
	useEffect(() => {
		updateTotal();
	}, [products]);
	
	/**
	 * Append product
	 */
	function appendProduct(newProduct) {
		setProducts([...products, newProduct]);
	}
	
	/**
	 * Remove product
	 */
	function removeProduct(selectedProduct) {
		setProducts(products.filter((product) => product._id !== selectedProduct._id));
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
	
	/**
	 * Subtract product quantity 
	 */
	function subtractQuantity(selectedProduct) {
		setProducts(products.map((product) => {
			if(product._id !== selectedProduct._id) {
				return product;
			}
			
			// Cannot have less than one of quantity, otherwise just don't add the product
			if(product.quantity === 1) {
				return product;
			}
			
			product.quantity--;
			return product;
		}));
	}
	
	/**
	 * Add product quantity
	 */
	function addQuantity(selectedProduct) {
		setProducts(products.map((product) => {
			if(product._id !== selectedProduct._id) {
				return product;
			}
			
			product.quantity++;
			return product;
		}));
	}
	
	/**
	 * Create invoice
	 */
	async function handleCreateInvoice(e) {
		e.preventDefault();
		
		const narrowProducts = products.map((product) => {
			return {
				product: product._id,
				price: product.price,
				quantity: product.quantity
			};
		});
		
		const invoice = {
			client: client._id,
			products: narrowProducts,
		};
		const response = await createInvoice(invoice);
		if(!response) {
			withReactContent(Swal).fire({
				icon: "error",
				title: "Error",
				text: "Unknown error",
				footer: '<a href="/help/error">Why do I have this issue?</a>'		  
			});
			
			return;
		}
		
		const messages = response.messages;
		const successful = requestWasSuccessful(response);
		if(!successful) {
			withReactContent(Swal).fire({
				icon: "error",
				title: "Error",
				text: messages[0].message,
				footer: '<a href="/help/error">Why do I have this issue?</a>'		  
			});
			
			return;
		}
		
		window.location.href = "/invoices";
	}
	
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
			
			{/* Products */}
			<ul className="resumen">
				{products.map((product) => {
					return (
						<li>
							<ProductView
								key={product.product}
								product={product}
								subtractQuantity={subtractQuantity}
								addQuantity={addQuantity}
								removeProduct={removeProduct}
							/>
						</li>
					);
				})}
			</ul>
			
			<p className="total">Total price <span>${total}</span></p>
			
			<div className="enviar">
				<button
					className="btn btn-azul"
					onClick={handleCreateInvoice}
				>Create invoice</button>
			</div>
		</>
	);
}
