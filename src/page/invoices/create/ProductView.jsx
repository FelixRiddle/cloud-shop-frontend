import React from 'react';

/**
 * Product view
 */
export default function ProductView({
	product,
	subtractQuantity,
	addQuantity,
}) {
	return (
		<>
			<div className="texto-producto">
				<p className="nombre">{product.name}</p>
				<p className="precio">$ {product.price}</p>
			</div>
			<div className="acciones">
				<div className="contenedor-cantidad">
					<i className="fas fa-minus" onClick={() => subtractQuantity(product)}></i>
					<p>{product.quantity}</p>
					<i className="fas fa-plus" onClick={() => addQuantity(product)}></i>
				</div>
				<button className="btn btn-rojo">
					<i className="fas fa-minus-circle"></i>
					Delete product
				</button>
			</div>
		</>
	);
}
