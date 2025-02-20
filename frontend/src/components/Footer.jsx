import React from "react";
import "../App.css"; // Import CSS for styling

const Footer = () => {
	return (
		<footer>
			<div className="footer">
				<div className="logo">
					<img src="../assets/image6.png" alt="ETHcertify Logo" />
		        </div>

		        <div className="copywrite">
		        	<hr/>
		        	<p> Copywrite &copy; 2025. ETHcertify</p>
		        	<hr/>
		        </div>

		        <div className="bottom-nav">
		        	<ul className="bottom-nav-list">
		        		<li>
		        			<a href="#">Home</a>
		        		</li>
		        		<li>
		        			<a href="#">Privacy</a>
		        		</li>
		        		<li>
		        			<a href="#">Terms</a>
		        		</li>
		        	</ul>
		        </div>
			</div>
		</footer>
	);
};

export default Footer;