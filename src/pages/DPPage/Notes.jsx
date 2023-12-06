import React from "react";
import "./DPPage.css";
import { Link } from "react-router-dom";

const Notes = () => {
  return (
    <div className="dpp-page">
      <h1>Notes</h1>
      <div className="dpp-list">
        <Link to="" className="dpp-card">
          <h3>title 1</h3>
        </Link>
        <Link to="" className="dpp-card">
          <h3>title 2</h3>
        </Link>
      </div>
    </div>
  );
};

export default Notes;
