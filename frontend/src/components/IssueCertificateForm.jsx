// src/components/IssueCertificateForm.jsx

import React, { useState } from "react";
import { connectWallet, getContract } from "../utils/ethersUtils";
import { readFileAsText, generateHash } from "../utils/fileUtils";

const IssueCertificateForm = () => {
  const [studentName, setStudentName] = useState("");
  const [institutionName, setInstitutionName] = useState("");
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files.length) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!studentName || !institutionName || !file) {
      alert("Please fill all fields");
      return;
    }

    try {
      const signer = await connectWallet();
      if (!signer) return;

      const fileContent = await readFileAsText(file);
      const hash = generateHash(fileContent);
      const contract = getContract(signer);
      const tx = await contract.issueCertificate(studentName, institutionName, hash);
      await tx.wait();
      setStatus("Certificate issued successfully!");
    } catch (error) {
      console.error(error);
      setStatus("Error issuing certificate.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="issue-form">
      <h2>Issue Certificate</h2>
      <input
        type="text"
        placeholder="Student Name"
        value={studentName}
        onChange={(e) => setStudentName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Institution Name"
        value={institutionName}
        onChange={(e) => setInstitutionName(e.target.value)}
      />
      <div 
        className={`file-drop-zone ${dragActive ? "active" : ""}`} 
        onDragOver={handleDragOver} 
        onDragLeave={handleDragLeave} 
        onDrop={handleDrop}
      >
        <p>Drag & drop a file here or click to upload</p>
        <input type="file" onChange={handleFileChange} />
      </div>
      {file && <p>Selected file: {file.name}</p>}
      <button type="submit">Issue Certificate</button>
      {status && <p>{status}</p>}
    </form>
  );
};

export default IssueCertificateForm;
