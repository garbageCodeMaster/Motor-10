import React from 'react'

import styles from './buttonNav.module.css'

const NavButton = ({ children, className}) => {

    const buttonStyle = className ? `${styles.navButton} ${className}` : styles.navButton

    return (
        <button className={buttonStyle}>
            {children}
        </button>
    )
}

export default NavButton
