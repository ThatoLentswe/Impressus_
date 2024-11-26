import React, {useEffect, useState} from 'react';
import {Grid, Typography} from '@mui/material';
import {CiSearch} from 'react-icons/ci';
import {IoIosSend, IoMdChatboxes} from 'react-icons/io';
import {AiFillCamera, AiFillHeart, AiOutlineEye} from 'react-icons/ai';
import {FiFilm} from 'react-icons/fi';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import {
    Button as NUIButton,
    Button as NextUIButton,
    Dropdown as NUIDropdown,
    Input as NUIInput,
    Loading,
    Modal,
    Text,
} from '@nextui-org/react';
import {BiChevronLeft} from 'react-icons/bi';
import {IoPinSharp} from 'react-icons/io5';
import {FcGraduationCap} from 'react-icons/fc';
import {GrAttachment} from 'react-icons/gr';
import {MdEmojiEmotions} from 'react-icons/md';
import ReactEcharts from 'echarts-for-react';
import {FaCalendarAlt} from 'react-icons/fa';
import {useStateContext} from '../contexts/ContextProvider';
import facebook from '../data/facebook.png';
import instagram from '../data/instagram.png';
import mail from '../data/mail.png';
import pinterest from '../data/pinterest.png';
import UseToken from '../hooks/UseToken';
import {globalConfig} from '../globalConfig';
import defaultAvatar from '../data/default.png';
import notFound1 from '../data/no-data-1.png';
import UserDashboardSubscription from '../components/New/UserDashboardSubscription';
import logo from '../data/ImpressUsLogo.svg';
import CalendarCell from '../components/New/CalendarCell';
import ChatBox from "../components/New/ChatBox";

