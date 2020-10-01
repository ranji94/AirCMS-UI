import React from 'react'
import { useSelector } from 'react-redux'
import styles from './loading-indicator.scss'

export const LoadingIndicator = ({ children }) => {
    const fetchSuccess = useSelector(state => state.fetchSuccess.fetchSuccess)

    return fetchSuccess
        ? children
        : <div className={styles['indicator-container']}>
            <div className={styles['loader']} />
        </div>
}