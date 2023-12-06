import React from "react";
import "./DPPage.css";
import { Link } from "react-router-dom";

const DPPage = () => {
  return (
    <div className="dpp-page">
      <h1>Daily Practice Problems</h1>
      <div className="dpp-list">
        <Link to="" className="dpp-card">
          <h3>Problem Set 1</h3>
        </Link>
        <Link to="" className="dpp-card">
          <h3>Problem Set 2</h3>
        </Link>
      </div>
    </div>
  );
};

export default DPPage;
