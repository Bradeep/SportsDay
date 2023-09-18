import styles from "./styles.module.scss";
import React, { PropsWithChildren } from "react";

interface CardProps {
  customClass?: string;
  width?: string;
  height?: string;
  borderRadius?: number | string;
  backgroundColor?: string;
}

const CardWrapper = ({
  customClass,
  width,
  height,
  borderRadius,
  children,
  backgroundColor,
}: PropsWithChildren<CardProps>) => {
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

export default CardWrapper;
