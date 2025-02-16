// src/pages/ValidatePage.jsx

import React from "react";
import ValidateCertificateForm from "../components/ValidateCertificateForm";
import Header from "../components/Header";

const ValidatePage = () => {
  return (
    <div>
      <Header />
      <h1>Certificate Validation</h1>
      <ValidateCertificateForm />
    </div>
  );
};

export default ValidatePage;