const AccountSubscription = () => {
    const {globalRadius} = useStateContext();
    const {userID} = useParams();
    const navigate = useNavigate();
    const avatar = defaultAvatar;

    const [visible, setVisible] = useState(false);
    const openHandler = () => setVisible(true);

    const closeHandler = () => {
        setVisible(false);
    };

    const [user, setUser] = useState([]);
    const [userAvatar, setUserAvatar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [token] = UseToken();
    const {backend} = globalConfig;
    const isMounted = true;

    const getUser = async () => {
        setLoading(true);
        await axios.get(`${backend}/users/${userID}`, {headers: {Authorization: `Bearer ${token}`}})
            .then((response) => {
                setLoading(false);
                if (isMounted) {
                    setUser(response.data.data);
                } else {
                    setUser(response.data.data);
                }
            })
            .catch(() => {
                setLoading(false);
                toast.error('an error occurred');
            });
    };

    useEffect(() => {
        if (!userID) {
            alert('user id not specified');
        } else {
            getUser();
        }
    }, []);

    useEffect(() => {
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
    }, [user]);

    const locationOption = {
        tooltip: {
            trigger: 'item',
        },
        legend: {
            top: '5%',
            left: 'center',
        },
        series: [
            {
                name: 'Location',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center',
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 40,
                        fontWeight: 'bold',
                    },
                },
                labelLine: {
                    show: false,
                },
                data: [
                    {
                        value: 1048,
                        name: '24 Hrs',
                        itemStyle: {
                            barBorderRadius: 50,
                            borderWidth: 0.5,
                            borderType: 'solid',
                            backgroundColor: '#0680B5',
                            normal: {
                                color: '#0680B5',
                            },
                        }
                    },
                    {
                        value: 735,
                        name: '15 days',
                        itemStyle: {
                            barBorderRadius: 50,
                            borderWidth: 0.5,
                            borderType: 'solid',
                            backgroundColor: '#FB3958',
                            normal: {
                                color: '#FB3958',
                            },
                        }
                    },
                    {
                        value: 580,
                        name: '30 days',
                        itemStyle: {
                            barBorderRadius: 50,
                            borderWidth: 0.5,
                            borderType: 'solid',
                            backgroundColor: '#FFDB58',
                            normal: {
                                color: '#FFDB58',
                            },
                        }
                    },
                ],
            },
        ],
    };

    return (
        <>
            <Grid container item xs={12} p={2}>
                <Grid container item xs={12}>
                    <Grid container item xs={12} sm={10} md={10} p={2}>
                        <Grid p={2} xs={12} container justifyContent="space-between" alignItems="center" sx={{
                            borderRadius: globalRadius,
                            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                            background: 'white'
                        }}>
                            <Grid xs={5} item container justifyContent="flex-start" alignItems="center">
                                <Grid justifyContent="flex-start" alignItems="center" mr={2}>
                                    <Typography p={1} style={{
                                        background: '#E9E9E9',
                                        fontSize: '38px',
                                        borderRadius: '50px',
                                        color: '#AF3547'
                                    }} onClick={() => navigate(`/accounts/${userID}`)}>
                                        <BiChevronLeft/>
                                    </Typography>
                                </Grid>
                                <Grid justifyContent="space-between" alignItems="center">
                                    <Grid item container direction="row" alignItems="center">
                                        <Typography sx={{fontSize: '35px', fontWeight: '500'}}>
                                            {user.name ? user.name : '--- ---'}
                                        </Typography>
                                    </Grid>
                                    <Typography sx={{fontSize: '14px'}}>Here for your entertainment</Typography>
                                </Grid>
                                <Grid justifyContent="flex-start" alignItems="flex-start" alignSelf="flex-start" mt={1}>
                                    <Typography ml={2} style={{
                                        width: '25px',
                                        height: '25px',
                                        borderRadius: '50px',
                                        background: user.online ? '#33CC60' : '#ccc'
                                    }}/>
                                </Grid>
                            </Grid>
                            <Grid xs={7} item container justifyContent="space-between" alignItems="center">
                                <Typography p={1} style={{fontSize: '38px', borderRadius: '50px'}}>
                                    Payments & Subscriptions
                                </Typography>
                                <Typography p={1} style={{
                                    background: '#E9E9E9',
                                    fontSize: '38px',
                                    borderRadius: '50px',
                                    color: '#AF3547'
                                }}>
                                    <CiSearch/>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} sm={2} md={2} p={1} justifyContent="space-between" alignItems="center">
                        <Grid p={1} xs={12}>
                            <Grid p={3} xs={12} sx={{
                                borderRadius: globalRadius,
                                boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                                background: 'white'
                            }} container justifyContent="center" alignItems="center">
                                <Typography onClick={() => openHandler()} p={1} style={{
                                    background: '#E9E9E9',
                                    fontSize: '40px',
                                    borderRadius: '50px',
                                    color: '#AF3547',
                                    cursor: 'pointer'
                                }}>
                                    <IoMdChatboxes/>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container item xs={12}>

                    <Grid container item xs={12} sm={6} md={6} lg={4} p={2} direction="row">
                        <Grid xs={12} sx={{
                            borderRadius: globalRadius,
                            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                            backgroundImage: `url(${userAvatar || avatar})`,
                            minHeight: '450px',
                            backgroundPosition: 'center',
                            backgroundSize: 'cover'
                        }} mb={3} container direction="row" justifyContent="center" alignItems="flex-end">
                            <Grid item container xs={12} p={1} className="bg-gradient-black-nothing"
                                  sx={{borderRadius: globalRadius}}>
                                <Grid>
                                    <Typography sx={{color: '#ffffff', fontSize: '35px', fontWeight: '400'}}>
                                        {user.stageName ? user.stageName : '--- ---'}
                                    </Typography>
                                </Grid>
                                <Grid item container xs={12} direction="row" sx={{color: '#ffffff'}}>
                                    <Grid xs={4} item container direction="column" justifyContent="center"
                                          alignItems="center">
                                        <Typography style={{fontWeight: '500'}} mb={2}>
                                            Likes Left
                                        </Typography>
                                        <Typography>
                                            <AiFillHeart
                                                style={{display: 'inline', marginRight: '10px', fontSize: '30px'}}/> 34
                                        </Typography>
                                    </Grid>
                                    <Grid xs={4} item container direction="column" justifyContent="center"
                                          alignItems="center">
                                        <Typography style={{fontWeight: '500'}} mb={2}>
                                            Videos Played
                                        </Typography>
                                        <Typography>
                                            <FiFilm
                                                style={{display: 'inline', marginRight: '10px', fontSize: '30px'}}/> 34
                                        </Typography>
                                    </Grid>
                                    <Grid xs={4} item container direction="column" justifyContent="center"
                                          alignItems="center">
                                        <Typography style={{fontWeight: '500'}} mb={2}>
                                            Total Views
                                        </Typography>
                                        <Typography>
                                            <AiOutlineEye
                                                style={{display: 'inline', marginRight: '10px', fontSize: '30px'}}/> 34
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid xs={12} sx={{
                            borderRadius: globalRadius,
                            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                            background: 'white'
                        }} p={2}>

                            <Grid item container xs={12} direction="column" justifyContent="center" p={3} pb={0}>
                                <Typography sx={{fontWeight: '600', fontSize: '25px'}}>About</Typography>
                                <Typography sx={{fontWeight: '0', fontSize: '20px'}} p>{user.about ? user.about : (
                                    <Grid container xs={12} justifyContent="center" alignItems="center" pt={1} pb={1}>
                                        <img src={notFound1} style={{width: '60%'}} alt=""/>
                                    </Grid>
                                )}
                                </Typography>
                                <Typography ml={3} sx={{fontWeight: '0', fontSize: '20px'}}> <FcGraduationCap
                                    style={{display: 'inline', marginRight: '10px'}}/> {'{ no data }'}</Typography>
                                <Typography ml={3} sx={{fontWeight: '0', fontSize: '20px'}}> <IoPinSharp style={{
                                    display: 'inline',
                                    marginRight: '10px'
                                }}/> {user.location ? user.location : '--- ---'} </Typography>
                            </Grid>

                            <Grid item container xs={12} direction="row" justifyContent="space-around" mt={4}>
                                <img src={instagram} alt="instagram" width={70} height={70}/>
                                <img src={facebook} alt="facebook" width={70} height={70}/>
                                <img src={pinterest} alt="pinterest" width={70} height={70}/>
                                <img src={mail} alt="mail" width={70} height={70}/>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid container item xs={12} sm={6} md={6} lg={4} p={2} direction="row" alignItems="flex-start"
                          justifyContent="space-around">

                        <Grid alignSelf="flex-start" direction="row" container p={2} sx={{
                            borderRadius: globalRadius,
                            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                            background: 'white'
                        }}>
                            <Grid item p={2} pb={0} xs={12} sm={12} md={12} container direction="row"
                                  justifyContent="space-between" alignItems="center">
                                <Typography color="#343434" sx={{fontSize: '20px', fontWeight: '400'}}>Current
                                    Subscription </Typography>
                            </Grid>
                            <Grid item p={1} pb={0} xs={9} sm={9} md={9} container direction="row"
                                  justifyContent="center" alignItems="center">
                                <Grid xs={2} container item>
                                    <Grid style={{
                                        background: '#33CC60',
                                        height: '70px',
                                        width: '15px',
                                        borderRadius: '10px'
                                    }}/>
                                </Grid>
                                <Grid xs={10} container item justifyContent="flex-start" alignItems="space-around"
                                      alignSelf="flex-start" sx={{overflow: 'auto'}}>
                                    <Grid color="#343434" style={{fontSize: '25px', fontWeight: '700'}}>15 Days -
                                        P50.00</Grid>
                                    <Grid color="#343434" style={{fontSize: '20px', fontWeight: '100'}}>14 days
                                        Remaining </Grid>
                                </Grid>
                            </Grid>
                            <Grid xs={3} sm={3} md={3} container direction="row" justifyContent="center"
                                  alignItems="center">
                                <Typography p={2} sx={{background: '#E4E4E4', borderRadius: '50%'}}>
                                    <FaCalendarAlt style={{color: '#A1A1A1', fontSize: '35px'}}/>
                                </Typography>
                            </Grid>

                        </Grid>

                        <Grid alignSelf="flex-start" xs={12} sx={{
                            borderRadius: globalRadius,
                            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                            background: 'white'
                        }} p={2} item container>

                            <Grid item container justifyContent="center" alignItems="center">
                                <Typography sx={{fontSize: '26px', fontWeight: '500'}}>
                                    Package Data / User Subscription
                                </Typography>
                            </Grid>

                            <Grid item xs={12} container>
                                <ReactEcharts option={locationOption} style={{height: '500px', width: '100%'}}/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} sm={12} md={12} lg={4} p={2} direction="row" alignItems="flex-start"
                          justifyContent="flex-start">
                        <Grid xs={12} sx={{
                            borderRadius: globalRadius,
                            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                            background: 'white'
                        }} p={2} mb={3}>

                            <Grid item container justifyContent="center" alignItems="center">
                                <Typography sx={{fontSize: '26px', fontWeight: '500'}}>
                                    Payment History
                                </Typography>
                            </Grid>

                            <Grid item xs={12} container sx={{maxHeight: '80vh', overflow: 'auto'}} pt={3}>

                                {Array.from({length: 130}).map((_, i) => (
                                    <Grid key={i} item xs={12} sm={12} md={12} container direction="row"
                                          justifyContent="center" alignItems="center"
                                          sx={{background: '#F3F4F6', borderBottom: '1px solid #ccc'}} pb={1}>
                                        <Grid xs={1} container item>
                                            <Grid style={{
                                                background: '#FB3958',
                                                height: '40px',
                                                width: '10px',
                                                borderRadius: '10px'
                                            }}/>
                                        </Grid>
                                        <Grid xs={11} pl={1} container item justifyContent="flex-start"
                                              direction="column" alignItems="space-around" alignSelf="flex-start"
                                              sx={{overflow: 'auto'}}>
                                            <Grid color="#343434" style={{fontSize: '20px', fontWeight: '700'}}>15 Days
                                                - P50.00 </Grid>
                                            <Grid color="#343434"
                                                  style={{fontSize: '13px', fontStyle: 'italic'}}>Finished </Grid>
                                        </Grid>
                                    </Grid>
                                ))}

                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Modal blur closeButton width="650px" aria-labelledby="modal-title" open={visible} onClose={closeHandler}>
                <ChatBox user={user}/>
            </Modal>
        </>
    );
};

export default AccountSubscription;
