import { Link } from "react-router-dom";
import { deleteClient } from "../../lib/requestTypes";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

/**
 * Client
 */
export default function Client({
	client
}) {
	/**
	 * Handle delete client
	 */
	function handleDeleteClient(e) {
		withReactContent(Swal).fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!"
		}).then(async (result) => {
			if (result.isConfirmed) {
				await deleteClient(client._id);
				withReactContent(Swal).fire({
					title: "Deleted!",
					text: "Client deleted",
					icon: "success"
				});
			}
		});
	}
	
	return (
		<li className="cliente">
			<div className="info-cliente">
				<p className="nombre">{client.name}</p>
				<p className="empresa">{client.company}</p>
				<p>{client.email}</p>
				<p>Phone: {client.phoneNumber}</p>
			</div>
			<div className="acciones">
				<Link to={`/client/edit/${client._id}`} className="btn btn-azul">
					<i className="fas fas-pen-alt"></i>
					Edit client
				</Link>
				<button
					className="btn btn-rojo btn-eliminar"
					onClick={handleDeleteClient}
				>
					<i className="fas fa-times"></i>
					Delete client
				</button>
			</div>
		</li>
	);
}
