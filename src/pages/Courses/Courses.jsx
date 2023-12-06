import React, { useEffect } from "react";
import "./Courses.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../../Actions/courseActions";
import LoadingPage from "../../components/LoadingPage/LoadingPage";

const Courses = () => {
  const { courses, loading } = useSelector((state) => state.courses);
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const navigate = useNavigate();

  return (
    <div className="courses">
      <h2 className="courses-heading">Available Courses</h2>
      {loading ? (
        <LoadingPage />
      ) : (
        <div className="course-container">
          {courses && courses.length > 0 ? (
            courses.map((course) => (
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
                <p className="course-duration">
                  Duration: {course.duration} Weeks
                </p>
                <p className="course-duration">₹: {course.price}</p>

                {user && user.subscriptions.includes(course._id) ? (
                  <button
                    onClick={() => navigate(`/course/study/${course._id}`)}
                    className="cta-button"
                  >
                    Study
                  </button>
                ) : (
                  <button
                    onClick={() => navigate(`/course/${course._id}`)}
                    className="cta-button"
                  >
                    Get Started
                  </button>
                )}
              </div>
            ))
          ) : (
            <p>No Courses Yet</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Courses;
