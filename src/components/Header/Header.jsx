import React from 'react';
import styles from './Header.module.scss';

function Header() {
    return(
        <div className={styles.headerContainer}>
            <h1>Crypto</h1>
            <input type="text" placeholder="Search..." name="search"></input>
        </div>
    )
}

export default Header;