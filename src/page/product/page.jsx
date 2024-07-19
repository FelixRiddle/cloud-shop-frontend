import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { getProducts } from '../../lib/requestTypes';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

/**
 * Product page
 */
export default function ProductPage() {
	const [products, setProducts] = useState([]);
	
	/**
	 * Fetch products
	 */
	async function fetchProducts() {
		const res = await getProducts();
		if(res && res.products) {
			setProducts(products);
		} else {
			// Show error message
			const messages = res.messages;
			withReactContent(Swal).fire({
				icon: "error",
				title: "Error",
				text: messages[0].message,
				footer: '<a href="/help/error">Why do I have this issue?</a>'		  
			});
		}
	}
	
	useEffect(() => {
		fetchProducts();
	}, []);
	
	return (
		<>
			<h2>Product</h2>
			
			<Link
				to="product/create"
				className="btn btn-verde nvo-cliente"
			>
				<i className="fas fa-plus-circle"></i>
				New product
			</Link>
			
			<ul className="listado-productos">
				<li className="producto">
					<div className="info-producto">
						<p className="name">VueJS</p>
						<p className="precio">$25.99</p>
						<img src="img/1.jpg" alt="VueJS T-Shirt" />
					</div>
					<div className="acciones">
						<a href="" className="btn btn-azul">
							<i className="fas fa-pen-alt"></i>
							Edit product
						</a>
						<button className="btn btn-rojo btn-eliminar">
							<i className="fas fa-times"></i>
							Delete product
						</button>
					</div>
				</li>
			</ul>
		</>
	);
}
