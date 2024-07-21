import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext';
import { userLogout } from '../../lib/requestTypes';
import { requestWasSuccessful } from '../../lib/status';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

/**
 * Header
 */
export default function Header() {
	const [user, setUser] = useContext(UserContext);
	
	/**
	 * Logout
	 */
	async function logout(e) {
		e.preventDefault();
		
		const response = await userLogout();
		if(!response) {
			withReactContent(Swal).fire({
				icon: "error",
				title: "Error",
				text: "Unknown error",
				footer: '<a href="/help/error">Why do I have this issue?</a>'		  
			});
			
			return;
		}
		
		const successful = requestWasSuccessful(response);
		if(!successful) {
			const messages = response.messages;
			withReactContent(Swal).fire({
				icon: "error",
				title: "Error",
				text: messages[0].message,
				footer: '<a href="/help/error">Why do I have this issue?</a>'		  
			});
			
			return;
		}
		
		window.location.href = "/auth/login";
	}
	
	return (
		<header className="barra">
			<div className="contenedor">
				<div className="contenido-barra">
					<h1>CRM - Client administration</h1>
					
					{user && user._id && (
						<button
							className="btn btn-rojo"
							onClick={logout}
						>
							<i className="far fa-times-circle"></i>
							Logout
						</button>
					)}
				</div>
			</div>
		</header>
	);
}
