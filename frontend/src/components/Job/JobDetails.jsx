import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Context } from "../../main";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const { isAuthorized, user } = useContext(Context);

  
  useEffect(() => {
    if (!isAuthorized) {
      navigate("/login");
    }
  }, [isAuthorized, navigate]);

  
  useEffect(() => {
    axios
      .get(`${API_URL}/api/v1/job/${id}`, { withCredentials: true })
      .then((res) => {
        setJob(res.data.job);
      })
      .catch(() => {
        navigate("/notfound");
      });
  }, [id, API_URL, navigate]);

  if (!job) {
    return (
      <section className="jobDetail page">
        <div className="container">
          <h3>Loading job details...</h3>
        </div>
      </section>
    );
  }

  return (
    <section className="jobDetail page">
      <div className="container">
        <h3>Job Details</h3>
        <div className="banner">
          <p>
            Title: <span>{job.title}</span>
          </p>
          <p>
            Category: <span>{job.category}</span>
          </p>
          <p>
            Country: <span>{job.country}</span>
          </p>
          <p>
            City: <span>{job.city}</span>
          </p>
          <p>
            Location: <span>{job.location}</span>
          </p>
          <p>
            Description: <span>{job.description}</span>
          </p>
          <p>
            Job Posted On:{" "}
            <span>
              {job.jobPostedOn
                ? new Date(job.jobPostedOn).toLocaleDateString()
                : "N/A"}
            </span>
          </p>
          <p>
            Salary:{" "}
            {job.fixedSalary ? (
              <span>{job.fixedSalary}</span>
            ) : (
              <span>
                {job.salaryFrom} - {job.salaryTo}
              </span>
            )}
          </p>

         
          {user && user.role === "Job Seeker" && (
            <Link to={`/application/${job._id}`} className="apply-btn">
              Apply Now
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default JobDetails;
