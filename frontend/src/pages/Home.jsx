// src/pages/Home.jsx

import React from "react";
import Header from "../components/Header";
import "../App.css"; // Import CSS for styling

const Home = () => {
  return (
    <div>
      <Header />
      {/* Home page design with verify Certificate buttons */}
        <div className="home-container">
            <div className="content">
                <h1 className="gradient-text"> <span className="highlight"> Verify </span> certifications with ease </h1>

                <p className="description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id
                justo vel quam bibendum bibendum. Donec euismod, augue vel faucibus
                ultrices, ex nisl lacinia risus, nec bibendum sapien nisi ac lectus.
                </p>

                <div className="button-group">
                    <button className="gradient-button verify-button">Verify a Certificate</button>
                    <button className="gradient-button issue-button">Issue a Certificate</button>
                </div>
            </div>

            {/* Image Placeholder Section */}
            <div className="image-placeholder"></div>
        </div>
    </div>
  );
};

export default Home;