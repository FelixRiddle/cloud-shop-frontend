import apiUrl from "../../config/apiUrl";

/**
 * Get product image url
 */
export function productImage(product) {
	const url = apiUrl();
	
	return `${url}/public/product/${product._id}/${product.image}`;
}
