import React, { PropsWithChildren } from "react";
import styles from "./styles.module.scss";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  textColor?: string;
  buttonColor?: string;
  customClass?: string;
  onClick?: (event: React.MouseEvent) => void;
  disabled?: boolean;
}

const Button = ({
  textColor = "",
  buttonColor = "",
  customClass = "",
  onClick,
  disabled = false,
  children,
  ...props
}: PropsWithChildren<ButtonProps>) => {
  const onButtonClick = (event: React.MouseEvent) => {
    !disabled && onClick && onClick(event);
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
      {...props}
    >
      <div>{children}</div>
    </button>
  );
};

export default Button;
