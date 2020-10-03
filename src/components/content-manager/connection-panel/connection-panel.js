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
import { API } from '../../../constants'

export const ConnectionPanel = () => {
    const selectedCredentials = useSelector(state => state.selectedFTPCredentials.selectedFTPCredentials)
    const dispatch = useDispatch()

    const connectFTP = () => {
        dispatch(setFetchSuccess(false))

        fetch(API.CONNECT, selectedCredentials).then((response) => {
            dispatch(setFTPConnectionInfo(response.data))
            fetchNews()
        }).catch((error) => {
            console.log('ERROR CONNECTION FAILED', error)
        })
    }

    const fetchNews = () => {
        fetch(API.DOWNLOAD_NEWS).then((response) => {
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