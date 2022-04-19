import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CountryDropdown } from 'react-country-region-selector';
import { Country, City }  from 'country-state-city';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import Autocomplete from '@mui/material/Autocomplete';
import { useSelector, useDispatch } from 'react-redux';
import { createNotification, changeCreationModalState, finishEditing } from '../reducers/notificationSlice';
import { changeEditingDate, changeEditingCity, changeEditingDescription } from '../reducers/notificationSlice';

export default function CalendarNotificationForm() {
    const dispatch = useDispatch();
    const uniqueId = useSelector((state) => state.notifications.uniqueId);
    const open = useSelector((state) => state.notifications.notificationCreationModalState);
    const isEditing = useSelector((state) => state.notifications.isEditing);
    const [country, selectCountry] =  React.useState('');
    const city = useSelector((state) => state.notifications.editingCity);
    const date = useSelector((state) => state.notifications.editingDate);
    const description = useSelector((state) => state.notifications.editingDescription);
    const [cities, setCities] = React.useState([]);
    const countries = Country.getAllCountries();

    const handleDateChange = (newValue) => {
        dispatch(changeEditingDate(newValue));
    };

    const handleCountryChange = (val) => {
        selectCountry(val);
        let country = countries.filter(function(country) {
            return country.name == val;
        });

        let cities = [];

        if (typeof(country[0]) != 'undefined') {
            cities = City.getCitiesOfCountry(country[0].isoCode);
        }

        setCities(cities);
    };

    const handleClickOpen = () => {
        dispatch(changeCreationModalState(""));
    };

    const handleClose = () => {
        dispatch(changeCreationModalState(""));
    };

    const handleTextChange = (event) => {
        dispatch(changeEditingDescription(event.currentTarget.value));
    };

    const createReminder = () => {
        let notificationObj = {
            'id': uniqueId + 1,
            'date': date,
            'city': city,
            'description': description
        };

        if (isEditing) {
            dispatch(finishEditing(notificationObj));
        } else {
            dispatch(createNotification(notificationObj));
        }
    }

    const inputChange = (element, event) => {
        if (city == null || event != 'undefined') {
            dispatch(changeEditingCity(element));
        }
    }

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
            Open form dialog
            </Button>
            <Dialog
            open={open}
            onClose={handleClose}>
            <DialogTitle>{isEditing ? "Edit reminder": "New reminder"} </DialogTitle>
            <DialogContent>
                <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    <TextField
                        sx={{ minWidth: "300px" }}
                        inputProps={{ maxLength: 30 }}
                        value={description}
                        onChange={handleTextChange}
                        id="standard-basic"
                        label="Reminder"
                        variant="standard" />

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                            sx={{ minWidth: "300px" }}
                            label="Time"
                            value={date}
                            onChange={handleDateChange}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    <CountryDropdown
                        sx={{ minWidth: "300px" }}
                        value={country}
                        onChange={handleCountryChange} />
                    <Autocomplete
                        sx={{ minWidth: "300px" }}
                        onInputChange={inputChange}
                        disablePortal
                        value={city}
                        inputValue={city || ''}
                        id="citySelection"
                        options={cities}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => <TextField {...params} label="City" />}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={createReminder}>{isEditing ? "Edit reminder" : "Create Reminder"} </Button>
            </DialogActions>
            </Dialog>
        </div>
    );
}