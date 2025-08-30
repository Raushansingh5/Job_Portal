import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModal";

const MyApplications = () => {
  const { user, isAuthorized } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;

  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/");
      return;
    }

    const fetchApplications = async () => {
      try {
        let endpoint =
          user?.role === "Employer"
            ? `${API_URL}/api/v1/application/employer/getall`
            : `${API_URL}/api/v1/application/jobseeker/getall`;

        const { data } = await axios.get(endpoint, {
          withCredentials: true,
        });
        setApplications(data.applications || []);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch applications");
      }
    };

    if (user) {
      fetchApplications();
    }
  }, [isAuthorized, user, API_URL, navigateTo]);

  const deleteApplication = async (id) => {
    try {
      const { data } = await axios.delete(
        `${API_URL}/api/v1/application/delete/${id}`,
        { withCredentials: true }
      );
      toast.success(data.message);
      setApplications((prev) => prev.filter((app) => app._id !== id));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete application");
    }
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  return (
    <section className="my_applications page">
      {user?.role === "Job Seeker" ? (
        <div className="container">
          <center>
            <h1>My Applications</h1>
          </center>
          {applications.length === 0 ? (
            <center>
              <h4>No Applications Found</h4>
            </center>
          ) : (
            applications.map((element) => (
              <JobSeekerCard
                key={element._id}
                element={element}
                deleteApplication={deleteApplication}
                openModal={openModal}
              />
            ))
          )}
        </div>
      ) : (
        <div className="container">
          <center>
            <h1>Applications From Job Seekers</h1>
          </center>
          {applications.length === 0 ? (
            <center>
              <h4>No Applications Found</h4>
            </center>
          ) : (
            applications.map((element) => (
              <EmployerCard
                key={element._id}
                element={element}
                openModal={openModal}
              />
            ))
          )}
        </div>
      )}

      {modalOpen && (
        <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
      )}
    </section>
  );
};

export default MyApplications;

const JobSeekerCard = ({ element, deleteApplication, openModal }) => (
  <div className="job_seeker_card">
    <div className="detail">
      <p><span>Name:</span> {element.name}</p>
      <p><span>Email:</span> {element.email}</p>
      <p><span>Phone:</span> {element.phone}</p>
      <p><span>Address:</span> {element.address}</p>
      <p><span>CoverLetter:</span> {element.coverLetter}</p>
    </div>
    <div className="resume">
      <img
        src={element.resume.url}
        alt="resume"
        onClick={() => openModal(element.resume.url)}
      />
    </div>
    <div className="btn_area">
      <button onClick={() => deleteApplication(element._id)}>
        Delete Application
      </button>
    </div>
  </div>
);

const EmployerCard = ({ element, openModal }) => (
  <div className="job_seeker_card">
    <div className="detail">
      <p><span>Name:</span> {element.name}</p>
      <p><span>Email:</span> {element.email}</p>
      <p><span>Phone:</span> {element.phone}</p>
      <p><span>Address:</span> {element.address}</p>
      <p><span>CoverLetter:</span> {element.coverLetter}</p>
    </div>
    <div className="resume">
      <img
        src={element.resume.url}
        alt="resume"
        onClick={() => openModal(element.resume.url)}
      />
    </div>
  </div>
);
