import React, { useState, useContext, useEffect } from "react";
import Loader from "../layout/Loader";

import JobContext from "../../context/JobContext";
import { toast } from "react-toastify";

const TopicStats = () => {
  const [topic, setTopic] = useState("");

  const { getTopicStats, stats, clearErrors, error, loading } =
    useContext(JobContext);

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearErrors();
    }
  }, [error]);

  const submitHandler = (e) => {
    e.preventDefault();

    getTopicStats(topic);
  };

  return (
    <div className="modalMask">
      <div className="modalWrapper">
        <div className="left">
          <div className="rightContentWrapper">
            <div className="headerWrapper">
              <h3> Get Topic Stats </h3>
            </div>
            <form className="form" onSubmit={submitHandler}>
              <div className="inputWrapper">
                <div className="inputBox">
                  <i aria-hidden className="fas fa-chart-line"></i>
                  <input
                    type="text"
                    placeholder="Enter Your Topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="uploadButtonWrapper">
                <button type="submit" className="uploadButton">
                  {loading ? "Fetching..." : "Get Stats"}
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="right">
          <div className="rightContentWrapper">
            {loading ? (
              <Loader />
            ) : stats && stats.message ? (
              <div className="alert alert-danger">
                <b>{stats.message}</b>
              </div>
            ) : (
              stats && (
                <>
                  <h4>Stats of {topic.toUpperCase()}:</h4>
                  <table className="table table-striped mt-4">
                    <tbody>
                      <tr>
                        <th scope="row">Average Positions</th>
                        <td>{stats.avg_positions}</td>
                      </tr>
                      <tr>
                        <th scope="row">Total Jobs</th>
                        <td>{stats.total_jobs}</td>
                      </tr>
                      <tr>
                        <th scope="row">Minimum Salary</th>
                        <td>${stats.min_salary}</td>
                      </tr>
                      <tr>
                        <th scope="row">Maximum Salary</th>
                        <td>${stats.max_salary}</td>
                      </tr>
                      <tr>
                        <th scope="row">Average Salary</th>
                        <td>${stats.avg_salary}</td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="alert alert-danger mt-4">
                    <b>Note:</b> These stats are collected from the jobs that
                    are posted only on Jobbee. Do not compare these stats with
                    other sites.
                  </div>
                </>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicStats;
