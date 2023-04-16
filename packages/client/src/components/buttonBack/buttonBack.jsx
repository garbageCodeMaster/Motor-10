import React from 'react'

import styles from './buttonBack.module.css'

const ButtonBack = ({ children, className}) => {

    const buttonStyle = className ? `${styles.button} ${className}` : styles.button

    return (
        <button className={buttonStyle}>
            {children}
        </button>
    )
}

export default ButtonBack
