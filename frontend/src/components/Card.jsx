import React from 'react';
import "../App.css"; // Import CSS for styling

// const Card = (props) => {
// 	return (
// 		<div className="card">
// 			{/* conditonal rendering to make it usable*/}
// 			{ props.img !== "" && <img src={ props.img } alt={ props.alt } /> } 
// 			<h2> { props.header } </h2>
// 			<p> { props.para } </p>
// 		</div>
// 	);
// };

// export default Card;
const Card = (props) => {
	return (
	  <div className={`card ${props.hoverEffect ? "hover-card" : ""}`}>
		{props.img !== "" && (
		  <img src={props.img} alt={props.alt} className={props.hoverEffect ? "card-img" : ""} />
		)}
  
		<div className={`card-content ${props.hoverEffect ? "hover-content" : ""}`}>
		  <h2>{props.header}</h2>
		  <p>{props.para}</p>
		</div>
	  </div>
	);
  };
  
  export default Card;
  