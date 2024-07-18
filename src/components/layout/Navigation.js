import React from 'react'

/**
 * Navigation
 */
export default function Navigation() {
	
	return (
		<aside className="sidebar col-3">
			<h2>Administration</h2>
			
			<nav className="navegacion">
				<a href="/" className="clientes">
					Clients
				</a>
				<a href="/product" className="productos">
					Products
				</a>
				<a href="/invoice" className="pedidos">
					Invoices
				</a>
			</nav>
		</aside>
	);
}
