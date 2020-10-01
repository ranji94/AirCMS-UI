import React, { useState } from 'react'
import styles from './news-editor.scss'
import TextField from '@material-ui/core/TextField'
import CheckIcon from '@material-ui/icons/Check';
import Button from '@material-ui/core/Button'
import CloseIcon from '@material-ui/icons/Close';

export const News = ({ newsId, selectNewsToDelete, children, images, date }) => {
    const [state, setState] = useState({
        descEdit: false,
        dateEdit: false,
        imgEdit: false,
    })
    const { descEdit, dateEdit, imgEdit } = state
    const [descriptionField, setDescriptionField] = useState(children)
    const [dateField, setDateField] = useState(date)

    const handleChange = (editElement, editItem) => {
        setState({ ...state, [editElement]: editItem ? false : true });
    }

    const descriptionEditComponent = (
        <div className={styles['multiline-text-field']}>
            <TextField
                onChange={(e) => setDescriptionField(e.target.value)}
                multiline
                value={descriptionField}
                rows={4}
                fullWidth
                id={'outlined-helperText'}
                label={'News description'}
                variant={'outlined'}
            />
            <div className={styles['edit-button-container']}>
                <Button onClick={() => handleChange('descEdit', descEdit)} variant={'contained'} color={'secondary'} endIcon={<CheckIcon />}>Apply</Button>
            </div>
        </div>
    )

    const dateEditComponent = (
        <div className={styles['multiline-text-field']}>
            <TextField
                onChange={(e) => setDateField(e.target.value)}
                value={dateField}
                fullWidth
                id={'outlined-helperText'}
                label={'News date'}
                variant={'outlined'}
            />
            <div className={styles['edit-button-container']}>
                <Button onClick={() => handleChange('dateEdit', dateEdit)} variant={'contained'} color={'secondary'} endIcon={<CheckIcon />}>Apply</Button>
            </div>
        </div>
    )

    return ( <div className={styles['news-item-container']}>
        <div className={styles['remove-button']} onClick={() => selectNewsToDelete(newsId)}>
            <CloseIcon/>
        </div>
        <div className={styles['news-item-date']}>
            <TriggeredElement elementSwitch={dateEdit} contentEdit={dateEditComponent}>
                <h2 onClick={() => handleChange('dateEdit', dateEdit)}>{dateField}</h2>
            </TriggeredElement>
        </div>
        <div className={styles['news-item-description']}>
            <TriggeredElement elementSwitch={descEdit} contentEdit={descriptionEditComponent}>
                <div name={'descEdit'} onClick={() => handleChange('descEdit', descEdit)}>{descriptionField}</div>
            </TriggeredElement>
        </div>
        <div className={styles['news-item-images']}>
            {images.map(i => {
                return i + ', '
            })}
        </div>
    </div>
    )
}

const TriggeredElement = ({ elementSwitch, children, contentEdit }) => {
    return elementSwitch ? contentEdit : children
}