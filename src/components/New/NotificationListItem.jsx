import React from 'react';
import { Grid, ListItem, ListItemText } from '@mui/material';
import { RxDotFilled } from 'react-icons/rx';

const NotificationListItem = ({ notification }) => {
  const actions = ['rejected', 'accepted'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const convertDate = (dateStr) => {
    const tempDate = dateStr.split('-');
    return `${tempDate[2]} ${months[Number(tempDate[1]) - 1]} ${tempDate[0]}`;
  };

  return (
    <ListItem>
      <RxDotFilled style={{ fontSize: '20px' }} className="app-color-secondary-4" />
      <ListItemText
        style={{ paddingLeft: '6px' }}
        primary={(
          <Grid>
            <label style={{ fontWeight: 'bold' }}>
              {notification.names}
            </label> {actions[Math.floor(Math.random() * actions.length)]} an application
          </Grid>
)}
        secondary={convertDate(notification.date)}
      />
    </ListItem>
  );
};

export default NotificationListItem;
