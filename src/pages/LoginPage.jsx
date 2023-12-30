import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
	MDBContainer,
	MDBRow,
	MDBCol,
	MDBCard,
	MDBCardBody,
	MDBInput,
} from "mdb-react-ui-kit";
import "./style.css";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			navigate("/mainPage");
		}
	}, [navigate]);

	const handleClick = async () => {
		try {
			const response = await fetch("http://localhost:3001/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: email,
					password: password,
				}),
			});
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			const result = await response.json();
			if (result.message === "Success") {
				localStorage.setItem("token", result.token);
				localStorage.setItem("buttonName", "Start");
				navigate("mainPage");
			} else {
				navigate("/");
			}
		} catch (error) {
			console.error("Error posting data:", error);
		}
	};

	return (
		<MDBContainer fluid>
			<MDBRow className="d-flex justify-content-center align-items-center h-100">
				<MDBCol col="12">
					<MDBCard
						className="bg-dark text-white my-200 mx-auto"
						style={{ borderRadius: "1rem", maxWidth: "400px" }}
					>
						<MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
							<h2 className="fw-bold mb-2 text-uppercase">Login</h2>
							<p className="text-white-50 mb-5">
								Please enter your login and password!
							</p>

							<MDBInput
								wrapperClass="mb-4 mx-5 w-100"
								label="Email"
								type="email"
								style={{ backgroundColor: "#212529", color: "white" }}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<MDBInput
								wrapperClass="mb-4 mx-5 w-100"
								label="Password"
								style={{ backgroundColor: "#212529", color: "white" }}
								type="password"
								onChange={(e) => setPassword(e.target.value)}
							/>
							<button
								className="mx-2 px-5 fs-5 btn btn-1 btn-outline-primary"
								onClick={(e) => handleClick(e)}
							>
								Login
							</button>
						</MDBCardBody>
					</MDBCard>
				</MDBCol>
			</MDBRow>
		</MDBContainer>
	);
};

export default LoginPage;
