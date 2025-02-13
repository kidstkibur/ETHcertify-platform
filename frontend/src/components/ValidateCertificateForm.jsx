// src/components/ValidateCertificateForm.jsx

// import { ethers } from "ethers";
import React, { useState } from "react";
import { getContract } from "../utils/ethersUtils";
import { readFileAsText, generateHash } from "../utils/fileUtils";
const { JsonRpcProvider } = require("ethers");

const ValidateCertificateForm = () => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please upload a file");
      return;
    }

    try {
      const fileContent = await readFileAsText(file);
      const hash = generateHash(fileContent); // Generate Keccak-256 hash on the client-side

      const provider = new JsonRpcProvider("https://eth-rinkeby.alchemyapi.io/v2/your-alchemy-api-key");
      const contract = getContract(provider);
      const isValid = await contract.validateCertificate(hash); // Pass the hash to the contract
      setStatus(isValid ? "Certificate is valid!" : "Invalid certificate.");
    } catch (error) {
      console.error(error);
      setStatus("Error validating certificate.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Validate Certificate</h2>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button type="submit">Validate Certificate</button>
      {status && <p>{status}</p>}
    </form>
  );
};

export default ValidateCertificateForm;