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

const EditAssigned = () => {
	let navigate = useNavigate();

	const { id } = useParams();

	const [categoryAssignment, setCategoryAssignment] = useState({
		citizen: "",
		category: "",
		dateAssigned: "",
		assignedBy: "",
	});
	const {
		citizen,
		category,
		dateAssigned,
		assignedBy,
	} = categoryAssignment;

	useEffect(() => {
		loadCategoryAssignment();
	}, []);

	const loadCategoryAssignment = async () => {
		const result = await axios.get(
			`http://localhost:9192/category-assignment/category-assignment/${id}`
		);
		setCategoryAssignment(result.data);
	};

	const handleInputChange = (e) => {
		setCategoryAssignment({
			...categoryAssignment,
			[e.target.name]: e.target.value,
		});
	};
	const updateCategoryAssignment = async (e) => {
		e.preventDefault();
		await axios.put(
			`http://localhost:9192/category-assignment/update/${id}`,
			category
		);
		navigate("/view-category-assignment");
	};

	return (
		<div className="col-sm-8 py-2 px-5 offset-2 shadow">
			<h2 className="mt-5"> Edit Assigned Category</h2>
			<form onSubmit={(e) => updateCategoryAssignment(e)}>
				<div className="input-group mb-5">
					<label
						className="input-group-text"
						htmlFor="citizen">
						Citizen ID
					</label>
					<input
						className="form-control col-sm-6"
						type="text"
						name="citizen"
						id="citizen"
						required
						value={citizen}
						onChange={(e) => handleInputChange(e)}
					/>
				</div>

				<div className="input-group mb-5">
					<label
						className="input-group-text"
						htmlFor="category">
						Category ID
					</label>
					<input
						className="form-control col-sm-6"
						type="text"
						name="category"
						id="category"
						required
						value={category}
						onChange={(e) => handleInputChange(e)}
					/>
				</div>

				<div className="input-group mb-5">
					<label
						className="input-group-text"
						htmlFor="dateAssigned">
						Date Assigned
					</label>
					<input
						className="form-control col-sm-6"
						type="text"
						name="dateAssigned"
						id="dateAssigned"
						required
						value={dateAssigned}
						onChange={(e) => handleInputChange(e)}
					/>
				</div>

				<div className="input-group mb-5">
					<label
						className="input-group-text"
						htmlFor="assignedBy">
						Assigned By
					</label>
					<input
						className="form-control col-sm-6"
						type="text"
						name="assignedBy"
						id="assignedBy"
						required
						value={assignedBy}
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
							to={"/"}
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

export default EditAssigned;
