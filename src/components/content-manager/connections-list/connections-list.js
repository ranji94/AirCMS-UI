import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { setSelectedFTPCredentials } from '../../../redux/actions'
import styles from './connections-list.scss'
import EditIcon from '@material-ui/icons/Edit';
import { useHistory } from 'react-router-dom';

export const ConnectionsList = ({savedCredentials}) => {
    const history = useHistory()
    const dispatch = useDispatch()

    const handleOnClick = useCallback((s) => {
        history.push('/connectionPanel')
        dispatch(setSelectedFTPCredentials(s))
    }, [history])

    return <div className={styles['connections-container']}>
        <h1>Available connections:</h1>
        <div className={styles['connections-box']}>
            {savedCredentials.map(s => {
                return <div key={`connection-${s.ftpServer}`} className={styles['connection-item']}>
                <div key={`connection-element-${s.ftpServer}`} onClick={() => handleOnClick(s)} className={styles['connection-element']}>{s.ftpUser} on {s.ftpServer}</div>
                <div key={`connection-edit-${s.ftpServer}`} className={styles['connection-edit']}><EditIcon /></div>
            </div>
            })}
          </div>
    </div>
}