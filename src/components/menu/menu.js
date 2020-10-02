import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setEdited, setFetchSuccess, setFTPConnectionInfo } from '../../redux/actions'
import { fetch } from '../../operations'
import styles from './menu.scss'
import Button from '@material-ui/core/Button'
import SaveIcon from '@material-ui/icons/Save'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import AddIcon from '@material-ui/icons/Add'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Tooltip from '@material-ui/core/Tooltip'
import { useHistory } from 'react-router-dom'

export const MenuBar = ({ addNewsAction, currentPage }) => {
    const newsEdited = useSelector(state => state.edited.edited)
    const storedNews = useSelector(state => state.news.news)
    const connectionInfo = useSelector(state => state.ftpConnectionInfo.ftpConnectionInfo)
    const dispatch = useDispatch()
    const history = useHistory()

    const moveToConnectionsList = useCallback((s) => {
        history.push('/')
        dispatch(setSelectedFTPCredentials({}))
        dispatch(setFTPConnectionInfo(s))
    }, [history])

    const uploadNewsFeedToFTP = () => {
        const uploadFTPOptions = Object.assign({}, {
            method: 'POST',
            url: 'api/ftp/upload',
            data: storedNews,
            headers: {
                'Content-Type': 'application/json'
            }
        })

        dispatch(setFetchSuccess(false))
        fetch(uploadFTPOptions).then((response) => {
            console.log('NEWS UPLOADED SUCCESSFULLY', response.data)
            dispatch(setFetchSuccess(true))
        }).catch((error) => {
            console.log('UPLOAD ERROR: ', error)
            dispatch(setFetchSuccess(true))
        })
    }

    const saveAction = () => {
        dispatch(setEdited(false))
        uploadNewsFeedToFTP()
    }

    const logout = () => {
        const disconnectOptions = Object.assign({}, {
            method: 'POST',
            url: 'api/ftp/disconnect',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        dispatch(setFetchSuccess(false))
        fetch(disconnectOptions).then((response) => {
            moveToConnectionsList(response.data)
            dispatch(setFetchSuccess(true))
        }).catch((error) => {
            dispatch(setFetchSuccess(true))
        })
    }

    return (
        <div className={styles['menu-bar-container']}>
            <div className={styles['menu-bar-connection-info']}>
                {connectionInfo.connectedServer}
            </div>
            <div className={styles['menu-bar-page-title']}>
                {currentPage}
            </div>
            <div className={styles['menu-bar-buttons']}>
                <ButtonGroup variant={'text'} color="primary" aria-label="text primary button group">
                    <Tooltip title={'Add news'}>
                        <Button onClick={addNewsAction}><AddIcon /></Button>
                    </Tooltip>
                    <Tooltip title={'Save news'}>
                        <span><Button onClick={() => saveAction()} disabled={!newsEdited}><SaveIcon /></Button></span>
                    </Tooltip>
                    <Tooltip title={'Logout from ' + connectionInfo.connectedServer}>
                        <Button onClick={() => logout()}><ExitToAppIcon /></Button>
                    </Tooltip>
                </ButtonGroup>
            </div>
        </div>
    )
}