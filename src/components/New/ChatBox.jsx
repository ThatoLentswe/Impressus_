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
import notFound from "../../data/no-data.png";

const ChatBox = ({user}) => {
    const {globalRadius} = useStateContext();

    const avatar = defaultAvatar;
    const [userAvatar, setUserAvatar] = useState(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [token] = UseToken();
    const {backend} = globalConfig;
    const isMounted = true;

    const [messages, setMessages] = useState([]);
    const [loadingMessages, setLoadingMessages] = useState(false);
    const getMessages = async () => {
        setLoadingMessages(true);
        await axios.get(`${backend}/users/messages/admin/${user.id}`, {headers: {Authorization: `Bearer ${token}`}})
            .then((response) => {
                setLoadingMessages(false);

                if (isMounted) {
                    setMessages(response.data.data);
                } else {
                    setMessages(response.data.data);
                }
            })
            .catch(() => {
                setLoadingMessages(false);
                toast.error('an error occurred');
            });
    };

    useEffect(() => {
        if (user) {
            setMessages([])
            getMessages()
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
    }, []);

    const sendMessage = async () => {
        setLoading(true);
        toast.dismiss();
        toast.loading('checking your details...');
        await axios.post(
            `${backend}/users/messages/user`,
            {
                content: message,
                to: user.id,
            },
            {headers: {Authorization: `Bearer ${token}`}}
        )
            .then((response) => {
                setLoading(false);
                toast.dismiss();
                if (isMounted) {
                    toast.success('message sent');
                    setMessage('')
                    if (response.data.data) {
                        setMessages([...messages, response.data.data])
                    }
                } else {
                    toast.success('message sent');
                    setMessage('')
                    if (response.data.data) {
                        setMessages([...messages, response.data.data])
                    }
                }
            })
            .catch(() => {
                toast.dismiss();
                setLoading(false);
                toast.error('error sending message');

            });
    };

    return (
        <>
            <Modal.Header>
                <Text id="modal-title" size={18}>
                    {/* 4444 */}
                </Text>
            </Modal.Header>
            <Modal.Body>
                {
                    !user && (
                        <Grid container justifyContent="center" alignItems="center" pt={1} pb={1}>
                            <img src={notFound1} style={{width: '60%'}} alt=""/>
                        </Grid>
                    )
                }
                {user &&
                (
                    <Grid container>
                        <Grid container direction="row" p={1} style={{maxHeight: '50vh'}}>


                            {loadingMessages && (
                                <Grid container item xs={12} justifyContent="center" alignItems="center" pt={2} pb={2}>
                                    <Loading type="spinner" size="lg"/>
                                </Grid>
                            )}

                            {messages.length > 0 && (
                                messages.map((message, key) => (
                                    <Grid item container key={key} xs={12}
                                          direction={`row${message.from == user.id ? '-reverse' : ''}`} mb={2}>
                                        <Grid item container xs={2} justifyContent="center" alignItems="center">
                                            <Grid className="bg-gradient"
                                                  style={{
                                                      width: '60px',
                                                      height: '60px',
                                                      borderRadius: '50px',
                                                      overflow: 'hidden'
                                                  }}
                                                  p={1} justifyContent="center" alignItems="center" item container>
                                                <img src={message.from == user.id ? userAvatar || avatar : logo}
                                                     alt="profile"
                                                     style={{maxWidth: '100%', maxHeight: '100%'}}/>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={8} sx={{background: '#FFC4CD', borderRadius: globalRadius}}
                                              p={2}>
                                            {message.content}
                                        </Grid>
                                    </Grid>
                                ))
                            )}

                            {
                                !loadingMessages && messages.length === 0
                                && (
                                    <Grid container item xs={12} justifyContent="center" alignItems="center" pt={5}
                                          pb={5}>
                                        <img src={notFound} style={{width: '40%'}} alt=""/>
                                    </Grid>
                                )
                            }
                            {/*<Grid item container xs={12} direction="row-reverse" mb={2}>*/}
                            {/*    <Grid item container xs={2} justifyContent="center" alignItems="center">*/}
                            {/*        <Grid style={{*/}
                            {/*            width: '60px',*/}
                            {/*            height: '60px',*/}
                            {/*            borderRadius: '50px',*/}
                            {/*            overflow: 'hidden'*/}
                            {/*        }}*/}
                            {/*              justifyContent="center" alignItems="center" item container>*/}
                            {/*            <img src={userAvatar || avatar} alt="profile" style={{width: '100%'}}/>*/}
                            {/*        </Grid>*/}
                            {/*    </Grid>*/}
                            {/*    <Grid item xs={8} sx={{background: '#F0F4F7', borderRadius: globalRadius}} p={2}>*/}
                            {/*        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet autem cupiditate*/}
                            {/*        distinctio doloremque dolores earum eligendi eveniet. 😊😊😊😊. {message}*/}
                            {/*    </Grid>*/}
                            {/*</Grid>*/}
                        </Grid>
                    </Grid>
                )
                }
            </Modal.Body>
            <Modal.Footer>
                <Grid mt={1} container direction="row" justifyContent="center" alignItems="center">
                    <Grid item xs={10} sm={10} md={10} p={1}>
                        <NUITextarea
                            fullWidth
                            size="xl"
                            disabled={loading}
                            readOnly={loading}
                            css={{borderRadius: '50px'}}
                            value={message}
                            placeholder="|Type a message"
                            className="bigger-cs"
                            onChange={(e) => setMessage(e.target.value)}
                            contentRight={(
                                <>
                                    <GrAttachment style={{color: '#263245', marginRight: '5px'}}/>
                                    <AiFillCamera style={{color: '#263245'}}/>
                                </>
                            )}
                            contentLeft={(
                                <MdEmojiEmotions style={{color: '#263245'}}/>
                            )}
                        />
                    </Grid>
                    <Grid item container xs={2} sm={2} md={2} p={1} alignItems="center" justifyContent="center">
                        <NUIButton
                            auto
                            fullWidth
                            className="bg-gradient-2"
                            disabled={message.length === 0}
                            onPress={() => sendMessage()}
                            css={{color: '#ffffff', fontSize: '24px', borderRadius: '50px'}}
                            icon={loading ? <Loading type="spinner" size="lg"/> : <IoIosSend/>}
                        />
                    </Grid>
                </Grid>
            </Modal.Footer>
        </>
    );
};

export default ChatBox;
