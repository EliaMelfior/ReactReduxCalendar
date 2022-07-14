import { createSlice } from '@reduxjs/toolkit';

export const notificationSlice = createSlice({
    name: 'notifications',
    initialState: {
        uniqueId: 1,
        notificationModalState: false,
        notificationCreationModalState: false,
        allNotifications: [],
        dayNotifications: [],
        currentDay: '',
        monthObject: "",
        reminderToEdit: '',
        isEditing: false,
        editingCity: '',
        editinDate: '',
        editingDescription: ''
    },
    reducers: {
        createNotification: (state, notificationObj) => {
            state.notificationCreationModalState = false;
            state.notificationModalState = false;

            state.allNotifications.push(notificationObj.payload);
            state.uniqueId = state.uniqueId + 1;
        },
        deleteNotification: (state, notificationObj) => {
            state.allNotifications = state.allNotifications.filter((notification) => {
                let notificationDate = new Date(notification.date);
                let notificationDescription = notification.description;
                let objectDate = new Date(notificationObj.payload.date);
                let objectDescription = notificationObj.payload.description;

                return (notificationDate != objectDate &&
                        notificationDescription != objectDescription);
            });

            state.dayNotifications = state.dayNotifications.filter((notification) => {
                let notificationDate = new Date(notification.date);
                let notificationDescription = notification.description;
                let objectDate = new Date(notificationObj.payload.date);
                let objectDescription = notificationObj.payload.description;

                return (notificationDate != objectDate &&
                        notificationDescription != objectDescription);
            });

            state.notificationModalState = false;
        },
        editNotification: (state, notificationObject) => {
            state.reminderToEdit = notificationObject;

            state.notificationModalState = false;
            state.isEditing = true;
            state.editinDate = state.reminderToEdit.payload.date;
            state.editingDescription = state.reminderToEdit.payload.description;
            state.notificationCreationModalState = true;
        },
        changeModalState: (state, monthObject) => {
            let allNotifications = state.allNotifications;

            state.currentDay = monthObject.payload;

            state.dayNotifications = allNotifications.filter( (notification) => {
                let notificationDate = new Date(notification.date);
                let currentDayDate = new Date(state.currentDay.dateObject);

                return (notificationDate.getFullYear() === currentDayDate.getFullYear() &&
                notificationDate.getMonth() === currentDayDate.getMonth() &&
                notificationDate.getDate() === currentDayDate.getDate())
            });

            state.monthObject = monthObject;
            state.notificationModalState = !state.notificationModalState;
        },
        changeCreationModalState: (state, monthObject) => {
            state.monthObject = monthObject;
            state.isEditing = false;
            state.editingCity = '';
            state.editinDate = '';
            state.editingDescription = '';
            state.notificationModalState = false;
            state.notificationCreationModalState = !state.notificationCreationModalState;
        },
        finishEditing: (state, editingObject) => {
            let reminderToEdit = state.reminderToEdit.payload;
            let newReminder = editingObject.payload;

            state.allNotifications = state.allNotifications.filter( (notification) => {
                return (notification.id != reminderToEdit.id);
            });

            state.dayNotifications = state.dayNotifications.filter( (notification) => {
                return (notification.id != reminderToEdit.id);
            });

            state.allNotifications.push(newReminder);

            state.notificationModalState = false;
            state.notificationCreationModalState = false;
            state.isEditing = false;
            state.reminderToEdit = '';
            state.editingCity = '';
            state.editinDate = '';
            state.editingDescription = '';
            state.uniqueId = state.uniqueId + 1;
        },
        changeEditingDate: (state, editingDate) => {
            state.editingDate = editingDate.payload;
        },
        changeEditingCity: (state, editingCity) => {
            state.editingCity = editingCity.payload;
        },
        changeEditingDescription: (state, editingDescription) => {
            state.editingDescription = editingDescription.payload;
        }
    }
});

export const {
    createNotification, deleteNotification, finishEditing,
    editNotification, changeModalState, changeCreationModalState, clearEditingMode,
    changeEditingDate, changeEditingCity, changeEditingDescription
} = notificationSlice.actions

export default notificationSlice.reducer