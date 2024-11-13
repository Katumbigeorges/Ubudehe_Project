import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Perform any logout logic here, like clearing tokens
        localStorage.removeItem('authToken'); // Example: remove auth token from local storage

        // Redirect to Home page
        navigate('/');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-5">
            <div className="container-fluid">
                <Link className="navbar-brand" to={"/"}>
                    Home
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        {/* Citizen Dropdown */}
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="#" id="citizenDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Citizen
                            </Link>
                            <ul className="dropdown-menu" aria-labelledby="citizenDropdown">
                                <li>
                                    <Link className="dropdown-item" to={"/view-citizens"}>
                                        View Citizens
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to={"/add-citizens"}>
                                        Add Citizen
                                    </Link>
                                </li>
                            </ul>
                        </li>

                        {/* Category Dropdown */}
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="#" id="categoryDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Category
                            </Link>
                            <ul className="dropdown-menu" aria-labelledby="categoryDropdown">
                                <li>
                                    <Link className="dropdown-item" to={"/view-category"}>
                                        View Category
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to={"/add-categories"}>
                                        Add Category
                                    </Link>
                                </li>
                            </ul>
                        </li>

                        {/* Assigned Dropdown */}
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="#" id="assignedDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Categorization
                            </Link>
                            <ul className="dropdown-menu" aria-labelledby="assignedDropdown">
                                <li>
                                    <Link className="dropdown-item" to={"/view-categoryassignment"}>
                                        View Assigned
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to={"/assign-category"}>
                                        Assign Category
                                    </Link>
                                </li>
                            </ul>
                        </li>

                        {/* Statistics Dropdown */}
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="#" id="statisticsDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Statistics
                            </Link>
                            <ul className="dropdown-menu" aria-labelledby="statisticsDropdown">
                                <li>
                                    <Link className="dropdown-item" to={"/view-categorystatistic"}>
                                        View Statistics
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to={"/add-categorystatistics"}>
                                        Add Statistics
                                    </Link>
                                </li>
                            </ul>
                        </li>

                        {/* Audit Dropdown */}
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="#" id="auditDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Audit
                            </Link>
                            <ul className="dropdown-menu" aria-labelledby="auditDropdown">
                                <li>
                                    <Link className="dropdown-item" to={"/view-auditlog"}>
                                        View AuditLogs
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto">
                        {/* Account Dropdown */}
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="#" id="accountDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Account
                            </Link>
                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="accountDropdown">
                                <li>
                                    <Link className="dropdown-item" to={"/login"}>
                                        Log In
                                    </Link>
                                </li>
                                <li>
                                    <button className="dropdown-item" onClick={handleLogout}>
                                        Log Out
                                    </button>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
