import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const CategoryView = () => {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, ] = useState(5); // Number of items per page
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const result = await axios.get('http://localhost:9192/category', {
      validateStatus: () => true,
    });
    if (result.status === 302) {
      setCategories(result.data);
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:9192/category/delete/${id}`);
    loadCategories();
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedCategories = React.useMemo(() => {
    let sortableCategories = [...categories];
    if (sortConfig.key) {
      sortableCategories.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableCategories;
  }, [categories, sortConfig]);

  const filteredCategories = sortedCategories.filter((category) =>
    category.categoryName.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedCategories = filteredCategories.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const pageCount = Math.ceil(filteredCategories.length / pageSize);

  return (
    <section>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Search by category name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-control"
        />
      </div>
      <table className="table table-bordered table-hover shadow">
        <thead>
          <tr className="text-center">
            <th onClick={() => handleSort('id')}>ID</th>
            <th onClick={() => handleSort('categoryName')}>Category Name</th>
            <th onClick={() => handleSort('criteriaDescription')}>Criteria Description</th>
            <th onClick={() => handleSort('minimumCriteriaValue')}>Minimum Criteria Value</th>
            <th onClick={() => handleSort('maximumCriteriaValue')}>Maximum Criteria Value</th>
            <th colSpan="3">Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {paginatedCategories.map((category, index) => (
            <tr key={category.id}>
              <th scope="row">{(currentPage - 1) * pageSize + index + 1}</th>
              <td>{category.categoryName}</td>
              <td>{category.criteriaDescription}</td>
              <td>{category.minimumCriteriaValue}</td>
              <td>{category.maximumCriteriaValue}</td>
              <td className="mx-2">
                <Link to={`/edit-category/${category.id}`} className="btn btn-warning">
                  <FaEdit />
                </Link>
              </td>
              <td className="mx-2">
                <button className="btn btn-danger" onClick={() => handleDelete(category.id)}>
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

export default CategoryView;
