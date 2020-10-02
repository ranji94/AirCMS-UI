import React, { useState } from 'react'
import { News, Dialog } from '../../components'
import { useSelector, useDispatch } from 'react-redux'
import styles from './news-editor.scss'
import { addNews, deleteNews, setEdited } from '../../../redux/actions'
import { MenuBar } from '../../menu/menu';

export const NewsEditor = () => {
    const storedNews = useSelector(state => state.news.news)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [newsToRemove, setNewsToRemove] = useState(0)

    const dispatch = useDispatch()

    const createNews = () => {
        let highestIndex = 0
        storedNews.forEach(({ newsId }) => {
            if (highestIndex < newsId) {
                highestIndex = newsId
            }
        })

        const currentDate = new Date()
        const currentDateString = currentDate.toISOString().substring(0, 10);

        const objectToAdd = {
            newsId: highestIndex + 1,
            description: 'Enter your news description here',
            date: currentDateString,
            images: []
        }

        dispatch(setEdited(true))
        dispatch(addNews(objectToAdd))
    }

    const selectNewsToDelete = (newsId) => {
        setDialogOpen(true)
        setNewsToRemove(newsId)
    }

    const removeNews = () => {
        dispatch(deleteNews(newsToRemove))
        dispatch(setEdited(true))
        setDialogOpen(false)
    }

    return <div>
        <MenuBar currentPage={'Newsfeed editor'} addNewsAction={() => createNews()}/>
        <Dialog
            closeAction={() => setDialogOpen(false)}
            yesButtonAction={() => removeNews()}
            contentText={'This news will be irreversibly removed, with all images inside this news.'}
            {...{ dialogOpen }}>
            Are you sure want to remove this news?
        </Dialog>
        <div className={styles['news-container']}>
            {storedNews.map(({ newsId, description, images, date }) => {
                return <News key={`news-id-${newsId}`} {...{ newsId, images, date, selectNewsToDelete }}>{description}</News>
            })}
        </div>
    </div>
}