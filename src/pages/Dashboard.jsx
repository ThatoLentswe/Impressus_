import React from 'react';
import { Grid } from '@mui/material';
import { useStateContext } from '../contexts/ContextProvider';
import UserDashboard from '../components/New/UserDashboard';
import AnalyticsDashboard from '../components/New/AnalyticsDashboard';
import StarsCalenderDashboard from '../components/New/StarsCalenderDashboard';
import NotificationsDashboard from '../components/New/NotificationsDashboard';
import UsersAccountsDashboard from '../components/New/UsersAccountsDashboard';
// import UserDashboardSubscription from '../components/New/UserDashboardSubscription';

const Dashboard = () => {
  const { globalRadius } = useStateContext();
  return (
    <div className="m-2 p-4 body">
      <Grid container direction="row">
        <Grid item xs={12} sm={12} md={6} l={9} xl={9} container direction="row">
          <Grid item xs={12} sm={12} md={12} l={8} xl={8} container>
            <Grid item xs={12} p={1}>
              <AnalyticsDashboard />
            </Grid>
            <Grid item xs={12} p={1}>
              <UsersAccountsDashboard />
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={12} l={4} xl={4} container>
            <Grid item xs={12} p={1}>
              <StarsCalenderDashboard />
            </Grid>
            {/* <Grid item xs={12} p={1}> */}
            {/*  <UserDashboardSubscription /> */}
            {/* </Grid> */}
            <Grid item xs={12} p={1}>
              <NotificationsDashboard />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={6} l={3} xl={3} p={1}>
          <UserDashboard />
        </Grid>

      </Grid>
    </div>
  );
};

export default Dashboard;
