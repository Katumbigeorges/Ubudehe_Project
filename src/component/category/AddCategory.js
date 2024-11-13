import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AddCategory = () => {
  let navigate = useNavigate();
  const [category, setCategory] = useState({
    categoryName: '',
    criteriaDescription: '',
    minimumCriteriaValue: '',
    maximumCriteriaValue: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState({});

  const { categoryName, criteriaDescription, minimumCriteriaValue, maximumCriteriaValue } = category;

  const handleInputChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const errors = {};
    if (!categoryName) errors.categoryName = 'You have to write the Category Name';
    if (!criteriaDescription) errors.criteriaDescription = 'Type the Criteria Description of the Category';
    if (!minimumCriteriaValue) errors.minimumCriteriaValue = 'Minimum Criteria Value is required';
    if (!maximumCriteriaValue) errors.maximumCriteriaValue = 'Maximum Criteria Value is required';
    return errors;
  };

  const saveCategory = async (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    await axios.post('http://localhost:9192/category', category);
    setSuccessMessage('Category saved successfully!');
  };

  const handleOkClick = () => {
    navigate('/view-category');
  };

  return (
    <div className="col-sm-8 py-2 px-5 offset-2 shadow">
      <form onSubmit={saveCategory}>
        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="categoryName">Category Name</label>
          <input
            className={`form-control col-sm-6 ${errors.categoryName ? 'is-invalid' : ''}`}
            type="text"
            name="categoryName"
            id="categoryName"
            value={categoryName}
            onChange={handleInputChange}
          />
          {errors.categoryName && <div className="invalid-feedback">{errors.categoryName}</div>}
        </div>

        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="criteriaDescription">Criteria Description</label>
          <input
            className={`form-control col-sm-6 ${errors.criteriaDescription ? 'is-invalid' : ''}`}
            type="text"
            name="criteriaDescription"
            id="criteriaDescription"
            value={criteriaDescription}
            onChange={handleInputChange}
          />
          {errors.criteriaDescription && <div className="invalid-feedback">{errors.criteriaDescription}</div>}
        </div>

        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="minimumCriteriaValue">Minimum Criteria Value</label>
          <input
            className={`form-control col-sm-6 ${errors.minimumCriteriaValue ? 'is-invalid' : ''}`}
            type="text"
            name="minimumCriteriaValue"
            id="minimumCriteriaValue"
            value={minimumCriteriaValue}
            onChange={handleInputChange}
          />
          {errors.minimumCriteriaValue && <div className="invalid-feedback">{errors.minimumCriteriaValue}</div>}
        </div>

        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="maximumCriteriaValue">Maximum Criteria Value</label>
          <input
            className={`form-control col-sm-6 ${errors.maximumCriteriaValue ? 'is-invalid' : ''}`}
            type="text"
            name="maximumCriteriaValue"
            id="maximumCriteriaValue"
            value={maximumCriteriaValue}
            onChange={handleInputChange}
          />
          {errors.maximumCriteriaValue && <div className="invalid-feedback">{errors.maximumCriteriaValue}</div>}
        </div>

        <div className="row mb-5">
          <div className="col-sm-2">
            <button type="submit" className="btn btn-outline-success btn-lg">Save</button>
          </div>

          <div className="col-sm-2">
            <Link to="/" className="btn btn-outline-warning btn-lg">Cancel</Link>
          </div>
        </div>

        {successMessage && (
          <div className="alert alert-success mt-3 text-center" role="alert">
            {successMessage}
            <button onClick={handleOkClick} className="btn btn-success mt-3">OK</button>
          </div>
        )}
      </form>
    </div>
  );
};

export default AddCategory;
