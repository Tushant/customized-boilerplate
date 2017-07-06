import React from "react";

const Card = props => {
  let cardStyle;
  return (
    <div className={`card ${props.cardSize}`}>
      {props.children}
    </div>
  );
};

export default Card;
