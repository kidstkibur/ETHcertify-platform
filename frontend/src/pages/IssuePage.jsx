// src/pages/IssuePage.jsx

import React from "react";
import IssueCertificateForm from "../components/IssueCertificateForm";
import Header from "../components/Header";
import "../styles/issuepage.css";


const IssuePage = () => {
  return (
    <div className="issue-page dark-theme">
      <Header />
      <div className="content">
        <h1>Certificate Issuance</h1>
        <IssueCertificateForm />
      </div>
    </div>
  );
};

export default IssuePage;
