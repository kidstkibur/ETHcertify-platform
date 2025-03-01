import React, { useState } from "react";
import Web3 from "web3";
import contract from "./ETHcertifyPlatform.json";
import env from "../env";
import { FaSpinner } from "react-icons/fa";
import "../styles/spinner.css";

const IssueCertificateForm = () => {
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

  const [studentName, setStudentName] = useState("");
  const [institutionName, setInstitutionName] = useState("");
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [certHash, setCertHash] = useState("");
  const [receipt, setReceipt] = useState(null); // For storing the transaction receipt
  const [jsonDownload, setJsonDownload] = useState(null); // For storing the transaction receipt
  const [isLoading, setIsLoading] = useState(false);

  const [isCertificateIssued, setIsCertificateIssued] = useState(false); // Track if certificate is issued

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

  async function issueCertificate(studentName, courseName, ipfsHash) {
    try {
      console.log("🔹 Using IPFS Hash:", ipfsHash);

      const tx = certificateContract.methods.issueCertificate(
        studentName,
        courseName,
        ipfsHash
      );

      console.log("🔹 Estimating Gas...");
      const gas = await tx.estimateGas({ from: account.address });
      const gasPrice = await web3.eth.getGasPrice();

      const data = tx.encodeABI();
      console.log("🔹 Signing transaction...");

      const signedTx = await account.signTransaction({
        from: account.address,
        to: contractAddress,
        data,
        gas: gas,
        gasPrice,
      });

      console.log("🔹 Sending transaction...");
      const receipt = await web3.eth.sendSignedTransaction(
        signedTx.rawTransaction
      );

      const block = await web3.eth.getBlock(receipt.blockNumber);
      console.log("block ", block);
      const issueDate = block.timestamp;
      console.log("✅ Certificate Issued! Transaction Hash:", issueDate);

      const certhash = await Web3.utils.soliditySha3(
        studentName,
        courseName,
        issueDate // using blockNumber as example, adjust as needed for issueDate
      );

      const json = {
        studentName: studentName.toString(),
        courseName: courseName.toString(),
        issueDate: issueDate.toString(),
        certHash: certhash,
      };
      setJsonDownload(json);
      setJsonDownload(json);

      // Store jsonData for downloading after issuance
      // setJsonDownload(jsonData);
      console.log(jsonDownload);
      console.log(json);

      setReceipt(issueDate); // Store receipt to use later
      setCertHash(certhash);
      setIsCertificateIssued(true); // Mark the certificate as issued

      return certhash;
    } catch (error) {
      console.error("❌ Error issuing certificate:", error.message);
      console.error(error);
    }
  }

  const uploadToIPFS = async () => {
    if (!file) {
      throw new Error("No file selected for upload.");
    }

    const formData = new FormData();
    formData.append("file", file);

    const metadata = JSON.stringify({
      name: file.name,
    });
    formData.append("pinataMetadata", metadata);

    const options = JSON.stringify({
      cidVersion: 0,
    });
    formData.append("pinataOptions", options);

    const jwt = env.JWT;

    const response = await fetch(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwt}`, // Replace with your JWT token
        },
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to upload to IPFS: ${response.statusText}`);
    }

    const result = await response.json();
    return result.IpfsHash;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!studentName || !institutionName || !file) {
      alert("Please fill all fields");
      return;
    }
    setIsLoading(true);
    try {
      // Upload file to IPFS
      setStatus("Uploading file to IPFS...");
      const ipfsHash = await uploadToIPFS();
      setStatus(`File uploaded to IPFS with hash: ${ipfsHash}`);

      const validationCertHash = await issueCertificate(
        studentName,
        institutionName,
        ipfsHash
      );
      setStatus("Certificate issued successfully!");

      // You can generate JSON after issuing the certificate
    } catch (error) {
      console.error(error);
      setStatus("Error issuing certificate.");
    } finally {
      setIsLoading(false); // End loading state
    }
  };

  const downloadJSON = () => {
    const jsonData = jsonDownload;

    console.log(jsonData);
    if (!jsonData) {
      alert("Certificate data not available yet.");
      return;
    }

    const blob = new Blob([JSON.stringify(jsonData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "certificate_data.json";
    link.click();
    URL.revokeObjectURL(url); // Clean up the URL object
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
      {/* <button type="submit">Issue Certificate</button> */}
      <button type="submit" disabled={isLoading}>
        {isLoading ? (
          <FaSpinner
            className="spinner"
            style={{ animation: "spin 1s linear infinite" }}
          />
        ) : (
          "Issue Certificate"
        )}
      </button>
      {status && <p>{status}</p>}
      <p>certHash for validation use this </p>
      {certHash && <p>cert hash : {certHash}</p>}

      {/* Show the download button after certificate is issued */}
      {isCertificateIssued && (
        <div>
          <button type="button" onClick={downloadJSON}>
            Download Certificate
          </button>
        </div>
      )}
    </form>
  );
};

export default IssueCertificateForm;
