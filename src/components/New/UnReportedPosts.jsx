import React, {useEffect, useState} from 'react';
import {Grid, Pagination, PaginationItem, Typography} from '@mui/material';
import {Button as NextUIButton, Loading} from '@nextui-org/react';
import axios from 'axios';
import toast from 'react-hot-toast';
import notFound from '../../data/no-data.png';
import ContentModerationVideoItem from './ContentModerationVideoItem';
import UseToken from '../../hooks/UseToken';
import {globalConfig} from '../../globalConfig';
import {useStateContext} from '../../contexts/ContextProvider';

const UnReportedPosts = () => {
    const {globalRadius} = useStateContext();
    const [posts, setPosts] = useState([]);
    const [postsPagination, setPostsPagination] = useState({
        page: 0,
        count: 0,
        limit: 10,
        pages: 1,
        nextPage: null,
        prevPage: null,
        currentPage: 1
    });
    const [loadingPosts, setLoadingPosts] = useState(false);
    const [lastPosts, setLastPosts] = useState([]);
    const [postsPage, setPostsPage] = useState(1);
    const [token] = UseToken();
    const {backend} = globalConfig;
    const isMounted = true;

    const getPosts = async (page = postsPage) => {
        setLoadingPosts(true);
        await axios.get(`${backend}/posts/notreports/posts?page=${page}`, {headers: {Authorization: `Bearer ${token}`}})
            .then((response) => {
                setLoadingPosts(false);
                if (isMounted) {
                    setPosts(response.data.data);
                    setLastPosts(response.data.data);
                    setPostsPagination({
                        page: response.data.page,
                        count: response.data.count,
                        limit: response.data.limit,
                        pages: response.data.pages,
                        nextPage: response.data.nextPage,
                        prevPage: response.data.prevPage,
                        currentPage: response.data.currentPage,
                    });
                } else {
                    setPosts(response.data.data);
                    setLastPosts(response.data.data);
                    setPostsPagination({
                        page: response.data.page,
                        count: response.data.count,
                        limit: response.data.limit,
                        pages: response.data.pages,
                        nextPage: response.data.nextPage,
                        prevPage: response.data.prevPage,
                        currentPage: response.data.currentPage,
                    });
                }
            })
            .catch(() => {
                setLoadingPosts(false);
                toast.error('an error occurred');
            });
    };

    const loadMorePosts = () => {
        getPosts(1);
    };

    useEffect(() => {
        setPosts([]);
        setPostsPage(1);
        setLastPosts([]);
        setPostsPagination({page: 0, count: 0, limit: 10});
        getPosts(postsPage);
    }, []);

    useEffect(() => {
        getPosts(postsPage)
        // alert('changes to ' + postsPage)
    }, [postsPage]);

    const changePageFromPagination = (event, value) => {
        setPostsPage(value);
    };

    return (
        <Grid container className p={2}>
            <Grid p={3} pt={0} xs={12} sx={{
                borderRadius: globalRadius,
                boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                background: 'white',
                maxHeight: '65vh',
                overflow: 'auto'
            }} container justifyContent="flex-start" alignItems="center">

                <Grid item p={2} m={1} xs={12} sm={12} md={12} container direction="row" justifyContent="space-between"
                      alignItems="center">
                    <Typography color="#343434" sx={{fontSize: '26px', fontWeight: '500'}}>UnReported
                        Videos</Typography>
                </Grid>

                {
                    !loadingPosts && posts.length === 0
                        ? (
                            <Grid container item xs={12} justifyContent="center" alignItems="center" pt={5} pb={5}>
                                <img src={notFound} style={{width: '40%'}} alt=""/>
                            </Grid>
                        )
                        : ''
                }

                {
                    posts.map((post, key) => (<ContentModerationVideoItem key={key} post={post}/>))
                }

                {loadingPosts && (
                    <Grid container item xs={12} justifyContent="center" alignItems="center" pt={2} pb={2}>
                        <Loading type="spinner" size="lg"/>
                    </Grid>
                )}
                <Grid container item xs={12} justifyContent="center" alignItems="center">
                    <Pagination count={postsPagination.pages || 1} page={postsPage}
                                onChange={changePageFromPagination}/>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default UnReportedPosts;
