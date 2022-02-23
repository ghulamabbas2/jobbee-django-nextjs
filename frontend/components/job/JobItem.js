import React from "react";
import Link from "next/link";

const JobItem = () => {
  return (
    <Link href="/jobdetail">
      <a className="job-listing">
        <div className="job-listing-details">
          <div className="job-listing-description">
            <h4 className="job-listing-company">Tech</h4>
            <h3 className="job-listing-title">Java Developer required</h3>
            <p className="job-listing-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>

          <span className="bookmark-icon"></span>
        </div>

        <div className="job-listing-footer">
          <ul>
            <li>
              <i aria-hidden className="fas fa-industry"></i> Business
            </li>

            <li>
              <i aria-hidden className="fas fa-briefcase"></i> Permanent
            </li>
            <li>
              <i aria-hidden className="fas fa-money-check-alt"></i>$50000
            </li>
            <li>
              <i aria-hidden className="far fa-clock"></i> Post 2 months ago
            </li>
          </ul>
        </div>
      </a>
    </Link>
  );
};

export default JobItem;
