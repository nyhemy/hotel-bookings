import React, { Children } from 'react';
import styles from './Button.module.css';

const Button = (props) => {
    const {children, onClick} = props;

    return (
        <button className={styles.button} onClick={onClick}>{children}</button>
    )
}

export default Button;