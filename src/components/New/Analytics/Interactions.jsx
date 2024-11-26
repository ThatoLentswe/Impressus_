import React, {useEffect, useRef, useState} from 'react';
import {useStateContext} from '../../../contexts/ContextProvider';
import {Grid, Typography} from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";
import {globalConfig} from "../../../globalConfig";
import UseToken from "../../../hooks/UseToken";
import {FaHeart, FaPlus} from "react-icons/fa";
import {AiFillCamera, AiOutlineHeart} from "react-icons/ai";
import {BsCameraVideo, BsChatSquare, BsShare} from "react-icons/bs";
import {useDraggable} from "react-use-draggable-scroll";
import {Loading} from "@nextui-org/react";

const Interactions = () => {
    const {globalRadius} = useStateContext();

    const ref = useRef();
    const {events} = useDraggable(ref);

    const [loading, setLoading] = useState(false);
    const [token] = UseToken();
    const {backend} = globalConfig;
    const isMounted = true;

    const [interactions, setInteractions] = useState(null);
    const getInteractions = async () => {
        setLoading(true);
        await axios.get(`${backend}/analytics/stats/post-stats/none`, {headers: {Authorization: `Bearer ${token}`}})
            .then((response) => {
                setLoading(false);

                if (isMounted) {
                    setInteractions(response.data.data);
                } else {
                    setInteractions(response.data.data);
                }
            })
            .catch(() => {
                setLoading(false);
                toast.error('an error occurred');
            });
    };

    useEffect(() => {
        getInteractions()
    }, []);

    return (
        <>
            <div className="flex maxWidthFlex space-x-3 overflow-x-scroll scrollbar-hide" {...events}
                 ref={ref}>
                <div className="flex-none" style={{width: '300px', marginBottom: '10px'}}>
                    <Grid sx={{width: '100%', background: '#FB3958', borderRadius: globalRadius}}
                          container p={2}>
                        <Grid item xs={6} container justifyContent="center" alignItems="center">
                            <AiOutlineHeart style={{color: '#ffffff', fontSize: '96px'}}/>
                        </Grid>
                        <Grid item xs={6} container direction="column" justifyContent="center"
                              style={{color: '#ffffff'}}>
                            <Typography style={{fontWeight: '100'}}>Likes</Typography>
                            <Typography mt={1} style={{fontSize: '22px'}}>
                                {loading ? (
                                    <Loading type="spinner"
                                             size="lg"/>) : interactions && interactions.totalLikes || '--'}
                            </Typography>
                        </Grid>
                    </Grid>
                </div>
                <div className="flex-none" style={{width: '300px', marginBottom: '10px'}}>
                    <Grid sx={{width: '100%', background: '#0680B5', borderRadius: globalRadius}}
                          container p={2}>
                        <Grid item xs={6} container justifyContent="center" alignItems="center">
                            <BsCameraVideo style={{color: '#ffffff', fontSize: '96px'}}/>
                        </Grid>
                        <Grid item xs={6} container direction="column" justifyContent="center"
                              style={{color: '#ffffff'}}>
                            <Typography style={{fontWeight: '100'}}>Posts</Typography>
                            <Typography mt={1} style={{fontSize: '22px'}}>
                                {loading ? (
                                    <Loading type="spinner"
                                             size="lg"/>) : interactions && interactions.postCount || '--'}
                            </Typography>
                        </Grid>
                    </Grid>
                </div>
                <div className="flex-none" style={{width: '300px', marginBottom: '10px'}}>
                    <Grid sx={{width: '100%', background: '#33CC60', borderRadius: globalRadius}}
                          container p={2}>
                        <Grid item xs={6} container justifyContent="center" alignItems="center">
                            <BsShare style={{color: '#ffffff', fontSize: '96px'}}/>
                        </Grid>
                        <Grid item xs={6} container direction="column" justifyContent="center"
                              style={{color: '#ffffff'}}>
                            <Typography style={{fontWeight: '100'}}>Shares</Typography>
                            <Typography mt={1} style={{fontSize: '22px'}}>
                                {loading ? (
                                    <Loading type="spinner" size="lg"/>) : 'NA'}
                            </Typography>
                        </Grid>
                    </Grid>
                </div>
                <div className="flex-none" style={{width: '300px', marginBottom: '10px'}}>
                    <Grid sx={{width: '100%', background: '#b69b42', borderRadius: globalRadius}}
                          container p={2}>
                        <Grid item xs={6} container justifyContent="center" alignItems="center">
                            <BsChatSquare style={{color: '#ffffff', fontSize: '96px'}}/>
                        </Grid>
                        <Grid item xs={6} container direction="column" justifyContent="center"
                              style={{color: '#ffffff'}}>
                            <Typography style={{fontWeight: '100'}}>Views</Typography>
                            <Typography mt={1} style={{fontSize: '22px'}}>
                                {loading ? (
                                    <Loading type="spinner"
                                             size="lg"/>) : interactions && interactions.totalViews || '--'}
                            </Typography>
                        </Grid>
                    </Grid>
                </div>
                <div className="flex-none" style={{width: '300px', marginBottom: '10px'}}>
                    <Grid sx={{width: '100%', background: '#7742B6', borderRadius: globalRadius}}
                          container p={2}>
                        <Grid item xs={6} container justifyContent="center" alignItems="center">
                            <BsChatSquare style={{color: '#ffffff', fontSize: '96px'}}/>
                        </Grid>
                        <Grid item xs={6} container direction="column" justifyContent="center"
                              style={{color: '#ffffff'}}>
                            <Typography style={{fontWeight: '100'}}>Comments</Typography>
                            <Typography mt={1} style={{fontSize: '22px'}}>
                                {loading ? (
                                    <Loading type="spinner"
                                             size="lg"/>) : interactions && interactions.totalComments || '--'}
                            </Typography>
                        </Grid>
                    </Grid>
                </div>
                <div className="flex-none" style={{width: '300px', marginBottom: '10px'}}>
                    <Grid sx={{width: '100%', background: '#E9E9E9', borderRadius: globalRadius}}
                          container justifyContent="center" alignItems="center" p={2}>
                        <FaPlus style={{color: '#A1A1A1', fontSize: '96px'}}/>
                    </Grid>
                </div>
            </div>
        </>
    );
};

export default Interactions;
