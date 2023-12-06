import React, { useEffect } from "react";
import "./CourseStudyPage.css";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourse1 } from "../../Actions/courseActions";
import LoadingPage from "../../components/LoadingPage/LoadingPage";

const CourseStudyPage = () => {
  const params = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCourse1(params.id));
  }, [dispatch, params]);

  const { course1, loading } = useSelector((state) => state.courses);
  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        course1 && (
          <div className="course-study-page">
            <h2>{course1.title}</h2>
            <Link to={"/lectures/" + course1._id} className="section lectures">
              <h2>Lectures</h2>
            </Link>

            {/* <Link to={"/dpp/" + course1._id} className="section dpp">
              <h2>Daily Practice Problems (DPP)</h2>
            </Link>

            <Link to={"/notes/" + course1._id} className="section notes">
              <h2>Notes</h2>
            </Link> */}
          </div>
        )
      )}
    </>
  );
};

export default CourseStudyPage;
