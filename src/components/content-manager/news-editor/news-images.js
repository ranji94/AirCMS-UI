import React, { useState } from 'react'
import { API } from '../../../constants'
import { fetchImage, convertBase64Images } from '../../../operations'
import Button from '@material-ui/core/Button'
import LinearProgress from '@material-ui/core/LinearProgress'
import CircularProgress from '@material-ui/core/CircularProgress'
import styles from './news-editor.scss'

export const NewsImages = ({ images, newsId }) => {
    const [progress, setProgress] = useState(0)
    const [imagesFetching, setImagesFetching] = useState(false)
    const [fetchedImageSrc, setFetchedImageSrc] = useState('')

    const fetchImages = () => {
        const progressDivider = 100 / images.length
        
        let iterator = 0

        // images.forEach(i => {  
            let params = {
                newsId: newsId,
                fileName: 'york.jpeg'
            }

            setImagesFetching(true)
            fetchImage(API.DOWNLOAD_IMAGE, params).then((response) => {
                console.log('FETCHED BINARY STRING: ', response.data)
                setFetchedImageSrc(response.data)

                iterator++
                setProgress(progressDivider * iterator)
                setImagesFetching(false)

            }).catch((error) => {
                setImagesFetching(false)
                console.log('IMAGES FETCH ERROR: ', error)
            })
        // })
    }

    return (<div>
        <Button onClick={() => fetchImages()} variant={'contained'} color={'secondary'}>Edit images</Button>
        <div className={styles['progress-bar-box']}>
            {
                imagesFetching
                    ? <div>
                        <CircularProgress />
                        <LinearProgress variant="determinate" value={progress} />
                    </div>
                    : <span />
            }
            <img alt={'photo'} src={`data:image/jpeg;base64, ${fetchedImageSrc}`}/>
        </div>
    </div>)
}