// src/components/IssueCertificateForm.jsx

import React, { useState } from "react";
import { connectWallet, getContract } from "../utils/ethersUtils";
import { readFileAsText, generateHash } from "../utils/fileUtils";

const IssueCertificateForm = () => {
  const [studentName, setStudentName] = useState("");
  const [institutionName, setInstitutionName] = useState("");
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

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
      const hash = generateHash(fileContent); // Generate Keccak-256 hash on the client-side

      const contract = getContract(signer);
      const tx = await contract.issueCertificate(studentName, institutionName, hash); // Pass the hash to the contract
      await tx.wait();
      setStatus("Certificate issued successfully!");
    } catch (error) {
      console.error(error);
      setStatus("Error issuing certificate.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button type="submit">Issue Certificate</button>
      {status && <p>{status}</p>}
    </form>
  );
};

export default IssueCertificateForm;