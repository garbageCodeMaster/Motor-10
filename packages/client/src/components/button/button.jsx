import React from 'react'

import styles from './button.module.css'

const Button = ({ children, className}) => {

    const buttonStyle = className ? `${styles.button} ${className}` : styles.button

    return (
        <button className={buttonStyle}>
            {children}
        </button>
    )
}

export default Button
