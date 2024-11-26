import React, {useEffect, useState} from 'react';
import {Grid, Typography} from '@mui/material';
import {Dropdown as NUIDropdown, Loading} from '@nextui-org/react';
import {FaIdCard} from 'react-icons/fa';
import {FiUserCheck, FiUsers} from 'react-icons/fi';
import {TbAlertOctagon} from 'react-icons/tb';
import {TiCancel} from 'react-icons/ti';
import {RxComponentPlaceholder} from 'react-icons/rx';
import axios from 'axios';
import toast from 'react-hot-toast';
import {useStateContext} from '../../contexts/ContextProvider';
import UseToken from '../../hooks/UseToken';
import {globalConfig} from '../../globalConfig';

const AnalyticsDashboard = () => {
    const {globalRadius} = useStateContext();
    const [selected, setSelected] = React.useState(new Set(['daily']));
    const [loading, setLoading] = useState(false);
    const [analytics, setAnalytics] = React.useState({
        videos: '-',
        reports: '-',
        deactivatedUsers: '-',
        activeUsers: '-',
        newAccounts: '-'
    });

    const selectedValue = React.useMemo(
        () => Array.from(selected).join(', ').replaceAll('_', ' '),
        [selected],
    );

    const [token] = UseToken();
    const {backend} = globalConfig;
    const isMounted = true;

    const getAnalytics = async () => {
        setLoading(true);
        await axios.post(`${backend}/analytics/stats/counts`, {interval: selectedValue}, {headers: {Authorization: `Bearer ${token}`}})
            .then((response) => {
                setLoading(false);

                if (isMounted) {
                    setAnalytics(response.data.data);
                } else {
                    setAnalytics(response.data.data);
                }
            })
            .catch(() => {
                setLoading(false);
                toast.error('an error occurred');
            });
    };

    useEffect(() => {
        setAnalytics({videos: '-', reports: '-', deactivatedUsers: '-', activeUsers: '-', newAccounts: '-'});
        getAnalytics();
    }, [selected]);
    return (
        <Grid container p={1} sx={{
            borderRadius: globalRadius,
            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
            background: 'white'
        }}>

            <Grid item p={2} m={1} xs={12} sm={12} md={12} container direction="row" justifyContent="space-between"
                  alignItems="center">
                <Typography color="#343434" sx={{fontSize: '26px', fontWeight: '500'}}>Analytics</Typography>
                <NUIDropdown>
                    <NUIDropdown.Button
                        style={{borderRadius: '50px'}}
                        className="app-bg-secondary-2 app-color-secondary-4"
                        css={{tt: 'capitalize', border: '.5px solid #939393FF'}}
                    >
                        {selectedValue}
                    </NUIDropdown.Button>
                    <NUIDropdown.Menu aria-label="Static Actions" selectionMode="single" selectedKeys={selected}
                                      onSelectionChange={setSelected}>
                        <NUIDropdown.Item key="daily">Daily</NUIDropdown.Item>
                        <NUIDropdown.Item key="weekly">Weekly</NUIDropdown.Item>
                        <NUIDropdown.Item key="monthly">Monthly</NUIDropdown.Item>
                        <NUIDropdown.Item key="yearly">Yearly</NUIDropdown.Item>
                    </NUIDropdown.Menu>
                </NUIDropdown>
            </Grid>

            <Grid item xs={12} sm={12} md={12} p={2} container direction="row" justifyContent="flex-star">
                <Grid item p={1} xs={4} sm={3} container direction="row" justifyContent="center" alignItems="center">
                    <Grid p={2} xs={12} sx={{
                        borderRadius: globalRadius,
                        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                        background: 'white'
                    }}>
                        <Grid item xs={12}>
                            <p style={{
                                background: '#00BDEC',
                                color: '#ffffff',
                                borderRadius: globalRadius,
                                padding: '10px',
                                fontSize: '40px',
                                width: '59px'
                            }}>
                                <FaIdCard/>
                            </p>
                        </Grid>
                        <Grid item xs={12} mt={2}>
                            <Typography>
                                <Typography sx={{fontWeight: '600', fontSize: '25px'}}>
                                    {loading ? (<Loading type="spinner" size="lg"/>) : analytics.newAccounts}
                                </Typography>
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>
                                New Accounts
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item p={1} xs={4} sm={3} container direction="row" justifyContent="center" alignItems="center">
                    <Grid p={2} xs={12} sx={{
                        borderRadius: globalRadius,
                        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                        background: 'white'
                    }}>
                        <Grid item xs={12}>
                            <p style={{
                                background: '#2FD285',
                                color: '#ffffff',
                                borderRadius: globalRadius,
                                padding: '10px',
                                fontSize: '40px',
                                width: '59px'
                            }}>
                                <FiUserCheck/>
                            </p>
                        </Grid>
                        <Grid item xs={12} mt={2}>
                            <Typography>
                                <Typography sx={{fontWeight: '600', fontSize: '25px'}}>
                                    {loading ? (<Loading type="spinner" size="lg"/>) : analytics.activeUsers}
                                </Typography>
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>
                                Active Accounts
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item p={1} xs={4} sm={3} container direction="row" justifyContent="center" alignItems="center">
                    <Grid p={2} xs={12} sx={{
                        borderRadius: globalRadius,
                        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                        background: 'white'
                    }}>
                        <Grid item xs={12}>
                            <p style={{
                                background: '#A1A1A1',
                                color: '#ffffff',
                                borderRadius: globalRadius,
                                padding: '10px',
                                fontSize: '40px',
                                width: '59px'
                            }}>
                                <TiCancel/>
                            </p>
                        </Grid>
                        <Grid item xs={12} mt={2}>
                            <Typography>
                                <Typography sx={{fontWeight: '600', fontSize: '25px'}}>
                                    {loading ? (<Loading type="spinner" size="lg"/>) : analytics.deactivatedUsers}
                                </Typography>
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>
                                Deactivated
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item p={1} xs={4} sm={3} container direction="row" justifyContent="center" alignItems="center">
                    <Grid p={2} xs={12} sx={{
                        borderRadius: globalRadius,
                        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                        background: 'white'
                    }}>
                        <Grid item xs={12}>
                            <p style={{
                                background: '#DF5656',
                                color: '#ffffff',
                                borderRadius: globalRadius,
                                padding: '10px',
                                fontSize: '40px',
                                width: '59px'
                            }}>
                                <TbAlertOctagon/>
                            </p>
                        </Grid>
                        <Grid item xs={12} mt={2}>
                            <Typography>
                                <Typography sx={{fontWeight: '600', fontSize: '25px'}}>
                                    {loading ? (<Loading type="spinner" size="lg"/>) : analytics.reports}
                                </Typography>
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>
                                Reports
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item p={1} xs={4} sm={3} container direction="row" justifyContent="center" alignItems="center">
                    <Grid p={2} xs={12} sx={{
                        borderRadius: globalRadius,
                        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                        background: 'white'
                    }}>
                        <Grid item xs={12}>
                            <p style={{
                                background: '#7742B6',
                                color: '#ffffff',
                                borderRadius: globalRadius,
                                padding: '10px',
                                fontSize: '40px',
                                width: '59px'
                            }}>
                                <TbAlertOctagon/>
                            </p>
                        </Grid>
                        <Grid item xs={12} mt={2}>
                            <Typography>
                                <Typography sx={{fontWeight: '600', fontSize: '25px'}}>
                                    {loading ? (<Loading type="spinner" size="lg"/>) : analytics.videos}
                                </Typography>
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>
                                Active Videos
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item p={1} xs={4} sm={3} container direction="row" justifyContent="center" alignItems="center">
                    <Grid p={2} xs={12} sx={{
                        borderRadius: globalRadius,
                        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                        background: 'white'
                    }}>
                        <Grid item xs={12}>
                            <p style={{
                                background: '#A1A1A1',
                                color: '#ffffff',
                                borderRadius: globalRadius,
                                padding: '10px',
                                fontSize: '40px',
                                width: '59px'
                            }}>
                                <FiUsers/>
                            </p>
                        </Grid>
                        <Grid item xs={12} mt={2}>
                            <Typography>
                                <Typography sx={{fontWeight: '600', fontSize: '25px'}}>
                                    {loading ? (<Loading type="spinner" size="lg"/>) : analytics.totalUsersCount}
                                </Typography>
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>
                                All Users
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item p={1} xs={4} sm={3} container direction="row" justifyContent="center" alignItems="center">
                    <Grid p={2} xs={12} sx={{
                        borderRadius: globalRadius,
                        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                        background: 'white'
                    }}>
                        <Grid item xs={12}>
                            <p style={{
                                background: '#A1A1A1',
                                color: '#ffffff',
                                borderRadius: globalRadius,
                                padding: '10px',
                                fontSize: '40px',
                                width: '59px'
                            }}>
                                <RxComponentPlaceholder/>
                            </p>
                        </Grid>
                        <Grid item xs={12} mt={2}>
                            <Typography>
                                <Typography sx={{fontWeight: '600', fontSize: '25px'}}>0</Typography>
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>
                                Holder
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item p={1} xs={4} sm={3} container direction="row" justifyContent="center" alignItems="center">
                    <Grid p={2} xs={12} sx={{
                        borderRadius: globalRadius,
                        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                        background: 'white'
                    }}>
                        <Grid item xs={12}>
                            <p style={{
                                background: '#A1A1A1',
                                color: '#ffffff',
                                borderRadius: globalRadius,
                                padding: '10px',
                                fontSize: '40px',
                                width: '59px'
                            }}>
                                <RxComponentPlaceholder/>
                            </p>
                        </Grid>
                        <Grid item xs={12} mt={2}>
                            <Typography>
                                <Typography sx={{fontWeight: '600', fontSize: '25px'}}>0</Typography>
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>
                                Holder
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default AnalyticsDashboard;
