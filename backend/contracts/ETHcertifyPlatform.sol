// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract ETHcertifyPlatform {
    struct Certificate {
        string studentName;
        string courseName;
        uint256 issueDate;
        bool isValid;
        string ipfsHash; // Store the IPFS hash here
    }

    address public owner;
    mapping(bytes32 => Certificate) public certificates;
    bytes32[] public certificateHashes;

    event CertificateIssued(
        bytes32 indexed certHash,
        string studentName,
        string courseName,
        string ipfsHash
    );
    event CertificateRevoked(bytes32 indexed certHash);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function issueCertificate(
        string memory studentName,
        string memory courseName,
        string memory ipfsHash
    ) public onlyOwner returns (bytes32) {
        bytes32 certHash = keccak256(
            abi.encodePacked(studentName, courseName, block.timestamp)
        );
        certificates[certHash] = Certificate(
            studentName,
            courseName,
            block.timestamp,
            true,
            ipfsHash
        );
        certificateHashes.push(certHash);
        emit CertificateIssued(certHash, studentName, courseName, ipfsHash);
        return certHash;
    }

    function revokeCertificate(bytes32 certHash) public onlyOwner {
        require(
            certificates[certHash].isValid,
            "Certificate not found or already revoked"
        );
        certificates[certHash].isValid = false;
        emit CertificateRevoked(certHash);
    }

    function validateCertificate(
        bytes32 certHash
    )
        public
        view
        returns (bool, string memory, string memory, uint256, string memory)
    {
        Certificate memory cert = certificates[certHash];
        return (
            cert.isValid,
            cert.studentName,
            cert.courseName,
            cert.issueDate,
            cert.ipfsHash
        ); // Return IPFS hash as well
    }

    // Get all certificates
    function getAllCertificates() public view returns (Certificate[] memory) {
        uint256 certificateCount = certificateHashes.length;
        Certificate[] memory allCertificates = new Certificate[](
            certificateCount
        );

        for (uint256 i = 0; i < certificateCount; i++) {
            allCertificates[i] = certificates[certificateHashes[i]];
        }

        return allCertificates;
    }
}
