import { SET_LANGCODE } from './action-types'

export const setLangCode = (content) => {
    return {
        type: SET_LANGCODE,
        payload: {
            content
        }
    }
}