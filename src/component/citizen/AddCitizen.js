import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AddCitizen = () => {
  let navigate = useNavigate();
  const [citizen, setCitizen] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  });
  const { firstName, lastName, email, phoneNumber } = citizen;

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setCitizen({ ...citizen, [e.target.name]: e.target.value });
  };
// Validations
  const validate = () => {
    const errors = {};
    if (!firstName) errors.firstName = 'First Name is required';
    if (!lastName) errors.lastName = 'Last Name is required';
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }
    if (!phoneNumber) errors.phoneNumber = 'Phone Number is required';
    return errors;
  };

  const saveCitizen = async (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    await axios.post('http://localhost:9192/citizens', citizen);
    navigate('/view-citizens');
  };

  return (
    <div className="col-sm-8 py-2 px-5 offset-2 shadow">
      <form onSubmit={saveCitizen}>
        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="firstName">
            First Name
          </label>
          <input
            className={`form-control col-sm-6 ${errors.firstName ? 'is-invalid' : ''}`}
            type="text"
            name="firstName"
            id="firstName"
            value={firstName}
            onChange={handleInputChange}
          />
          {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
        </div>

        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="lastName">
            Last Name
          </label>
          <input
            className={`form-control col-sm-6 ${errors.lastName ? 'is-invalid' : ''}`}
            type="text"
            name="lastName"
            id="lastName"
            value={lastName}
            onChange={handleInputChange}
          />
          {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
        </div>

        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="email">
            Email
          </label>
          <input
            className={`form-control col-sm-6 ${errors.email ? 'is-invalid' : ''}`}
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={handleInputChange}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="phoneNumber">
            Phone Number
          </label>
          <input
            className={`form-control col-sm-6 ${errors.phoneNumber ? 'is-invalid' : ''}`}
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            value={phoneNumber}
            onChange={handleInputChange}
          />
          {errors.phoneNumber && <div className="invalid-feedback">{errors.phoneNumber}</div>}
        </div>

        <div className="row mb-5">
          <div className="col-sm-2">
            <button type="submit" className="btn btn-outline-success btn-lg">
              Save
            </button>
          </div>

          <div className="col-sm-2">
            <Link to="/" type="submit" className="btn btn-outline-warning btn-lg">
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddCitizen;
