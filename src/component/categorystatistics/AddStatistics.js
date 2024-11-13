import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AddStatistics = () => {
  let navigate = useNavigate();
  const [categoryStatistic, setCategoryStatistic] = useState({
    category_id: '',
    statisticType: '',
    statisticValue: '',
    dateUpdated: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { category_id, statisticType, statisticValue, dateUpdated } = categoryStatistic;

  const handleInputChange = (e) => {
    setCategoryStatistic({ ...categoryStatistic, [e.target.name]: e.target.value });
  };

  const saveCategoryStatistic = async (e) => {
    e.preventDefault();
    if (!category_id || !statisticType || !statisticValue || !dateUpdated) {
      setErrorMessage('Please fill out all fields.');
      return;
    }
    try {
      await axios.post("http://localhost:9192/category-statistic", categoryStatistic);
      setSuccessMessage('Category Statistic saved successfully!');
    } catch (error) {
      setErrorMessage('Failed to save category Statistic. Please try again later.');
      console.error(error);
    }
  };

  const handleOkClick = () => {
    navigate("/view-categorystatistic");
  };

  return (
    <div className="col-sm-8 py-2 px-5 offset-2 shadow">
      <form onSubmit={(e) => saveCategoryStatistic(e)}>
        <div className='input-group mb-5'>
          <label className='input-group-text' htmlFor='category_id'>Category ID</label>
          <input className="form-control col-sm-6" type="text" name="category_id" id="category_id" required value={category_id} onChange={(e) => handleInputChange(e)} />
        </div>

        <div className='input-group mb-5'>
          <label className='input-group-text' htmlFor='statisticType'>Statistic Type</label>
          <input className="form-control col-sm-6" type="text" name="statisticType" id="statisticType" required value={statisticType} onChange={(e) => handleInputChange(e)} />
        </div>

        <div className='input-group mb-5'>
          <label className='input-group-text' htmlFor='statisticValue'>Statistic Value</label>
          <input className="form-control col-sm-6" type="text" name="statisticValue" id="statisticValue" required value={statisticValue} onChange={(e) => handleInputChange(e)} />
        </div>

        <div className='input-group mb-5'>
          <label className='input-group-text' htmlFor='dateUpdated'>Date Updated</label>
          <input className="form-control col-sm-6" type="text" name="dateUpdated" id="dateUpdated" required value={dateUpdated} onChange={(e) => handleInputChange(e)} />
        </div>

        <div className="row mb-5">
          <div className="col-sm-2">
            <button type="submit" className="btn btn-outline-success btn-lg">Save</button>
          </div>

          <div className="col-sm-2">
            <Link to={"/"} className="btn btn-outline-warning btn-lg">Cancel</Link>
          </div>
        </div>

        {successMessage && (
          <div className="alert alert-success mt-3 text-center" role="alert">
            {successMessage}
            <button onClick={handleOkClick} className="btn btn-success mt-3">OK</button>
          </div>
        )}

        {errorMessage && (
          <div className="alert alert-danger mt-3 text-center" role="alert">
            {errorMessage}
          </div>
        )}
      </form>
    </div>
  );
}

export default AddStatistics;
