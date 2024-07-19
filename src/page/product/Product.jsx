import { Link } from "react-router-dom";
import { productImage } from "../../lib/crm/product";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { deleteProduct } from "../../lib/requestTypes";

/**
 * Product
 */
export default function Product({
	product
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
				<img
					src={product.image ? productImage(product) : ""}
					alt={`${product.name} image`}
				/>
			</div>
			<div className="acciones">
				<Link to="/product/edit" className="btn btn-azul">
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
