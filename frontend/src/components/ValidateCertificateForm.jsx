import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import { getContract } from "../utils/ethersUtils";
import Web3 from "web3"; // Import Web3 to generate the hash
import env from "../env";
import contract from "./ETHcertifyPlatform.json";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "../styles/validatePage.css";
import Certificate from "./certeficateTemplates";

const { JsonRpcProvider } = require("ethers");

const ValidateCertificateForm = () => {
  if (!env.INFURA_RPC_URL || !env.PRIVATE_KEY || !env.CONTRACT_ADDRESS) {
    throw new Error("❌ Missing environment variables. Check .env file.");
  }

  const web3 = new Web3(new Web3.providers.HttpProvider(env.INFURA_RPC_URL));
  const account = web3.eth.accounts.privateKeyToAccount(env.PRIVATE_KEY);
  web3.eth.accounts.wallet.add(account);

  const contractABI = contract.abi;

  const contractAddress = env.CONTRACT_ADDRESS;
  const certificateContract = new web3.eth.Contract(
    contractABI,
    contractAddress
  );

  const [file, setFile] = useState(null);
  const [certHash, setCertHash] = useState(""); // State for cert hash
  const [status, setStatus] = useState("");
  const [certificateDetails, setCertificateDetails] = useState(null);
  const [searchValue, setSearchValue] = useState("");

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

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value); // Update searchValue state
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (!searchValue) {
      setStatus("❌ Please enter a Certificate ID or Hash.");
      return;
    }
    await validateCertificate(searchValue); // Validate directly from searchValue
  };

  const validateCertificate = async (certId) => {
    console.log("🔍 Validating Certificate on Blockchain...");

    try {
      // Step 1: Fetch certificate details from the smart contract
      const provider = new JsonRpcProvider(env.INFURA_RPC_URL);
      const contract = getContract(provider);

      const result = await certificateContract.methods
        .validateCertificate(certId)
        .call();
      // const result = await contract.validateCertificate(certId);

      // Extract values properly
      const isValid = result[0]; // Boolean
      const studentName = result[1] || "N/A";
      const courseName = result[2] || "N/A";
      const ipfsHash = result[4] || "N/A";

      if (!isValid) {
        console.log("❌ Certificate is not valid or does not exist.");
        setStatus("Invalid certificate.");
        return;
      }

      console.log("\n✅ Certificate Found on Blockchain:");
      console.log(`   🎓 Student: ${studentName}`);
      console.log(`   📖 Course: ${courseName}`);
      console.log(`   🌐 IPFS Hash: ${ipfsHash}`);

      if (ipfsHash === "N/A") {
        console.warn("⚠️ No IPFS Hash found in contract.");
        setStatus("No IPFS hash found.");
        return;
      }

      // Update state with certificate details
      setCertificateDetails({ studentName, courseName, ipfsHash });

      console.log(
        `🔗 Fetching certificate metadata from IPFS: https://ipfs.io/ipfs/${ipfsHash}`
      );

      console.log("✅ Certificate Issued! Transaction Hash:");
      setStatus(`Certificate is valid!`);
    } catch (error) {
      console.error("⚠️ Error fetching certificate data:", error.message);
      setStatus("Error validating certificate.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please upload a file");
      return;
    }

    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const jsonData = JSON.parse(event.target.result);

        // Extracting student name, course name, and issue date from the JSON file
        const { studentName, courseName, issueDate, certHash } = jsonData;

        if (!studentName || !courseName || !issueDate) {
          console.log("Missing required fields in JSON.");
          setStatus("Missing required fields in JSON.");
          return;
        }
        console.log(studentName, courseName, issueDate);

        // Generate the certHash using Web3
        const web3 = new Web3();

        setCertHash(certHash);

        // Validate the certificate using the generated certHash
        await validateCertificate(certHash);
      };

      // Read the file as text and process
      reader.readAsText(file);
    } catch (error) {
      // console.error(error);
      setStatus("Error processing certificate.");
    }
  };

  return (
    <div>
      <div className="validation-container">
        <div className="search-section">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Enter Certificate ID or Hash"
              value={searchValue}
              onChange={handleSearchChange}
            />
            <button onClick={handleSearchSubmit}>
              Validate using CertHash {/* Updated Button Label */}
            </button>
          </div>
        </div>
        <div className="upload-section">
          <form onSubmit={handleSubmit} className="validate-form">
            <h2>Validate Certificate</h2>

            {/* Drag & Drop Area */}
            <div
              className="drag-drop-area"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <FontAwesomeIcon
                icon={faCloudUploadAlt}
                size="3x"
                className="upload-icon"
              />
              {file ? (
                <p>{file.name}</p>
              ) : (
                <p>Drag & drop a JSON file here or click to upload</p>
              )}
            </div>

            {/* File Upload Button */}
            <input type="file" onChange={handleFileChange} />

            {/* File Preview Section */}
            {file && (
              <div className="file-preview">
                {file.type === "application/json" ? (
                  <p>JSON file selected: {file.name}</p>
                ) : (
                  <p>Please upload a JSON file.</p>
                )}
              </div>
            )}

            <button className="validate-button" onClick={handleSubmit}>
              Validate Certificate
            </button>

            {/* {certHash && <p>CertHash Validation number {certHash}</p>} */}

            {/* Status */}
            {status && <p>{status}</p>}

            {/* Display Certificate Details */}
            {certificateDetails && (
              <div className="">
                <h3>Certificate Details:</h3>
                <p>🎓 Student Name: {certificateDetails.studentName}</p>
                <p>📖 Course Name: {certificateDetails.courseName}</p>
                <p>🌐 IPFS Hash: {certificateDetails.ipfsHash}</p>
              </div>
            )}
          </form>
        </div>
      </div>
      <div className="certificate-display">
        <p>Verified certificate will be displayed here.</p>
        {certificateDetails && (
          <Certificate
            name={certificateDetails.studentName}
            fieldStudy={certificateDetails.courseName}
          />
        )}
      </div>
    </div>
  );
};

export default ValidateCertificateForm;
