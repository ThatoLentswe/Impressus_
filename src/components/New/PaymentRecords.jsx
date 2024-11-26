import React, {useEffect, useState} from 'react';
import {
    Button as NUIButton,
    Button as NextUIButton,
    Input as NUIInput,
    Textarea as NUITextarea,
    Loading,
    Modal,
    Table,
    Text
} from '@nextui-org/react';
import {useStateContext} from '../../contexts/ContextProvider';
import ReactPlayer from "react-player";
import {Grid, Typography} from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";
import {globalConfig} from "../../globalConfig";
import UseToken from "../../hooks/UseToken";
import {IoIosEye, IoIosSend} from "react-icons/io";
import {FaHeart} from "react-icons/fa";
import {MdEmojiEmotions, MdReportProblem} from "react-icons/md";
import {DateTime} from "luxon";
import logo from "../../data/ImpressUsLogo.svg";
import {GrAttachment} from "react-icons/gr";
import {AiFillCamera} from "react-icons/ai";
import defaultAvatar from "../../data/default.png";
import notFound1 from "../../data/no-data-1.png";
import PostRow from "./PostRow";
import PaymentRecordRow from "./PaymentRecordRow";
import notFound from "../../data/no-data.png";

const PaymentRecords = () => {
    const {globalRadius} = useStateContext();

    const [userAvatar, setUserAvatar] = useState(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [payments, setPayments] = useState([]);
    const [last, setLast] = useState([]);
    const [pagination, setPagination] = useState({page: 0, count: 0, limit: 10});
    const [nextPage, setNextPage] = useState(1);
    const [token] = UseToken();
    const {backend} = globalConfig;
    const isMounted = true;

    const getPayments = async (page = nextPage) => {
        setLoading(true);
        await axios.get(`${backend}/payments?page=${page}`, {headers: {Authorization: `Bearer ${token}`}})
            .then((response) => {
                setLoading(false);
                if (isMounted) {
                    setPayments(page === 1 ? response.data.data : [...payments, ...response.data.data]);
                    setLast(response.data.data);
                    setPagination({page: response.data.page, count: response.data.count, limit: response.data.limit});
                    setNextPage(page + 1);
                } else {
                    setPayments(page === 1 ? response.data.data : [...payments, ...response.data.data]);
                    setLast(response.data.data);
                    setPagination({page: response.data.page, count: response.data.count, limit: response.data.limit});
                    setNextPage(page + 1);
                }
            })
            .catch(() => {
                setLoading(false);
                toast.error('an error occurred getting payments');
            });
    };

    useEffect(() => {
        getPayments()
    }, [])

    const loadMore = () => {
        getPayments();
    };

    return (
        <>
            <table className={'table'}>
                <thead>
                <th>AVATAR</th>
                <th>NAMES</th>
                <th>CURRENCY</th>
                <th>PACKAGE</th>
                <th>TRANSACTION STATUS</th>
                <th>AMOUNT</th>
                <th>RESULT DESCRIPTION</th>
                <th>PAY METHOD</th>
                <th>EXPIRY</th>
                <th>DATE</th>
                </thead>
                <tbody>
                {payments.map((payment, key) => (
                    <PaymentRecordRow mode={'detailed'} key={key} position={key} payment={payment}/>
                ))}
                </tbody>
            </table>

            {
                !loading && payments.length === 0
                    ? (
                        <Grid container item xs={12} justifyContent="center" alignItems="center" pt={5} pb={5}>
                            <img src={notFound} style={{width: '40%'}} alt=""/>
                        </Grid>
                    )
                    : ''
            }


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
        </>
    );
};

export default PaymentRecords;
