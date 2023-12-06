import React, { useEffect, useState } from "react";
import Layout from "../Utils/Layout";
import "./comon.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminCourses } from "../../Actions/courseActions";
import { toast } from "react-toastify";
import {
  createCourseFail,
  createCourseRequest,
  createCourseSuccess,
} from "../../Redux/reducers/courseSlice";
import axios from "axios";
import { server } from "../../Redux/store";
import { IoIosAddCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";

const categories = [
  "Web development",
  "Artificial Intellegence",
  "Data Structure & Algorithm",
  "App Development",
  "Data Science",
  "Game Development",
];

const AdminCourses = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [imagePrev, setImagePrev] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { acourses, loading } = useSelector((state) => state.courses);

  const changeImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("category", category);
    myForm.append("createdBy", createdBy);
    myForm.append("price", price);
    myForm.append("duration", duration);
    myForm.append("file", image);

    const token = localStorage.getItem("token");

    try {
      const config = {
        headers: {
          token: token,
          "Content-type": "multipart/form-data",
        },
        withCredentials: true,
      };
      dispatch(createCourseRequest());

      const { data } = await axios.post(`${server}/new/course`, myForm, config);

      if (data.message) {
        toast.success(data.message);
        dispatch(fetchAdminCourses());
        setTitle("");
        setDescription("");
        setCategory("");
        setCreatedBy("");
        setDuration("");
        setImage("");
        setImagePrev("");
        setPrice("");
      }

      if (data.error) {
        toast.error(data.error);
      }

      dispatch(createCourseSuccess());
    } catch (error) {
      toast.error(error.message);
      dispatch(createCourseFail());
    }
  };

  useEffect(() => {
    dispatch(fetchAdminCourses());
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
          `${server}/course/delete/${id}`,
          config
        );

        if (data.message) {
          toast.success(data.message);
          dispatch(fetchAdminCourses());
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
      <div className="admin-courses">
        <div className="courses-list">
          {acourses &&
            acourses.map((i) => (
              <div className="items" key={i._id}>
                {i.title} <img src={i.poster.url} alt="" />
                <button
                  onClick={() => navigate("/teacher/add/lectures/" + i._id)}
                >
                  <IoIosAddCircle /> Add Lectures
                </button>
                <button onClick={() => deleteHandler(i._id)}>
                  <MdDelete />
                </button>
              </div>
            ))}
        </div>

        <div className="add-course">
          <h1>Add Course</h1>
          <form onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Enter Course Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Enter Course Description"
              value={description}
              minLength={20}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Enter Course Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Enter Course duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Created By"
              value={createdBy}
              onChange={(e) => setCreatedBy(e.target.value)}
              required
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Category</option>
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <input
              type="file"
              placeholder="choose image"
              required
              onChange={changeImageHandler}
            />

            {imagePrev && <img src={imagePrev} alt="" />}

            {!loading ? (
              <button className="btn" type="submit">
                Add Course
              </button>
            ) : (
              <button className="loading-btn" disabled>
                Adding...
              </button>
            )}
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AdminCourses;
