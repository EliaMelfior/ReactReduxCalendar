import { createSlice } from '@reduxjs/toolkit';

let date = new Date();
let monthDay = date.getDate();//1 to 31
let weekDay = date.getDay();//0 to 6  (Sunday to Saturday)
let month = date.getMonth();//0 to 11 (January to December)
let year = date.getFullYear();
const monthName = ["January","February","March","April","May","June","July","August","September","October","November","December"];
let calendarObject = generateCalendarObject(month, year);

function generateCalendarObject(month, year) {
    let calendarObject = [];
    let firstDay = new Date(year, month, 1);
    let firstMonthDay = firstDay.getDate();
    let firstWeekDay = firstDay.getDay();

    let initialDay = 1 - firstWeekDay;
    let monthDay = firstMonthDay;
    let weekDay = firstWeekDay;

    while (calendarObject.length < 42) {

        let calendarDay = new Date(year, month, initialDay);
        let objectMonth = calendarDay.getMonth();
        monthDay = calendarDay.getDate();
        weekDay = calendarDay.getDay();

        calendarObject.push({'dateObject': calendarDay, 'weekDay': weekDay, 'monthDay': monthDay, 'currentMonth': month == objectMonth});
        initialDay++;
    }

    return calendarObject;
}

export const dateSlice = createSlice({
    name: 'date',
    initialState: {
        dateObject: date,
        month: month,
        year: year,
        monthName: monthName[month],
        calendarObject: calendarObject
    },
    reducers: {
        incrementMonth: (state) => {
        if (state.month < 11) {
            state.month += 1;
        } else {
            state.year +=1;
            state.month = 0;
        }

        state.calendarObject = generateCalendarObject(state.month, state.year);
        state.monthName = monthName[state.month];
        },
        decrementMonth: (state) => {
        if (state.month > 0) {
            state.month -= 1;
        } else {
            state.year -=1;
            state.month = 11;
        }

        state.calendarObject = generateCalendarObject(state.month, state.year);
        state.monthName = monthName[state.month];
        }
    }
});

export const { incrementMonth, decrementMonth } = dateSlice.actions

export default dateSlice.reducer