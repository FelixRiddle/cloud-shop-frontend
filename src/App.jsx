import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import ClientPage from "./page/client/page";
import CreateClientPage from "./page/client/create/page";
import EditClient from "./page/client/edit/page";
import ProductPage from "./page/products/page";
import InvoicePage from "./page/invoice/page";
import CreateProduct from "./page/products/create/page";
import EditProductPage from "./page/products/edit/page";

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
						<Route exact path="/" element={<ClientPage />} />
						<Route exact path="/client" element={<ClientPage />} />
						<Route exact path="/client/create" element={<CreateClientPage />} />
						<Route
							exact
							path="/client/edit/:id"
							element={<EditClient />}
						/>
						
						<Route exact path="/products" element={<ProductPage />} />
						<Route
							exact
							path="/products/create"
							element={<CreateProduct />}
						/>
						<Route
							exact
							path="/products/edit/:id"
							element={<EditProductPage />}
						/>
						
						<Route exact path="/invoices" element={<InvoicePage />} />
					</Routes>
				</main>
			</div>
		</Router>
	);
}

export default App;
