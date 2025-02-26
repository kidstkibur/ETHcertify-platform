import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import { getContract } from "../utils/ethersUtils";
import { readFileAsText, generateHash } from "../utils/fileUtils";
const { JsonRpcProvider } = require("ethers");


const ValidateCertificateForm = () => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please upload a file");
      return;
    }

    try {
      const fileContent = await readFileAsText(file);
      const hash = generateHash(fileContent);

      const provider = new JsonRpcProvider("https://eth-rinkeby.alchemyapi.io/v2/your-alchemy-api-key");
      const contract = getContract(provider);
      const isValid = await contract.validateCertificate(hash);
      setStatus(isValid ? "Certificate is valid!" : "Invalid certificate.");
    } catch (error) {
      console.error(error);
      setStatus("Error validating certificate.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="validate-form">
      <h2>Validate Certificate</h2>

      {/* Drag & Drop Area */}
      <div
        className="drag-drop-area"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <FontAwesomeIcon icon={faCloudUploadAlt} size="3x" className="upload-icon" />
        {file ? (
          <p>{file.name}</p>
        ) : (
          <p>Drag & drop a file here or click to upload</p>
        )}
      </div>


      {/* File Upload Button */}
      <input type="file" onChange={handleFileChange} />

      {/* File Preview Section */}
      {file && (
        <div className="file-preview">
          {file.type.startsWith("image/") ? (
            <img src={URL.createObjectURL(file)} alt="Preview" />
          ) : file.type === "application/pdf" ? (
            <iframe
              src={URL.createObjectURL(file)}
              title="PDF Preview"
              width="100%"
              height="300px"
            ></iframe>
          ) : (
            <p>No preview available for this file type</p>
          )}
        </div>
      )}

      <button className="validate-button" type="submit">Validate Certificate</button>

      {status && <p>{status}</p>}
    </form>
  );
};

export default ValidateCertificateForm;
