import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  let navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const { firstName, lastName, email, password } = user;

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const errors = {};
    if (!firstName) errors.firstName = 'First Name is required';
    if (!lastName) errors.lastName = 'Last Name is required';
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }
    if (!password) errors.password = 'Type Your Password';
    return errors;
  };

  const saveUser = async (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    await axios.post('http://localhost:9192/users', user);
    navigate('/login');
  };

  return (
    <div className="col-sm-8 py-2 px-5 offset-2 shadow">
      <form onSubmit={saveUser}>
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
          <label className="input-group-text" htmlFor="password">
            Password 
          </label>
          <input
            className={`form-control col-sm-6 ${errors.phoneNumber ? 'is-invalid' : ''}`}
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={handleInputChange}
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>

        <div className="row mb-5">
          <div className="col-sm-2">
            <button type="submit" className="btn btn-outline-success btn-lg">
              Register
            </button>
          </div>

          <div className="col-sm-2">
            <Link to="/" type="submit" className="btn btn-outline-warning btn-lg">
              Login
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
