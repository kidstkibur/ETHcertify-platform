import React from 'react';
import "../App.css"; // Import CSS for styling

const Card = (props) => {
	return (
		<div className="card">
			{/* conditonal rendering to make it usable*/}
			{ props.img !== "" && <img src={ props.img } alt={ props.alt } /> } 
			<h2> { props.header } </h2>
			<p> { props.para } </p>
		</div>
	);
};

export default Card;