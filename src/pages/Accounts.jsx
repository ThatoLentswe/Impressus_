import React, {useEffect, useState} from 'react';
import {Grid, Typography} from '@mui/material';
import {Button as NextUIButton, Button as NUIButton, Input as NUIInput, Loading} from '@nextui-org/react';
import {CiSearch} from 'react-icons/ci';
import axios from 'axios';
import toast from 'react-hot-toast';
import {useStateContext} from '../contexts/ContextProvider';
import UserRowDashboard from '../components/New/AccountsUserRow';
import AccountsCalendar from '../components/New/AccountsCalendar';
import WinnerUserRowDashboard from '../components/New/WinnerUserRowDashboard';
import WinnerUserRowDashboardNoData from '../components/New/WinnerUserRowDashboardNoData';
import UseToken from '../hooks/UseToken';
import {globalConfig} from '../globalConfig';
import notFound from '../data/no-data.png';

const Accounts = () => {
    const {globalRadius, todayWinners, setTodayWinnersDate} = useStateContext();
    const [currentDate, setCurrentDate] = useState(new Date());

    const [winners, setWinners] = useState([]);
    const [loadingWinners, setLoadingWinners] = useState(false);

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({page: 0, count: 0, limit: 10});
    const [last, setLast] = useState([]);
    const [nextPage, setNextPage] = useState(1);
    const [token] = UseToken();
    const {backend} = globalConfig;
    const isMounted = true;

    const [activelySearching, setActivelySearching] = useState(false);
    const [paginationSearch, setPaginationSearch] = useState({page: 0, count: 0, limit: 10});
    const [lastSearch, setLastSearch] = useState([]);
    const [nextPageSearch, setNextPageSearch] = useState(1);
    const [searchKey, setSearchKey] = useState('');
    const [searchable, setSearchable] = useState(false);

    const getWinners = async () => {
        setLoadingWinners(true);
        await axios.get(`${backend}/posts/topLiked/${todayWinners}`, {headers: {Authorization: `Bearer ${token}`}})
            .then((response) => {
                setLoadingWinners(false);
                if (isMounted) {
                    setWinners(response.data.data);
                } else {
                    setWinners(response.data.data);
                }
            })
            .catch(() => {
                setLoadingWinners(false);
                toast.error('an error occurred');
            });
    };

    const getUsers = async (page = nextPage) => {
        setLoading(true);
        await axios.get(`${backend}/users?page=${page}`, {headers: {Authorization: `Bearer ${token}`}})
            .then((response) => {
                setLoading(false);
                if (isMounted) {
                    setUsers(page === 1 ? response.data.data : [...users, ...response.data.data]);
                    setLast(response.data.data);
                    setPagination({page: response.data.page, count: response.data.count, limit: response.data.limit});
                    setNextPage(page + 1);
                } else {
                    setUsers(page === 1 ? response.data.data : [...users, ...response.data.data]);
                    setLast(response.data.data);
                    setPagination({page: response.data.page, count: response.data.count, limit: response.data.limit});
                    setNextPage(page + 1);
                }
            })
            .catch(() => {
                setLoading(false);
                toast.error('an error occurred');
            });
    };

    const searchUsers = async (page = nextPageSearch) => {
        setLoading(true);
        await axios.get(`${backend}/users/search/user?q=${searchKey}&page=${page}`, {headers: {Authorization: `Bearer ${token}`}})
            .then((response) => {
                setLoading(false);
                if (isMounted) {
                    setUsers(page === 1 ? response.data.data : [...users, ...response.data.data]);
                    setLastSearch(response.data.data);
                    setPaginationSearch({
                        page: response.data.page,
                        count: response.data.count,
                        limit: response.data.limit
                    });
                    setNextPageSearch(page + 1);
                } else {
                    setUsers(page === 1 ? response.data.data : [...users, ...response.data.data]);
                    setLastSearch(response.data.data);
                    setPaginationSearch({
                        page: response.data.page,
                        count: response.data.count,
                        limit: response.data.limit
                    });
                    setNextPageSearch(page + 1);
                }
            })
            .catch(() => {
                setLoading(false);
                toast.error('an error occurred');
            });
    };

    useEffect(() => {
        if (searchKey.length === 0) {
            setActivelySearching(false);

            getUsers(1);

            setSearchable(false);
        } else if (searchKey.length <= 2) {
            setSearchable(false);
        } else if (searchKey.length > 2) {
            setActivelySearching(true);

            setSearchable(true);
        }
    }, [searchKey]);

    useEffect(() => {
        getUsers();
        getWinners();
    }, []);

    useEffect(() => {
        setWinners([])
        getWinners();
    }, [todayWinners]);

    const loadMore = () => {
        getUsers();
    };

    const loadMoreSearch = () => {
        searchUsers();
    };

    return (
        <Grid container item xs={12} p={1}>
            <Grid item xs={12} sm={6} md={6}>
                <Grid xs={12} container>
                    <Typography color="#343434" sx={{fontSize: '26px', fontWeight: '500'}}>Accounts</Typography>
                </Grid>
                <Grid xs={12} mt={3} container direction="row" className="">
                    <AccountsCalendar date={currentDate} onChange={setCurrentDate}/>
                </Grid>
                <Grid xs={12} container mt={3} p={4} sx={{
                    borderRadius: globalRadius,
                    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                    background: 'white',
                    maxHeight: '60vh',
                    overflow: 'auto'
                }}>
                    {loadingWinners && (
                        <Grid container item xs={12} justifyContent="center" alignItems="center" pt={2} pb={2}>
                            <Loading type="spinner" size="lg"/>
                        </Grid>
                    )}
                    {
                        winners.length > 0 && !loadingWinners
                            ? winners.map((winner, key) => (
                                <WinnerUserRowDashboard key={key} position={key + 1} winner={winner}/>
                            ))
                            : !loadingWinners && <WinnerUserRowDashboardNoData/>
                    }
                </Grid>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
                <Grid item xs={12} container>
                    <Typography color="#343434" sx={{fontSize: '24px'}}>
                        Search account by <i>Name , Username</i>
                    </Typography>
                </Grid>
                <Grid item xs={12} mt={2} mb={2} container direction="row" justifyContent="center" alignItems="center">

                    <Grid item xs={11} sm={11} md={11} pr={2} container justifyContent="center" alignItems="center">
                        <NUIInput size="lg" status={searchKey.length >= 1 && searchKey.length <= 2 ? 'error' : ''}
                                  value={searchKey} label=" " onChange={(e) => setSearchKey(e.target.value)} fullWidth
                                  bg="default" color="red" style={{borderRadius: globalRadius}}
                                  placeholder="type here to search..." p={2}/>
                    </Grid>
                    <Grid item xs={1} sm={1} md={1} container justifyContent="center" alignItems="center">
                        <NUIButton onPress={() => searchUsers(1)} disabled={!searchable} auto
                                   className="app-bg-secondary-2 app-color-secondary-4" css={{
                            color: '#ffffff',
                            fontSize: '24px',
                            borderRadius: globalRadius,
                            '&:disabled': {color: '#d0d0d0'}
                        }} icon={<CiSearch/>}/>
                    </Grid>
                </Grid>
                <Grid item xs={12} container direction="row" sx={{maxHeight: '78vh', overflow: 'auto'}}>

                    {
                        !loading && users.length === 0
                            ? (
                                <Grid container item xs={12} justifyContent="center" alignItems="center" pt={5} pb={5}>
                                    <img src={notFound} style={{width: '40%'}} alt=""/>
                                </Grid>
                            )
                            : ''
                    }

                    {users.map((user, key) => (
                        <UserRowDashboard key={key} user={user} className="flex"/>
                    ))}

                    {loading ? (
                            <Grid container item xs={12} justifyContent="center" alignItems="center" pt={2} pb={2}>
                                <Loading type="spinner" size="lg"/>
                            </Grid>
                        )
                        : (
                            <Grid container item xs={12} justifyContent="center" alignItems="center">
                                {
                                    activelySearching
                                        ? (
                                            <>
                                                {lastSearch.length > 0 && lastSearch.length === paginationSearch.limit ? (
                                                    <NextUIButton
                                                        onPress={() => loadMoreSearch()}
                                                        style={{
                                                            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                                                            cursor: 'pointer',
                                                            background: '#ffffff',
                                                            color: '#A1A0A0',
                                                            marginBottom: '8px',
                                                            marginTop: '8px',
                                                        }}
                                                        mt={2}
                                                        mb={2}
                                                    >
                                                        See More Search Results
                                                    </NextUIButton>
                                                ) : ''}
                                            </>
                                        )
                                        : (
                                            <>
                                                {last.length > 0 && last.length === pagination.limit ? (
                                                    <NextUIButton
                                                        onPress={() => loadMore()}
                                                        style={{
                                                            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                                                            cursor: 'pointer',
                                                            background: '#ffffff',
                                                            color: '#A1A0A0',
                                                            marginBottom: '8px',
                                                            marginTop: '8px',
                                                        }}
                                                        mt={2}
                                                        mb={2}
                                                    >
                                                        See More
                                                    </NextUIButton>
                                                ) : ''}
                                            </>
                                        )
                                }
                            </Grid>
                        )}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Accounts;
