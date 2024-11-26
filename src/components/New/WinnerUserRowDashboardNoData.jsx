import {Grid, Typography} from '@mui/material';
import {useStateContext} from "../../contexts/ContextProvider";

const WinnerUserRowDashboardNoData = () => {
    const {todayWinners} = useStateContext();
    return (
        <Grid container xs={12} direction="column" justifyContent="center" alignItems="center" sx={{height: '37vh'}}>
            <Typography sx={{color: '#A1A1A1', fontSize: '35px', fontWeight: '500'}}>Data</Typography>
            <Typography sx={{color: '#A1A1A1', fontSize: '35px', fontWeight: '500'}}>Currently</Typography>
            <Typography sx={{color: '#A1A1A1', fontSize: '35px', fontWeight: '500'}}>Unavailable</Typography>
            <Typography sx={{color: '#A1A1A1', fontSize: '35px', fontWeight: '500'}}>{todayWinners}</Typography>
        </Grid>
    )
};

export default WinnerUserRowDashboardNoData;
