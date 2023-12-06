import React from "react";
import "./Home.css";
import Testimonials from "../../components/Testimonials/Testimonials";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Our E-Learning Platform</h1>
          <p>Learn, Grow, Excel</p>
          <button onClick={() => navigate("/courses")} className="cta-button">
            Get Started
          </button>
        </div>

        <Testimonials />
      </section>
    </div>
  );
}

export default Home;
