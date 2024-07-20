import React from 'react';

/**
 * Product view
 */
export default function ProductView({
	product,
}) {
	return (
		<>
			<div className="texto-producto">
				<p className="nombre">{product.name}</p>
				<p className="precio">$ {product.price}</p>
			</div>
			<div className="acciones">
				<div className="contenedor-cantidad">
					<i className="fas fa-minus"></i>
					<input
						type="text"
						name="quantity"
						placholder="Quantity"
						defaultValue={product.quantity}
					/>
					<i className="fas fa-plus"></i>
				</div>
				<button className="btn btn-rojo">
					<i className="fas fa-minus-circle"></i>
					Delete product
				</button>
			</div>
		</>
	);
}
