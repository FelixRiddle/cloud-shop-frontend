import { useRef, useState } from "react";
import { searchProduct } from "../../../lib/requestTypes";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

/**
 * Search product
 */
export default function SearchProduct({
	appendProduct,
}) {
	const formulary = useRef(null);
	const [name, setName] = useState("");
	
	/**
	 * Search product
	 */
	async function handleSearchProduct(e) {
		e.preventDefault();
		
		const response = await searchProduct(name);
		if(!response) {
			withReactContent(Swal).fire({
				icon: "error",
				title: "Error",
				text: "Unknown error",
				footer: '<a href="/help/error">Why do I have this issue?</a>'		  
			});
			
			return;
		}
		
		const products = response.products;
		const productsExist = products && products.length > 0;
		
		const messages = response.messages;
		if(!productsExist && messages) {
			const messages = response.messages;
			withReactContent(Swal).fire({
				icon: "error",
				title: "Error",
				text: messages[0].message,
				footer: '<a href="/help/error">Why do I have this issue?</a>'		  
			});
			
			return;
		}
		
		// Take first and append
		const product = products[0];
		if(product) {
			// Append first product
			appendProduct({
				...product,
				quantity: 1,
			});
		}
	}
	
	return (
		<form ref={formulary}>
			{/* Search */}
			<legend>Search product</legend>
			
			<div className="campo">
				<label htmlFor="products">Products</label>
				<input
					type="text"
					name="products"
					id="products"
					placeholder="Product name"
					onChange={(e) => setName(e.target.value)}
				/>
			</div>
			
			<button
				className="btn btn-azul btn-block"
				onClick={handleSearchProduct}
			>
				Search product
			</button>
		</form>
	);
}
