import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaEye, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const CitizensView = () => {
  const [citizens, setCitizens] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, ] = useState(5); // Number of items per page
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  useEffect(() => {
    loadCitizens();
  }, []);

  const loadCitizens = async () => {
    const result = await axios.get('http://localhost:9192/citizens', {
      validateStatus: () => true,
    });
    if (result.status === 302) {
      setCitizens(result.data);
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:9192/citizens/delete/${id}`);
    loadCitizens();
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedCitizens = React.useMemo(() => {
    let sortableCitizens = [...citizens];
    if (sortConfig.key) {
      sortableCitizens.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableCitizens;
  }, [citizens, sortConfig]);

  const filteredCitizens = sortedCitizens.filter((citizen) =>
    citizen.firstName.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedCitizens = filteredCitizens.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const pageCount = Math.ceil(filteredCitizens.length / pageSize);

  return (
    <section>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Search by first name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-control"
        />
      </div>
      <table className="table table-bordered table-hover shadow">
        <thead>
          <tr className="text-center">
            <th onClick={() => handleSort('id')}>ID</th>
            <th onClick={() => handleSort('firstName')}>First Name</th>
            <th onClick={() => handleSort('lastName')}>Last Name</th>
            <th onClick={() => handleSort('email')}>Email</th>
            <th onClick={() => handleSort('phoneNumber')}>Phone Number</th>
            <th colSpan="3">Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {paginatedCitizens.map((citizen, index) => (
            <tr key={citizen.id}>
              <th scope="row">{(currentPage - 1) * pageSize + index + 1}</th>
              <td>{citizen.firstName}</td>
              <td>{citizen.lastName}</td>
              <td>{citizen.email}</td>
              <td>{citizen.phoneNumber}</td>
              <td className="mx-2">
                <Link to={`/citizen-details/${citizen.id}`} className="btn btn-info">
                  <FaEye />
                </Link>
              </td>
              <td className="mx-2">
                <Link to={`/edit-citizen/${citizen.id}`} className="btn btn-warning">
                  <FaEdit />
                </Link>
              </td>
              <td className="mx-2">
                <button className="btn btn-danger" onClick={() => handleDelete(citizen.id)}>
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-between">
        <button
          className="btn btn-primary"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {pageCount}
        </span>
        <button
          className="btn btn-primary"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pageCount))}
          disabled={currentPage === pageCount}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default CitizensView;
