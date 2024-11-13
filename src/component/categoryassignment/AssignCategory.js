import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AssignCategory = () => {
  let navigate = useNavigate();
  const [categoryAssignment, setCategoryAssignment] = useState({
    citizen_id: '',
    category_id: '',
    date_assigned: '',
    assigned_by: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { citizen_id, category_id, date_assigned, assigned_by } = categoryAssignment;

  const handleInputChange = (e) => {
    setCategoryAssignment({ ...categoryAssignment, [e.target.name]: e.target.value });
  };

  const saveCategoryAssignment = async (e) => {
    e.preventDefault();
    if (!citizen_id || !category_id || !date_assigned || !assigned_by) {
      setErrorMessage('Please fill out all fields.');
      return;
    }
    try {
      await axios.post("http://localhost:9192/category-assignment", categoryAssignment);
      setSuccessMessage('Category Assignment saved successfully!');
    } catch (error) {
      setErrorMessage('Failed to save category assignment. Please try again later.');
      console.error(error);
    }
  };

  const handleOkClick = () => {
    navigate("/view-categoryassignment");
  };

  return (
    <div className="col-sm-8 py-2 px-5 offset-2 shadow">
      <form onSubmit={(e) => saveCategoryAssignment(e)}>
        <div className='input-group mb-5'>
          <label className='input-group-text' htmlFor='citizen_id'>Citizen ID</label>
          <input className="form-control col-sm-6" type="text" name="citizen_id" id="citizen_id" required value={citizen_id} onChange={(e) => handleInputChange(e)} />
        </div>

        <div className='input-group mb-5'>
          <label className='input-group-text' htmlFor='category_id'>Category ID</label>
          <input className="form-control col-sm-6" type="text" name="category_id" id="category_id" required value={category_id} onChange={(e) => handleInputChange(e)} />
        </div>

        <div className='input-group mb-5'>
          <label className='input-group-text' htmlFor='date_assigned'>Date Assigned</label>
          <input className="form-control col-sm-6" type="text" name="date_assigned" id="date_assigned" required value={date_assigned} onChange={(e) => handleInputChange(e)} />
        </div>

        <div className='input-group mb-5'>
          <label className='input-group-text' htmlFor='assigned_by'>Assigned By</label>
          <input className="form-control col-sm-6" type="text" name="assigned_by" id="assigned_by" required value={assigned_by} onChange={(e) => handleInputChange(e)} />
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

export default AssignCategory;
