import { useRef, useState } from "react";
import { createProduct } from "../../../lib/requestTypes";
import { requestWasSuccessful } from "../../../lib/status";

/**
 * Create product page
 */
export default function CreateProduct() {
	const form = useRef(null);
	
	const [product, setProduct] = useState({
		name: "",
		price: 0,
	});
	
	async function handleCreateProduct(e) {
		const response = await createProduct(new FormData(form.current));
		console.log(`Create response: `, response);
		
		if(!response) {
			return;
		}
		
		const successful = requestWasSuccessful(response);
		if(successful) {
			window.location.href = "/product";
		}
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
