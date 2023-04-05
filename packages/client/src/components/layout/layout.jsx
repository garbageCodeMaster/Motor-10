import React from 'react'
import { Input, Button, NavButton } from '..'

import logo from '@assets/logo.png'
import styles from './layout.module.css'
import navButtonStyles from '../buttonNav/buttonNav.module.css'

const Layout = ({ children }) => {

  return (
    <div className={styles.wrapper}>            
        <div className={styles.navbar}>
            <div className={styles.logo}>Quiz Time</div>
            <NavButton className={navButtonStyles.navButtonActive}>Dashboard</NavButton>
            <NavButton >Support</NavButton>
            <NavButton >Notifications</NavButton>
        </div>

        <div className={styles.main}>
            <header className={styles.header}>
                <Input className={styles.search} placeholder="Search..."/>
                
                <Button>Start Quiz</Button>

                <div className={styles.account}>
                    <img className={styles.accountLogo} src={logo} />
                    <div className={styles.accountName}>sdfsdfdsfsdssssssssssssssssssssssssssssssssssssssssssdf</div>
                </div>
            </header>

            <div className={styles.content}>
                {children}
            </div>
        </div>
    </div>
  )
}

export default Layout
