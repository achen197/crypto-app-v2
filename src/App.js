import React from "react";
import styles from "./App.module.scss";
import { BrowserRouter } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";

function App() {
  return (
    <BrowserRouter>
      <div className={styles.App}>
        <Header />
        <Sidebar />
        <Main />
      </div>
    </BrowserRouter>
  );
}

export default App;
