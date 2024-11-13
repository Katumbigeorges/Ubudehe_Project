import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const AssignedFullInfo = () => {
  const { id } = useParams();

  const [categoryAssignment, setCategoryAssignment] = useState({
    citizen: {
      id: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
    },
    category: {
      id: "",
      categoryName: "",
      criteriaDescription: "",
      minimumCriteriaValue: "",
      maximumCriteriaValue: "",
    },
    dateAssigned: "",
    assignedBy: "",
  });

  useEffect(() => {
    loadCategoryAssignment();
  }, []);

  const loadCategoryAssignment = async () => {
    try {
      const result = await axios.get(
        `http://localhost:9192/category-assignment/category-assignment/${id}`
      );
      setCategoryAssignment(result.data);
    } catch (error) {
      console.error("Error loading category assignment:", error);
    }
  };

  return (
    <section className="shadow" style={{ backgroundColor: "whitesmoke" }}>
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-3">
            <div className="card mb-4">
              <div className="card-body text-center">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle img-fluid"
                  style={{ width: 150 }}
                />
                <h5 className="my-3">
                  {`${categoryAssignment.citizen.firstName} ${categoryAssignment.citizen.lastName}`}
                </h5>
                <p className="text-muted mb-0">
                  {categoryAssignment.citizen.phoneNumber}
                </p>
                <div className="d-flex justify-content-center mb-2">
                  <button type="button" className="btn btn-outline-primary">
                    Call
                  </button>
                  <button type="button" className="btn btn-outline-warning ms-1">
                    Message
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-9">
            <div className="card mb-4">
              <div className="card-body">
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h5 className="mb-0">Citizen ID</h5>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{categoryAssignment.citizen.id}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h5 className="mb-0">First Name</h5>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{categoryAssignment.citizen.firstName}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h5 className="mb-0">Last Name</h5>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{categoryAssignment.citizen.lastName}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h5 className="mb-0">Phone Number</h5>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{categoryAssignment.citizen.phoneNumber}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h5 className="mb-0">Category ID</h5>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{categoryAssignment.category.id}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h5 className="mb-0">Category Name</h5>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{categoryAssignment.category.categoryName}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h5 className="mb-0">Criteria Description</h5>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{categoryAssignment.category.criteriaDescription}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h5 className="mb-0">Minimum Criteria Value</h5>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{categoryAssignment.category.minimumCriteriaValue}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h5 className="mb-0">Maximum Criteria Value</h5>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{categoryAssignment.category.maximumCriteriaValue}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h5 className="mb-0">Date Assigned</h5>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{categoryAssignment.dateAssigned}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h5 className="mb-0">Assigned By</h5>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{categoryAssignment.assignedBy}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AssignedFullInfo;
