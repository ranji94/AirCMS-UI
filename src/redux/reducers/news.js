import { SET_NEWS, ADD_NEWS, DELETE_NEWS } from '../action-types'

const initialState = {
    news: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_NEWS: {
            const { content } = action.payload
            return {
                ...state,
                news: content
            }
        }
        case ADD_NEWS: {
            return {
                ...state,
                news: [...state.news, action.payload]
            }
        }
        case DELETE_NEWS: {
            return {
                ...state,
                news: state.news.filter(n => n.newsId !== action.payload)
            }
        }
        default:
            return state
    }
}