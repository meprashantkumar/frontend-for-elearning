import React from "react";
import "./StudentDashboard.css";
import CourseEnrollments from "./CourseEnrollments";
import { useSelector } from "react-redux";

const StudentDashboard = () => {
  const { usercourses } = useSelector((state) => state.user);
  return (
    <div className="student-dashboard">
      <div className="dashboard-content">
        {usercourses && <CourseEnrollments me={usercourses} />}
      </div>
    </div>
  );
};

export default StudentDashboard;
