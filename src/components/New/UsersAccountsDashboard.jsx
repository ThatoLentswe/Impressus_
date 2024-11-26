import React, {useEffect, useState} from 'react';
import {Grid, Typography} from '@mui/material';
import {Button as NextUIButton, Button as NUIButton, Input as NUIInput, Loading} from '@nextui-org/react';
import {BsFilter} from 'react-icons/bs';
import {IoSearchOutline} from 'react-icons/io5';
import axios from 'axios';
import toast from 'react-hot-toast';
import {useStateContext} from '../../contexts/ContextProvider';
import UserRowDashboard from './UserRowDashboard';
import UseToken from '../../hooks/UseToken';
import {globalConfig} from '../../globalConfig';
import notFound from '../../data/no-data.png';
import PostRow from "./PostRow";

const UsersAccountsDashboard = ({mode = 'detailed'}) => {
    const [users, setUsers] = useState([]);
    const {globalRadius} = useStateContext();
    const [loading, setLoading] = useState(false);
    const [activelySearching, setActivelySearching] = useState(false);
    const [pagination, setPagination] = useState({page: 0, count: 0, limit: 10});
    const [paginationSearch, setPaginationSearch] = useState({page: 0, count: 0, limit: 10});
    const [last, setLast] = useState([]);
    const [lastSearch, setLastSearch] = useState([]);
    const [nextPageSearch, setNextPageSearch] = useState(1);
    const [searchKey, setSearchKey] = useState('');
    const [nextPage, setNextPage] = useState(1);
    const [searchable, setSearchable] = useState(false);
    const [token] = UseToken();
    const {backend} = globalConfig;
    const isMounted = true;

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
        setSearchable(false);
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
            .catch((error) => {
                setLoading(false);
                if (axios.isCancel(error)) {
                    // Handle if request was cancelled
                    toast.error('Request canceled');
                } else {
                    toast.error('an error occurred');
                }
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
        getUsers(1);
    }, []);
    const loadMore = () => {
        getUsers();
    };
    const loadMoreSearch = () => {
        searchUsers();
    };
    return (
        <Grid container p={1} sx={{
            borderRadius: globalRadius,
            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
            background: 'white'
        }}>

            <Grid item p={2} pb={0} m={1} xs={12} sm={12} md={12} container direction="row"
                  justifyContent="space-between" alignItems="center">
                <Typography color="#343434" sx={{fontSize: '26px', fontWeight: '500'}}>Account / Users</Typography>
            </Grid>

            <Grid item xs={12} sm={12} md={12} container direction="row" justifyContent="center" alignItems="center">
                <Grid item xs={4}/>
                <Grid item xs={8} container>
                    <Grid item xs={10} sm={10} md={10} p={1} container justifyContent="center" alignItems="center">
                        <NUIInput status={searchKey.length >= 1 && searchKey.length <= 2 ? 'error' : ''}
                                  value={searchKey} label=" " onChange={(e) => setSearchKey(e.target.value)} size="xl"
                                  fullWidth placeholder="Search"
                                  contentLeft={<IoSearchOutline width="27" height="27" style={{color: '#afadad'}}/>}/>
                    </Grid>
                    <Grid item xs={2} sm={2} md={2} p={1} container direction="row" justifyContent="center"
                          alignItems="center">
                        <NUIButton onPress={() => searchUsers(1)} disabled={!searchable} auto fullWidth css={{
                            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                            background: '#ffffff',
                            fontSize: '24px',
                            borderRadius: '9px',
                            padding: '3px',
                            color: '#8a8a8a',
                            '&:disabled': {color: '#d0d0d0'}
                        }} icon={<BsFilter width="27" height="27"/>}/>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} container sx={{maxHeight: '75vh', overflow: 'auto'}}>

                {
                    !loading && users.length === 0
                        ? (
                            <Grid container item xs={12} justifyContent="center" alignItems="center" pt={5} pb={5}>
                                <img src={notFound} style={{width: '40%'}} alt=""/>
                            </Grid>
                        )
                        : ''
                }

                <table className={'table'}>
                    <thead>
                    <th>NAME</th>
                    <th>EMAIL</th>
                    <th>GENDER</th>
                    <th>STATUS</th>
                    <th>ADDRESS</th>
                    <th>PACKAGE</th>
                    <th>PHONE</th>
                    <th>ONLINE</th>
                    </thead>
                    <tbody>
                    {users.map((user, key) => (
                        <UserRowDashboard mode={mode} key={key} user={user}/>
                    ))}
                    </tbody>
                </table>
                {/*{users.map((user, key) => (*/}
                {/*  <UserRowDashboard key={key} user={user} />*/}
                {/*))}*/}
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
    );
};

export default UsersAccountsDashboard;
