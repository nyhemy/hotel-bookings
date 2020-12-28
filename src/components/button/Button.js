import React from 'react';
import styles from './Button.module.css';

/**
 * Button component to be used in various pieces of the app
 * @param {*} props Props passed in whenever Button is called
 * 
 */
const Button = (props) => {

    // children is the actual text of the button, onClick is the function that fires when button is clicked
    const {children, onClick} = props;

    return (
        <button className={styles.button} onClick={onClick}>{children}</button>
    )
}

export default Button;