import React, {useEffect, useState} from 'react';
import {Grid, Typography} from '@mui/material';
import {CiSearch} from 'react-icons/ci';
import {FaCreditCard, FaPlay} from 'react-icons/fa';
import {IoIosSend, IoMdChatboxes} from 'react-icons/io';
import {AiFillCamera, AiFillHeart, AiOutlineEye, AiOutlineHeart} from 'react-icons/ai';
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
import {FcGraduationCap} from 'react-icons/fc';
import {IoPinSharp} from 'react-icons/io5';
import ReactEcharts from 'echarts-for-react';
import {BsCameraVideo, BsChatSquare, BsShare} from 'react-icons/bs';
import {ImFilePdf} from 'react-icons/im';
import {GrAttachment} from 'react-icons/gr';
import {MdEmojiEmotions} from 'react-icons/md';
import ReactPlayer from 'react-player';
import logo from '../data/ImpressUsLogo.svg';
import {useStateContext} from '../contexts/ContextProvider';
import facebook from '../data/facebook.png';
import instagram from '../data/instagram.png';
import mail from '../data/mail.png';
import pinterest from '../data/pinterest.png';
import spotify from '../data/spotify.png';
import china from '../data/china.png';
import zambia from '../data/zambia.png';
import turkey from '../data/turkey.png';
import newZealand from '../data/new-zealand.png';
import albumCover from '../data/album-cover.jpg';
import UseToken from '../hooks/UseToken';
import {globalConfig} from '../globalConfig';
import defaultAvatar from '../data/default.png';
import notFound1 from '../data/no-data-1.png';
import notFound from '../data/no-data.png';
import ChatBox from "../components/New/ChatBox";

