import Web3 from "web3";
import * as fs from "fs";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

if (
  !process.env.INFURA_RPC_URL ||
  !process.env.PRIVATE_KEY ||
  !process.env.CONTRACT_ADDRESS
) {
  throw new Error("❌ Missing environment variables. Check .env file.");
}

const web3 = new Web3(
  new Web3.providers.HttpProvider(process.env.INFURA_RPC_URL)
);
const account = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY);
web3.eth.accounts.wallet.add(account);

const contractABI = JSON.parse(
  fs.readFileSync(
    "artifacts/contracts/ETHcertifyPlatform.sol/ETHcertifyPlatform.json",
    "utf-8"
  )
).abi;

const contractAddress = process.env.CONTRACT_ADDRESS!;
const certificateContract = new web3.eth.Contract(contractABI, contractAddress);

async function issueCertificate(studentName: string, courseName: string) {
  try {
    // **Use a pre-existing IPFS hash**
    const ipfsHash =
      "bafkreid6rmjdl6qeiqdioi5wk5grpg7oppis5w75ok7fw5f4kujw564yae";

    console.log("🔹 Using IPFS Hash:", ipfsHash);

    const tx = certificateContract.methods.issueCertificate(
      studentName,
      courseName,
      ipfsHash
    );

    console.log("🔹 Estimating Gas...");
    const gas = await tx.estimateGas({ from: account.address });
    const gasPrice = await web3.eth.getGasPrice(); // Get current gas price

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
    const receipt: any = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );

    console.log("✅ Certificate Issued! Transaction Hash:", receipt);

    const certhash = Web3.utils.soliditySha3(
      studentName,
      courseName,
      receipt.issueDate
    );

    console.log(certhash);

    return certhash;
  } catch (error: any) {
    console.error("❌ Error issuing certificate:", error.message);
    console.error(error);
  }
}

async function validateCertificate(certId: string) {
  console.log("🔍 Validating Certificate on Blockchain...");

  try {
    // Step 1: Fetch certificate details from the smart contract
    const result: any = await certificateContract.methods
      .validateCertificate(certId)
      .call();

    // Extract values properly
    const isValid = result[0]; // Boolean
    const studentName = result[1] || "N/A";
    const courseName = result[2] || "N/A";
    const ipfsHash = result[4] || "N/A";

    if (!isValid) {
      console.log("❌ Certificate is not valid or does not exist.");
      return;
    }

    console.log("\n✅ Certificate Found on Blockchain:");
    console.log(`   🎓 Student: ${studentName}`);
    console.log(`   📖 Course: ${courseName}`);
    console.log(`   🌐 IPFS Hash: ${ipfsHash}`);

    if (ipfsHash === "N/A") {
      console.warn("⚠️ No IPFS Hash found in contract.");
      return;
    }

    console.log(
      `🔗 Fetching certificate metadata from IPFS: https://ipfs.io/ipfs/${ipfsHash}`
    );
  } catch (error: any) {
    console.error("⚠️ Error fetching certificate data:", error.message);
  }
}

// Test the issueCertificate function
(async () => {
  try {
    // certificate issuance
    console.log("🔹 Starting certificate issuance...");
    // const certhash: any = await issueCertificate("test", "Computer science");

    const studentName = "test";
    const courseName = "Computer science";
    const issueDate = 1739447400n; // Unix timestamp of issue date

    const certHash: any = Web3.utils.soliditySha3(
      studentName,
      courseName,
      issueDate
    );

    console.log("Generated certHash:", certHash);

    // Validate Certificate
    await validateCertificate(certHash);
    console.log("✅ Process completed successfully.");

    const allCertificates = await certificateContract.methods
      .getAllCertificates()
      .call();
    console.log(allCertificates);
  } catch (error: any) {
    console.error("❌ Unexpected error in main execution:", error.message);
  }
})();
