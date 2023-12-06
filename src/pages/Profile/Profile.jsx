import React from "react";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { fetchme, logoutUser } from "../../Actions/userActions";
import { toast } from "react-toastify";
import { AiOutlineLogout } from "react-icons/ai";
import LoadingPage from "../../components/LoadingPage/LoadingPage";

const Profile = ({ user: userProfile }) => {
  const { loading } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const logoutHandler = async () => {
    await dispatch(fetchme());
    await dispatch(logoutUser());
    await toast.success("Logged Out");
  };

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <>
          {userProfile && (
            <div className="profile">
              <h2>My Profile</h2>
              <div className="profile-info">
                <p>
                  <strong>Name:</strong> {userProfile.firstname}{" "}
                  {userProfile.lastname}
                </p>
                <p>
                  <strong>Email:</strong> {userProfile.email}
                </p>

                <button
                  onClick={() => navigate(`/${userProfile._id}/dashboard`)}
                  className="cta-button"
                >
                  <MdDashboard /> DashBoard
                </button>
                <br />
                {userProfile.role === "teacher" && (
                  <button
                    onClick={() => navigate(`/teacher/dashboard`)}
                    className="cta-button"
                  >
                    <MdDashboard />
                    Teacher DashBoard
                  </button>
                )}
                <br />
                {userProfile.role === "admin" && (
                  <button
                    onClick={() => navigate(`/admin/dashboard`)}
                    className="cta-button"
                  >
                    <MdDashboard />
                    Admin DashBoard
                  </button>
                )}
                <br />
                <button onClick={logoutHandler} className="cta-button">
                  <AiOutlineLogout /> Logout
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Profile;
