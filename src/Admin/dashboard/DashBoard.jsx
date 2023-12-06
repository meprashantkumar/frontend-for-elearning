import React, { useEffect } from "react";
import Layout from "../Utils/Layout";
import { fetchAdminCourses } from "../../Actions/courseActions";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";

function DashBoard() {
  const dispatch = useDispatch();

  const { acourses } = useSelector((state) => state.courses);

  useEffect(() => {
    dispatch(fetchAdminCourses());
  }, [dispatch]);
  return (
    <Layout>
      {acourses && (
        <div className="main-content">
          <div className="box">{acourses.length} Courses</div>
          <div className="courses-list">
            {acourses.map((i) => (
              <div className="items" key={i._id}>
                {i.title} <img src={i.poster.url} alt="" />{" "}
                <button>
                  <FaEdit />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </Layout>
  );
}

export default DashBoard;
