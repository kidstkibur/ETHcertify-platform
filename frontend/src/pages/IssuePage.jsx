// src/pages/IssuePage.jsx

import React from "react";
import IssueCertificateForm from "../components/IssueCertificateForm";

const IssuePage = () => {
  return (
    <div>
      <h1>Certificate Issuance</h1>
      <IssueCertificateForm />
    </div>
  );
};

export default IssuePage;