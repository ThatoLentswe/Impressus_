import React from 'react';
import { Grid, List, Typography } from '@mui/material';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { Button } from '@nextui-org/react';
import { useStateContext } from '../../contexts/ContextProvider';
import NotificationListItem from './NotificationListItem';

const NotificationsDashboard = () => {
  const { globalRadius } = useStateContext();
  const notifications = [
    {
      names: 'Holden Bindon',
      date: '2023-01-18',
    }, {
      names: 'Carline Gaywood',
      date: '2023-02-25',
    }, {
      names: 'Janot Henrie',
      date: '2022-05-30',
    }, {
      names: 'Welby Tabbernor',
      date: '2022-11-03',
    }, {
      names: 'Emili Odda',
      date: '2023-02-20',
    }, {
      names: 'Fred Tappor',
      date: '2022-04-05',
    }, {
      names: 'Clarinda Bothen',
      date: '2022-05-05',
    }, {
      names: 'Natalee Sorley',
      date: '2022-07-10',
    }, {
      names: 'Regan Rannells',
      date: '2023-01-04',
    }, {
      names: 'Jess Jerke',
      date: '2022-10-09',
    }, {
      names: 'Cariotta Huttley',
      date: '2023-01-14',
    }, {
      names: 'Lammond Eke',
      date: '2022-04-12',
    }, {
      names: 'Eadie Dallison',
      date: '2022-04-11',
    }, {
      names: 'Tammi Epton',
      date: '2022-09-02',
    }, {
      names: 'Yehudi Allender',
      date: '2022-07-25',
    }, {
      names: 'Jabez Arderne',
      date: '2022-05-23',
    }, {
      names: 'Barth Jurek',
      date: '2023-02-15',
    }, {
      names: 'Cherilynn Craven',
      date: '2022-05-23',
    }, {
      names: 'Noni Bradnick',
      date: '2023-02-06',
    }, {
      names: 'Ertha Goodluck',
      date: '2022-11-16',
    }, {
      names: 'Frasquito MacDermid',
      date: '2022-12-09',
    }, {
      names: 'Rab McEwen',
      date: '2022-07-04',
    }, {
      names: 'Matthaeus Beden',
      date: '2022-09-18',
    }, {
      names: 'Anderson Ferreli',
      date: '2022-10-21',
    }, {
      names: 'Reginauld Pandya',
      date: '2022-06-08',
    }, {
      names: 'Vittoria Jelly',
      date: '2022-09-27',
    }, {
      names: 'Larina McQuode',
      date: '2022-03-15',
    }, {
      names: 'Stafford Mort',
      date: '2022-11-03',
    }, {
      names: 'Deeanne Bowdrey',
      date: '2023-02-20',
    }, {
      names: 'Derward Ethelstone',
      date: '2022-11-05',
    }, {
      names: 'Bjorn Kowalik',
      date: '2022-04-26',
    }, {
      names: 'Isador Aizikovitz',
      date: '2022-07-05',
    }, {
      names: 'Sammie Higginbottam',
      date: '2022-11-30',
    }, {
      names: 'Dusty Van Bruggen',
      date: '2022-06-21',
    }, {
      names: 'Cleopatra Trowel',
      date: '2022-06-09',
    }, {
      names: 'Simonette Rushmere',
      date: '2022-09-04',
    }, {
      names: 'Vivi Bass',
      date: '2022-12-27',
    }, {
      names: 'Tailor Demsey',
      date: '2022-10-28',
    }, {
      names: 'Odie Melchior',
      date: '2022-08-25',
    }, {
      names: 'Tabbitha Van Arsdalen',
      date: '2022-09-15',
    }];
  return (
    <Grid container p={1} sx={{ borderRadius: globalRadius, boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px', background: 'white' }}>

      <Grid item p={2} pb={0} m={1} xs={12} sm={12} md={12} container direction="row" justifyContent="space-between" alignItems="center">
        <Typography color="#343434" sx={{ fontSize: '26px', fontWeight: '500' }}>Notifications</Typography>
      </Grid>
      <Grid sx={{ maxHeight: '55vh', overflow: 'auto' }} xs={12}>
        <List dense>
          {notifications.map((notification, key) => (<NotificationListItem notification={notification} key={key} />))}
        </List>
      </Grid>

      <Grid item p={2} pb={0} m={1} xs={12} sm={12} md={12} container direction="row" justifyContent="flex-end" alignItems="center">
        <Grid color="#343434" sx={{ fontSize: '15px', color: '#13819F' }} item alignItems="center" justifyContent="center"> show all</Grid>
        <Typography style={{ display: 'inline', border: '1px solid #EAEBEC', borderRadius: '7px', textAlign: 'center', padding: '2px 5px', color: '#13819F', fontWeight: '700' }} ml={1} item alignItems="center" justifyContent="center">
          <MdKeyboardArrowRight style={{ display: 'inline', fontSize: '23px' }} />
        </Typography>
      </Grid>
    </Grid>
  );
};

export default NotificationsDashboard;
