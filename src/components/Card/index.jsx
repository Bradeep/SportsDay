import styles from "./styles.module.scss";
import React from "react";

export const CardWrapper = ({
  customClass,
  width,
  height,
  borderRadius,
  children,
  backgroundColor,
}) => {
  return (
    <div
      className={`${styles.cardWrapper__container} ${
        customClass ? customClass : ""
      }`}
      style={{
        width: width,
        height: height,
        borderRadius: borderRadius,
        backgroundColor: backgroundColor,
      }}
      data-testid="card-wrapper"
    >
      {children}
    </div>
  );
};
