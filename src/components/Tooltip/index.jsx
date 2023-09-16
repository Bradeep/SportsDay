import React from "react";
import styles from "./styles.module.scss";

const Tooltip = ({ children }) => {
  return (
    <div className={`${styles.tooltipWrapper}`}>
      {children}

      <div className={`${styles.bottomArrowContainer}`}>
        <div className={`${styles.bottomArrow}`} />
      </div>
    </div>
  );
};

export default Tooltip;
