/**
 * Client
 */
export default function Client({
	client
}) {
	return (
		<li className="cliente">
			<div className="info-cliente">
				<p className="nombre">{client.name}</p>
				<p className="empresa">{client.company}</p>
				<p>{client.email}</p>
				<p>Phone: {client.phoneNumber}</p>
			</div>
			<div className="acciones">
				<a href="#" className="btn btn-azul">
					<i className="fas fas-pen-alt"></i>
					Edit client
				</a>
				<button className="btn btn-rojo btn-eliminar">
					<i className="fas fa-times"></i>
					Delete client
				</button>
			</div>
		</li>
	);
}
