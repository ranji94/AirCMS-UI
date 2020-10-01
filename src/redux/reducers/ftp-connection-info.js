import { SET_FTP_CONNECTION_INFO } from '../action-types'

const initialState = {
    ftpConnectionInfo: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_FTP_CONNECTION_INFO: {
            const { content } = action.payload
            return {
                ...state,
                ftpConnectionInfo: content
            }
        }
        default:
            return state
    }
}