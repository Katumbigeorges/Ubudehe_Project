import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaEye, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AssignedView = () => {
  const [categoryAssignments, setCategoryAssignments] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, ] = useState(5); // Number of items per page
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  useEffect(() => {
    loadCategoryAssignments();
  }, []);

  const loadCategoryAssignments = async () => {
    try {
      const result = await axios.get('http://localhost:9192/category-assignment', {
        validateStatus: () => true
      });
      if (result.status === 302) {
        setCategoryAssignments(result.data);
      }
    } catch (error) {
      console.error('Error loading category assignments:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:9192/category-assignment/delete/${id}`);
      loadCategoryAssignments();
    } catch (error) {
      console.error('Error deleting category assignment:', error);
    }
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedCategoryAssignments = React.useMemo(() => {
    let sortableCategoryAssignments = [...categoryAssignments];
    if (sortConfig.key) {
      sortableCategoryAssignments.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableCategoryAssignments;
  }, [categoryAssignments, sortConfig]);

  const filteredCategoryAssignments = sortedCategoryAssignments.filter((ca) =>
    ca.dateAssigned && ca.dateAssigned.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedCategoryAssignments = filteredCategoryAssignments.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const pageCount = Math.ceil(filteredCategoryAssignments.length / pageSize);

  return (
    <section>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Search by date assigned"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-control"
        />
      </div>
      <table className="table table-bordered table-hover shadow">
        <thead>
          <tr className="text-center">
            <th onClick={() => handleSort('id')}>ID</th>
            <th onClick={() => handleSort('citizen.id')}>Citizen ID</th>
            <th onClick={() => handleSort('citizen.firstName')}>First Name</th>
            <th onClick={() => handleSort('citizen.lastName')}>Last Name</th>
            <th onClick={() => handleSort('category.id')}>Category ID</th>
            <th onClick={() => handleSort('dateAssigned')}>Date Assigned</th>
            <th onClick={() => handleSort('assignedBy')}>Assigned By</th>
            <th colSpan="3">Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {paginatedCategoryAssignments.map((categoryAssignment, index) => (
            <tr key={categoryAssignment.id}>
              <th scope="row">{(currentPage - 1) * pageSize + index + 1}</th>
              <td>{categoryAssignment.citizen && categoryAssignment.citizen.id}</td>
              <td>{categoryAssignment.citizen && categoryAssignment.citizen.firstName}</td>
              <td>{categoryAssignment.citizen && categoryAssignment.citizen.lastName}</td>
              <td>{categoryAssignment.category && categoryAssignment.category.id}</td>
              <td>{categoryAssignment.dateAssigned}</td>
              <td>{categoryAssignment.assignedBy}</td>
              <td className="mx-2">
                <Link to={`/assignedfullinformation/${categoryAssignment.id}`} className="btn btn-info">
                  <FaEye />
                </Link>
              </td>
              <td className="mx-2">
                <Link to={`/edit-categoryassignment/${categoryAssignment.id}`} className="btn btn-warning">
                  <FaEdit />
                </Link>
              </td>
              <td className="mx-2">
                <button className="btn btn-danger" onClick={() => handleDelete(categoryAssignment.id)}>
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

export default AssignedView;
