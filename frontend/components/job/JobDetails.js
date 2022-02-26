import React, { useEffect, useContext } from "react";
import moment from "moment";
import mapboxgl from "mapbox-gl/dist/mapbox-gl.js";

import JobContext from "../../context/JobContext";
import { toast } from "react-toastify";

mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN;

const JobDetails = ({ job, candidates, access_token }) => {
  const { applyToJob, checkJobApplied, applied, clearErrors, error, loading } =
    useContext(JobContext);

  useEffect(async () => {
    const cooridnates = job.point.split("(")[1].replace(")", "").split(" ");

    // Create map and set the center point
    const map = new mapboxgl.Map({
      container: "job-map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: cooridnates,
      zoom: 11,
    });

    // Add market on map
    new mapboxgl.Marker().setLngLat(cooridnates).addTo(map);

    if (error) {
      toast.error(error);
      clearErrors();
    }

    checkJobApplied(job.id, access_token);
  }, [error]);

  const applyToJobHandler = () => {
    applyToJob(job.id, access_token);
  };

  const d1 = moment(job.lastDate);
  const d2 = moment(Date.now());
  const isLastDatePassed = d1.diff(d2, "days") < 0 ? true : false;

  return (
    <div className="job-details-wrapper">
      <div className="container container-fluid">
        <div className="row">
          <div className="col-xl-9 col-lg-8">
            <div className="job-details p-3">
              <div className="job-header p-4">
                <h2>{job.title}</h2>
                <span>
                  <i aria-hidden className="fas fa-building"></i>
                  <span> {job.company}</span>
                </span>
                <span className="ml-4">
                  <i aria-hidden className="fas fa-map-marker-alt"></i>
                  <span> {job.address}</span>
                </span>

                <div className="mt-3">
                  <span>
                    {loading ? (
                      "Loading..."
                    ) : applied ? (
                      <button
                        disabled
                        className="btn btn-success px-4 py-2 apply-btn"
                      >
                        <i aria-hidden className="fas fa-check"></i>{" "}
                        {loading ? "Loading" : "Applied"}
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary px-4 py-2 apply-btn"
                        onClick={applyToJobHandler}
                        disabled={isLastDatePassed}
                      >
                        {loading ? "Loading..." : "Apply Now"}
                      </button>
                    )}
                    <span className="ml-4 text-success">
                      <b>{candidates}</b> candidates has applied to this job.
                    </span>
                  </span>
                </div>
              </div>

              <div className="job-description mt-5">
                <h4>Description</h4>
                <p>{job.description}</p>
              </div>

              <div className="job-summary">
                <h4 className="mt-5 mb-4">Job Summary</h4>
                <table className="table table-striped">
                  <tbody>
                    <tr>
                      <td>Job Type</td>
                      <td>:</td>
                      <td>{job.jobType}</td>
                    </tr>

                    <tr>
                      <td>Job Industry</td>
                      <td>:</td>
                      <td>{job.industry}</td>
                    </tr>

                    <tr>
                      <td>Expected Salary</td>
                      <td>:</td>
                      <td>${job.salary}</td>
                    </tr>

                    <tr>
                      <td>Education</td>
                      <td>:</td>
                      <td>{job.education}</td>
                    </tr>

                    <tr>
                      <td>Experience</td>
                      <td>:</td>
                      <td>{job.experience}</td>
                    </tr>

                    <tr>
                      <td>Company</td>
                      <td>:</td>
                      <td>{job.company}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="job-location">
                <h4 className="mt-5 mb-4">Job Location</h4>
                <div id="job-map" style={{ height: 520, width: "100%" }} />
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-lg-4">
            <div className="job-contact-details p-3">
              <h4 className="my-4">More Details</h4>
              <hr />
              <h5>Email Address:</h5>
              <p>{job.email}</p>

              <h5>Job Posted:</h5>
              <p>
                {moment.utc(job.createdAt).local().startOf("seconds").fromNow()}
              </p>

              <h5>Last Date:</h5>
              <p>{job.lastDate.substring(0, 10)}</p>
            </div>

            {isLastDatePassed && (
              <div className="mt-5 p-0">
                <div className="alert alert-danger">
                  <h5>Note:</h5>
                  You can no longer apply to this job. This job is expired. Last
                  date to apply for this job was:{" "}
                  <b>{job.lastDate.substring(0, 10)}</b>
                  <br /> Checkout others job on Jobbee.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
