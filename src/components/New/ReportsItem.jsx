import React, {useEffect, useState} from 'react';
import {Grid, Typography} from '@mui/material';
import clsx from 'clsx';
import axios from 'axios';
import toast from 'react-hot-toast';
import {Avatar as NUIAvatar, Button as NUIButton, Loading, Text, Tooltip} from '@nextui-org/react';
import {DateTime} from 'luxon';
import {RiMessage2Fill} from 'react-icons/ri';
import {MdOutlineAccessTime} from 'react-icons/md';
import {IoTrashOutline} from 'react-icons/io5';
import {TiTick} from 'react-icons/ti';
import {Link, useNavigate} from 'react-router-dom';
import {useStateContext} from '../../contexts/ContextProvider';
import UseToken from '../../hooks/UseToken';
import {globalConfig} from '../../globalConfig';
import defaultAvatar from '../../data/default.png';

const ReportsItem = ({report}) => {
    const {globalRadius} = useStateContext();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const avatar = defaultAvatar;
    const [isError, setIsError] = useState({status: null, message: null});
    const [token] = UseToken();
    const {backend} = globalConfig;
    const isMounted = true;


    const [user, setUser] = useState(null);
    const [userAvatar, setUserAvatar] = useState(null);
    const [loading, setLoading] = useState(false);
    const getUser = async (id) => {
        setLoading(true);
        await axios.get(`${backend}/users/${id}`, {headers: {Authorization: `Bearer ${token}`}})
            .then((response) => {
                setLoading(false);
                if (isMounted) {
                    setUser(response.data.data);
                    setSuspended(response.data.data.status == '1')
                } else {
                    setUser(response.data.data);
                    setSuspended(response.data.data.status == '1')
                }
            })
            .catch(() => {
                setLoading(false);
                toast.error('an error occurred');
            });
    };

    const [suspended, setSuspended] = useState(false);


    const [changeStatusLoading, setChangeStatusLoading] = useState(false);
    const changeStatus = async (status) => {
        setChangeStatusLoading(true);
        toast.dismiss();
        await axios.put(`${backend}/users/${user.id}/status`, {status}, {headers: {Authorization: `Bearer ${token}`}})
            .then(() => {
                setChangeStatusLoading(false);
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
                setChangeStatusLoading(false);

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


    const [reporter, setReporter] = useState(null);
    const [reporterAvatar, setReporterAvatar] = useState(null);
    const [loadingReporter, setLoadingReporter] = useState(false);
    const getReporter = async () => {
        setLoadingReporter(true);
        console.log('getting report')
        await axios.get(`${backend}/users/${report.userId}`, {headers: {Authorization: `Bearer ${token}`}})
            .then((response) => {
                setLoadingReporter(false);
                if (isMounted) {
                    setReporter(response.data.data);
                } else {
                    setReporter(response.data.data);
                }
            })
            .catch(() => {
                setLoadingReporter(false);
                toast.error('an error occurred');
            });
    };


    const [post, setPost] = useState(null);
    const [loadingPost, setLoadingPost] = useState(false);
    const getPost = async () => {
        setLoading(true);
        await axios.get(`${backend}/posts/${report.videoId}`, {headers: {Authorization: `Bearer ${token}`}})
            .then((response) => {
                setLoading(false);
                if (isMounted) {
                    setUser(response.data.data);
                    getUser(response.data.data.userId)
                } else {
                    setUser(response.data.data);
                    getUser(response.data.data.userId)
                }
            })
            .catch(() => {
                setLoading(false);
                toast.error('an error occurred');
            });
    };


    const [deletePostLoading, setDeletePostLoading] = useState(false);
    const [postDeleted, setPostDeleted] = useState(false);
    const deletePost = async () => {
        setDeletePostLoading(true);
        await axios.delete(`${backend}/posts/${report.videoId}`, {headers: {Authorization: `Bearer ${token}`}})
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
                toast.error('an error occurred');
            });
    };


    const [deleteReportLoading, setDeleteReportLoading] = useState(false);
    const [reportDeleted, setReportDeleted] = useState(false);
    const deleteReport = async () => {
        setDeleteReportLoading(true);
        await axios.delete(`${backend}/reports/${report.id}`, {headers: {Authorization: `Bearer ${token}`}})
            .then((response) => {
                setDeleteReportLoading(false);
                if (isMounted) {
                    setReportDeleted(true)
                    toast.success('report deleted')
                } else {
                    setReportDeleted(true)
                    toast.success('report deleted')
                }
            })
            .catch(() => {
                setDeleteReportLoading(false);
                toast.error('an error occurred');
            });
    };

    useEffect(() => {
        if (user) {
            if (user.pictures) {
                if (user.pictures['0']) {
                    setUserAvatar(user.pictures['0']);
                }
                if (user.pictures && !user.pictures['0']) {
                    if (user.pictures['1']) {
                        setUserAvatar(user.pictures['1']);
                    }
                }
            }
        }
    }, [user]);

    useEffect(() => {
        if (reporter) {
            if (reporter.pictures) {
                if (reporter.pictures['0']) {
                    setReporterAvatar(reporter.pictures['0']);
                }
                if (reporter.pictures && !reporter.pictures['0']) {
                    if (reporter.pictures['1']) {
                        setReporterAvatar(reporter.pictures['1']);
                    }
                }
            }
        }
    }, [reporter]);

    useEffect(() => {
        getReporter();
        getPost();
    }, []);

    const formatDate = (date) => {
        if (Number(date)) {
            return date
        } else {
            try {
                const valid = DateTime.fromISO(date).isValid;
                if (!valid) {
                    return '---';
                }
                const newDate = DateTime.fromISO(date);
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

        <Grid container xs={12} mb={2} sm={12} p={2} sx={{
            borderRadius: globalRadius,
            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
            background: 'white'
        }}>
            <Grid container>
                {isError.status === 'error'
                    ? (
                        <Grid>
                            <Typography style={{color: 'red'}}>
                                {isError.message}
                            </Typography>
                        </Grid>
                    )
                    : (
                        <>
                            {
                                loading ? (<Loading type="spinner" size="lg"/>) : ''
                            }
                            {
                                !loading && (
                                    <>
                                        {
                                            user ? (
                                                <Grid item container xs={9} direction="row" justifyContent="flex-start"
                                                      alignItems="center" onClick={() => setOpen(!open)}
                                                      style={{cursor: 'pointer'}}>
                                                    <NUIAvatar size="lg" css={{border: '.5px solid #EAEBEC'}}
                                                               src={userAvatar || avatar}/>
                                                    <Grid pl={1}>
                                                        <Typography
                                                            sx={{
                                                                fontWeight: '600',
                                                                fontSize: '20px'
                                                            }}>{user.name}</Typography>
                                                    </Grid>
                                                    <Grid pl={1} onClick={() => setOpen(!open)}
                                                          style={{cursor: 'pointer'}}>
                                                        <Typography sx={{
                                                            fontSize: '13px',
                                                            color: '#5FACCE',
                                                            borderRadius: '50px',
                                                            background: '#F0F4F7',
                                                            padding: '5px 20px'
                                                        }}>
                                                            Account Verification
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            ) : (
                                                <Grid item container xs={9} direction="row" justifyContent="flex-start"
                                                      alignItems="center" onClick={() => setOpen(!open)}
                                                      style={{cursor: 'pointer'}}>
                                                    <NUIAvatar size="lg" css={{border: '.5px solid #EAEBEC'}}
                                                               src={avatar}/>
                                                    <Grid pl={1}>
                                                        <Typography
                                                            sx={{fontWeight: '600', fontSize: '20px'}}>
                                                            {
                                                                !post && !loading ?
                                                                    (
                                                                        <div style={{
                                                                            color: '#DF5656',
                                                                            fontSize: '14px'
                                                                        }}>
                                                                            post not found
                                                                        </div>
                                                                    ) :
                                                                    !user ?
                                                                        (
                                                                            <div style={{
                                                                                color: '#DF5656',
                                                                                fontSize: '14px'
                                                                            }}>
                                                                                user not found
                                                                            </div>
                                                                        ) :
                                                                        user.name
                                                            }
                                                        </Typography>
                                                    </Grid>
                                                    <Grid pl={1} onClick={() => setOpen(!open)}
                                                          style={{cursor: 'pointer'}}>
                                                        <Typography sx={{
                                                            fontSize: '13px',
                                                            color: '#5FACCE',
                                                            borderRadius: '50px',
                                                            background: '#F0F4F7',
                                                            padding: '5px 20px'
                                                        }}>

                                                            {!user ?
                                                                (
                                                                    <div style={{
                                                                        color: '#DF5656',
                                                                        fontSize: '14px'
                                                                    }}>
                                                                        -----
                                                                    </div>
                                                                ) : 'Account Verification'
                                                            }
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            )
                                        }
                                    </>
                                )
                            }

                            {
                                !loading && (
                                    <Grid item container xs={3} direction="row" justifyContent="flex-end"
                                          alignItems="center">
                                        {formatDate(report.date)}
                                    </Grid>
                                )
                            }
                            {
                                open && (
                                    <Grid item container xs={12} mt={3}>
                                        <Grid item container xs={12} p={1} pt={2}>
                                            <Typography style={{fontSize: '15px', color: '#A1A0A0'}}>
                                                {user ? suspended ?
                                                    'The following Account has been temporarily suspended'
                                                    : 'Account is not suspended' : 'user not found'}</Typography>
                                        </Grid>
                                        <Grid item container xs={4} p={1} pt={2} direction="row"
                                              justifyContent="flex-start" alignItems="center">
                                            {
                                                user && <Text as={Link} to={`/accounts/${user.id}`}
                                                              style={{textDecoration: 'underline', cursor: 'pointer'}}>
                                                    view profile
                                                </Text>
                                            }
                                        </Grid>
                                        <Grid item container xs={8} p={1} pt={2} justifyContent="flex-end"
                                              alignItems="center">
                                            <Tooltip content={'delete report'}>
                                                <NUIButton auto className="app-bg-secondary-2 app-color-secondary-4"
                                                           onClick={() => deleteReport()}
                                                           disabled={deleteReportLoading || reportDeleted}
                                                           css={{
                                                               borderRadius: '50px',
                                                               marginBottom: '10px',
                                                               marginRight: '25px',
                                                               padding: '5px 30px',
                                                               opacity: reportDeleted ? '0.4' : '1'
                                                           }}>


                                                    {
                                                        deleteReportLoading ? (<Loading type="spinner" size="lg"/>) :
                                                            <TiTick style={{color: '#39CD65', fontSize: '23px'}}/>
                                                    }
                                                </NUIButton>
                                            </Tooltip>

                                            <Tooltip
                                                content={suspended ? 'unsuspend post owner' : 'suspend post owner'}>
                                                <NUIButton auto
                                                           onClick={() => {
                                                               if (user) {
                                                                   changeStatus(suspended ? '0' : '1');
                                                               } else {
                                                                   toast.dismiss()
                                                                   toast.error('user data not available')
                                                               }
                                                           }}
                                                           disabled={changeStatusLoading}
                                                           className="app-bg-secondary-2"
                                                           css={{
                                                               borderRadius: '50px',
                                                               marginBottom: '10px',
                                                               marginRight: '25px',
                                                               padding: '5px 30px',
                                                           }}>

                                                    {
                                                        changeStatusLoading ? (<Loading type="spinner" size="lg"/>) :
                                                            <MdOutlineAccessTime
                                                                style={{
                                                                    color: suspended ? '#6C0F13' : '#2A92BF',
                                                                    fontSize: '23px'
                                                                }}/>
                                                    }
                                                </NUIButton>
                                            </Tooltip>

                                            <Tooltip content={"delete post"}>
                                                <NUIButton auto disabled={deletePostLoading || postDeleted}
                                                           className="app-bg-secondary-2 app-color-secondary-4"
                                                           onClick={() => {
                                                               if (report) {
                                                                   deletePost();
                                                               } else {
                                                                   toast.dismiss()
                                                                   toast.error('report data not available')
                                                               }
                                                           }}
                                                           css={{
                                                               borderRadius: '50px',
                                                               marginBottom: '10px',
                                                               padding: '5px 30px',
                                                               opacity: postDeleted ? '0.4' : '1'
                                                           }}>

                                                    {
                                                        deletePostLoading ? (<Loading type="spinner" size="lg"/>) :
                                                            <IoTrashOutline
                                                                style={{color: '#FB3958', fontSize: '23px'}}/>
                                                    }
                                                </NUIButton>
                                            </Tooltip>
                                        </Grid>
                                    </Grid>
                                )
                            }
                        </>
                    )}
            </Grid>
        </Grid>

    );
};

export default ReportsItem;
