import React from "react";

import "./index.css";

const Button = ({
  type = "btn",
  name = "Button",
  className,
  onClick,
  disabled = false,
  style,
}) => {
  if (type === "submit" && !disabled) {
    return (
      <div
        className={className ?? "btn-first"}
        style={{ ...style, cursor: disabled ? "not-allowed" : "pointer" }}
        label={name}
        type={"submit"}
        onClick={!disabled ? onClick : () => {}}
      >
        {name}
      </div>
    );
  } else if (type === "pagination" && !disabled) {
    return (
      <div
        className={className}
        style={{ ...style, cursor: disabled ? "not-allowed" : "pointer" }}
        label={name}
        type={"submit"}
        onClick={!disabled ? onClick : () => {}}
      >
        {name}
      </div>
    );
  } else {
    return (
      <div
        className={className ?? "btn-second"}
        style={{...style, cursor: disabled ? "not-allowed" : "pointer" }}
        label={name}
        onClick={!disabled ? onClick : () => {}}
      >
        {name}
      </div>
    );
  }
};

export default Button;
