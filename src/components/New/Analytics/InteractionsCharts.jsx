import React, {useEffect, useState} from 'react';
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
import {Dropdown as NUIDropdown, Loading, Modal, Text} from "@nextui-org/react";
import ReactEcharts from "echarts-for-react";
import {ImFilePdf} from "react-icons/im";

const InteractionsCharts = () => {
    const {globalRadius} = useStateContext();


    const [selected, setSelected] = React.useState(new Set(['Daily']));

    const selectedValue = React.useMemo(
        () => Array.from(selected).join(', ').replaceAll('_', ' '),
        [selected],
    );

    const [loading, setLoading] = useState(false);
    const [token] = UseToken();
    const {backend} = globalConfig;
    const isMounted = true;

    const [interactions, setInteractions] = useState(null);
    const getInteractions = async () => {
        setLoading(true);
        await axios.get(`${backend}/analytics/stats/post-stats/${selectedValue}`, {headers: {Authorization: `Bearer ${token}`}})
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
    }, [selectedValue]);


    const modalOption1 = {
        xAxis: {
            data: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
            showGrid: false,
            show: true,
            axisLine: {
                show: false, // Hide full Line
            },
            xisTick: {
                show: false, // Hide Ticks,
            },
        },
        yAxis: {
            show: false,
            splitLine: {
                show: false,
            }
        },
        series: [
            {
                type: 'bar',
                data: [23, 24, 18, 25, 27, 28, 25],
                itemStyle: {
                    barBorderRadius: 50,
                    borderWidth: 0.5,
                    borderType: 'solid',
                    backgroundColor: '#0680B5',
                    color: '#EF3D5B',
                },
                barWidth: '10%',
            },
        ],
    };

    const modalOption2 = {
        xAxis: {
            data: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
            showGrid: false,
            show: true,
            axisLine: {
                show: false, // Hide full Line
            },
            xisTick: {
                show: false, // Hide Ticks,
            },
        },
        yAxis: {
            show: false,
            splitLine: {
                show: false,
            }
        },
        series: [
            {
                type: 'bar',
                data: [23, 24, 18, 25, 27, 28, 25],
                itemStyle: {
                    barBorderRadius: 50,
                    borderWidth: 0.5,
                    borderType: 'solid',
                    backgroundColor: '#0680B5',
                    color: '#0680B5',
                },
                barWidth: '10%',
            },
        ],
    };

    const modalOption3 = {
        xAxis: {
            data: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
            showGrid: false,
            show: true,
            axisLine: {
                show: false, // Hide full Line
            },
            xisTick: {
                show: false, // Hide Ticks,
            },
        },
        yAxis: {
            show: false,
            splitLine: {
                show: false,
            }
        },
        series: [
            {
                type: 'bar',
                data: [23, 24, 18, 25, 27, 28, 25],
                itemStyle: {
                    barBorderRadius: 50,
                    borderWidth: 0.5,
                    borderType: 'solid',
                    backgroundColor: '#0680B5',
                    color: '#33CC60',
                },
                barWidth: '10%',
            },
        ],
    };

    const modalOption4 = {
        xAxis: {
            data: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
            showGrid: false,
            show: true,
            axisLine: {
                show: false, // Hide full Line
            },
            xisTick: {
                show: false, // Hide Ticks,
            },
        },
        yAxis: {
            show: false,
            splitLine: {
                show: false,
            }
        },
        series: [
            {
                type: 'bar',
                data: [23, 24, 18, 25, 27, 28, 25],
                itemStyle: {
                    barBorderRadius: 50,
                    borderWidth: 0.5,
                    borderType: 'solid',
                    backgroundColor: '#0680B5',
                    color: '#7742B6',
                },
                barWidth: '10%',
            },
        ],
    };
    return (
        <>
            <Modal.Header>
                <Text id="modal-title" size={18}>
                    <NUIDropdown>
                        <NUIDropdown.Button style={{
                            background: '#ffffff',
                            borderRadius: '50px',
                            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
                        }} className="app-color-secondary-4" css={{tt: 'capitalize'}}>
                            {selectedValue}
                        </NUIDropdown.Button>
                        <NUIDropdown.Menu aria-label="Static Actions" selectedKeys={selected}
                                          onSelectionChange={setSelected} selectionMode={"single"}>
                            <NUIDropdown.Item key="daily">
                                Daily
                            </NUIDropdown.Item>
                            <NUIDropdown.Item key="monthly">
                                Monthly
                            </NUIDropdown.Item>
                            <NUIDropdown.Item key="yearly">
                                Year
                            </NUIDropdown.Item>
                        </NUIDropdown.Menu>
                    </NUIDropdown>
                </Text>
            </Modal.Header>
            <Modal.Body>
                <Grid container>
                    <Grid item xs={12} mb={3} style={{
                        backgroundColor: '#ffffff',
                        borderRadius: globalRadius,
                        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                        marginBottom: '10px'
                    }} container direction="row" justifyContent="space-between" alignItems="center">
                        <div className="flex-none" style={{width: '190px'}}>
                            <Grid sx={{width: '100%', background: '#FB3958', borderRadius: globalRadius}} container
                                  p={1}>
                                <Grid item xs={6} container justifyContent="center" alignItems="center">
                                    <AiOutlineHeart style={{color: '#ffffff', fontSize: '86px'}}/>
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
                        <Grid item justifyContent="center" alignItems="center" style={{width: '410px'}}>
                            <ReactEcharts option={modalOption1} style={{height: '100px', width: '100%'}}/>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} mb={3} style={{
                        backgroundColor: '#ffffff',
                        borderRadius: globalRadius,
                        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                        marginBottom: '10px'
                    }} container justifyContent="space-between" alignItems="center">
                        <div className="flex-none" style={{width: '190px'}}>
                            <Grid sx={{width: '100%', background: '#0680B5', borderRadius: globalRadius}} container
                                  p={1}>
                                <Grid item xs={6} pr={1} container justifyContent="center" alignItems="center">
                                    <BsCameraVideo style={{color: '#ffffff', fontSize: '86px'}}/>
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
                        <Grid item justifyContent="center" alignItems="center" style={{width: '410px'}}>
                            <ReactEcharts option={modalOption2} style={{height: '100px', width: '100%'}}/>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} mb={3} container justifyContent="space-between" alignItems="center" style={{
                        backgroundColor: '#ffffff',
                        borderRadius: globalRadius,
                        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                        marginBottom: '10px'
                    }}>
                        <div className="flex-none" style={{width: '190px'}}>
                            <Grid sx={{width: '100%', background: '#33CC60', borderRadius: globalRadius}} container
                                  p={1}>
                                <Grid item xs={6} pr={1} container justifyContent="center" alignItems="center">
                                    <BsShare style={{color: '#ffffff', fontSize: '86px'}}/>
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
                        <Grid item justifyContent="center" alignItems="center" style={{width: '410px'}}>
                            <ReactEcharts option={modalOption3} style={{height: '100px', width: '100%'}}/>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} mb={3} container justifyContent="space-between" alignItems="center" style={{
                        backgroundColor: '#ffffff',
                        borderRadius: globalRadius,
                        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                        marginBottom: '10px'
                    }}>
                        <div className="flex-none" style={{width: '190px'}}>
                            <Grid sx={{width: '100%', background: '#b69b42', borderRadius: globalRadius}} container
                                  p={1}>
                                <Grid item xs={6} pr={1} container justifyContent="center" alignItems="center">
                                    <BsShare style={{color: '#ffffff', fontSize: '86px'}}/>
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
                        <Grid item justifyContent="center" alignItems="center" style={{width: '410px'}}>
                            <ReactEcharts option={modalOption3} style={{height: '100px', width: '100%'}}/>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} mb={3} container justifyContent="space-between" alignItems="center" style={{
                        backgroundColor: '#ffffff',
                        borderRadius: globalRadius,
                        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                        marginBottom: '10px'
                    }}>
                        <div className="flex-none" style={{width: '190px'}}>
                            <Grid sx={{width: '100%', background: '#7742B6', borderRadius: globalRadius}} container
                                  p={1}>
                                <Grid item xs={6} pr={1} container justifyContent="center" alignItems="center">
                                    <BsChatSquare style={{color: '#ffffff', fontSize: '86px'}}/>
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
                        <Grid item justifyContent="center" alignItems="center" style={{width: '410px'}}>
                            <ReactEcharts option={modalOption4} style={{height: '100px', width: '100%'}}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Modal.Body>
            <Modal.Footer>
                <Grid container direction="row" justifyContent="center" alignItems="center"
                      style={{color: '#B8B8B8', cursor: 'pointer'}}>
                    <Grid item container justifyContent="center" alignItems="center" p={2} mr={2} sx={{
                        borderRadius: globalRadius,
                        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                        background: 'white',
                        width: '90px',
                        fontSize: '20px'
                    }}>
                        <ImFilePdf/>
                    </Grid>
                    <Typography>Download Data</Typography>
                </Grid>
            </Modal.Footer>
        </>
    );
};

export default InteractionsCharts;
