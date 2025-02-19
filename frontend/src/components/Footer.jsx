import React from "react";
import "../App.css"; // Import CSS for styling

const Footer = () => {
	return (
		<footer className="footer">
			<div className="container">
				<div className="logo">
					<img src="../assets/icon.jpg" alt="ETHcertify Logo" />
		        </div>

		        <div>
		        	<p> Copywrite @ 2025. ETHcertify.</p>
		        </div>

		        <div className="nav">
		        	<a href="#">Home</a>
		        	<a href="#">Privacy</a>
		        	<a href="#">Terms</a>
		        </div>
			</div>
		</footer>
	);
};

export default Footer;