const Account = () => {
    const {globalRadius} = useStateContext();
    const navigate = useNavigate();
    const {userID} = useParams();
    const avatar = defaultAvatar;

    const [visible, setVisible] = useState(false);
    const openHandler = () => setVisible(true);

    const closeHandler = () => {
        setVisible(false);
    };

    const [visibleVideoBar, setVisibleVideoBar] = useState(false);
    const openHandlerVideoBar = () => setVisibleVideoBar(true);

    const closeHandlerVideoBar = () => {
        setVisibleVideoBar(false);
    };

    const [user, setUser] = useState([]);
    const [url, setUrl] = useState([]);
    const [userAvatar, setUserAvatar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [token] = UseToken();
    const {backend} = globalConfig;
    const isMounted = true;

    const [posts, setPosts] = useState([]);
    const [loadingPost, setLoadingPost] = useState(false);
    const [paginationPosts, setPaginationPosts] = useState({page: 0, count: 0, limit: 10});
    const [lastPost, setLastPost] = useState([]);
    const [nextPagePost, setNextPagePost] = useState(1);

    const getUserPosts = async () => {
        setLoadingPost(true);
        await axios.get(`${backend}/posts/user/${userID}?page=${nextPagePost}`, {headers: {Authorization: `Bearer ${token}`}})
            .then((response) => {
                setLoadingPost(false);

                if (isMounted) {
                    setLastPost(response.data.data);
                    setNextPagePost(response.data.page + 1);
                    setPosts([...posts, ...response.data.data]);
                    setPaginationPosts({
                        page: response.data.page,
                        count: response.data.count,
                        limit: response.data.limit
                    });
                } else {
                    setLastPost(response.data.data);
                    setNextPagePost(response.data.page + 1);
                    setPosts([...posts, ...response.data.data]);
                    setPaginationPosts({
                        page: response.data.page,
                        count: response.data.count,
                        limit: response.data.limit
                    });
                }
            })
            .catch(() => {
                setLoadingPost(false);
                toast.error('an error occurred');
            });
    };

    const getUser = async () => {
        setLoading(true);
        await axios.get(`${backend}/users/${userID}`, {headers: {Authorization: `Bearer ${token}`}})
            .then((response) => {
                setLoading(false);
                if (isMounted) {
                    setUser(response.data.data);
                    getUserPosts();
                } else {
                    setUser(response.data.data);
                    getUserPosts();
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

    const localVisits = ['Cape Town', 'Durban', 'Limpopo', 'Rustenburg'];

    const loadMorePosts = () => {
        getUserPosts();
    };

    return (
        <>
            <Grid container item xs={12} p={2}>
                <Grid container item xs={12}>
                    <Grid container item xs={8} sm={8} md={8} p={2}>
                        <Grid p={2} xs={12} sx={{
                            borderRadius: globalRadius,
                            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                            background: 'white'
                        }} container justifyContent="space-between" alignItems="center">
                            <Grid xs={10} item container justifyContent="flex-start" alignItems="center">
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
                            <Grid>
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
                    <Grid container item xs={4} sm={4} md={4} p={1}>
                        <Grid p={1} xs={6}>
                            <Grid p={3} xs={12} sx={{
                                borderRadius: globalRadius,
                                boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                                background: 'white'
                            }} container justifyContent="center" alignItems="center">
                                <Typography p={1} onClick={() => navigate(`/accounts/${userID}/subscription`)} style={{
                                    background: '#E9E9E9',
                                    fontSize: '40px',
                                    borderRadius: '50px',
                                    color: '#AF3547',
                                    cursor: 'pointer'
                                }}>
                                    <FaCreditCard/>
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid p={1} xs={6}>
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
                    <Grid container item xs={12} sm={6} md={6} lg={4} p={2} direction="row">
                        <Grid xs={12} sx={{
                            borderRadius: globalRadius,
                            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                            background: 'white'
                        }} p={2} mb={3}>
                            <Grid item p={2} pb={0} m={1} xs={12} sm={12} md={12} container direction="row"
                                  justifyContent="space-between" alignItems="center">
                                <Typography color="#343434"
                                            sx={{fontSize: '30px', fontWeight: '400'}}>Videos </Typography>
                            </Grid>
                            <Grid item p={2} pb={0} m={1} xs={12} sm={12} md={12} container direction="row"
                                  justifyContent="" alignItems="center" sx={{maxHeight: '45vh', overflow: 'auto'}}>
                                {
                                    !loadingPost && posts.length === 0
                                        ? (
                                            <Grid container item xs={12} justifyContent="center" alignItems="center" pt={5}
                                                  pb={5}>
                                                <img src={notFound} style={{width: '40%'}} alt=""/>
                                            </Grid>
                                        )
                                        : ''
                                }

                                {posts.map((post, key) => (
                                    <Grid
                                        m={1}
                                        key={key}
                                        sx={{
                                            overflow: 'hidden',
                                            borderRadius: globalRadius,
                                            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                                            background: '#E9E9E9',
                                            height: '120px',
                                            width: '70px',
                                            backgroundPosition: 'center',
                                            backgroundSize: 'cover'
                                        }}
                                        mb={3}
                                        container
                                        direction="row"
                                        justifyContent="center"
                                        alignItems="center"
                                        onClick={() => {
                                            setUrl(post.url);
                                            setTimeout(() => {
                                                openHandlerVideoBar();
                                            }, 200);
                                        }}
                                    >
                                        <ReactPlayer
                                            key={key}
                                            url={post.url}
                                            style={{borderRadius: globalRadius, maxHeight: '100%', maxWidth: '100%'}}
                                        />
                                        {/* <FaPlay style={{ color: '#A1A1A1', fontSize: '33px' }} /> */}
                                    </Grid>
                                ))}
                            </Grid>
                            {loadingPost ? (
                                    <Grid container item xs={12} justifyContent="center" alignItems="center" pt={2} pb={2}>
                                        <Loading type="spinner" size="lg"/>
                                    </Grid>
                                )
                                : (
                                    <Grid container item xs={12} justifyContent="center" alignItems="center">
                                        {
                                            lastPost.length > 0 && lastPost.length === paginationPosts.limit ? (
                                                <NextUIButton onPress={() => loadMorePosts()} style={{
                                                    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                                                    cursor: 'pointer',
                                                    background: '#ffffff',
                                                    color: '#A1A0A0',
                                                    marginBottom: '8px',
                                                    marginTop: '8px'
                                                }} mt={2} mb={2}>
                                                    See More
                                                </NextUIButton>
                                            ) : ''
                                        }
                                    </Grid>
                                )}
                        </Grid>
                        <Grid xs={12} sx={{
                            borderRadius: globalRadius,
                            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                            background: 'white'
                        }} p={2}>

                            <Grid item p={2} pb={0} m={1} xs={12} sm={12} md={12} container direction="row"
                                  justifyContent="space-between" alignItems="center">
                                <Typography color="#343434"
                                            sx={{fontSize: '30px', fontWeight: '400'}}>Interests </Typography>
                            </Grid>
                            <Grid item p={2} pb={0} m={1} xs={12} sm={12} md={12} container direction="row"
                                  justifyContent="" alignItems="center">
                                {
                                    user.interests && user.interests.map((tag, key) => (
                                        <Typography key={key} mt={1} sx={{
                                            background: '#343434',
                                            color: '#ffffff',
                                            borderRadius: '50px',
                                            padding: '10px 20px'
                                        }} mr={1}>{tag}</Typography>
                                    ))
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} sm={12} md={12} lg={4} p={2} direction="row">
                        <Grid xs={12} sx={{
                            borderRadius: globalRadius,
                            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                            background: 'white'
                        }} p={2} mb={3}>

                            <Grid item container xs={12} direction="column" justifyContent="center" p={3} pb={0}>
                                <Typography sx={{fontWeight: '600', fontSize: '25px'}}>Travel visits</Typography>
                            </Grid>

                            <Grid item container xs={12} direction="row" justifyContent="space-around" mt={4}>
                                <Grid item container xs={3} direction="column" justifyContent="center"
                                      alignItems="center">
                                    <img src={china} alt="china" width={50} height={50}/>
                                    <Typography sx={{fontSize: '15px'}} mt={1}>Country</Typography>
                                </Grid>
                                <Grid item container xs={3} direction="column" justifyContent="center"
                                      alignItems="center">
                                    <img src={zambia} alt="zambia" width={50} height={50}/>
                                    <Typography sx={{fontSize: '15px'}} mt={1}>Country</Typography>
                                </Grid>
                                <Grid item container xs={3} direction="column" justifyContent="center"
                                      alignItems="center">
                                    <img src={turkey} alt="turkey" width={50} height={50}/>
                                    <Typography sx={{fontSize: '15px'}} mt={1}>Country</Typography>
                                </Grid>
                                <Grid item container xs={3} direction="column" justifyContent="center"
                                      alignItems="center">
                                    <img src={newZealand} alt="newZealand" width={50} height={50}/>
                                    <Typography sx={{fontSize: '15px'}} mt={1}>Country</Typography>
                                </Grid>
                            </Grid>

                            <Grid item p={2} pb={0} m={1} xs={12} sm={12} md={12} container direction="row"
                                  justifyContent="space-between" alignItems="center">
                                <Typography color="#343434" sx={{fontWeight: '600', fontSize: '25px'}}>Local
                                    visits </Typography>
                            </Grid>
                            <Grid item p={2} pb={0} m={1} xs={12} sm={12} md={12} container direction="row"
                                  justifyContent="" alignItems="center">
                                {
                                    localVisits.map((visit, key) => (
                                        <Typography key={key} mt={1} sx={{
                                            background: '#F2F2FC',
                                            color: '#727274',
                                            borderRadius: '50px',
                                            padding: '10px 20px'
                                        }} mr={1}>{visit}</Typography>
                                    ))
                                }
                            </Grid>
                        </Grid>
                        <Grid xs={12} sx={{
                            borderRadius: globalRadius,
                            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                            background: 'white'
                        }} p={2}>

                            <Grid item container xs={12} direction="column" justifyContent="center" p={3} pb={0}>
                                <Typography sx={{fontWeight: '600', fontSize: '25px'}}>Anthems</Typography>
                            </Grid>

                            <Grid item container xs={12} direction="row" justifyContent="center" p={2} pt={0} mt={4}>
                                <Grid item container xs={4} justifyContent="center" alignItems="center">
                                    <img src={albumCover} alt="china" style={{width: '100%', borderRadius: '10px'}}/>
                                </Grid>
                                <Grid p={2} pl={4} item container xs={8} direction="column" justifyContent="center"
                                      alignItems="flex-start">
                                    <Typography sx={{fontWeight: '500', fontSize: '20px'}}>Last Last</Typography>
                                    <Typography pt={1} sx={{fontSize: '18px'}}> <img src={spotify} width={30} style={{
                                        display: 'inline',
                                        marginRight: '10px',
                                        fontSize: '30px'
                                    }}/>Musketeers</Typography>
                                    <Typography pt={1} sx={{fontSize: '18px', color: '#4CAF50'}}>Play on
                                        Spotify</Typography>
                                </Grid>
                            </Grid>

                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Modal blur closeButton width="650px" aria-labelledby="modal-title" open={visible} onClose={closeHandler}>
                <ChatBox user={user}/>
            </Modal>

            <Modal noPadding style={{width: 'auto'}} blur aria-labelledby="modal-title" open={visibleVideoBar}
                   onClose={closeHandlerVideoBar}>
                <Modal.Body>
                    <ReactPlayer url={url} controls style={{
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

export default Account;
