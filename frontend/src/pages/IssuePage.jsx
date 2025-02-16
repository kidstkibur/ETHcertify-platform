// src/pages/IssuePage.jsx

import React from "react";
import IssueCertificateForm from "../components/IssueCertificateForm";
import Header from "../components/Header";

const IssuePage = () => {
  return (
    <div>
      <Header />
      <h1>Certificate Issuance</h1>
      <IssueCertificateForm />
    </div>
  );
};

export default IssuePage;