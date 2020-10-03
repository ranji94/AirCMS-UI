import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setEdited, setFetchSuccess, setFTPConnectionInfo } from '../../redux/actions'
import { fetch } from '../../operations'
import { API } from '../../constants'
import styles from './menu.scss'
import Button from '@material-ui/core/Button'
import SaveIcon from '@material-ui/icons/Save'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import AddIcon from '@material-ui/icons/Add'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Tooltip from '@material-ui/core/Tooltip'
import { useHistory } from 'react-router-dom'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import CircularProgress from '@material-ui/core/CircularProgress'

export const MenuBar = ({ addNewsAction, currentPage }) => {
    const newsEdited = useSelector(state => state.edited.edited)
    const storedNews = useSelector(state => state.news.news)
    const connectionInfo = useSelector(state => state.ftpConnectionInfo.ftpConnectionInfo)
    const dispatch = useDispatch()
    const history = useHistory()

    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState('')
    const [snackbarSeverity, setSnackbarSeverity] = useState('success')
    const [uploadFetchSuccess, setUploadFetchSuccess] = useState(true)

    const moveToConnectionsList = useCallback((s) => {
        history.push('/')
        dispatch(setSelectedFTPCredentials({}))
        dispatch(setFTPConnectionInfo(s))
    }, [history])

    const uploadNewsFeedToFTP = () => {
        setUploadFetchSuccess(false)
        fetch(API.UPLOAD, storedNews).then((response) => {
            setSnackbarMessage('Successfully updated your newsfeed.')
            dispatch(setEdited(false))
            setSnackbarOpen(true)
            setSnackbarSeverity('success')
            setUploadFetchSuccess(true)
        }).catch((error) => {
            setSnackbarSeverity('error')
            setSnackbarOpen(true)
            setUploadFetchSuccess(true)
            if(error.status === 400) {
                const statusObject = {
                    "isConnected": false
                }
                setSnackbarMessage('Cannot save your newsfeed on hosting. Select hosting again.')
                moveToConnectionsList(statusObject)
            }
            else {
                setSnackbarMessage('Communication with server unreachable. Try again later.')
            }
        })
    }

    const logout = () => {
        dispatch(setFetchSuccess(false))
        fetch(API.DISCONNECT).then((response) => {
            moveToConnectionsList(response.data)
            dispatch(setFetchSuccess(true))
        }).catch((error) => {
            dispatch(setFetchSuccess(true))
        })
    }

    const Alert = (props) => {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const handleClose = (e, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarOpen(false)
    }

    return (
        <div className={styles['menu-bar-container']}>
            <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
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
                        <span><Button onClick={() => uploadNewsFeedToFTP()} disabled={!newsEdited}>
                            {
                                uploadFetchSuccess
                                ? <SaveIcon />
                                : <CircularProgress />
                            }
                        </Button></span>
                    </Tooltip>
                    <Tooltip title={'Logout from ' + connectionInfo.connectedServer}>
                        <Button disabled={!uploadFetchSuccess} onClick={() => logout()}><ExitToAppIcon /></Button>
                    </Tooltip>
                </ButtonGroup>
            </div>
        </div>
    )
}