import { SET_SELECTED_FTP_CREDENTIALS } from '../action-types'

const initialState = {
    selectedFTPCredentials: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_SELECTED_FTP_CREDENTIALS: {
            const { content } = action.payload
            return {
                ...state,
                selectedFTPCredentials: content
            }
        }
        default:
            return state
    }
}