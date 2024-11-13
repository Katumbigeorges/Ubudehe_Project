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

const EditStatistics = () => {
	let navigate = useNavigate();

	const { id } = useParams();

	const [categoryStatistic, setCategoryStatistic] = useState({
		category: "",
		statisticType: "",
		statisticValue: "",
		dateUpdated: "",
	});
	const {
		category,
		statisticType,
		statisticValue,
		dateUpdated,
	} = categoryStatistic;

	useEffect(() => {
		loadCategoryStatistic();
	}, []);

	const loadCategoryStatistic = async () => {
		const result = await axios.get(
			`http://localhost:9192/category-statistics/category-statistics/${id}`
		);
		setCategoryStatistic(result.data);
	};

	const handleInputChange = (e) => {
		setCategoryStatistic({
			...categoryStatistic,
			[e.target.name]: e.target.value,
		});
	};
	const updateCategoryStatistic = async (e) => {
		e.preventDefault();
		await axios.put(
			`http://localhost:9192/category-statistics/update/${id}`,
			category
		);
		navigate("/view-category-statistics");
	};

	return (
		<div className="col-sm-8 py-2 px-5 offset-2 shadow">
			<h2 className="mt-5"> Edit Statistics</h2>
			<form onSubmit={(e) => updateCategoryStatistic(e)}>
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
						htmlFor="statisticType">
						Statistic Type
					</label>
					<input
						className="form-control col-sm-6"
						type="text"
						name="statisticType"
						id="statisticType"
						required
						value={statisticType}
						onChange={(e) => handleInputChange(e)}
					/>
				</div>

				<div className="input-group mb-5">
					<label
						className="input-group-text"
						htmlFor="statisticValue">
						Statistic Value
					</label>
					<input
						className="form-control col-sm-6"
						type="text"
						name="statisticValue"
						id="statisticValue"
						required
						value={statisticValue}
						onChange={(e) => handleInputChange(e)}
					/>
				</div>

				<div className="input-group mb-5">
					<label
						className="input-group-text"
						htmlFor="dateUpdated">
						Date Updated
					</label>
					<input
						className="form-control col-sm-6"
						type="text"
						name="dateUpdated"
						id="dateUpdated"
						required
						value={dateUpdated}
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

export default EditStatistics;
