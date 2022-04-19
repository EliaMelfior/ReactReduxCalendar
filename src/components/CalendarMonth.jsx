import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useSelector, useDispatch } from 'react-redux';
import { changeModalState } from '../reducers/notificationSlice';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    fontWeight: '800',
    transition: '0.5s',
    height: 'calc((100vh - 144px)/7)',
    '&:hover':{
        cursor: 'pointer',
        backgroundColor:'rgba(32, 51, 158, 0.2) !important'
    }
}));

const DayItem = styled(Paper)(({ theme }) => ({
    backgroundColor: 'rgb(25, 118, 210)',
    fontWeight: '600',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    transition: '0.5s',
    height: '1',
    color: 'white'
}));

function FormRow(props) {
    const dispatch = useDispatch();

    let weekDays = props.weekDays;
    let className = '';

    if (props.weekDayName == 'Sunday' || props.weekDayName == 'Saturday') {
        className = 'weekendDays';
    }

    return (
      <React.Fragment>
        <Grid item xs={0.8}>
          <DayItem elevation={6}>{props.weekDayName}</DayItem>
        </Grid>
        <Grid item xs={1.7}>
          <Item
                onClick={() => {
                    dispatch(changeModalState(weekDays[0]));
                }}
                className={weekDays[0].currentMonth ? className : className + ' differentMonth'}
                elevation={6}>{weekDays[0].monthDay}</Item>
        </Grid>
        <Grid item xs={1.7}>
          <Item
                onClick={() => {
                    dispatch(changeModalState(weekDays[1]));
                }}
                className={weekDays[1].currentMonth ? className : className + ' differentMonth'}
                elevation={6}>{weekDays[1].monthDay}</Item>
        </Grid>
        <Grid item xs={1.7}>
          <Item
                onClick={() => {
                    dispatch(changeModalState(weekDays[2]));
                }}
                className={weekDays[2].currentMonth ? className : className + ' differentMonth'}
                elevation={6}>{weekDays[2].monthDay}</Item>
        </Grid>
        <Grid item xs={1.7}>
          <Item
                onClick={() => {
                    dispatch(changeModalState(weekDays[3]));
                }}
                className={weekDays[3].currentMonth ? className : className + ' differentMonth'}
                elevation={6}>{weekDays[3].monthDay}</Item>
        </Grid>
        <Grid item xs={1.7}>
          <Item
                onClick={() => {
                    dispatch(changeModalState(weekDays[4]));
                }}
                className={weekDays[4].currentMonth ? className : className + ' differentMonth'}
                elevation={6}>{weekDays[4].monthDay}</Item>
        </Grid>
        <Grid item xs={1.7}>
          <Item
                onClick={() => {
                    dispatch(changeModalState(weekDays[5]));
                }}
                className={weekDays[5].currentMonth ? className : className + ' differentMonth'}
                elevation={6}>{weekDays[5].monthDay}</Item>
        </Grid>
      </React.Fragment>
    );
  }

function CalendarMonth(props) {
    const calendarObject = useSelector((state) => state.date.calendarObject);

    let sundays = calendarObject.filter((item) => { return item.weekDay == 0; });
    let mondays = calendarObject.filter((item) => { return item.weekDay == 1; });
    let tuesdays = calendarObject.filter((item) => { return item.weekDay == 2; });
    let wednesdays = calendarObject.filter((item) => { return item.weekDay == 3; });
    let thursdays = calendarObject.filter((item) => { return item.weekDay == 4; });
    let fridays = calendarObject.filter((item) => { return item.weekDay == 5; });
    let saturdays = calendarObject.filter((item) => { return item.weekDay == 6; });


    return (
        <Box sx={{
            width: '100%',
            height: '100%',
            margin: '14px 0px 0px 0px'
            }}>
        <Grid
            container
            spacing={0.5}
            direction="row"
            sx={{ margin: '0px' }}>
            <Grid
                container
                xs={1.7}
                direction="column"
                item spacing={0.5}>
                <FormRow
                    weekDayName="Sunday"
                    weekDays={sundays}/>
            </Grid>
            <Grid
                container
                xs={1.7}
                direction="column"
                item spacing={0.5}>
                <FormRow
                    weekDayName="Monday"
                    weekDays={mondays}/>
            </Grid>
            <Grid
                container
                xs={1.7}
                direction="column"
                item spacing={0.5}>
                <FormRow
                    weekDayName="Tuesday"
                    weekDays={tuesdays}/>
            </Grid>
            <Grid
                container
                xs={1.7}
                direction="column"
                item spacing={0.5}>
                <FormRow
                    weekDayName="Wednesday"
                    weekDays={wednesdays}/>
            </Grid>
            <Grid
                container
                xs={1.7}
                direction="column"
                item spacing={0.5}>
                <FormRow
                    weekDayName="Thursday"
                    weekDays={thursdays}/>
            </Grid>
            <Grid
                container
                xs={1.7}
                direction="column"
                item spacing={0.5}>
                <FormRow
                    weekDayName="Friday"
                    weekDays={fridays}/>
            </Grid>
            <Grid
                container
                xs={1.7}
                direction="column"
                item spacing={0.5}>
                <FormRow
                    weekDayName="Saturday"
                    weekDays={saturdays}/>
            </Grid>
        </Grid>
    </Box>
  )
}

export default CalendarMonth;