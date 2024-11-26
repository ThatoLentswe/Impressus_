import { Grid, Typography } from '@mui/material';
import React from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import { useStateContext } from '../../contexts/ContextProvider';

const UserDashboardSubscription = () => {
  const { globalRadius } = useStateContext();
  return (
    <Grid alignSelf="flex-start" container p={2} sx={{ borderRadius: globalRadius, boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px', background: 'white' }}>
      <Grid item p={2} pb={0} m={1} xs={12} sm={12} md={12} container direction="row" justifyContent="space-between" alignItems="center">
        <Typography color="#343434" sx={{ fontSize: '20px', fontWeight: '400' }}>Current Subscription </Typography>
      </Grid>
      <Grid item p={1} pb={0} m={1} xs={12} sm={12} md={12} container direction="row" justifyContent="space-between" alignItems="center">
        <Grid sx={{ background: '#33CC60', height: '100%', width: '10px', borderRadius: '10px' }} />
        <Grid item direction="column" justifyContent="flex-start" alignItems="center">
          <Typography color="#343434" sx={{ fontSize: '20px', fontWeight: '400' }}>15 Days - P50.00</Typography>
          <Typography color="#343434" sx={{ fontSize: '15px', fontWeight: '100' }}>14 days Remaining </Typography>
        </Grid>
        <Grid sx={{ background: '#E4E4E4', borderRadius: '50%' }}>
          <Typography p={1}>
            <FaCalendarAlt style={{ color: '#A1A1A1', fontSize: '35px' }} />
          </Typography>
        </Grid>
      </Grid>

    </Grid>
  );
};

export default UserDashboardSubscription;
