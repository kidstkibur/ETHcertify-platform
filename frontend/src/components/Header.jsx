import React from "react";
import "../App.css"; // Import CSS for styling

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <img src="../assets/image6.png" alt="ETHcertify Logo" />
        </div>

        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item">
              <a href="#home" className="nav-link active">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a href="#verify" className="nav-link">
                Verify
              </a>
            </li>
            <li className="nav-item">
              <a href="#issue" className="nav-link">
                Issue
              </a>
            </li>
            <li className="nav-item">
              <a href="#about" className="nav-link">
                About
              </a>
            </li>
            <li className="nav-item">
              <a href="#contract" className="nav-link">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;