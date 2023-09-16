import React, { PropsWithChildren } from "react";
import styles from "./styles.module.scss";

interface ButtonProps {
  textColor?: string;
  buttonColor?: string;
  customClass?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const Button = ({
  textColor = "",
  buttonColor = "",
  customClass = "",
  onClick,
  disabled = false,
  children,
}: PropsWithChildren<ButtonProps>) => {
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
