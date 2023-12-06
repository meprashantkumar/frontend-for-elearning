import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./lecture.css";
import { toast } from "react-toastify";
import { server } from "../../Redux/store";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { fetchLectures } from "../../Actions/courseActions";

const AddLectures = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState("");
  const [videoPrev, setVideoPrev] = useState("");
  const [loading, setLoading] = useState(false);

  const params = useParams();

  const navigate = useNavigate();

  const changeVideoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setVideoPrev(reader.result);
      setVideo(file);
    };
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    setLoading(true);

    const token = localStorage.getItem("token");

    const formdata = new FormData();

    formdata.append("title", title);
    formdata.append("description", description);
    formdata.append("file", video);

    try {
      const config = {
        headers: {
          token: token,
          "Content-type": "multipart/form-data",
        },
        withCredentials: true,
      };

      const { data } = await axios.post(
        `${server}/course/lectures/add/${params.id}`,
        formdata,
        config
      );

      if (data.message) {
        toast.success(data.message);
        dispatch(fetchLectures(params.id));
        setLoading(false);
        setTitle("");
        setDescription("");
        setVideoPrev("");
      }

      if (data.error) {
        toast.error(data.error);
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const { lectures } = useSelector((state) => state.courses);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLectures(params.id));
  }, [dispatch, params]);

  const deleteHandler = async (id) => {
    if (window.confirm("are You sure want to delete this Lecture")) {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            token: token,
          },
          withCredentials: true,
        };

        const { data } = await axios.delete(
          `${server}/course/lecture?courseId=${params.id}&lectureId=${id}`,
          config
        );

        if (data.message) {
          toast.success(data.message);
          dispatch(fetchLectures(params.id));
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
    <div className="lecture-add">
      <div className="top">
        <h1>Add Lectures</h1>
        <button onClick={() => navigate("/teacher/courses")}>Go Back</button>
      </div>
      <form onSubmit={(e) => submitHandler(e, title, description, video)}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <input
          accept="video/mp4"
          required
          type={"file"}
          onChange={changeVideoHandler}
        />

        {videoPrev && (
          <video controlsList="nodownload" controls src={videoPrev}></video>
        )}

        {!loading ? (
          <button type="submit">Upload</button>
        ) : (
          <button className="loading-btn" type="submit" disabled>
            Uploading...
          </button>
        )}
      </form>

      <div className="bottom">
        {lectures && (
          <div className="course-lectures-page">
            <h1>All Lectures</h1>

            <div className="lecture-list">
              {lectures.length > 0 ? (
                lectures.map((lecture) => (
                  <div className="lecture-card" key={lecture._id}>
                    <h3>{lecture.title}</h3>
                    <button onClick={() => deleteHandler(lecture._id)}>
                      <MdDelete />
                    </button>
                    <video
                      width={"100%"}
                      controls
                      controlsList="nodownload noremoteplayback"
                      disablePictureInPicture
                      disableRemotePlayback
                      src={lecture.video.url}
                    ></video>
                  </div>
                ))
              ) : (
                <p>No Lectures Yet</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddLectures;
