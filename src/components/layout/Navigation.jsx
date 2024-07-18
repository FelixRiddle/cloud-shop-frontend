import React from 'react'

import { Link } from "react-router-dom";

/**
 * Navigation
 */
export default function Navigation() {
	
	return (
		<aside className="sidebar col-3">
			<h2>Administration</h2>
			
			<nav className="navegacion">
				<Link href="/" className="clientes">
					Clients
				</Link>
				<Link href="/products" className="productos">
					Products
				</Link>
				<Link href="/invoices" className="pedidos">
					Invoices
				</Link>
			</nav>
		</aside>
	);
}
