import React from "react";
import styles from "./styles.module.scss";
import runningIcon from "../../assets/images/running.svg";

const Fallback = ({
  message = "Something went wrong",
}: {
  message?: string;
}) => {
  return (
    <div className={styles.fallback_wrapper} data-testid="fallback-wrapper">
      <img
        src={runningIcon}
        className={styles.fallback_icon}
        alt="fallback_icon"
      />
      {message}
    </div>
  );
};

export default Fallback;
