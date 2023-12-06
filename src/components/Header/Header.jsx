import React, { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const { isLoggedIn } = useSelector((state) => state.user);

  return (
    <header className="header">
      <div className="logo">E-Learning</div>

      {/* this is for larger screens */}
      <div className={`links`}>
        <Link to={"/"}>Home</Link>
        <Link to={"/courses"}>Courses</Link>
        <Link to={"/about"}>About</Link>
        {isLoggedIn ? (
          <Link to={"/account"}>Account</Link>
        ) : (
          <Link to={"/login"}>Login</Link>
        )}
      </div>

      {/* this is for smaller screens */}
      <div className={`nav ${isNavOpen ? "nav-open" : ""}`}>
        <Link onClick={() => setIsNavOpen(!isNavOpen)} to={"/"}>
          Home
        </Link>
        <Link onClick={() => setIsNavOpen(!isNavOpen)} to={"/courses"}>
          Courses
        </Link>
        <Link onClick={() => setIsNavOpen(!isNavOpen)} to={"/about"}>
          About
        </Link>
        {isLoggedIn ? (
          <Link onClick={() => setIsNavOpen(!isNavOpen)} to={"/account"}>
            Account
          </Link>
        ) : (
          <Link onClick={() => setIsNavOpen(!isNavOpen)} to={"/login"}>
            Login
          </Link>
        )}
      </div>
      <div
        className={`menu-toggle ${isNavOpen ? "open" : ""}`}
        onClick={toggleNav}
      >
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </header>
  );
};

export default Header;
