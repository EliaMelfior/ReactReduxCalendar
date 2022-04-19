import React from 'react';
import Box from '@mui/material/Box';
import CalendarMenu from '../components/CalendarMenu';
import CalendarMonth from '../components/CalendarMonth';


function Calendar(props) {

  return (
    <Box sx={{
      width: 'calc(100% - 40px)',
      margin: '20px 20px 20px 20px',
      height: 'calc(100% - 40px)'
    }}>
        <CalendarMenu>
        </CalendarMenu>

        <CalendarMonth>
        </CalendarMonth>
    </Box>
  )
}

export default Calendar;