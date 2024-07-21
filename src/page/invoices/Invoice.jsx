
/**
 * Invoice
 */
export default function Invoice({
	invoice
}) {
	return (
		<div className="info-pedido">
			<p className="id">ID: {invoice._id}</p>
			<p className="nombre">Client: {invoice.client.name} {invoice.client.surname}</p>
			
			<div className="articulos-pedido">
				<p className="productos">Invoice products</p>
				<ul>
					{invoice.invoices.map((invoice) => {
						return (
							<li key={invoice._id}>
								<p>{invoice.product.name}</p>
								<p>Price: ${invoice.product.price}</p>
								<p>Quantity: ${invoice.quantity}</p>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
}
