import React from 'react';
import { Grid, Typography } from '@mui/material';
import { useStateContext } from '../../contexts/ContextProvider';

const RegionalAdmin = ({ admin }) => {
  const { globalRadius } = useStateContext();
  return (
    <Grid item p={2} m={1} xs={12} sm={12} md={12} container direction="row" justifyContent="space-between" alignItems="center" sx={{ background: '#EAEBEC', borderRadius: globalRadius }}>
      <Typography color="#343434" variant="a" sx={{ fontSize: '15px', fontWeight: '400' }}>
        {admin.displayName ? admin.displayName : admin.email}
      </Typography>
    </Grid>
  );
};

export default RegionalAdmin;
