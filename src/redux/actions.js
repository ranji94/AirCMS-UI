import {
    SET_LANGCODE,
    SET_FETCHSUCCESS,
    SET_SELECTED_FTP_CREDENTIALS,
    SET_FTP_CONNECTION_INFO,
    SET_NEWS,
    ADD_NEWS, DELETE_NEWS } from './action-types'

export const setLangCode = (content) => {
    return {
        type: SET_LANGCODE,
        payload: {
            content
        }
    }
}

export const setFetchSuccess = (content) => {
    return {
        type: SET_FETCHSUCCESS,
        payload: {
            content
        }
    }
}

export const setSelectedFTPCredentials = (content) => {
    return {
        type: SET_SELECTED_FTP_CREDENTIALS,
        payload: {
            content
        }
    }
}

export const setFTPConnectionInfo = (content) => {
    return {
        type: SET_FTP_CONNECTION_INFO,
        payload: {
            content
        }
    }
}

export const setNews = (content) => {
    return {
        type: SET_NEWS,
        payload: {
            content
        }
    }
}

export const addNews = (content) => {
    return {
        type: ADD_NEWS,
        payload: content
    }
}

export const deleteNews = (content) => {
    return {
        type: DELETE_NEWS,
        payload: content
    }
}