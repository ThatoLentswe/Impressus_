import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const ErrorNotFound = () => {
  const message = 'You seem to have wandered off. Lets get you back';
  return (
    <Grid sx={{ height: '100vh' }} container direction="column" justifyContent="center" alignItems="center">
      <Typography sx={{ fontSize: '12rem' }}> 404 </Typography>
      <span>{message}</span>
      <Button component={Link} to="/">Go back Home</Button>
    </Grid>
  );
};

export default ErrorNotFound;
