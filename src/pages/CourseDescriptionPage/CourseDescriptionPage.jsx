import React, { useEffect } from "react";
import "./CourseDescriptionPage.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourse1 } from "../../Actions/courseActions";

const CourseDescription = () => {
  const params = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCourse1(params.id));
  }, [dispatch]);

  const { course1 } = useSelector((state) => state.courses);

  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();

  return (
    <>
      {course1 && (
        <div className="course-description">
          <div className="course-header">
            <img
              src={course1.poster.url}
              alt={course1.title}
              className="course-image"
            />
            <div className="course-info">
              <h2 className="course-title">{course1.title}</h2>
              <p className="course-instructor">
                Instructor: {course1.createdBy}
              </p>
              <p className="course-duration">
                Duration: {course1.duration} Weeks
              </p>
            </div>
          </div>
          <p className="description">{course1.description}</p>

          <p className="description_Price">
            Lets Get Started With The Course At ₹{course1.price}
          </p>

          {user && user.subscriptions.includes(course1._id) ? (
            <button
              onClick={() => navigate(`/course/study/${course1._id}`)}
              className="cta-button"
            >
              Study
            </button>
          ) : (
            <button
              onClick={() => navigate(`/course/buy/${course1._id}`)}
              className="cta-button"
            >
              Buy Now
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default CourseDescription;
