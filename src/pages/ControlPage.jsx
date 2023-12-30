import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	MDBContainer,
	MDBRow,
	MDBCol,
	MDBCard,
	MDBCardBody,
} from "mdb-react-ui-kit";
import "./style.css";

const LoginPage = () => {
	const navigate = useNavigate();
	const [buttonName, setButtonName] = useState(
		localStorage.getItem("buttonName")
	);

	const handleClick = async () => {
		const handleClickStartButton = () => {
			console.log("start button clicked");
			setButtonName("Stop");
			localStorage.setItem("buttonName", "Stop");
		};

		const handleClickStopButton = () => {
			console.log("stop button clicked");
			setButtonName("Start");
			localStorage.setItem("buttonName", "Start");
		};

		try {
			const response = await fetch("http://localhost:3001/mainPage", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					status: buttonName,
				}),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const result = await response.json();

			if (result.message === "Success") {
				buttonName === "Start"
					? handleClickStartButton()
					: handleClickStopButton();
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
						className="bg-dark text-white my-300 mx-auto"
						style={{ borderRadius: "1rem", maxWidth: "400px" }}
					>
						<MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
							<button
								className="mx-2 px-5 fs-5 btn btn-1 btn-outline-primary"
								onClick={() => handleClick()}
							>
								{buttonName}
							</button>
						</MDBCardBody>
					</MDBCard>
				</MDBCol>
			</MDBRow>
		</MDBContainer>
	);
};

export default LoginPage;
