import React, {useEffect, useState} from 'react';
import {Avatar as NUIAvatar, Button as NextUIButton, Loading, Modal, Table, Text} from '@nextui-org/react';
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
import defaultAvatar from "../../data/default.png";

const PaymentRecordRow = ({mode = 'detailed', payment}) => {
    // mode id detailed or detailed
    const {globalRadius} = useStateContext();

    const [visible, setVisible] = React.useState(false);
    const handler = () => setVisible(true);

    const closeHandler = () => {
        setVisible(false);
    };


    const [user, setUser] = useState([]);
    const avatar = defaultAvatar;
    const [loadingUser, setLoadingUser] = useState(false);
    const [userAvatar, setUserAvatar] = useState(null);
    const {backend} = globalConfig;
    const [token] = UseToken();
    const isMounted = true;

    const getUser = async () => {
        setLoadingUser(true);
        await axios.get(`${backend}/users/${payment.REFERENCE}`, {headers: {Authorization: `Bearer ${token}`}})
            .then((response) => {
                setLoadingUser(false);
                if (isMounted) {
                    setUser(response.data.data);
                    if (response.data.data) {
                        if (response.data.data.pictures) {
                            if (response.data.data.pictures['0']) {
                                setUserAvatar(response.data.data.pictures['0']);
                            }
                            if (response.data.data.pictures && !response.data.data.pictures['0']) {
                                if (response.data.data.pictures['1']) {
                                    setUserAvatar(response.data.data.pictures['1']);
                                }
                            }
                        }
                    }
                } else {
                    setUser(response.data.data);
                    if (response.data.data) {
                        if (response.data.data.pictures) {
                            if (response.data.data.pictures['0']) {
                                setUserAvatar(response.data.data.pictures['0']);
                            }
                            if (response.data.data.pictures && !response.data.data.pictures['0']) {
                                if (response.data.data.pictures['1']) {
                                    setUserAvatar(response.data.data.pictures['1']);
                                }
                            }
                        }
                    }
                }
            })
            .catch(() => {
                setLoadingUser(false);
                toast.error('an error occurred fetching users');
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
        getUser();
    }, []);
    return (
        <>
            {isError.status === 'error'
                ? (
                    <tr>
                        <td style={{textAlign: 'center'}}>
                            <Typography style={{color: 'red'}}>
                                Error - {JSON.stringify(isError.message)}
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

                        {/*<th>CURRENCY</th>*/}
                        {/*<th>PACKAGE</th>*/}
                        {/*<th>TRANSACTION STATUS</th>*/}
                        {/*<th>AMOUNT</th>*/}
                        {/*<th>RESULT DESCRIPTION</th>*/}
                        {/*<th>PAY METHOD</th>*/}
                        {/*<th>EXPIRY</th>*/}
                        {/*<th>DATE</th>*/}

                        <tr>
                            <td style={{textAlign: 'center'}}>
                                {
                                    user &&
                                    <Grid container direction="column" justifyContent="flex-start" alignItems="center">
                                        {
                                            mode === 'detailed' &&
                                            <NUIAvatar size="lg" css={{border: '.5px solid #EAEBEC'}} src={avatar}/>
                                        }
                                        <Grid pl={1}>
                                            <Typography
                                                sx={{fontWeight: '600', fontSize: '15px'}}>{user.names}</Typography>
                                            <Typography sx={{fontSize: '12px'}}>{user.email}</Typography>
                                        </Grid>
                                    </Grid>
                                }
                            </td>
                            <td style={{textAlign: 'center'}}>
                                {
                                    user ? user.stageName || user.name : '----'
                                }
                            </td>
                            <td style={{textAlign: 'center', alignItems: 'center', justifyContent: 'center'}}>
                                {
                                    payment.package
                                }
                            </td>
                            <td style={{textAlign: 'center', alignItems: 'center', justifyContent: 'center'}}>
                                {
                                    payment.package
                                }
                            </td>
                            <td style={{textAlign: 'center'}}>
                                {
                                    payment.TRANSACTION_STATUS
                                }
                            </td>
                            <td style={{textAlign: 'center'}}>
                                {
                                    payment.AMOUNT
                                }
                            </td>
                            <td style={{textAlign: 'center'}}>
                                {
                                    payment.RESULT_DESC
                                }
                            </td>
                            <td style={{textAlign: 'center'}}>
                                {
                                    payment.PAY_METHOD
                                }
                            </td>
                            <td style={{textAlign: 'center'}}>
                                {

                                    payment.SUB_EXPIRY_DATE && formatDate(payment.SUB_EXPIRY_DATE._seconds)
                                }
                            </td>
                            <td style={{textAlign: 'center'}}>
                                {
                                    payment.DATE && formatDate(payment.DATE._seconds)
                                }
                            </td>
                        </tr>
                    </>
                )
            }

            {/*<Modal noPadding style={{width: 'auto'}} blur open={visible} onClose={closeHandler}>*/}
            {/*    <Modal.Body>*/}
            {/*        <ReactPlayer url={post.url} controls style={{*/}
            {/*            borderRadius: globalRadius,*/}
            {/*            maxWidth: '100%',*/}
            {/*            maxHeight: '70vh',*/}
            {/*            overflow: 'hidden'*/}
            {/*        }}/>*/}
            {/*    </Modal.Body>*/}
            {/*</Modal>*/}
        </>
    );
};

export default PaymentRecordRow;
