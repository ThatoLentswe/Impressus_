import React, {useEffect, useState} from 'react';
import {Grid, Typography} from '@mui/material';
import {Button as NUIButton, Avatar as NUIAvatar, Modal, Text, Loading} from '@nextui-org/react';
import {IoIosEye} from 'react-icons/io';
import {BsShareFill} from 'react-icons/bs';
import {FaHeart} from 'react-icons/fa';
import {Link} from 'react-router-dom';
import ReactPlayer from 'react-player';
import axios from 'axios';
import toast from 'react-hot-toast';
import {useStateContext} from '../../contexts/ContextProvider';
import defaultAvatar from '../../data/default.png';
import UseToken from '../../hooks/UseToken';
import {globalConfig} from '../../globalConfig';

const WinnerUserRowDashboard = ({winner, xs = 12, sm = 12, md = 12, position}) => {
    const avatar = defaultAvatar;
    const [userAvatar, setUserAvatar] = useState(null);
    const {globalRadius} = useStateContext();

    const [visible, setVisible] = React.useState(false);
    const handler = () => setVisible(true);

    const closeHandler = () => {
        setVisible(false);
    };

    const [loading, setLoading] = useState(false);
    const [declaredWinner, setDeclaredWinner] = useState(false);
    const [token] = UseToken();
    const {backend} = globalConfig;
    const isMounted = true;

    const declareWinner = async () => {
        setLoading(true);
        await axios.post(`${backend}/posts/users/declareWinner/${winner.postId}`, {}, {headers: {Authorization: `Bearer ${token}`}})
            .then(() => {
                setLoading(false);
                if (isMounted) {
                    setDeclaredWinner(true);
                    toast.success(`${winner.userName} has been declared winner`);
                } else {
                    setDeclaredWinner(true);
                    toast.success(`${winner.userName} has been declared winner`);
                }
            })
            .catch(() => {
                setLoading(false);
                toast.error('an error occurred');
            });
    };

    // {
    //   "postId": "66ed3717-3f71-4c2b-af90-9e4e2b1a4214",
    //     "userId": "5giDJrFuVXbbxM6d4zQljjngVV13",
    //     "userName": "Keo Jerry",
    //     "likes": 19,
    //     "views": 3,
    //     "photoUrl": {
    //   "1": "https://res.cloudinary.com/dfutsbeis/image/upload/q_10/v1680437874/impressUs/2023-04-02%2014:17:51.741805.jpg"
    // },
    //   "isMostLiked": true
    // }

    useEffect(() => {
        if (winner.photoUrl) {
            if (winner.photoUrl['0']) {
                setUserAvatar(winner.photoUrl['0']);
            }
            if (winner.photoUrl && !winner.photoUrl['0']) {
                if (winner.photoUrl['1']) {
                    setUserAvatar(winner.photoUrl['1']);
                }
            }
        }
    }, []);
    return (
        <>
            <Grid item xs={xs} sm={sm} md={md} container p={1}>
                <Grid item container xs={12} sm={12} md={12} p={1} direction="row" sx={{
                    borderRadius: globalRadius,
                    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                    background: 'white'
                }}>
                    <Grid item container xs={12} sm={1} md={1} direction="row" justifyContent="center"
                          alignItems="center" className="bg-gradient app-color-secondary-1"
                          sx={{borderRadius: '15px 0 0 15px', fontSize: '29px', fontWeight: 'bold'}}>
                        {position}
                    </Grid>
                    <Grid item container xs={12} sm={8} md={8} direction="row" justifyContent="center"
                          alignItems="center">
                        <Grid item container xs={3} direction="row" justifyContent="center" alignItems="center">
                            <NUIAvatar
                                css={{border: '.5px solid #EAEBEC', width: '70px', height: '70px'}}
                                src={userAvatar || avatar}
                            />
                            <Grid pl={1} item container className="items-center justify-center text-center"
                                  direction="column" justifyContent="center" alignItems="center">
                                <Typography sx={{fontSize: '12px'}}>{winner.userName}</Typography>
                            </Grid>
                        </Grid>
                        <Grid item container xs={3} direction="column" justifyContent="center" alignItems="center">
                            <Typography>{winner.likes}</Typography>
                            <FaHeart style={{color: '#EF3D5B'}}/>
                            <Typography>Likes</Typography>
                        </Grid>
                        <Grid item container xs={3} direction="column" justifyContent="center" alignItems="center">
                            <Typography>{winner.views}</Typography>
                            <IoIosEye style={{color: '#0680B5'}}/>
                            <Typography>Views</Typography>
                        </Grid>
                        <Grid item container xs={3} direction="column" justifyContent="center" alignItems="center">
                            <Typography>#</Typography>
                            <BsShareFill style={{color: '#36CC62'}}/>
                            <Typography>Shares</Typography>
                        </Grid>
                    </Grid>
                    <Grid item container xs={12} sm={3} md={3} direction="column" justifyContent="center"
                          alignItems="center">

                        <NUIButton auto className="bg-gradient"
                                   css={{color: '#ffffff', borderRadius: '9px', width: '100%'}} as={Link}
                                   to={`/accounts/${winner.userId}`}>
                            Open
                        </NUIButton>
                        {/*{*/}
                        {/*    winner.isMostLiked && (*/}
                        <NUIButton onClick={handler} auto css={{
                            color: '#727274',
                            borderRadius: '9px',
                            width: '100%',
                            marginTop: '10px',
                            background: '#ffffff',
                            boxShadow: 'rgba(99, 99, 99, 0.5) 0px 2px 8px 0px'
                        }}>
                            {!declaredWinner ? 'Make Winner' : 'Declared Winner'}
                        </NUIButton>
                        {/*    )*/}
                        {/*}*/}
                    </Grid>
                </Grid>
            </Grid>

            <Modal
                blur
                closeButton
                width="650px"
                aria-labelledby="modal-title"
                open={visible}
                onClose={closeHandler}
            >
                <Modal.Header>
                    <Text id="modal-title" size={18}>
                        {/* Header here */}
                    </Text>
                </Modal.Header>
                <Modal.Body>
                    <Grid container direction="row">
                        <Grid xs={6} p={2}>
                            <Grid m={1} sx={{height: '450px', width: '100%'}} mb={3} container direction="row"
                                  justifyContent="center" alignItems="center">
                                <ReactPlayer url={winner.videoUrl} controls style={{
                                    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                                    borderRadius: globalRadius,
                                    maxWidth: '100%',
                                    maxHeight: '70vh',
                                    overflow: 'hidden'
                                }}/>
                            </Grid>
                        </Grid>
                        <Grid xs={6} p={2} container direction="column" justifyContent="center" alignItems="center">
                            <Typography sx={{fontSize: '20px'}} mb={2}>User <b>{winner.userName}</b> has likes
                                totaling {winner.likes} and {winner.views} views</Typography>
                            <NUIButton disabled={loading || declaredWinner} style={{
                                background: '#33CC60',
                                fontSize: '25px',
                                fontWeight: '600',
                                padding: '30px'
                            }} onPress={() => declareWinner()}>
                                {loading && <Loading color="currentColor" size="sm"/>}
                                {!loading && !declaredWinner ? 'Declare Winner' : 'Declared Winner'}
                            </NUIButton>
                        </Grid>
                    </Grid>
                </Modal.Body>
                <Modal.Footer>
                    {/* footer here */}
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default WinnerUserRowDashboard;
