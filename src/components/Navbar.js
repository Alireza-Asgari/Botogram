import React from 'react';
//styles
import styles from "./Navbar.module.css";

const Navbar = ({logoutHandeler}) => {
    return (
        <div className={styles.container}>
            <div className={styles.name}>
                Botogram 
            </div>
            <div className={styles.logout} onClick={logoutHandeler}>
                Logout
            </div>
        </div>
    );
};

export default Navbar;