import React, { useContext } from 'react'

import { Link } from "react-router-dom";
import { UserContext } from '../context/UserContext';

/**
 * Navigation
 */
export default function Navigation() {
	const [user, setUser] = useContext(UserContext);
	
	return (
		<aside className="sidebar col-3">
			<h2>Administration</h2>
			
			<nav className="navegacion">
				<Link to="/" className="clientes">
					Clients
				</Link>
				<Link to="/products" className="productos">
					Products
				</Link>
				<Link to="/invoices" className="pedidos">
					Invoices
				</Link>
				{/* {user && (
					<>
						<Link to="/" className="clientes">
							Clients
						</Link>
						<Link to="/products" className="productos">
							Products
						</Link>
						<Link to="/invoices" className="pedidos">
							Invoices
						</Link>
					</>
				) || (
					<>
						<Link to="/auth/login">
							Login
						</Link>
						<Link to="/auth/register">
							Register
						</Link>
					</>
				)} */}
			</nav>
		</aside>
	);
}
