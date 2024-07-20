import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import _ from 'lodash';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { getProduct, putProduct } from '../../../lib/requestTypes';
import Spinner from '../../../components/layout/Spinner';
import ProductImage from '../../../components/product/ProductImage';
import { requestWasSuccessful } from '../../../lib/status';

/**
 * Edit product
 */
export default function EditProductPage() {
	const params = useParams();
	const form = useRef(null);
	
	const [product, setProduct] = useState({
		name: "",
		price: 0,
	});
	const [productFetched, setProductFetched] = useState(false);
	const [previousProduct, setPreviousProduct] = useState({});
	
	/**
	 * Fetch the product
	 */
	async function fetchProduct() {
		const id = params.id;
		const response = await getProduct(id);
		
		if(!response) {
			withReactContent(Swal).fire({
				icon: "error",
				title: "Error",
				text: "Unknown error",
				footer: '<a href="/help/error">Why do I have this issue?</a>'		  
			});
			
			return;
		}
		
		const prod = response.product;
		if(!prod) {
			const messages = response.messages;
			withReactContent(Swal).fire({
				icon: "error",
				title: "Error",
				text: messages[0].message,
				footer: '<a href="/help/error">Why do I have this issue?</a>'		  
			});
			
			return;
		}
		
		setProductFetched(true);
		
		setPreviousProduct(prod);
		setProduct(_.pick(prod, [
			"name", "price"
		]));
	}
	
	useEffect(() => {
		fetchProduct();
	}, []);
	
	/**
	 * Handle put product
	 */
	async function handlePutProduct(e) {
		e.preventDefault();
		
		const response = await putProduct(new FormData(form.current), previousProduct._id);
		
		if(!response) {
			return;
		}
		
		const successful = requestWasSuccessful(response);
		const messages = response.messages;
		if(messages) {
			if(!successful) {
				withReactContent(Swal).fire({
					icon: "error",
					title: "Error",
					text: messages[0].message,
					footer: '<a href="/help/error">Why do I have this issue?</a>'		  
				});
				
				return;
			}
		}
		
		if(successful) {
			window.location.href = "/products";
		}
	}
	
	/**
	 * Update product data
	 */
	async function onProductChange(e) {
		setProduct({
			...product,
			[e.target.name]: e.target.value
		});
	}
	
	if(!productFetched) {
		return (
			<Spinner />
		);
	}
	
	return (
		<>
			<h2>Edit product </h2>
			
			<form ref={form}>
				<legend>Edit product {product.name}</legend>
				
				<div className="campo">
					<label htmlFor="name">Name</label>
					<input
						type="text"
						placeholder="Name"
						name="name"
						onChange={onProductChange}
						defaultValue={product.name}
					/>
				</div>
				
				<div className="campo">
					<label htmlFor="price">Price</label>
					<input
						type="text"
						name="price"
						min="0.00"
						step="0.01"
						placeholder="Price"
						onChange={onProductChange}
						defaultValue={product.price}
					/>
				</div>
				
				<div className="campo">
					<label htmlFor="image">Image</label>
					<ProductImage product={previousProduct} />
					<input
						type="file"
						name="image"
						placeholder="Image"
					/>
				</div>
				
				<div className="enviar">
					<button
						className="btn btn-azul"
						onClick={handlePutProduct}
					>Save changes</button>
				</div>
			</form>
		</>
	);
}
