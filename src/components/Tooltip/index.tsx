import React, { PropsWithChildren } from "react";
import styles from "./styles.module.scss";

const Tooltip = ({ children }: PropsWithChildren) => {
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
