import React from "react";
import styles from "./Sidebar.module.scss";
import logo from "../../images/coin.png";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className={styles.sidebarContainer}>
      <img className={styles.logo} src={logo} alt="Bitcoin Logo" />
      <h2>Crypto</h2>
      <nav>
        <ul>
          <Link to="/">
            <li>Dashboard</li>
          </Link>
          <Link to="/ladder">
            <li>Ladder</li>
          </Link>
          <Link to="/news">
            <li>News</li>
          </Link>
          <li>Settings</li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
