import React, { useContext, useEffect, useState } from 'react'
import { getInvoices } from '../../lib/requestTypes';
import { requestWasSuccessful } from '../../lib/status';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import Invoice from './Invoice';
import userVanguard from '../../lib/protection/userVanguard';
import { UserContext } from '../../components/context/UserContext';

/**
 * Invoice page
 */
export default function InvoicePage() {
	const [invoices, setInvoices] = useState([]);
	
	// Validate user is logged in
	const [user, setUser] = useContext(UserContext);
	userVanguard(user);
	
	/**
	 * Fetch invoices
	 */
	async function fetchInvoices() {
		const response = await getInvoices();
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
		
		setInvoices(response.invoices);
	}
	
	useEffect(() => {
		fetchInvoices();
	}, []);
	
	return (
		<>
			<h2>Invoice</h2>
			
			<ul className="listado-pedidos">
				{invoices.map((invoice) => {
					return (
						<li
							className="pedido"
							key={invoice._id}
						>
							<Invoice
								invoice={invoice}
							/>
						</li>
					);
				})}
			</ul>
		</>
	);
}
