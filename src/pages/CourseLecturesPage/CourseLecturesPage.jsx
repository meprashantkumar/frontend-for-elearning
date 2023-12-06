import React, { useEffect } from "react";
import "./CourseLecturesPage.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchLectures } from "../../Actions/courseActions";
import { useParams } from "react-router-dom";
import LoadingPage from "../../components/LoadingPage/LoadingPage";

const CourseLecturesPage = () => {
  const { lectures, loading } = useSelector((state) => state.courses);

  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(fetchLectures(params.id));
  }, [dispatch, params]);

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        lectures && (
          <div className="course-lectures-page">
            <h1>All Lectures</h1>
            <div className="lecture-list">
              {lectures.length > 0 ? (
                lectures.map((lecture) => (
                  <div className="lecture-card" key={lecture._id}>
                    <h3>{lecture.title}</h3>
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
        )
      )}
    </>
  );
};

export default CourseLecturesPage;
