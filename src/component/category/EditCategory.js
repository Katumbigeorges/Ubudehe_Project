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

const EditCategory = () => {
	let navigate = useNavigate();

	const { id } = useParams();

	const [category, setCategory] = useState({
		categoryName: "",
		criteriaDescription: "",
		minimumCriteriaValue: "",
		maximumCriteriaValue: "",
	});
	const {
		categoryName,
		criteriaDescription,
		minimumCriteriaValue,
		maximumCriteriaValue,
	} = category;

	useEffect(() => {
		loadCategory();
	}, []);

	const loadCategory = async () => {
		const result = await axios.get(
			`http://localhost:9192/category/category/${id}`
		);
		setCategory(result.data);
	};

	const handleInputChange = (e) => {
		setCategory({
			...category,
			[e.target.name]: e.target.value,
		});
	};
	const updateCategory = async (e) => {
		e.preventDefault();
		await axios.put(
			`http://localhost:9192/category/update/${id}`,
			category
		);
		navigate("/view-category");
	};

	return (
		<div className="col-sm-8 py-2 px-5 offset-2 shadow">
			<h2 className="mt-5"> Edit Category</h2>
			<form onSubmit={(e) => updateCategory(e)}>
				<div className="input-group mb-5">
					<label
						className="input-group-text"
						htmlFor="categoryName">
						Category Name
					</label>
					<input
						className="form-control col-sm-6"
						type="text"
						name="categoryName"
						id="categoryName"
						required
						value={categoryName}
						onChange={(e) => handleInputChange(e)}
					/>
				</div>

				<div className="input-group mb-5">
					<label
						className="input-group-text"
						htmlFor="criteriaDescription">
						Criteria Description
					</label>
					<input
						className="form-control col-sm-6"
						type="text"
						name="criteriaDescription"
						id="criteriaDescription"
						required
						value={criteriaDescription}
						onChange={(e) => handleInputChange(e)}
					/>
				</div>

				<div className="input-group mb-5">
					<label
						className="input-group-text"
						htmlFor="minimumCriteriaValue">
						Minimum Criteria Value
					</label>
					<input
						className="form-control col-sm-6"
						type="text"
						name="minimumCriteriaValue"
						id="minimumCriteriaValue"
						required
						value={minimumCriteriaValue}
						onChange={(e) => handleInputChange(e)}
					/>
				</div>

				<div className="input-group mb-5">
					<label
						className="input-group-text"
						htmlFor="maximumCriteriaValue">
						Maximum Criteria Value
					</label>
					<input
						className="form-control col-sm-6"
						type="text"
						name="maximumCriteriaValue"
						id="maximumCriteriaValue"
						required
						value={maximumCriteriaValue}
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

export default EditCategory;
