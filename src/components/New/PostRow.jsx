import React, {useEffect, useState} from 'react';
import {Button as NextUIButton, Loading, Modal, Table, Text} from '@nextui-org/react';
import {useStateContext} from '../../contexts/ContextProvider';
import ReactPlayer from "react-player";
import {Grid, Typography} from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";
import {globalConfig} from "../../globalConfig";
import UseToken from "../../hooks/UseToken";
import {IoIosEye} from "react-icons/io";
import {FaHeart} from "react-icons/fa";
import {MdReportProblem} from "react-icons/md";
import {DateTime} from "luxon";

const PostRow = ({mode, post, xs = 12, sm = 12, md = 12, position}) => {
    // mode id detailed or detailed
    const {globalRadius} = useStateContext();

    const [visible, setVisible] = React.useState(false);
    const handler = () => setVisible(true);

    const closeHandler = () => {
        setVisible(false);
    };

    // {
    //     "id": "672e8f86-1840-439b-ba6b-8531bae839ba",
    //     "allowComments": true,
    //     "audioUrl": "",
    //     "likeMap": null,
    //     "audioId": null,
    //     "description": "",
    //     "allowDuet": true,
    //     "userName": "Keo Jerry",
    //     "userId": "5giDJrFuVXbbxM6d4zQljjngVV13",
    //     "url": "https://res.cloudinary.com/dfutsbeis/video/upload/v1680442140/impressUs/hhm6ukoqgo1yld3mdnl0.mp4",
    //     "date": {
    //     "_seconds": 1680040799,
    //         "_nanoseconds": 92000000
    // },
    //     "likes": 18,
    //     "views": 7
    // }


    const [reports, setReports] = useState([]);
    const [loadingReports, setLoadingReports] = useState(false);
    const {backend} = globalConfig;
    const [token] = UseToken();
    const isMounted = true;

    const getReports = async () => {
        setLoadingReports(true);
        await axios.get(`${backend}/reports/post/${post.id}`, {headers: {Authorization: `Bearer ${token}`}})
            .then((response) => {
                setLoadingReports(false);
                if (isMounted) {
                    setReports(response.data.data);
                } else {
                    setReports(response.data.data);
                }
            })
            .catch(() => {
                setLoadingReports(false);
                toast.error('an error occurred fetching reports');
            });
    };

    const [isError, setIsError] = useState({status: null, message: null});

    const formatDate = (date) => {
        if (Number(date)) {
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

    useEffect(() => {
        getReports();
    }, []);
    return (
        <>

            {isError.status === 'error'
                ? (
                    <tr>
                        <td>
                            <Typography style={{color: 'red'}}>
                                Error - {JSON.stringify(isError.message)}
                            </Typography>
                        </td>
                        <td style={{textAlign: 'center', alignItems: 'center', justifyContent: 'center'}}>
                            <Typography style={{color: 'red'}}>
                                ------
                            </Typography>
                        </td>
                        <td style={{textAlign: 'center'}}>
                            <Typography style={{color: 'red'}}>
                                ------
                            </Typography>
                        </td>
                        <td style={{textAlign: 'center'}}>
                            <Typography style={{color: 'red'}}>
                                ------
                            </Typography>
                        </td>
                        <td style={{textAlign: 'center'}}>
                            <Typography style={{color: 'red'}}>
                                ------
                            </Typography>
                        </td>
                        <td style={{textAlign: 'center'}}>
                            <Typography style={{color: 'red'}}>
                                ------
                            </Typography>
                        </td>
                        <td style={{textAlign: 'center'}}>
                            <Typography style={{color: 'red'}}>
                                ------
                            </Typography>
                        </td>
                    </tr>
                )
                : (
                    <>
                        <tr>
                            <td>
                                {
                                    mode === 'detailed' ? (
                                        <ReactPlayer url={post.url} onClick={() => handler()} style={{
                                            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                                            borderRadius: globalRadius,
                                            maxWidth: '80px',
                                            maxHeight: '80px',
                                            overflow: 'hidden'
                                        }}/>
                                    ) : (
                                        <NextUIButton size={'sm'} onPress={() => handler()}>
                                            open video
                                        </NextUIButton>
                                    )
                                }
                            </td>
                            <td style={{textAlign: 'center', alignItems: 'center', justifyContent: 'center'}}>
                                <Typography>{post.views}</Typography>
                                {
                                    mode === 'detailed' && (
                                        <IoIosEye style={{
                                            color: '#0680B5',
                                            alignSelf: 'center',
                                            display: 'inline',
                                            fontSize: '25px'
                                        }}/>
                                    )
                                }
                            </td>
                            <td style={{textAlign: 'center'}}>
                                <Typography>{post.likes}</Typography>
                                {
                                    mode === 'detailed' && (
                                        <FaHeart style={{
                                            color: '#EF3D5B',
                                            alignSelf: 'center',
                                            display: 'inline',
                                            fontSize: '17px'
                                        }}/>
                                    )
                                }
                            </td>
                            <td style={{textAlign: 'center'}}>
                                {
                                    loadingReports ? (
                                            <Grid container item xs={12} justifyContent="center" alignItems="center" pt={2}
                                                  pb={2}>
                                                <Loading type="spinner" size="lg"/>
                                            </Grid>
                                        )
                                        : (
                                            <>
                                                <Typography>{reports.length}</Typography>
                                                {
                                                    mode === 'detailed' && (
                                                        <MdReportProblem style={{
                                                            color: '#EF3D5B',
                                                            alignSelf: 'center',
                                                            display: 'inline',
                                                            fontSize: '17px'
                                                        }}/>
                                                    )
                                                }
                                            </>
                                        )
                                }
                            </td>
                            <td style={{textAlign: 'center'}}>{post.allowComments ? 'yes' : 'no'}</td>
                            <td style={{textAlign: 'center'}}>
                                {post.description}
                                {!post.description &&
                                <Typography style={{fontWeight: 'normal', color: '#EF3D5B'}}>
                                    ----------
                                </Typography>}
                            </td>
                            <td style={{textAlign: 'center'}}>
                                {
                                    formatDate(post.date._seconds)
                                }
                            </td>
                        </tr>
                    </>
                )
            }

            <Modal noPadding style={{width: 'auto'}} blur open={visible} onClose={closeHandler}>
                <Modal.Body>
                    <ReactPlayer url={post.url} controls style={{
                        borderRadius: globalRadius,
                        maxWidth: '100%',
                        maxHeight: '70vh',
                        overflow: 'hidden'
                    }}/>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default PostRow;
