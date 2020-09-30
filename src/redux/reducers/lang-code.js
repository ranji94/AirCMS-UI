import { SET_LANGCODE } from '../action-types'

const initialState = {
    langCode: 'en_GB'
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_LANGCODE: {
            const { content } = action.payload
            return {
                ...state,
                langCode: content
            }
        }
        default:
            return state
    }
}