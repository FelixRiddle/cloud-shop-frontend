import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { Route, Switch } from "react-router"

import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import Client from "./page/Client";
import Product from "./page/Product";
import Invoice from "./page/Invoice";

/**
 * App
 */
function App() {
	return (
		<Router>
			<Header />
			
			<div className="grid contenedor contenido-principal">
				<Navigation />
				
				<main className="caja-contenido col-9">
					<Routes>
						<Route exact path="/" element={<Client />} />
						<Route exact path="/products" element={<Product />} />
						<Route exact path="/invoices" element={<Invoice />} />
					</Routes>
				</main>
			</div>
		</Router>
	);
}

export default App;
