import React, { useEffect } from 'react'
import {
    LoadingIndicator,
    FTPConnected,
    NewsEditor } from '../../components'
import {
    setFetchSuccess,
    setFTPConnectionInfo,
    setNews } from '../../../redux/actions'
import { useSelector, useDispatch } from 'react-redux'
import { fetch } from '../../../operations'

export const ConnectionPanel = () => {
    const selectedCredentials = useSelector(state => state.selectedFTPCredentials.selectedFTPCredentials)
    const dispatch = useDispatch()

    const connectFTP = () => {
        const connectFTPOptions = Object.assign({}, {
            method: 'POST',
            url: 'api/ftp/connect',
            data: selectedCredentials,
            headers: {
                'Content-Type': 'application/json'
            }
        })

        dispatch(setFetchSuccess(false))

        fetch(connectFTPOptions).then((response) => {
            dispatch(setFTPConnectionInfo(response.data))
            fetchNews()
        }).catch((error) => {
            console.log('ERROR CONNECTION FAILED', error)
        })
    }

    const fetchNews = () => {
        const newsOptions = Object.assign({}, {
            method: 'GET',
            url: 'api/ftp/download',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        fetch(newsOptions).then((response) => {
            dispatch(setNews(response.data))
            dispatch(setFetchSuccess(true))
        }).catch((error) => {
            console.log('ERROR FETCHING NEWS', error)
            dispatch(setFetchSuccess(true))
        })
    }

    useEffect(() => {
        connectFTP()
    }, [])

    return <div>
        <LoadingIndicator>
            <FTPConnected>
            <NewsEditor />
            </FTPConnected>
        </LoadingIndicator>
    </div>
}