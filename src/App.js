import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ControlPage from "./pages/ControlPage.jsx";

function App() {
	return (
		<Router>
			<Routes>
				<Route
					path="/*"
					element={<LoginPage />}
				/>
				<Route
					path="/mainPage"
					element={
						<PrivateRoute>
							<ControlPage />
						</PrivateRoute>
					}
				/>
			</Routes>
		</Router>
	);
}

export default App;
