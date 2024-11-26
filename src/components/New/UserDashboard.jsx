import React, {useEffect, useState} from 'react';
import {Grid, Typography} from '@mui/material';
import Stack from '@mui/material/Stack';
import {BsCameraFill} from 'react-icons/bs';
import Avatar from '@mui/material/Avatar';
import {Button as NextUIButton, Button as NUIButton, Dropdown, Input as NUIInput, Loading} from '@nextui-org/react';
import {IoIosSend} from 'react-icons/io';
import {styled} from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import axios from 'axios';
import toast from 'react-hot-toast';
import notFound from '../../data/no-data.png';
import {useStateContext} from '../../contexts/ContextProvider';
import defaultAvatar from '../../data/default.png';
import UseToken from '../../hooks/UseToken';
import {globalConfig} from '../../globalConfig';
import RegionalAdmin from './RegionalAdmin';

const StyledBadge = styled(Badge)(() => ({
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));

const UserDashboard = () => {
    const {globalRadius} = useStateContext();
    const [region, setRegion] = useState(new Set(['gaborone']));

    const [email, setEmail] = useState('');
    const [inviteLoading, setInviteLoading] = useState('');

    const avatar = defaultAvatar;

    const selectedRegion = React.useMemo(
        () => Array.from(region).join(', ').replaceAll('_', ' '),
        [region],
    );

    const [profile, setProfile] = useState([]);
    const [loadingProfile, setLoadingProfile] = useState(false);

    const [regionalAdmins, setRegionalAdmins] = useState([]);
    const [regionalAdminsPagination, setRegionalAdminsPagination] = useState({page: 0, count: 0, limit: 10});
    const [loadingRegionalAdmins, setLoadingRegionalAdmins] = useState(false);
    const [lastRegionalAdmins, setLastRegionalAdmins] = useState([]);
    const [nextPageRegionalAdmins, setNextPageRegionalAdmins] = useState(1);
    const [token] = UseToken();
    const {backend} = globalConfig;
    const isMounted = true;

    const inviteAdmin = async () => {
        setInviteLoading(true);
        await axios.post(`${backend}/invites`, {email}, {headers: {Authorization: `Bearer ${token}`}})
            .then(() => {
                setInviteLoading(false);
                if (isMounted) {
                    toast.dismiss();
                    toast.success('invite has been sent');
                    setEmail('')
                } else {
                    toast.dismiss();
                    toast.success('invite has been sent');
                    setEmail('')
                }
            })
            .catch((error) => {
                setInviteLoading(false);

                if (error.response) {
                    // if status is unauthorised
                    if (error.response.status === 406) {
                        toast.dismiss();
                        toast.error('email already in use');
                    } else {
                        toast.dismiss();
                        toast.error('an error occurred');
                    }
                } else {
                    toast.dismiss();
                    toast.error('an error occurred');
                }
            });
    };

    const getProfile = async () => {
        setLoadingProfile(true);
        await axios.get(`${backend}/profile`, {headers: {Authorization: `Bearer ${token}`}})
            .then((response) => {
                setLoadingProfile(false);
                if (isMounted) {
                    setProfile(response.data.data);
                } else {
                    setProfile(response.data.data);
                }
            })
            .catch(() => {
                setLoadingProfile(false);
                toast.error('an error occurred loading profile');
            });
    };

    const getRegionalAdmins = async (page = nextPageRegionalAdmins) => {
        setLoadingRegionalAdmins(true);
        await axios.get(`${backend}/Admin/region/${selectedRegion}?page=${page}`, {headers: {Authorization: `Bearer ${token}`}})
            .then((response) => {
                setLoadingRegionalAdmins(false);

                if (isMounted) {
                    setRegionalAdmins(page === 1 ? response.data.data : [...regionalAdmins, ...response.data.data]);
                    setLastRegionalAdmins(response.data.data);
                    setRegionalAdminsPagination({
                        page: response.data.page,
                        count: response.data.count,
                        limit: response.data.limit
                    });
                    setNextPageRegionalAdmins(page + 1);
                } else {
                    setRegionalAdmins(page === 1 ? response.data.data : [...regionalAdmins, ...response.data.data]);
                    setLastRegionalAdmins(response.data.data);
                    setRegionalAdminsPagination({
                        page: response.data.page,
                        count: response.data.count,
                        limit: response.data.limit
                    });
                    setNextPageRegionalAdmins(page + 1);
                }
            })
            .catch(() => {
                setLoadingRegionalAdmins(false);
                toast.error('an error occurred');
            });
    };

    const loadMoreRegionalAdmins = () => {
        getRegionalAdmins();
    };

    useEffect(() => {
        setRegionalAdmins([]);
        setNextPageRegionalAdmins(1);
        setLastRegionalAdmins([]);
        setRegionalAdminsPagination({page: 0, count: 0, limit: 10});
        getRegionalAdmins(1);
    }, [selectedRegion]);

    useEffect(() => {
        getProfile()
    }, []);

    return (
        <Grid item xs={12} sm={12} md={12} l={12} xl={12}
              sx={{borderRadius: globalRadius, boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px', background: 'white'}}
              pt={3} pl={1} pr={1} pb={1} container direction="row" justifyContent="center">
            <Grid item xs={12} sm={12} md={12} container direction="row" justifyContent="center" alignItems="center">
                <Stack direction="row" spacing={2}
                       sx={{borderRadius: '50%', border: '2px solid #EAEBEC', padding: '3px'}}>
                    <StyledBadge overlap="circular" anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                                 badgeContent={(<Grid sx={{
                                     background: '#ffffff',
                                     borderRadius: '50%',
                                     padding: '5px',
                                     color: '#1780B7'
                                 }}><BsCameraFill/></Grid>)}>
                        <Avatar
                            alt="Juju Boy"
                            src={avatar}
                            sx={{width: '120px', height: '120px'}}
                        />
                    </StyledBadge>
                </Stack>
            </Grid>

            <Grid item xs={12} sm={12} md={12} container direction="row" justifyContent="center" alignItems="center">
                <Grid item mt={1} xs={12} sm={12} md={12} container direction="row" justifyContent="center"
                      alignItems="center">
                    <Typography color="#1780B7">{profile.role || '---'}</Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} container direction="row" justifyContent="center"
                      alignItems="center">
                    <Typography color="#343434" sx={{fontSize: '24px'}}>{profile.displayName || '---'}</Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} container direction="row" justifyContent="center"
                      alignItems="center">
                    <Typography color="#ADBECB" variant="a"
                                sx={{fontSize: '14px'}}>{profile.email || '---'}</Typography>
                </Grid>
                <Grid mt={1} item xs={12} sm={12} md={12} p={1} container direction="row" justifyContent="flex-start"
                      alignItems="center">
                    <Typography color="#343434" sx={{fontSize: '17px', fontWeight: '300'}}>Administrators</Typography>
                </Grid>
                <Grid item p={2} m={1} xs={12} sm={12} md={12} container direction="row" justifyContent="space-between"
                      alignItems="center" sx={{background: '#EAEBEC', borderRadius: globalRadius}}>
                    <Typography color="#343434" variant="a" sx={{fontSize: '15px', fontWeight: '400'}}>Kgotla
                        Jujuboy</Typography>
                    <Typography color="#343434" variant="a" sx={{fontSize: '15px', fontWeight: '400'}}>Super
                        Admin</Typography>
                </Grid>
                <Grid mt={1} item xs={12} sm={12} md={12} p={1} container direction="row" justifyContent="space-between"
                      alignItems="center">
                    <Typography color="#343434" sx={{fontSize: '17px', fontWeight: '300'}}>Regional Admins</Typography>
                    <Dropdown>
                        <Dropdown.Button aria-label="---" style={{borderRadius: '50px'}}
                                         className="app-bg-secondary-2 app-color-secondary-4"
                                         css={{tt: 'capitalize', border: '.5px solid #939393FF'}}>
                            {selectedRegion}
                        </Dropdown.Button>
                        <Dropdown.Menu aria-label="Static Actions" selectionMode="single" selectedKeys={region}
                                       onSelectionChange={setRegion}>
                            <Dropdown.Item key="gaborone">Gaborone</Dropdown.Item>
                            <Dropdown.Item key="central">Central</Dropdown.Item>
                            <Dropdown.Item key="lobatse">Lobatse</Dropdown.Item>
                            <Dropdown.Item key="ghanzi">Ghanzi</Dropdown.Item>
                            <Dropdown.Item key="kgalagadi">Kgalagadi</Dropdown.Item>
                            <Dropdown.Item key="kgatleng">Kgatleng</Dropdown.Item>
                            <Dropdown.Item key="kweneng">Kweneng</Dropdown.Item>
                            <Dropdown.Item key="north_east">North East</Dropdown.Item>
                            <Dropdown.Item key="south_east">South East</Dropdown.Item>
                            <Dropdown.Item key="southern">Southern</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Grid>
                <Grid item xs={12} container sx={{maxHeight: '55vh', overflow: 'auto'}}>

                    {
                        !loadingRegionalAdmins && regionalAdmins.length === 0
                            ? (
                                <Grid container item xs={12} justifyContent="center" alignItems="center" pt={5} pb={5}>
                                    <img src={notFound} style={{width: '60%'}} alt=""/>
                                </Grid>
                            )
                            : ''
                    }
                    {regionalAdmins.map((admin, key) => (<RegionalAdmin key={key} admin={admin}/>))}

                    {loadingRegionalAdmins ? (
                            <Grid container item xs={12} justifyContent="center" alignItems="center" pt={2} pb={2}>
                                <Loading type="spinner" size="lg"/>
                            </Grid>
                        )
                        : (
                            <Grid container item xs={12} justifyContent="center" alignItems="center">
                                {
                                    lastRegionalAdmins.length > 0 && lastRegionalAdmins.length === regionalAdminsPagination.limit
                                        ? (
                                            <NextUIButton onPress={() => loadMoreRegionalAdmins()} style={{
                                                boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                                                cursor: 'pointer',
                                                background: '#ffffff',
                                                color: '#A1A0A0',
                                                marginBottom: '8px',
                                                marginTop: '8px'
                                            }} mt={2} mb={2}>
                                                See More
                                            </NextUIButton>
                                        )
                                        : ''
                                }
                            </Grid>
                        )}
                </Grid>

                <Grid mt={1} item xs={12} sm={12} md={12} p={1} container direction="row" justifyContent="flex-start"
                      alignItems="center">
                    <Typography color="#343434" sx={{fontSize: '17px', fontWeight: '300'}}>Invite as
                        Administrator</Typography>
                </Grid>
                <Grid mt={1} item xs={12} sm={12} md={12} container direction="row" justifyContent="center"
                      alignItems="center">
                    <Grid item xs={10} sm={10} md={10} p={1}>
                        <NUIInput fullWidth value={email} placeholder="johndoe@gmail.com"
                                  onChange={(e) => setEmail(e.target.value)}/>
                    </Grid>
                    <Grid item xs={2} sm={2} md={2} p={1}>
                        <NUIButton
                            onPress={() => {
                                if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
                                    if (inviteLoading) {
                                        toast.error('please wait for app to finish loading...');
                                    } else {
                                        inviteAdmin();
                                    }
                                } else {
                                    toast.error('invalid email address');
                                }
                            }}
                            auto
                            disabled={inviteLoading}
                            fullWidth
                            className="bg-gradient-2"
                            css={{color: '#ffffff', fontSize: '24px', borderRadius: '9px'}}
                            icon={<IoIosSend/>}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default UserDashboard;
