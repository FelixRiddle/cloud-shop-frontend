
/**
 * Invoice
 */
export default function Invoice({
	invoice
}) {
	return (
		<div className="info-pedido">
			<p className="id">ID: {invoice._id}</p>
			<p className="nombre">Client: {invoice.client.name}</p>
			
			<div className="articulos-pedido">
				<p className="productos">Invoice products</p>
				<ul>
					<li>
						<p></p>
					</li>
				</ul>
			</div>
		</div>
	);
}
