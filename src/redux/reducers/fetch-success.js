import { SET_FETCHSUCCESS } from '../action-types'

const initialState = {
    fetchSuccess: true
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_FETCHSUCCESS: {
            const { content } = action.payload
            return {
                ...state,
                fetchSuccess: content
            }
        }
        default:
            return state
    }
}