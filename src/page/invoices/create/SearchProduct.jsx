import { useRef } from "react";

/**
 * Search product
 */
export default function SearchProduct({
	appendProduct,
}) {
	const formulary = useRef(null);
	
	/**
	 * Search product
	 */
	function searchProduct(e) {
		
	}
	
	return (
		<form ref={formulary}>
			{/* Search */}
			<legend>Search product</legend>
			
			<div className="campo">
				<label htmlFor="products">Products</label>
				<input type="text" name="products" id="products" placholder="Product name" />
			</div>
			
			<button
				className="btn btn-azul btn-block"
				onClick={searchProduct}
			>
				Search product
			</button>
		</form>
	);
}
