import { Link } from "react-router-dom";
import { productImage } from "../../lib/crm/product";

/**
 * Product
 */
export default function Product({
	product
}) {
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
				
				<button className="btn btn-rojo btn-eliminar">
					<i className="fas fa-times"></i>
					Delete product
				</button>
			</div>
		</li>
	);
}
