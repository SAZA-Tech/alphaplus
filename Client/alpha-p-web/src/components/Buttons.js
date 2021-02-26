//here we create the buttons

import React from "react";
import PropTypes from "prop-types";

const Button = ({ title, className, onClick, ...inputProps }) => {
  // handleButtonClick= event => {
  //     const { onClick, disabled } = this.props;

  //     if (disabled) return;

  //     onClick &&
  //       onClick({
  //         event
  //       });
  //   };
  return (
    <button onClick={onClick} className={className} {...inputProps}>
      {title}
    </button>
  );
};
Button.prototype = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
  title: PropTypes.string,
  width: PropTypes.number,
};
Button.defaultProps = {
  className: "button",
  title: "Click Me",
};



const OutlineButton = ({color, image, title, onClick, ...inputProps }) => {
  return (
    <div className="outlineBtn" onClick={onClick} style={{borderColor:color}} {...inputProps}>
      {image != null ? (
        <span className="btnIcon">
          <img src={image} alt={image.toString()} />
        </span>
      ) : (
        <span></span>
      )}
      <p>{title}</p>
    </div>
  );
};
OutlineButton.prototype = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
  title: PropTypes.string,
  color:PropTypes.string,
};
OutlineButton.defaultProps = {
  className: "outlineBtn",
  title: "Click Me",
};
export  {Button,OutlineButton};
