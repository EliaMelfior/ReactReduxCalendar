import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CalendarNotifications from './CalendarNotifications';
import CalendarNotificationForm from './CalendarNotificationForm';


import { useSelector, useDispatch } from 'react-redux';
import { incrementMonth, decrementMonth } from '../reducers/dateSlice';


export default function CalendarMenu(props) {
    const monthName = useSelector((state) => state.date.monthName);
    const year = useSelector((state) => state.date.year);
    const dispatch = useDispatch();

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={() => {
                        dispatch(decrementMonth())
                    }}
                >
                    <ChevronLeftIcon
                        fontSize="large" />
                </IconButton>

                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={() => {
                        dispatch(incrementMonth())
                    }}
                >
                    <ChevronRightIcon
                        fontSize="large" />
                </IconButton>

                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {monthName + ", " + year}
                </Typography>
                <CalendarNotifications>
                </CalendarNotifications>
                <CalendarNotificationForm>
                </CalendarNotificationForm>
            </Toolbar>
        </AppBar>
    );
}