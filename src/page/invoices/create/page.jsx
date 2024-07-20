import React from 'react';
import ProductView from './ProductView';
import { useParams } from 'react-router-dom';

/**
 * Create invoice page
 */
export default function CreateInvoicePage() {
	const params = useParams();
	
	return (
		<>
			<h2>Create invoice</h2>
			
			{/* Client */}
			<div className="ficha-cliente">
				<h3>Client information</h3>
				<p>Felix Riddle</p>
			</div>
			
			<form action="">
				{/* Search */}
				<legend>Search product</legend>
				
				<div className="campo">
					<label htmlFor="products">Products</label>
					<input type="text" name="products" id="products" placholder="Product name" />
				</div>
				
				{/* Products */}
				<ul className="resumen">
					<li>
						<ProductView />
					</li>
				</ul>
				
				<div className="campo">
					<label htmlFor="total">Total</label>
					<input
						type="text"
						name="total"
						id="total"
						placholder="Price"
						readOnly={true}
					/>
				</div>
				
				<div className="enviar">
					<input
						type="submit"
						className="btn btn-azul"
						value="Create product"
					/>
				</div>
			</form>
		</>
	);
}
