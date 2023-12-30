import React from "react";
import { Route, Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
	const auth = localStorage.getItem("token");
	return auth ? <>{children}</> : <Navigate to="/" />;
}

export default PrivateRoute;
