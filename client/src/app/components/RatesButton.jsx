import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles2 from "./RatesNavbar.module.css";

const NavbarButton = ({ icon, text, isDisabled, onClick }) => {
  return (
    <div
      className={styles2.navbarItem}
      onClick={!isDisabled ? onClick : undefined}
      style={{ cursor: isDisabled ? "not-allowed" : "pointer" }}
    >
      <div className={styles2.navbarItemIcon}>
        <FontAwesomeIcon icon={icon} size="lg" />
      </div>
      <div className={`${styles2.navbarItemText} ${isDisabled ? styles2.disabled : ""}`}>
        {text}
      </div>
    </div>
  );
};

export default NavbarButton;
