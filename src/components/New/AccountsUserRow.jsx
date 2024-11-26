import React, {useState} from 'react';
import {Grid, Typography} from '@mui/material';
import {Button as NUIButton, Avatar as NUIAvatar, Modal, Text, Input as NUIInput, Loading} from '@nextui-org/react';
import {IoPinSharp, IoTrashOutline} from 'react-icons/io5';
import {RiMessage2Fill} from 'react-icons/ri';
import {MdEmojiEmotions, MdOutlineAccessTime} from 'react-icons/md';
import {FcGraduationCap} from 'react-icons/fc';
import {Link} from 'react-router-dom';
import {GrAttachment} from 'react-icons/gr';
import {AiFillCamera} from 'react-icons/ai';
import {IoIosSend} from 'react-icons/io';
import toast from 'react-hot-toast';
import axios from 'axios';
import {useStateContext} from '../../contexts/ContextProvider';
import defaultAvatar from '../../data/default.png';
import logo from '../../data/ImpressUsLogo.svg';
import {globalConfig} from '../../globalConfig';
import UseToken from '../../hooks/UseToken';
import ChatBox from "./ChatBox";

const UserRowDashboard = ({user, xs = 12, sm = 12, md = 12}) => {
    let avatar = defaultAvatar;

    const [visible, setVisible] = useState(false);
    const openHandler = () => setVisible(true);

    const closeHandler = () => {
        setVisible(false);
    };

    const [suspended, setSuspended] = useState(user.status == '1');

    if (user.pictures) {
        if (user.pictures['0']) {
            avatar = user.pictures['0'];
        }

        if (user.pictures && !user.pictures['0']) {
            if (user.pictures['1']) {
                avatar = user.pictures['1'];
            }
        }
    }
    const {globalRadius} = useStateContext();
    const [loading, setLoading] = useState(false);
    const isMounted = true;
    const {backend} = globalConfig;
    const [token] = UseToken();

    const changeStatus = async (status) => {
        setLoading(true);
        toast.dismiss();
        await axios.put(`${backend}/users/${user.id}/status`, {status}, {headers: {Authorization: `Bearer ${token}`}})
            .then(() => {
                setLoading(false);
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
                setLoading(false);

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
            <Grid item xs={xs} sm={sm} md={md} container p={1}>
                <Grid item container xs={12} sm={12} md={12} p={1} direction="row" sx={{
                    borderRadius: globalRadius,
                    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                    background: 'white'
                }}>
                    <Grid item container xs={12} md={6} lg={4} direction="column" justifyContent="center"
                          alignItems="center">
                        <NUIAvatar css={{border: '.5px solid #EAEBEC', width: '120px', height: '120px'}} src={avatar}/>
                        <Grid pl={1} item container className="items-center justify-center" direction="column"
                              justifyContent="center" alignItems="center">
                            <Typography sx={{fontWeight: '600', fontSize: '15px'}}>{user.name}</Typography>
                            <Typography sx={{fontSize: '12px'}}>{user.email}</Typography>
                        </Grid>
                    </Grid>
                    <Grid item container xs={12} md={6} lg={5} direction="column" justifyContent="center">
                        <Typography sx={{fontWeight: '600', fontSize: '25px'}}>About</Typography>
                        <Typography sx={{fontWeight: '0', fontSize: '14px'}} p>Singer.Dancer.Entertainer</Typography>
                        <Typography sx={{fontWeight: '0', fontSize: '14px'}}> <FcGraduationCap
                            style={{display: 'inline', marginRight: '10px'}}/> Creative Multimedia</Typography>
                        <Typography sx={{fontWeight: '0', fontSize: '14px'}}> <IoPinSharp
                            style={{display: 'inline', marginRight: '10px'}}/> Johannesburg, South Africa</Typography>
                    </Grid>
                    <Grid item container xs={12} md={12} lg={3} direction="column" justifyContent="center"
                          alignItems="center">
                        <NUIButton auto className="app-bg-secondary-2 app-color-secondary-4"
                                   css={{borderRadius: '9px', marginBottom: '10px', width: '100%'}}
                                   icon={<RiMessage2Fill/>} onClick={() => openHandler()}>
                            Message
                        </NUIButton>
                        {
                            suspended
                                ? (
                                    <NUIButton
                                        auto
                                        className="app-bg-secondary-2 app-color-secondary-4"
                                        css={{borderRadius: '9px', marginBottom: '10px', width: '100%'}}
                                        icon={!loading && <MdOutlineAccessTime style={{color: '#2A92BF'}}/>}
                                        onClick={() => {
                                            changeStatus('0');
                                        }}
                                    >
                                        {loading && <Loading color="currentColor" size="sm"/>}
                                        {!loading && 'UnSuspend'}
                                    </NUIButton>
                                )
                                : (
                                    <NUIButton
                                        auto
                                        className="app-bg-secondary-2 app-color-secondary-4"
                                        css={{borderRadius: '9px', marginBottom: '10px', width: '100%'}}
                                        icon={!loading && <MdOutlineAccessTime style={{color: '#2A92BF'}}/>}
                                        onClick={() => {
                                            changeStatus('1');
                                        }}
                                    >
                                        {loading && <Loading color="currentColor" size="sm"/>}
                                        {!loading && 'Suspend'}
                                    </NUIButton>
                                )
                        }
                        <NUIButton auto className="app-bg-secondary-2 app-color-secondary-4"
                                   css={{borderRadius: '9px', marginBottom: '10px', width: '100%'}}
                                   icon={<IoTrashOutline style={{color: '#FB3958'}}/>}>
                            Delete
                        </NUIButton>
                        <NUIButton as={Link} to={`/accounts/${user.id}`} auto className="bg-gradient"
                                   css={{color: '#ffffff', borderRadius: '9px', marginBottom: '10px', width: '100%'}}>
                            View Profile
                        </NUIButton>
                    </Grid>
                </Grid>
            </Grid>

            
            <Modal blur closeButton width="650px" aria-labelledby="modal-title" open={visible} onClose={closeHandler}>
                <ChatBox user={user}/>
            </Modal>
        </>
    );
};

export default UserRowDashboard;
