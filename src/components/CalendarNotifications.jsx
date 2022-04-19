import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import { useSelector, useDispatch } from 'react-redux';
import { changeModalState, deleteNotification, editNotification, changeCreationModalState } from '../reducers/notificationSlice';


function generate(handleEditForm, handleDeleteClick, elements) {
  let components = [];

  elements.forEach(function (element) {
    components.push(
      <ListItem
        key={Math.floor(Math.random() * 40000)}
        button
        onClick={handleEditForm.bind(this, element)}
        secondaryAction={
          <IconButton
            onClick={handleDeleteClick.bind(this, element)}
            edge="end" aria-label="delete">
            <DeleteIcon />
          </IconButton>
        }>
        <ListItemText
          primary={element.description}
        />
      </ListItem>)
  });

  return components;
}

export default function CalendarNotifications() {
    const open = useSelector((state) => state.notifications.notificationModalState);
    const monthObject = useSelector((state) => state.notifications.monthObject);
    const monthName = useSelector((state) => state.date.monthName);
    const year = useSelector((state) => state.date.year);
    const dayNotifications = useSelector((state) => state.notifications.dayNotifications);

    const dispatch = useDispatch();

    const handleClickOpen = () => {
        dispatch(changeModalState(""));
    };

    const handleClose = () => {
        dispatch(changeModalState(""));
    };

    const handleEditForm = (element, event) => {
        dispatch(editNotification(element));
    };

    const handleDeleteClick = (element, event) => {
        dispatch(deleteNotification(element));
        event.stopPropagation();
    };

    const openCreationModal = (element, event) => {
      dispatch(changeCreationModalState(element));
    }

    let dialogTitle = "Reminders - ";

    if (typeof(monthObject) != 'undefined'
       && typeof(monthObject.payload) != 'undefined') {
      dialogTitle = dialogTitle + monthObject.payload.monthDay + " of " + monthName + " of " + year;
    } else {
      dialogTitle = dialogTitle + monthName + " of " + year;
    }

    return (
      <div>
          <Button variant="outlined" onClick={handleClickOpen}>
          Open form dialog
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}>
          <DialogTitle>{dialogTitle} </DialogTitle>
          <DialogContent>
              <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {generate(handleEditForm, handleDeleteClick, dayNotifications)}
              </List>
          </DialogContent>
          <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={openCreationModal}>Create Reminder</Button>
          </DialogActions>
          </Dialog>
      </div>
    );
}