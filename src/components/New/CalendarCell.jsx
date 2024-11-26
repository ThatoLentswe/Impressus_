import React, {useEffect, useState} from 'react';
import {Grid, Typography} from '@mui/material';
import clsx from 'clsx';
import UseToken from "../../hooks/UseToken";
import {globalConfig} from "../../globalConfig";
import axios from "axios";
import toast from "react-hot-toast";
import {BsFlagFill} from "react-icons/bs";
import {Button as NUIButton, Loading, Modal} from "@nextui-org/react";
import ReactPlayer from "react-player";
import {useStateContext} from "../../contexts/ContextProvider";
import notFound from "../../data/no-data.png";
import {RiMessage2Fill} from "react-icons/ri";
import {MdOutlineAccessTime} from "react-icons/md";
import {IoTrashOutline} from "react-icons/io5";
import {Link} from "react-router-dom";
import ReportsItem from "./ReportsItem";
import defaultAvatar from "../../data/default.png";

const CalendarCell = ({
                          flagSize = '9px',
                          year = 0,
                          month = 0,
                          day,
                          hasBackground = false,
                          className = '',
                          click,
                          isActive = false
                      }) => {


    const [visible, setVisible] = useState(false);
    const {globalRadius, setTodayWinnersDate} = useStateContext();
    const openHandler = () => setVisible(true);
    const avatar = defaultAvatar;

    const closeHandler = () => {
        setVisible(false);
    };

    const [star, setStar] = useState(null);
    const [suspended, setSuspended] = useState(false);
    const [userAvatar, setUserAvatar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [token] = UseToken();
    const {backend} = globalConfig;
    const isMounted = true;


    const getStar = async () => {
        setLoading(true);
        await axios.get(`${backend}/posts/stars/posts/byDate?year=${year}&month=${month}&day=${day}`, {headers: {Authorization: `Bearer ${token}`}})
            .then((response) => {
                setLoading(false);
                if (isMounted) {
                    setStar(response.data.data);
                    setSuspended(Number(response.data.data.userData.status) === 2);

                    if (response.data.data.userData.pictures) {
                        if (response.data.data.userData.pictures['0']) {
                            setUserAvatar(response.data.data.userData.pictures['0']);
                        }
                        if (response.data.data.userData.pictures && !response.data.data.userData.pictures['0']) {
                            if (response.data.data.userData.pictures['1']) {
                                setUserAvatar(response.data.data.userData.pictures['1']);
                            }
                        }
                    }
                } else {
                    setStar(response.data.data);
                    setSuspended(Number(response.data.data.userData.status) === 2);

                    if (response.data.data.userData.pictures) {
                        if (response.data.data.userData.pictures['0']) {
                            setUserAvatar(response.data.data.userData.pictures['0']);
                        }
                        if (response.data.data.userData.pictures && !response.data.data.userData.pictures['0']) {
                            if (response.data.data.userData.pictures['1']) {
                                setUserAvatar(response.data.data.userData.pictures['1']);
                            }
                        }
                    }
                }
            })
            .catch(() => {
                setLoading(false);
                // toast.error('an error occurred');
            });
    };


    useEffect(() => {
        if (Number(day)) {
            setStar(null);
            getStar();
        }
    }, [day, month, year]);


    const cStyles = hasBackground ? {
        border: isActive ? '2px solid #EF3D5B' : '1px solid #EAEBEC',
        borderRadius: '50%',
        backgroundImage: `url(${star ? userAvatar || avatar : ''})`,
        background: '#343434',
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        color: '#ffffff',
        cursor: 'pointer',
        position: 'relative'
    } : {
        cursor: 'pointer',
    };


    const [loadingSuspended, setLoadingSuspended] = useState(false);
    const changeStatus = async (status) => {
        setLoadingSuspended(true);
        toast.dismiss();
        await axios.put(`${backend}/users/${star.userId}/status`, {status}, {headers: {Authorization: `Bearer ${token}`}})
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
    return (
        <>
            <Grid onClick={() => {
                hasBackground ? click() : undefined
                star && openHandler()
                setTodayWinnersDate(`${year}-${month}-${day}`)
            }}
                  className={clsx('h-10 w-10 m-1 flex items-center justify-center', className)} style={cStyles}>
                {day}
                {loading && (
                    <Loading type="spinner" size="sm"
                             color="white" textColor="white"
                             css={{
                                 position: 'absolute',
                                 bottom: '0px',
                             }}/>)}
                {/*{star && (*/}
                {/*    <BsFlagFill*/}
                {/*        style={{position: 'absolute', bottom: '0px', fontSize: flagSize, color: '#ffffff'}}/>)}*/}
            </Grid>


            <Modal width="650px" blur aria-labelledby="modal-title" open={visible}
                   onClose={closeHandler}>
                <Modal.Body>
                    {
                        !loading && star === null
                            ? (
                                <Grid container item xs={12} justifyContent="center" alignItems="center" pt={5} pb={5}>
                                    <img src={notFound} style={{width: '40%'}} alt=""/>
                                </Grid>
                            )
                            : ''
                    }
                    {
                        loading ? (
                                <Grid container item xs={12} justifyContent="center" alignItems="center" pt={2} pb={2}>
                                    <Loading type="spinner" size="lg"/>
                                </Grid>
                            )
                            : (
                                <>
                                    {
                                        star !== null ? (
                                                <Grid container direction="row">
                                                    <Grid item xs={7} p={2}>
                                                        <ReactPlayer url={star ? star.postUrl : ''} controls style={{
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
                                                            star && (
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
                                                                                        changeStatus(0);
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
                                                                    <NUIButton as={Link} to={`/accounts/${star.userId}`} auto
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
                                                </Grid>
                                            )
                                            : ''
                                    }
                                </>
                            )
                    }

                </Modal.Body>
            </Modal>
        </>
    )

};

export default CalendarCell;
