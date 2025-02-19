// src/pages/Home.jsx

import React from "react";
import Header from "../components/Header";
import Card from "../components/Card";
import "../App.css"; // Import CSS for styling

const Home = () => {
    return (
        <div>
            <Header />
            <div className="home-container">
                <div className="content">
                    <h1 className="gradient-text"> <span className="highlight"> Verify </span> certifications with ease </h1>

                    <p className="description">
                    ETHcertify provides a secure and transparent platform for verifying
                    educational credentials, certifications, and diplomas. Powered by
                    blockchain technology, we ensure that all certificates are authentic,
                    tamper-proof, and instantly accessible by employers, institutions, and
                    individuals.
                    </p>

                    <div className="button-group">
                        <button className="gradient-button verify-button">Verify a Certificate</button>
                        <button className="gradient-button issue-button">Issue a Certificate</button>
                    </div>
                </div>

                {/* Image Placeholder Section */}
                <div className="image-placeholder"></div>
            </div>

            <div className="why-blockchain">
                <h1 className="header-center">Why Blockchain? </h1>
                <div className="cards">
                    <Card 
                        img="/assets/image.png" 
                        alt="immutability" 
                        header="Immutability" 
                        para="Leveraging Immutability feature of blockchain" />
                    <Card 
                        img="/assets/icon.jpg" 
                        alt="decentralization" 
                        header="Decentralization" 
                        para="Leveraging Immutability feature of blockchain" />
                    <Card 
                        img="/assets/image.png" 
                        alt="transparency" 
                        header="Transparency" 
                        para="Leveraging Immutability feature of blockchain" />
                </div>
            </div>

            <div className="how-it-works">
                <h1 className="header-center"> How it Works </h1>
                <div className="cards">
                    <Card 
                        img=""
                        header="Issuance"
                        para="Institutions or authorized organizations create and issue 
                            digital certificates that are linked to blockchain records. 
                            Each certificate is assigned a unique identifier, ensuring
                            its authenticity."/>
                    <Card 
                        img=""
                        header="Verification"
                        para="Employers or any individual can instantly verify a certificate's 
                        authenticity by searching for the certificate ID. The platform cross 
                        references the information with the blockchain to ensure the certificate 
                        has not been altered or falsified."/>
                    <Card 
                        img=""
                        header="Transparency"
                        para="All actions (issuance and verification) are recorded on the blockchain, 
                        providing a transparent and immutable record that can be accessed by anyone authorized."/>
                    <Card 
                        img=""
                        header="Security"
                        para="ETHcertify ensures the highest level of security by using blockchains 
                        decentralized nature, making it virtually impossible to alter or forge certificates. 
                        Once recorded, the information remains unchanged, ensuring trust and reliability."/>
                </div>
            </div>
        </div>
    );
};

export default Home;