import React, { useRef } from 'react'
import { loginUser } from '../../../lib/requestTypes';
import { requestWasSuccessful } from '../../../lib/status';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

/**
 * Login page
 */
export default function LoginPage() {
	const loginForm = useRef(null);
	
	/**
	 * Handle login
	 */
	async function handleLogin(e) {
		e.preventDefault();
		
		const response = await loginUser(new FormData(loginForm.current));
		if(!response) {
			withReactContent(Swal).fire({
				icon: "error",
				title: "Error",
				text: "Unknown error",
				footer: '<a href="/help/error">Why do I have this issue?</a>'		  
			});
			
			return;
		}
		
		const messages = response.messages;
		const successful = requestWasSuccessful(response);
		if(!successful) {
			withReactContent(Swal).fire({
				icon: "error",
				title: "Error",
				text: messages[0].message,
				footer: '<a href="/help/error">Why do I have this issue?</a>'		  
			});
			
			return;
		}
		
		window.location.href = "/client";
	}
	
	return (
		<>
			<div className="login">
				<h2>
					Login
				</h2>
				
				<div className="contenedor-formulario">
					<form ref={loginForm}>
						<div className="campo">
							<label htmlFor="email">Email</label>
							<input type="email" name="email" id="" />
						</div>
						
						<div className="campo">
							<label htmlFor="password">Password</label>
							<input type="password" name="password" id="password" />
						</div>
						
						<button
							className="btn btn-verde btn-block"
							onClick={handleLogin}
						>
							Login
						</button>
					</form>
				</div>
			</div>
		</>
	);
}
