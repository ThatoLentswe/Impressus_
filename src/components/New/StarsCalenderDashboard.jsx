import React, { useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { useStateContext } from '../../contexts/ContextProvider';
import Calendar from './Calendar';

const StarsCalenderDashboard = () => {
  const { globalRadius } = useStateContext();
  const [currentDate, setCurrentDate] = useState(new Date());
  return (

    <Grid container p={1} sx={{ borderRadius: globalRadius, boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px', background: 'white' }}>

      <Grid item p={2} pb={0} m={1} xs={12} sm={12} md={12} container direction="row" justifyContent="space-between" alignItems="center">
        <Typography color="#343434" sx={{ fontSize: '26px', fontWeight: '500' }}>Stars Calender</Typography>
      </Grid>

      <Calendar date={currentDate} onChange={setCurrentDate} />
    </Grid>
  );
};

export default StarsCalenderDashboard;
