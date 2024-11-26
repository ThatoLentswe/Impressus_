import React, {useEffect, useState} from 'react';
import {Grid, Typography} from '@mui/material';
import {Button as NextUIButton, Button as NUIButton, Input as NUIInput, Loading, Table} from '@nextui-org/react';
import {BsFilter} from 'react-icons/bs';
import {IoSearchOutline} from 'react-icons/io5';
import axios from 'axios';
import toast from 'react-hot-toast';
import {useStateContext} from '../../contexts/ContextProvider';
import UseToken from '../../hooks/UseToken';
import {globalConfig} from '../../globalConfig';
import notFound from '../../data/no-data.png';
import PostRow from "./PostRow";

const AllPost = () => {
    const [posts, setPosts] = useState([]);
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

    const getPosts = async (page = nextPage) => {
        setLoading(true);
        await axios.get(`${backend}/posts?page=${page}`, {headers: {Authorization: `Bearer ${token}`}})
            .then((response) => {
                setLoading(false);
                if (isMounted) {
                    setPosts(page === 1 ? response.data.data : [...posts, ...response.data.data]);
                    setLast(response.data.data);
                    setPagination({page: response.data.page, count: response.data.count, limit: response.data.limit});
                    setNextPage(page + 1);
                } else {
                    setPosts(page === 1 ? response.data.data : [...posts, ...response.data.data]);
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

    // const searchPosts = async (page = nextPageSearch) => {
    //     setLoading(true);
    //     setSearchable(false);
    //     await axios.get(`${backend}/posts/search/post?q=${searchKey}&page=${page}`, {headers: {Authorization: `Bearer ${token}`}})
    //         .then((response) => {
    //             setLoading(false);
    //             if (isMounted) {
    //                 setPosts(page === 1 ? response.data.data : [...posts, ...response.data.data]);
    //                 setLastSearch(response.data.data);
    //                 setPaginationSearch({
    //                     page: response.data.page,
    //                     count: response.data.count,
    //                     limit: response.data.limit
    //                 });
    //                 setNextPageSearch(page + 1);
    //             } else {
    //                 setPosts(page === 1 ? response.data.data : [...posts, ...response.data.data]);
    //                 setLastSearch(response.data.data);
    //                 setPaginationSearch({
    //                     page: response.data.page,
    //                     count: response.data.count,
    //                     limit: response.data.limit
    //                 });
    //                 setNextPageSearch(page + 1);
    //             }
    //         })
    //         .catch((error) => {
    //             setLoading(false);
    //             if (axios.isCancel(error)) {
    //                 // Handle if request was cancelled
    //                 toast.error('Request canceled');
    //             } else {
    //                 toast.error('an error occurred');
    //             }
    //         });
    // };

    useEffect(() => {
        if (searchKey.length === 0) {
            setActivelySearching(false);

            getPosts(1);

            setSearchable(false);
        } else if (searchKey.length <= 2) {
            setSearchable(false);
        } else if (searchKey.length > 2) {
            setActivelySearching(true);

            setSearchable(true);
        }
    }, [searchKey]);

    useEffect(() => {
        getPosts(1);
    }, []);
    const loadMore = () => {
        getPosts();
    };
    // const loadMoreSearch = () => {
    //     searchPosts();
    // };
    return (
        <Grid container p={1} sx={{
            borderRadius: globalRadius,
            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
            background: 'white'
        }}>

            <Grid item p={2} pb={0} m={1} xs={12} sm={12} md={12} container direction="row"
                  justifyContent="space-between" alignItems="center">
                <Typography color="#343434" sx={{fontSize: '26px', fontWeight: '500'}}>All Posts</Typography>
            </Grid>
            <Grid item xs={12} container sx={{maxHeight: '55vh', overflow: 'auto'}}>

                {
                    !loading && posts.length === 0
                        ? (
                            <Grid container item xs={12} justifyContent="center" alignItems="center" pt={5} pb={5}>
                                <img src={notFound} style={{width: '40%'}} alt=""/>
                            </Grid>
                        )
                        : ''
                }
                <table className={'table'}>
                    <thead>
                    <th style={{background: '#fff'}}></th>
                    <th>VIEWS</th>
                    <th>LIKES</th>
                    <th>REPORTS</th>
                    <th>COMMENTABLE</th>
                    <th>DESCRIPTION</th>
                    <th>CREATED</th>
                    </thead>
                    <tbody>
                    {posts.map((post, key) => (
                        <PostRow mode={'detailed'} key={key} position={key} post={post}/>
                    ))}
                    </tbody>
                </table>

                {loading ? (
                        <Grid container item xs={12} justifyContent="center" alignItems="center" pt={2} pb={2}>
                            <Loading type="spinner" size="lg"/>
                        </Grid>
                    )
                    : (
                        <Grid container item xs={12} justifyContent="center" alignItems="center">
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
                        </Grid>
                    )}
            </Grid>
        </Grid>
    );
};

export default AllPost;
