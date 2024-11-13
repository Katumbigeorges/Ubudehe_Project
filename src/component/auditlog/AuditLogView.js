import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrashAlt } from 'react-icons/fa';

const AuditLogView = () => {
  const [auditLogs, setAuditLogs] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize,] = useState(5); // Number of items per page
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  useEffect(() => {
    loadAuditLogs();
  }, []);

  const loadAuditLogs = async () => {
    try {
      const result = await axios.get('http://localhost:9192/audit-log', {
        validateStatus: () => true
      });
      if (result.status === 302) {
        setAuditLogs(result.data);
      }
    } catch (error) {
      console.error('Error loading audit logs:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:9192/audit-log/delete/${id}`);
      loadAuditLogs();
    } catch (error) {
      console.error('Error deleting audit log:', error);
    }
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedAuditLogs = React.useMemo(() => {
    let sortableAuditLogs = [...auditLogs];
    if (sortConfig.key) {
      sortableAuditLogs.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableAuditLogs;
  }, [auditLogs, sortConfig]);

  const filteredAuditLogs = sortedAuditLogs.filter((log) =>
    log.actionPerformed.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedAuditLogs = filteredAuditLogs.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const pageCount = Math.ceil(filteredAuditLogs.length / pageSize);

  return (
    <section>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Search by action performed"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-control"
        />
      </div>
      <table className="table table-bordered table-hover shadow">
        <thead>
          <tr className="text-center">
            <th onClick={() => handleSort('id')}>ID</th>
            <th onClick={() => handleSort('timeStamp')}>Timestamp</th>
            <th onClick={() => handleSort('actionPerformed')}>Action performed</th>
            <th onClick={() => handleSort('detailsOfChanges')}>Details Of Change</th>
            <th colSpan="3">Action</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {paginatedAuditLogs.map((auditLog, index) => (
            <tr key={auditLog.id}>
              <th scope="row">{(currentPage - 1) * pageSize + index + 1}</th>
              <td>{auditLog.timeStamp}</td>
              <td>{auditLog.actionPerformed}</td>
              <td>{auditLog.detailsOfChanges}</td>
              
              <td className="mx-2">
                <button className="btn btn-danger" onClick={() => handleDelete(auditLog.id)}>
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

export default AuditLogView;
