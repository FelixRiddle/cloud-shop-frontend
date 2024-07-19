import { useRef, useState } from "react";
import { createClient } from "../../../lib/requestTypes";
import { requestWasSuccessful } from "../../../lib/status";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

/**
 * Create client form
 */
export default function CreateClientPage() {
	const form = useRef(null);
	const [client, setClient] = useState({
		name: "",
		surname: "",
		email: "",
		company: "",
		phoneNumber: "",
	});
	
	/**
	 * Handle change
	 */
	function handleChange(e) {
		setClient({
			...client,
			[e.target.name]: e.target.value
		});
	}
	
	/**
	 * Validate client
	 */
	function validateClient(e) {
		// Every field is required
		for(const [key, value] of Object.entries(client)) {
			if(!value) {
				return false;
			}
		}
		
		return true;
	}
	
	/**
	 * Create client
	 */
	async function handleCreateClient(e) {
		e.preventDefault();
		
		// Just gonna post the form data
		const data = await createClient(new FormData(form.current));
		
		const success = requestWasSuccessful(data);
		if(success) {
			window.location.href = "/client";
		} else {
			const messages = data.messages;
			withReactContent(Swal).fire({
				icon: "error",
				title: "Error",
				text: messages[0].message,
				footer: '<a href="/help/error">Why do I have this issue?</a>'		  
			});
		}
	}
	
	return (
		<>
			<h2>New client</h2>
			
			<form ref={form}>
				<legend>Fill fields and submit to create a client</legend>
				
				<div className="campo">
					<label htmlFor="name">Name</label>
					<input
						type="text"
						name="name"
						id="name"
						placeholder="Name"
						onChange={handleChange}
					/>
				</div>
				
				<div className="campo">
					<label htmlFor="surname">Surname</label>
					<input
						type="text"
						name="surname"
						id="surname"
						placeholder="Surname"
						onChange={handleChange}
					/>
				</div>
				
				<div className="campo">
					<label htmlFor="company">Company</label>
					<input
						type="text"
						name="company"
						id="company"
						placeholder="Company"
						onChange={handleChange}
					/>
				</div>
				
				<div className="campo">
					<label htmlFor="email">Email</label>
					<input
						type="email"
						name="email"
						id="email"
						placeholder="Email"
						onChange={handleChange}
					/>
				</div>
				
				<div className="campo">
					<label htmlFor="phoneNumber">Phone number</label>
					<input
						type="number"
						name="phoneNumber"
						id="phoneNumber"
						placeholder="Phone number"
						onChange={handleChange}
					/>
				</div>
				
				<div className="campo">
					<button
						className="btn btn-azul"
						disabled={!validateClient()}
						onClick={handleCreateClient}
					>Create client</button>
				</div>
			</form>
		</>
	);
}
