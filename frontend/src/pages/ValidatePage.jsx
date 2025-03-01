import React from "react";
import ValidateCertificateForm from "../components/ValidateCertificateForm";
import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "../styles/validatePage.css";

const ValidatePage = () => {
  return (
    <div className="validate-page">
      <Header />
      <h1>Certificate Validation</h1>

      {/* <div className="validation-container">
        <div className="search-section">
          <div className="search-bar">
            <input type="text" placeholder="Enter Certificate ID or Hash" />
            <button>
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>

        <div className="upload-section">
          <ValidateCertificateForm />
        </div>
      </div> */}
      <ValidateCertificateForm />

      {/* Bottom: Certificate Display */}
      <div className="certificate-display">
        <p>Verified certificate will be displayed here.</p>
      </div>
    </div>
  );
};

export default ValidatePage;
