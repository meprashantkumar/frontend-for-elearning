import { Link } from "react-router-dom";
import "./Sidebar.css";
import { AiFillHome, AiOutlineLogout } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <div className="sidebar">
      <ul>
        {user && user.role === "admin" ? (
          <li>
            <Link to={"/admin/dashboard"}>
              <div className="icon">
                <AiFillHome />
              </div>
              <span>Home</span>
            </Link>
          </li>
        ) : (
          <li>
            <Link to={"/teacher/dashboard"}>
              <div className="icon">
                <AiFillHome />
              </div>
              <span>Home</span>
            </Link>
          </li>
        )}
        {user.role === "teacher" && (
          <li>
            <Link to={"/teacher/courses"}>
              <div className="icon">
                <FaBook />
              </div>
              <span>Courses</span>
            </Link>
          </li>
        )}
        {user && user.role === "admin" && (
          <li>
            <Link to={"/admin/users"}>
              <div className="icon">
                <FaUserAlt />
              </div>
              <span>Users</span>
            </Link>
          </li>
        )}
        <li>
          <Link to={"/account"}>
            <div className="icon">
              <AiOutlineLogout />
            </div>
            <span>Logout</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
