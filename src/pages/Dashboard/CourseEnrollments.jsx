import React from "react";
import "./CourseEnrollments.css";
import { useNavigate } from "react-router-dom";

const CourseEnrollments = ({ me }) => {
  const navigate = useNavigate();

  return (
    <>
      {me && (
        <div className="course-enrollments">
          <h2>Enrolled Courses</h2>

          <div className="course-container">
            {me.length > 0 ? (
              me.map((course) => (
                <div className="course-card" key={course._id}>
                  <img
                    src={course.poster.url}
                    alt={course.title}
                    className="course-image"
                  />
                  <h3 className="course-title">{course.title}</h3>
                  <p className="course-instructor">
                    Instructor: {course.createdBy}
                  </p>
                  <p className="course-duration">Duration: {course.duration}</p>
                  <button
                    onClick={() => navigate(`/course/study/${course._id}`)}
                    className="cta-button"
                  >
                    Study
                  </button>
                </div>
              ))
            ) : (
              <p>No Courses Enrolled</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CourseEnrollments;
