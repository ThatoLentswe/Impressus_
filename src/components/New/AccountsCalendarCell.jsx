import React from 'react';
import { Grid } from '@mui/material';
import clsx from 'clsx';
import avatar from '../../data/avatar.jpg';

const AccountsCalendarCell = ({ day, img, hasBackground = false, onClick, isActive = false, strDate = null }) => {
  const cStyles = hasBackground ? {
    border: isActive ? '2px solid #EF3D5B' : '1px solid #EAEBEC',
    borderRadius: '50%',
    background: '#A1A0A0',
    backgroundImage: `url(${img})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    color: '#ffffff',
    cursor: 'pointer',
    width: '70px',
    height: '70px',
  } : {
    cursor: 'pointer',
    width: '70px',
    height: '70px',
  };

  const getStringDate = (dayNum) => {
    switch (dayNum) {
      case 0:
        return 'Sun';
      case 1:
        return 'Mon';
      case 2:
        return 'Tue';
      case 3:
        return 'Wed';
      case 4:
        return 'Thu';
      case 5:
        return 'Fri';
      case 6:
        return 'Sat';
      default:
        return '';
    }
  };
  return (

    <div className="flex-none w-52" style={{ width: '70px', marginBottom: '10px' }} onClick={hasBackground ? onClick : undefined}>
      <Grid
        alignItems="center"
        container
        justifyContent="center"
        mb={2}
      >
        {getStringDate(strDate)}
      </Grid>
      <Grid
        alignItems="center"
        container
        justifyContent="center"
        className=""
        style={cStyles}
      >
        {day}
      </Grid>
    </div>
  );
};

export default AccountsCalendarCell;
