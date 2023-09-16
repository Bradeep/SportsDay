import React from "react";
import styles from "./styles.module.scss";

export const Button = ({
  textColor = "",
  buttonColor = "",
  customClass = "",
  onClick,
  disabled = false,
  children,
}) => {
  const onButtonClick = () => {
    !disabled && onClick && onClick();
  };

  return (
    <button
      className={`${disabled ? styles.button__disable : ""} 
              ${customClass ? customClass : ""} ${styles.button__container}`}
      style={{
        color: textColor,
        backgroundColor: buttonColor,
      }}
      onClick={onButtonClick}
    >
      <div>{children}</div>
    </button>
  );
};
