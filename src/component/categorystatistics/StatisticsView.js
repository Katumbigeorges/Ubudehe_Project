import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const StatisticsView = () => {
  const [categoryStatistics, setCategoryStatistics] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, ] = useState(5); // Number of items per page
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  useEffect(() => {
    loadCategoryStatistics();
  }, []);

  const loadCategoryStatistics = async () => {
    try {
      const result = await axios.get('http://localhost:9192/category-statistics', {
        validateStatus: () => true
      });
      if (result.status === 302) {
        setCategoryStatistics(result.data);
      }
    } catch (error) {
      console.error('Error loading category statistics:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:9192/category-statistics/delete/${id}`);
      loadCategoryStatistics();
    } catch (error) {
      console.error('Error deleting category statistics:', error);
    }
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedCategoryStatistics = React.useMemo(() => {
    let sortableCategoryStatistics = [...categoryStatistics];
    if (sortConfig.key) {
      sortableCategoryStatistics.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableCategoryStatistics;
  }, [categoryStatistics, sortConfig]);

  const filteredCategoryStatistics = sortedCategoryStatistics.filter((cs) =>
    cs.dateUpdated && cs.dateUpdated.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedCategoryStatistics = filteredCategoryStatistics.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const pageCount = Math.ceil(filteredCategoryStatistics.length / pageSize);

  return (
    <section>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Search by date updated"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-control"
        />
      </div>
      <table className="table table-bordered table-hover shadow">
        <thead>
          <tr className="text-center">
            <th onClick={() => handleSort('id')}>ID</th>
            <th onClick={() => handleSort('category.id')}>Category ID</th>
            <th onClick={() => handleSort('category.categoryName')}>Category Name</th>
            <th onClick={() => handleSort('category.criteriaDescription')}>Criteria Description</th>
            <th onClick={() => handleSort('statisticType')}>Statistic Type</th>
            <th onClick={() => handleSort('statisticValue')}>Statistic Value</th>
            <th onClick={() => handleSort('dateUpdated')}>Date Updated</th>
            <th colSpan="3">Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {paginatedCategoryStatistics.map((categoryStatistic, index) => (
            <tr key={categoryStatistic.id}>
              <th scope="row">{(currentPage - 1) * pageSize + index + 1}</th>
              <td>{categoryStatistic.category && categoryStatistic.category.id}</td>
              <td>{categoryStatistic.category && categoryStatistic.category.categoryName}</td>
              <td>{categoryStatistic.category && categoryStatistic.category.criteriaDescription}</td>
              <td>{categoryStatistic.statisticType}</td>
              <td>{categoryStatistic.statisticValue}</td>
              <td>{categoryStatistic.dateUpdated}</td>
              <td className="mx-2">
                <Link to={`/edit-categorystatistic/${categoryStatistic.id}`} className="btn btn-warning">
                  <FaEdit />
                </Link>
              </td>
              <td className="mx-2">
                <button className="btn btn-danger" onClick={() => handleDelete(categoryStatistic.id)}>
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

export default StatisticsView;
