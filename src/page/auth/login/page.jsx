import React from 'react'

/**
 * Login page
 */
export default function LoginPage() {
	return (
		<>
			<div className="login">
				<h2>
					Login
				</h2>
				
				<div className="contenedor-formulario">
					<form>
						<div className="campo">
							<label htmlFor="email">Email</label>
							<input type="email" name="email" id="" />
						</div>
						
						<div className="campo">
							<label htmlFor="password">Password</label>
							<input type="password" name="password" id="password" />
						</div>
						
						<button className="btn btn-verde btn-block">
							Login
						</button>
					</form>
				</div>
			</div>
		</>
	);
}
