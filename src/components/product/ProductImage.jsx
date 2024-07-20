import { useState } from "react";
import { productImage } from "../../lib/crm/product";

/**
 * Show product image if it exists
 */
export default function ProductImage({
	product
}) {
	const [imgUrl] = useState(product.image ? productImage(product) : "");
	
	return (
		<>
			{imgUrl && (
				<img
					src={imgUrl}
					alt={`${product.name} image`}
				/>
			)}
		</>
	)
}
