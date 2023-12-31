import React from "react";
import styles from "./styles.module.scss";

const Loader = () => {
  return (
    <div className={styles.loader_wrapper} data-testid="Loader-wrapper">
      <span className={styles.loader}></span>
    </div>
  );
};

export default Loader;
