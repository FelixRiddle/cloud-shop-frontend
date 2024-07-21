import React, { useEffect, useState } from 'react'
import { getInvoices } from '../../lib/requestTypes';
import { requestWasSuccessful } from '../../lib/status';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import Invoice from './Invoice';

/**
 * Invoice page
 */
export default function InvoicePage() {
	const [invoices, setInvoices] = useState([]);
	
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
						<li className="pedido">
							<Invoice
								key={invoice._id}
								invoice={invoice}
							/>
						</li>
					);
				})}
			</ul>
		</>
	);
}
