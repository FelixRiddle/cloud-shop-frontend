import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { getProducts } from '../../lib/requestTypes';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import Product from './Product';
import Spinner from '../../components/layout/Spinner';

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
		
		if(!res) {
			return;
		}
		
		if(res.products) {
			setProducts(res.products);
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
	}, [products]);
	
	if(!(products.length > 0)) {
		return (
			<Spinner />
		);
	}
	
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
			
			<p>{products.length} products</p>
			
			<ul className="listado-productos">
				{products.map((product) => {
					return (
						<Product
							key={product._id}
							product={product}
						/>
					);
				})}
			</ul>
		</>
	);
}