import { Grid, Typography } from '@mui/material';
import img from '../../data/under-construction.png';

const UnderConstruction = () => (
  <Grid container xs={12} direction="column" justifyContent="center" alignItems="center" sx={{ height: '80vh' }}>
    <img src={img} alt="img" style={{ width: '40%' }} />
  </Grid>
);

export default UnderConstruction;
