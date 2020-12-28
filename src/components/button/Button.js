import React from 'react';
import styles from './Button.module.css';

/**
 * Button component to be used in various pieces of the app
 * @param {*} props 
 */
const Button = (props) => {
    const {children, onClick} = props;

    return (
        <button className={styles.button} onClick={onClick}>{children}</button>
    )
}

export default Button;