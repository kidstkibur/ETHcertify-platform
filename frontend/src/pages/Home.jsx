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
                <div className="image-placeholder">
                    {/* <img  /> */}
                </div>
            </div>

            {/* why blockchain page */}
            <div className="why-blockchain">
                <h1 className="header-center">Why Blockchain? </h1>
                <div className="cards">
                    <Card 
                        img="/assets/image.png" 
                        alt="Card Image ellustrating immutability" 
                        header="Immutability" 
                        para="Once data is recorded in the blockchain, 
                                it cannot be modified or deleted. Each 
                                new block links to the previous one 
                                using cryptographic hashes, ensuring data integrity." 
                        hoverEffect={true} 
                    />
                    <Card 
                        img="/assets/image.png" 
                        alt="Card Image" 
                        header="decentralization" 
                        para="Unlike traditional centralized databases, 
                                blockchain is maintained by multiple nodes, 
                                meaning no single entity can control or 
                                alter the information without consensus from others." 
                        hoverEffect={true} 
                    />
                    <Card 
                        img="../assets/image.png" 
                        alt="Card Image ilustrating transparency" 
                        header="Transparency" 
                        para=" All transactions (e.g., certificate issuance and verification) 
                                are visible to authorized parties, but not manipulable. 
                                This transparency builds trust." 
                        hoverEffect={true} 
                    />
                    <Card 
                        img="/assets/image.png" 
                        alt="Card Image ilustrating encryption" 
                        header="Encryption" 
                        para="Blockchain employs advanced cryptographic techniques to 
                                secure data, making it highly resistant to hacking 
                                and fraud." 
                        hoverEffect={true} 
                    />

                </div>
            </div> {/* End of why blockchain page */}

            {/* how ETHcertify works page */}
            <div className="how-it-works">
                <h1 className="header-center"> How it Works </h1>
                <div className="cards">
                    <Card 
                        header="Issuance"
                        para="Institutions or authorized organizations create and issue 
                            digital certificates that are linked to blockchain records. 
                            Each certificate is assigned a unique identifier, ensuring
                            its authenticity."
                    />

                    <Card 
                        header="Verification"
                        para="Employers or any individual can instantly verify a certificate's 
                        authenticity by searching for the certificate ID. The platform cross 
                        references the information with the blockchain to ensure the certificate 
                        has not been altered or falsified."
                    />

                    <Card 
                        header="Transparency"
                        para="All actions (issuance and verification) are recorded on the blockchain, 
                        providing a transparent and immutable record that can be accessed by anyone authorized."
                    />

                    <Card 
                        header="Security"
                        para="ETHcertify ensures the highest level of security by using blockchains 
                        decentralized nature, making it virtually impossible to alter or forge certificates. 
                        Once recorded, the information remains unchanged, ensuring trust and reliability."
                    />

                </div>
            </div>  {/* End of How Ethcertify  works page*/}

            {/* why Ethcertify page*/}
            <div className="why-us">
                <h1 className="header-center">Why ETHcertify?</h1>

                {/* employer */}
                <div className="section-one">
                    <div className="text-area">
                        <h2 className="header">Are you Employer looking for an applicant? </h2>
                        <p>ETHcertify provides a fast and reliable way to verify the authenticity 
                            of resumes and qualifications. Employers can instantly confirm that candidates’ 
                            certificates, diplomas, and academic records are genuine, reducing the risk of 
                            hiring fraudulent candidates. 
                            With our blockchain-backed verification system, 
                            you gain confidence in the credentials of every applicant.</p>
                    </div>
                    <div className="image-area">
                        <img src="/assets/look for employee.png" alt="searching for employee" />
                    </div>
                </div>

                 {/* institute */}
                <div className="section-two">
                    <div className="image-area">
                        <img src="/assets/school.png" alt="institute" />
                    </div>
                    <div className="text-area">
                        <h2 className="header">Or Educational Institution & Scholarship Provider? </h2>
                        <p>ETHcertify allows educational institutions, scholarship organizations, 
                            and training centers to issue verifiable digital certificates and 
                            academic records. This ensures that graduates, scholarship recipients, 
                            and other certificate holders can easily share their achievements with 
                            potential employers or other institutions, all while maintaining the 
                            highest level of security.Blockchain technology guarantees the integrity 
                            of these records, protecting both the institution’s reputation and 
                            the value of its certifications.</p>
                    </div>
                </div>

                 {/* cetificate owner */}
                <div className="section-three">
                    <div className="text-area">
                        <h2 className="header">Or Certificate Holder?</h2>
                        <p>With ETHcertify, certificate holders can present verifiable proof 
                            of their accomplishments in a way that’s accessible and trusted by 
                            employers, schools, and organizations. Whether you’re a graduate, 
                            professional, or award recipient, you can stand out in a competitive 
                            job market by showcasing your authentic credentials.The platform 
                            helps you eliminate doubts and avoid issues like fraudulent claims, 
                            offering you a secure, easy-to-access way to prove your qualifications.</p>
                    </div>
                    <div className="image-area">
                        <img src="/assets/graduate.png" alt="certificate holder" />
                    </div>
                </div>
            </div> {/* End of why Ethcertify */}

          
            {/* CTA page */}
            <div className="gradient-container">
                <div className="gradient1"></div>
                <div className="gradient2"></div>

                <div className="cta-container">
                    <div className="cta-content">
                        <h2 className="cta-text">Make Your Certificates Count – Verify Them Now!</h2>
                        <button className="cta-button">Verify certificate</button>
                        <a href="#" className="cta-link">Looking for issuance?</a>
                    </div>
                </div>
            </div>  {/* End of CTA page */}
            
            {/* contact page */}
            <div className="contact-section" >
                
            </div>  {/* End of contact page */}
            
        </div>
    );
};

export default Home;