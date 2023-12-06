import React from "react";
import "./Footer.css";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillTwitterSquare,
} from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>
          &copy; 2023 Your E-Learning Platform. All rights reserved. <br /> Made
          With ❤️{" "}
          <a href="https://prashantkc.me" target="_blank">
            Prashant Kumar Chaturvedi
          </a>
        </p>
        <div className="social-links">
          <a href="#">
            <AiFillFacebook />
          </a>
          <a href="#">
            <AiFillTwitterSquare />
          </a>
          <a href="#">
            <AiFillInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
