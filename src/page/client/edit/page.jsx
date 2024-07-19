import _ from "lodash";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

import { getClient, updateClient } from "../../../lib/requestTypes";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { requestWasSuccessful } from "../../../lib/status";

/**
 * Edit client
 */
export default function EditClient() {
	const form = useRef(null);
	const params = useParams();
	const [client, setClient] = useState({
		name: "",
		surname: "",
		company: "",
		phoneNumber: "",
	});
	
	async function fetchClient() {
		const id = params.id;
		await getClient(id)
			.then((res) => {
				const clientData = res.client;
				
				setClient(_.pick(clientData, [
					"name", "surname", "email", "company", "phoneNumber",
				]));
				
				return res;
			})
			.catch((err) => {
				const messages = err.messages;
				withReactContent(Swal).fire({
					icon: "error",
					title: "Error",
					text: messages[0].message,
					footer: '<a href="/help/error">Why do I have this issue?</a>'		  
				});
				
				return err;
			});
	}
	
	useEffect(() => {
		fetchClient();
	}, []);
	
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
		const data = await updateClient(new FormData(form.current), params.id);
		
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
			<h2>Edit client</h2>
			
			<form ref={form}>
				<legend>Edit client {client.name}</legend>
				
				<div className="campo">
					<label htmlFor="name">Name</label>
					<input
						type="text"
						name="name"
						id="name"
						placeholder="Name"
						onChange={handleChange}
						value={client.name}
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
						value={client.surname}
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
						value={client.company}
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
						value={client.email}
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
						value={client.phoneNumber}
					/>
				</div>
				
				<div className="campo">
					<button
						className="btn btn-azul"
						disabled={!validateClient()}
						onClick={handleCreateClient}
					>Save changes</button>
				</div>
			</form>
		</>
	);
}
