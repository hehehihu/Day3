import React from "react";
import { Link } from "react-router-dom";
import "./Home.scss";

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <div className="header">
        <div className="auth-links">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </div>

      <div className="main-content">
        <h1>Welcome to the Home Page</h1>
      </div>
    </div>
  );
};

export default Home;
