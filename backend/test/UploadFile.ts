import PinataSDK from "@pinata/sdk";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

const pinata = new PinataSDK({
  pinataJWTKey: process.env.JWT!,
});

async function main() {
  try {
    // Read file from local storage
    const filePath = path.join(__dirname, "Testing.txt");
    fs.writeFileSync(filePath, "hello"); // Create the file if it doesn't exist

    const readableStreamForFile = fs.createReadStream(filePath);
    const upload = await pinata.pinFileToIPFS(readableStreamForFile, {
      pinataMetadata: { name: "Testing.json" },
    });

    console.log("✅ File Uploaded to IPFS:", upload);
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

main();
