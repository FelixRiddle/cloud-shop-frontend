import { Link } from "react-router-dom";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

import { deleteProduct } from "../../lib/requestTypes";
import ProductImage from "../../components/product/ProductImage";

/**
 * Product
 */
export default function Product({
	product,
	removeProduct
}) {
	/**
	 * Handle delete client
	 */
	function handleDeleteProduct(e) {
		withReactContent(Swal).fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!"
		}).then(async (result) => {
			if (result.isConfirmed) {
				// Remove in the frontend
				removeProduct(product._id);
				
				// Delete in the backend
				await deleteProduct(product._id);
				withReactContent(Swal).fire({
					title: "Deleted!",
					text: "Product deleted",
					icon: "success"
				});
			}
		});
	}
	
	return (
		<li className="producto">
			<div className="info-producto">
				<p className="name">{product.name}</p>
				<p className="precio">$ {product.price}</p>
				<ProductImage
					product={product}
				/>
			</div>
			<div className="acciones">
				<Link to={`/products/edit/${product._id}`} className="btn btn-azul">
					<i className="fas fa-pen-alt"></i>
					Edit product
				</Link>
				
				<button
					className="btn btn-rojo btn-eliminar"
					onClick={handleDeleteProduct}
				>
					<i className="fas fa-times"></i>
					Delete product
				</button>
			</div>
		</li>
	);
}
