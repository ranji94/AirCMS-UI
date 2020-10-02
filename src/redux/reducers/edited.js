import { SET_EDITED } from '../action-types'

const initialState = {
    edited: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_EDITED: {
            return {
                ...state,
                edited: action.payload
            }
        }
        default:
            return state
    }
}