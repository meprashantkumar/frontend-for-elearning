import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../Utils/Layout";
import { fetchCourses } from "../../../Actions/courseActions";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { server } from "../../../Redux/store";
import axios from "axios";

function DashBoard() {
  const dispatch = useDispatch();

  const { courses } = useSelector((state) => state.courses);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const deleteHandler = async (id) => {
    if (window.confirm("are You sure want to delete this course")) {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            token: token,
          },
          withCredentials: true,
        };

        const { data } = await axios.delete(
          `${server}/course/delete/admin/${id}`,
          config
        );

        if (data.message) {
          toast.success(data.message);
          dispatch(fetchCourses());
        }

        if (data.error) {
          toast.error(data.error);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };
  return (
    <Layout>
      {courses && (
        <div className="main-content">
          <div className="box">{courses.length} Courses</div>
          <div className="courses-list">
            {courses.map((i) => (
              <div className="items" key={i._id}>
                {i.title} <img src={i.poster.url} alt="" />{" "}
                <button onClick={() => deleteHandler(i._id)}>
                  <MdDelete />
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
