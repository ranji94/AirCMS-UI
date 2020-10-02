import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Button from '@material-ui/core/Button';
import { useTheme } from '@material-ui/core/styles';

export const YesNoDialog = ({ contentText, yesButtonAction, closeAction, dialogOpen, children }) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return <Dialog
            fullScreen={fullScreen}
            open={dialogOpen}
            onClose={closeAction}
            aria-labelledby={'responsive-dialog-title'}
        >
            <DialogTitle id={'responsive-dialog-title'}>{children}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {contentText}
          </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={closeAction} color="primary">
                    No
          </Button>
                <Button onClick={yesButtonAction} color="primary" autoFocus>
                    Yes
          </Button>
            </DialogActions>
        </Dialog>
}