/**
 * Create client form
 */
export default function CreateClientPage() {
	return (
		<>
			<h2>New client</h2>
			
			<form>
				<legend>Fill fields and submit to create a client</legend>
				
				<div className="campo">
					<label htmlFor="name">Name</label>
					<input type="text" name="name" id="name" placeholder="Name" />
				</div>
				
				<div className="campo">
					<label htmlFor="surname">Surname</label>
					<input type="text" name="surname" id="surname" placeholder="Surname" />
				</div>
				
				<div className="campo">
					<label htmlFor="company">Company</label>
					<input type="text" name="company" id="company" placeholder="Company" />
				</div>
				
				<div className="campo">
					<label htmlFor="phoneNumber">Phone number</label>
					<input type="number" name="phoneNumber" id="phoneNumber" placeholder="Phone number" />
				</div>
				
				<div className="campo">
					<button className="btn btn-azul">Create client</button>
				</div>
			</form>
		</>
	);
}
