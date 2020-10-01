import { combineReducers } from 'redux'
import langCode from './lang-code'
import fetchSuccess from './fetch-success'
import selectedFTPCredentials from './selected-ftp-credentials'
import ftpConnectionInfo from './ftp-connection-info'
import news from './news'

export default combineReducers({
    langCode,
    fetchSuccess,
    selectedFTPCredentials,
    ftpConnectionInfo,
    news })