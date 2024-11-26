import React, {useEffect, useState} from 'react';
import {Grid, Typography} from '@mui/material';
import axios from 'axios';
import toast from 'react-hot-toast';
import {Button as NUIButton, Loading, Modal, Text, Tooltip} from '@nextui-org/react';
import {RiMessage2Fill} from 'react-icons/ri';
import {MdOutlineAccessTime} from 'react-icons/md';
import {IoTrashOutline} from 'react-icons/io5';
import ReactPlayer from 'react-player';
import {FaFlag} from 'react-icons/fa';
import {Link} from 'react-router-dom';
import {useStateContext} from '../../contexts/ContextProvider';
import UseToken from '../../hooks/UseToken';
import {globalConfig} from '../../globalConfig';
import notFound from '../../data/no-data.png';
import ReportsItem from './ReportsItem';
import defaultAvatar from "../../data/default.png";
import {DateTime} from "luxon";

const ContentModerationVideoItem = ({post}) => {
    const {globalRadius} = useStateContext();

    const [visible, setVisible] = useState(false);
    const handler = () => setVisible(true);

    const closeHandler = () => {
        setVisible(false);
    };
    const [reports, setReports] = useState([]);
    const [loadingPost, setLoadingPost] = useState(false);
    const {backend} = globalConfig;
    const [token] = UseToken();
    const isMounted = true;

    const getReports = async (postID) => {
        setLoadingPost(true);
        await axios.get(`${backend}/reports/post/${postID}`, {headers: {Authorization: `Bearer ${token}`}})
            .then((response) => {
                setLoadingPost(false);
                if (isMounted) {
                    setReports(response.data.data);
                } else {
                    setReports(response.data.data);
                }
            })
            .catch(() => {
                setLoadingPost(false);
                toast.error('an error occurred fetching post');
            });
    };


    const avatar = defaultAvatar;
    const [user, setUser] = useState(null);
    const [userAvatar, setUserAvatar] = useState(null);
    const [loadingUser, setLoadingUser] = useState(false);
    const [suspended, setSuspended] = useState(false);
    const getUser = async () => {
        setLoadingUser(true);
        await axios.get(`${backend}/users/${post.userId}`, {headers: {Authorization: `Bearer ${token}`}})
            .then((response) => {
                setLoadingUser(false);
                if (isMounted) {
                    setSuspended(response.data.data.status == '1');
                    setUser(response.data.data);
                } else {
                    setUser(response.data.data);
                    setSuspended(response.data.data.status == '1');
                }
            })
            .catch(() => {
                setLoadingUser(false);
                toast.error('an error occurred');
            });
    };


    const [loadingSuspended, setLoadingSuspended] = useState(false);
    const changeStatus = async (status) => {
        setLoadingSuspended(true);
        toast.dismiss();
        await axios.put(`${backend}/users/${user.id}/status`, {status}, {headers: {Authorization: `Bearer ${token}`}})
            .then(() => {
                setLoadingSuspended(false);

                if (isMounted) {
                    setSuspended(status == '1');
                    toast.success('operational successful');
                } else {
                    setSuspended(status == '1');
                    toast.success('operational successful');
                }

            })
            .catch((error) => {
                toast.dismiss();
                setLoadingSuspended(false);

                if (error.response) {
                    if (error.response.status === 401) {
                        toast.error('an error occurred');
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

    useEffect(() => {
        getReports(post.id);
        getUser()
    }, []);


    const [deletePostLoading, setDeletePostLoading] = useState(false);
    const [postDeleted, setPostDeleted] = useState(false);
    const deletePost = async () => {
        setDeletePostLoading(true);
        await axios.delete(`${backend}/posts/${post.id}`, {headers: {Authorization: `Bearer ${token}`}})
            .then((response) => {
                setDeletePostLoading(false);
                if (isMounted) {
                    setPostDeleted(true)
                    toast.success('post deleted')
                } else {
                    setPostDeleted(true)
                    toast.success('post deleted')
                }
            })
            .catch(() => {
                setDeletePostLoading(false);
                toast.error('an error occurred when deleting post');
            });
    };


    const formatDate = (date) => {
        if (!Number(date)) {
            return date
        } else {
            try {
                const valid = DateTime.fromSeconds(date).isValid;
                if (!valid) {
                    return '---';
                }
                const newDate = DateTime.fromSeconds(date);
                const isToday = newDate.hasSame(DateTime.local(), 'day');

                if (isToday) {
                    return newDate.toLocaleString(DateTime.TIME_SIMPLE);
                }
                return newDate.toLocaleString(DateTime.DATE_MED);
            } catch (e) {
                setIsError({status: 'error', message: 'time conversion error'});
                return '';
            }
        }
    };
    return (
        <Grid item xs={12} sm={6} container direction={'row'}>
            <Grid
                xs={4}
                sx={{
                    borderRadius: globalRadius,
                    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                    background: '#E9E9E9',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    cursor: 'pointer',
                    border: reports.length > 0 ? '2px solid #EF3D5B' : ''
                }}
                mb={3}
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                onClick={() => setTimeout(() => {
                    handler();
                }, 200)}>
                {!loadingPost && !post ? (
                        <Grid container item xs={12} justifyContent="center" alignItems="center" pt={5} pb={5}>
                            <img src={notFound} style={{width: '40%'}} alt=""/>
                        </Grid>
                    )
                    : ''}
                {loadingPost && (
                    <Grid container item xs={12} justifyContent="center" alignItems="center" pt={2} pb={2}>
                        <Loading type="spinner" size="lg"/>
                    </Grid>
                )}
                {!loadingPost && post ? (
                    <ReactPlayer url={post.url}
                                 style={{borderRadius: globalRadius, maxHeight: '220px', maxWidth: '100%',}}/>
                ) : ''}
            </Grid>

            <Grid item xs={8} p={3} container direction={'row'}>
                {
                    user && (
                        <Grid item xs={12}>
                            <Typography style={{fontWeight: '700'}}>
                                User Details
                            </Typography>

                            name: {user.name || user.userName} <br/>
                            email: {user.email}
                        </Grid>
                    )
                }

                {
                    post && (
                        <Grid item xs={12}>
                            <Typography style={{fontWeight: '700'}}>
                                Post Details
                            </Typography>

                            reports: {reports.length} <br/>
                            date: {formatDate(post.date._seconds)} <br/>
                            comments allowed: {post.allowComments ? 'yes' : 'no'} <br/>
                        </Grid>
                    )
                }
            </Grid>
            <Modal blur closeButton width="650px" aria-labelledby="modal-title" open={visible} onClose={closeHandler}>
                <Modal.Header>
                    <Text id="modal-title" size={18}>
                        {/* Header here */}
                    </Text>
                </Modal.Header>
                <Modal.Body>
                    {
                        !loadingPost && post === null
                            ? (
                                <Grid container item xs={12} justifyContent="center" alignItems="center" pt={5} pb={5}>
                                    <img src={notFound} style={{width: '40%'}} alt=""/>
                                </Grid>
                            )
                            : ''
                    }
                    {
                        loadingPost ? (
                                <Grid container item xs={12} justifyContent="center" alignItems="center" pt={2} pb={2}>
                                    <Loading type="spinner" size="lg"/>
                                </Grid>
                            )
                            : (
                                <>
                                    {
                                        post !== null ? (
                                                <Grid container direction="row">
                                                    <Grid item xs={7} p={2}>
                                                        <ReactPlayer url={post.url} controls style={{
                                                            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                                                            borderRadius: globalRadius,
                                                            maxWidth: '100%',
                                                            maxHeight: '70vh',
                                                            overflow: 'hidden'
                                                        }}/>
                                                    </Grid>
                                                    <Grid item xs={5} p={2} container direction="column" justifyContent="center"
                                                          alignItems="center">
                                                        {
                                                            reports.length > 0 && (
                                                                <Typography sx={{fontSize: '20px'}} mb={2}>
                                                                    This video has been reported <span
                                                                    style={{fontWeight: '700'}}>{reports.length}</span> times.
                                                                </Typography>
                                                            )
                                                        }
                                                        {
                                                            user && (
                                                                <>
                                                                    {
                                                                        suspended
                                                                            ? (
                                                                                <NUIButton
                                                                                    auto
                                                                                    className="app-bg-secondary-2 app-color-secondary-4"
                                                                                    css={{
                                                                                        borderRadius: '9px',
                                                                                        marginBottom: '10px',
                                                                                        width: '100%'
                                                                                    }}
                                                                                    icon={!loadingSuspended && <MdOutlineAccessTime
                                                                                        style={{color: '#2A92BF'}}/>}
                                                                                    onClick={() => {
                                                                                        changeStatus('0');
                                                                                    }}
                                                                                >
                                                                                    {loadingSuspended &&
                                                                                    <Loading color="currentColor" size="sm"/>}
                                                                                    {!loadingSuspended && 'UnSuspend'}
                                                                                </NUIButton>
                                                                            )
                                                                            : (
                                                                                <NUIButton
                                                                                    auto
                                                                                    className="app-bg-secondary-2 app-color-secondary-4"
                                                                                    css={{
                                                                                        borderRadius: '9px',
                                                                                        marginBottom: '10px',
                                                                                        width: '100%'
                                                                                    }}
                                                                                    icon={!loadingSuspended && <MdOutlineAccessTime
                                                                                        style={{color: '#2A92BF'}}/>}
                                                                                    onClick={() => {
                                                                                        changeStatus('1');
                                                                                    }}
                                                                                >
                                                                                    {loadingSuspended &&
                                                                                    <Loading color="currentColor" size="sm"/>}
                                                                                    {!loadingSuspended && 'Suspend'}
                                                                                </NUIButton>
                                                                            )
                                                                    }
                                                                    <NUIButton as={Tooltip} content={"delete post"} auto
                                                                               disabled={deletePostLoading || postDeleted}
                                                                               onClick={() => {
                                                                                   if (post) {
                                                                                       deletePost();
                                                                                   } else {
                                                                                       toast.dismiss()
                                                                                       toast.error('post data not available')
                                                                                   }
                                                                               }}
                                                                               className="app-bg-secondary-2 app-color-secondary-4"
                                                                               css={{
                                                                                   borderRadius: '9px',
                                                                                   marginBottom: '10px',
                                                                                   width: '100%',
                                                                                   opacity: postDeleted ? '0.3' : '1'
                                                                               }} icon={!deletePostLoading &&
                                                                    <IoTrashOutline
                                                                        style={{color: '#FB3958'}}/>}>
                                                                        {
                                                                            deletePostLoading ? (
                                                                                    <Loading type="spinner" size="lg"/>) :
                                                                                postDeleted ? 'Post Deleted' : 'Delete Post'
                                                                        }
                                                                    </NUIButton>
                                                                    <NUIButton as={Link} to={`/accounts/${post.userId}`} auto
                                                                               className="bg-gradient" css={{
                                                                        color: '#ffffff',
                                                                        borderRadius: '9px',
                                                                        marginBottom: '10px',
                                                                        width: '100%'
                                                                    }}>
                                                                        View Profile
                                                                    </NUIButton>
                                                                </>
                                                            )
                                                        }
                                                    </Grid>
                                                    <Grid item xs={12} p={2}>
                                                        {reports && reports.map((report, key) => (
                                                            <ReportsItem report={report} key={key}/>
                                                        ))}
                                                    </Grid>
                                                </Grid>
                                            )
                                            : ''
                                    }
                                </>
                            )
                    }

                </Modal.Body>
                <Modal.Footer>
                    {/* footer here */}
                </Modal.Footer>
            </Modal>
        </Grid>
    );
};

export default ContentModerationVideoItem;
