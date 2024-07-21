import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import ClientPage from "./page/client/page";
import CreateClientPage from "./page/client/create/page";
import EditClient from "./page/client/edit/page";
import ProductPage from "./page/products/page";
import InvoicePage from "./page/invoices/page";
import CreateProduct from "./page/products/create/page";
import EditProductPage from "./page/products/edit/page";
import CreateInvoicePage from "./page/invoices/create/page";
import LoginPage from "./page/auth/login/page";
import { UserContext, UserProvider } from "./components/context/UserContext";
import { useContext } from "react";
import Register from "./page/auth/register/page";

/**
 * App
 */
function App() {
	const [user, setUser] = useContext(UserContext);
	
	return (
		<Router>
			<UserProvider value={[user, setUser]}>
				<Header />
				
				<div className="grid contenedor contenido-principal">
					<Navigation />
					
					<main className="caja-contenido col-9">
						<Routes>
							{/* Clients */}
							<Route exact path="/" element={<ClientPage />} />
							<Route exact path="/client" element={<ClientPage />} />
							<Route exact path="/client/create" element={<CreateClientPage />} />
							<Route
								exact
								path="/client/edit/:id"
								element={<EditClient />}
							/>
							
							{/* Products */}
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
							
							{/* Invoices */}
							<Route exact path="/invoices" element={<InvoicePage />} />
							<Route
								exact
								path={`/invoices/create/:id`}
								element={<CreateInvoicePage />}
							/>
							
							{/* Authentication */}
							<Route
								exact
								path="/auth/login"
								element={<LoginPage />}
							/>
							<Route
								exact
								path="/auth/register"
								element={<Register />}
							/>
						</Routes>
					</main>
				</div>
			</UserProvider>
		</Router>
	);
}

export default App;
