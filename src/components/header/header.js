import React from 'react'
import styles from './header.scss'

export const AppHeader = ({text}) => {
    return(<div className={styles['header-container']}>
        <div className={styles['flex-container']}>
            <div className={styles['header-item']}>
                <div>{text}</div>
            </div>
        </div>
    </div>)
}