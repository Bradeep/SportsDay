import React, {
  useEffect,
  useRef,
  useCallback,
  PropsWithChildren,
} from "react";
import styles from "./styles.module.scss";

interface DrawerProps {
  open?: boolean;
  classnames?: string;
  onClose?: () => void;
}

const Drawer = ({
  open,
  classnames = "",
  children,
  onClose,
}: PropsWithChildren<DrawerProps>) => {
  const drawerRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = useCallback(
    (event: MouseEvent) => {
      if (
        event.target instanceof HTMLElement &&
        drawerRef.current &&
        !drawerRef.current.contains(event.target)
      ) {
        onClose && onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [drawerRef, handleOutsideClick]);

  return (
    <div
      className={`${styles.drawer_container} ${
        open ? styles.drawer_open : styles.drawer_close
      } ${classnames}`}
      data-testid="drawer-container"
    >
      <div
        className={`${styles.drawer_content} ${
          open ? styles.drawer_content_open : styles.drawer_content_close
        }`}
        ref={drawerRef}
      >
        {children}
      </div>
    </div>
  );
};

export default Drawer;
