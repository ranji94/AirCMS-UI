import React from 'react'
import { useSelector } from 'react-redux'

export const FTPConnected = ({ children }) => {
    const isConnected = useSelector(state => state.ftpConnectionInfo.ftpConnectionInfo.connected)
    return isConnected ? children : 'FTP CONNECTION FAILED'
}