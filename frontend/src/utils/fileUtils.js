// src/utils/fileUtils.js

const { toUtf8Bytes, keccak256 } = require("ethers");

/**
 * Generates a Keccak-256 hash from the given file content.
 * @param {string} fileContent - The content of the file as a string.
 * @returns {string} - The Keccak-256 hash as a hex string.
 */
export function generateHash(fileContent) {
  const encodedData = toUtf8Bytes(fileContent); /// Convert to UTF-8 bytes
  const hash = keccak256(encodedData); // Generate Keccak-256 hash
  return hash;
}

/**
 * Reads the contents of a file as text.
 * @param {File} file - The file object.
 * @returns {Promise<string>} - A promise that resolves to the file content as a string.
 */
export async function readFileAsText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => resolve(event.target.result);
    reader.onerror = (error) => reject(error);
    reader.readAsText(file);
  });
}