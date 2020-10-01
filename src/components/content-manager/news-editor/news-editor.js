import React, { useState } from 'react'
import { News } from '../../components'
import { useSelector, useDispatch } from 'react-redux'
import styles from './news-editor.scss'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { addNews, deleteNews } from '../../../redux/actions'

export const NewsEditor = () => {
    const storedNews = useSelector(state => state.news.news)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [newsToRemove, setNewsToRemove] = useState(0)
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const dispatch = useDispatch()

    const deleteDialog = (
        <Dialog
            fullScreen={fullScreen}
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            aria-labelledby={'responsive-dialog-title'}
        >
            <DialogTitle id={'responsive-dialog-title'}>{"Are you sure want to remove this news?"}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    This news will be irreversibly removed, with all images inside this news.
          </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={() => setDialogOpen(false)} color="primary">
                    No
          </Button>
                <Button onClick={() => removeNews()} color="primary" autoFocus>
                    Yes
          </Button>
            </DialogActions>
        </Dialog>
    )

    const createNews = () => {
        let highestIndex = 0
        storedNews.forEach(({newsId}) => {
            if(highestIndex < newsId) {
                highestIndex = newsId
            }
        })

        const objectToAdd = {
            newsId: highestIndex + 1,
            description: 'Enter your news description here',
            date: '01.10.2020',
            images: ['img1']
        }

        console.log('CURRENT DATE', Date.now())
        dispatch(addNews(objectToAdd))
    }

    const selectNewsToDelete = (newsId) => {
        setDialogOpen(true)
        setNewsToRemove(newsId)
    }

    const removeNews = () => {
        dispatch(deleteNews(newsToRemove))
        setDialogOpen(false)
    }

    return <div>
        <h1>Newsfeed Editor</h1>
        {deleteDialog}
        <div className={styles['news-container']}>
            <Button onClick={() => createNews()} variant={'contained'} color={'primary'} >Add news</Button>
            {storedNews.map(({ newsId, description, images, date }) => {
                return <News key={`news-id-${newsId}`} {...{ newsId, images, date, selectNewsToDelete }}>{description}</News>
            })}
        </div>
    </div>
}