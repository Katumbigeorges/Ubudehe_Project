import React, {
	useEffect,
	useState,
} from "react";
import axios from "axios";

import {
	Link,
	useNavigate,
	useParams,
} from "react-router-dom";

const EditCitizen = () => {
	let navigate = useNavigate();

	const { id } = useParams();

	const [citizen, setCitizen] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phoneNumber: "",
	});
	const {
		firstName,
		lastName,
		email,
		phoneNumber,
	} = citizen;

	useEffect(() => {
		loadCitizen();
	}, []);

	const loadCitizen = async () => {
		const result = await axios.get(
			`http://localhost:9192/citizens/citizen/${id}`
		);
		setCitizen(result.data);
	};

	const handleInputChange = (e) => {
		setCitizen({
			...citizen,
			[e.target.name]: e.target.value,
		});
	};
	const updateCitizen = async (e) => {
		e.preventDefault();
		await axios.put(
			`http://localhost:9192/citizens/update/${id}`,
			citizen
		);
		navigate("/view-citizens");
	};

	return (
		<div className="col-sm-8 py-2 px-5 offset-2 shadow">
			<h2 className="mt-5"> Edit Citizen</h2>
			<form onSubmit={(e) => updateCitizen(e)}>
				<div className="input-group mb-5">
					<label
						className="input-group-text"
						htmlFor="firstName">
						First Name
					</label>
					<input
						className="form-control col-sm-6"
						type="text"
						name="firstName"
						id="firstName"
						required
						value={firstName}
						onChange={(e) => handleInputChange(e)}
					/>
				</div>

				<div className="input-group mb-5">
					<label
						className="input-group-text"
						htmlFor="lastName">
						Last Name
					</label>
					<input
						className="form-control col-sm-6"
						type="text"
						name="lastName"
						id="lastName"
						required
						value={lastName}
						onChange={(e) => handleInputChange(e)}
					/>
				</div>

				<div className="input-group mb-5">
					<label
						className="input-group-text"
						htmlFor="email">
						Your Email
					</label>
					<input
						className="form-control col-sm-6"
						type="email"
						name="email"
						id="email"
						required
						value={email}
						onChange={(e) => handleInputChange(e)}
					/>
				</div>

				<div className="input-group mb-5">
					<label
						className="input-group-text"
						htmlFor="department">
						Phone Number
					</label>
					<input
						className="form-control col-sm-6"
						type="text"
						name="phoneNumber"
						id="phoneNumber"
						required
						value={phoneNumber}
						onChange={(e) => handleInputChange(e)}
					/>
				</div>

				<div className="row mb-5">
					<div className="col-sm-2">
						<button
							type="submit"
							className="btn btn-outline-success btn-lg">
							Save
						</button>
					</div>

					<div className="col-sm-2">
						<Link
							to={"/view-citizens"}
							type="submit"
							className="btn btn-outline-warning btn-lg">
							Cancel
						</Link>
					</div>
				</div>
			</form>
		</div>
	);
};

export default EditCitizen;
