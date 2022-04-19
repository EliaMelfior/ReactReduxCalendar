# React Redux Calendar Features:

- The features that were implemented:
- Reminder system which shows the reminders when you click on a day in the calendar.
- Possibility of editing the reminder when you click on it when it is listed.
- Possibility of excluding the reminder through the trash icon button.
- Cities selection according to the country (some countries don't have cities available).

## Weather features

- Weather forecasting was not implemented because the APIs available do not enable CORS requests and would need a proxy to work, involving back-end implementation with Express and Node.js.

## Visually

- Multiple months are supported.
- The calendar is formatted according to the current month, days from other months are visually identified.
- It is responsive to multiple desktop resolutions.
- Sundays and saturdays are easily identified.

## Testing

- I did not test the components extensively, but I did create some sample tests to show what could be done
- The implemented tests are at in the following file: (/src/components/CalendarMonth.test.jsx)
- Run `npm test` to run the existing unit tests.

## Routes

- I redirected the / main route to the Calendar, and I kept the /Calendar route to the Calendar as well.

## State management and Persistence.

- I used react-redux for the state management, with createslice and useSelector/useDispatch.
- I implemented redux-persist to keep the redux state for full page loads.
- The persistence can be resetted by cleaning the localStorage through the DevTools (localStorage.clear());

## How to deploy

- To run this locally the steps are the same from the base project:

 - Run `npm install`  to install all dependencies.
 - Run `npm start`  to run the app locally.
 - You can find the project running on `localhost:3000`.
