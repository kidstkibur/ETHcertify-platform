import PinataSDK from "@pinata/sdk";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import crypto from "crypto"; // We use crypto to compute the hash locally

dotenv.config();

const pinata = new PinataSDK({
  pinataJWTKey: process.env.JWT!,
});

// Function to compute the hash of the file
function computeFileHash(filePath: string): string {
  const fileBuffer = fs.readFileSync(filePath);
  const hash = crypto.createHash("sha256");
  hash.update(fileBuffer);
  return hash.digest("hex");
}

// Function to check if the file is already uploaded by comparing hashes
async function fileAlreadyUploaded(fileHash: string): Promise<boolean> {
  // In a real application, you would store the hashes somewhere (like a database or a local file).
  // For now, let's simulate it by reading from a local file that stores the hashes.
  const storedHashes: string[] = JSON.parse(
    fs.readFileSync("testing.json", "utf-8") || "[]"
  );

  return storedHashes.includes(fileHash);
}

// Function to add a hash to the list of uploaded files (to avoid re-uploading)
function storeFileHash(fileHash: string) {
  const storedHashes: string[] = JSON.parse(
    fs.readFileSync("uploaded_hashes.json", "utf-8") || "[]"
  );
  storedHashes.push(fileHash);
  fs.writeFileSync("uploaded_hashes.json", JSON.stringify(storedHashes));
}

async function main() {
  try {
    // Read file from local storage
    const filePath = path.join(__dirname, "Testing.txt");
    fs.writeFileSync(filePath, "hello"); // Create the file if it doesn't exist

    // Compute the file hash
    const fileHash = computeFileHash(filePath);
    console.log("Computed File Hash:", fileHash);

    // Check if the file has already been uploaded
    const isAlreadyUploaded = await fileAlreadyUploaded(fileHash);

    if (isAlreadyUploaded) {
      console.log("❌ File already uploaded to IPFS, skipping...");
      return; // Exit if file already uploaded
    }

    // Proceed with upload if not already uploaded
    const readableStreamForFile = fs.createReadStream(filePath);
    const upload = await pinata.pinFileToIPFS(readableStreamForFile, {
      pinataMetadata: { name: "Testing.json" },
    });

    console.log("✅ File Uploaded to IPFS:", upload);

    // Store the IPFS hash to avoid future uploads
    storeFileHash(fileHash);
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

main();
