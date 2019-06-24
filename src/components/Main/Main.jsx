import React from "react";
import styles from "./Main.module.scss";
import Routes from "../Routes";

function Main() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.mainContent}>
        <Routes />
      </div>
    </div>
  );
}

export default Main;
