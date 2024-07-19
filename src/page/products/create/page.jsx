import { useRef, useState } from "react";

import { requestWasSuccessful } from "../../../lib/status";
import { createProduct } from "../../../lib/requestTypes";

/**
 * Create product page
 */
export default function CreateProduct() {
	const form = useRef(null);
	
	const [product, setProduct] = useState({
		name: "",
		price: 0,
	});
	
	/**
	 * Handle create product
	 */
	async function handleCreateProduct(e) {
		e.preventDefault();
		
		const response = await createProduct(new FormData(form.current));
		
		if(!response) {
			return;
		}
		
		const successful = requestWasSuccessful(response);
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
	
	return (
		<>
			<h2>New product</h2>
			
			<form ref={form}>
				<legend>Fill the fields to create a product</legend>
				
				<div className="campo">
					<label htmlFor="name">Name</label>
					<input type="text" placeholder="Name" name="name" />
				</div>
				
				<div className="campo">
					<label htmlFor="price">Price</label>
					<input
						type="text"
						name="price"
						min="0.00"
						step="0.01"
						placeholder="Price"
					/>
				</div>
				
				<div className="campo">
					<label htmlFor="image">Image</label>
					<input type="file" name="image" placeholder="Image" />
				</div>
				
				<div className="enviar">
					<button
						className="btn btn-azul"
						onClick={handleCreateProduct}
					>Create product</button>
				</div>
			</form>
		</>
	);
}
