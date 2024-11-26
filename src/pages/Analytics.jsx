import React, {useRef} from 'react';
import {Grid, Typography} from '@mui/material';
import {Dropdown as NUIDropdown, Table, Modal, Button, Text, Input, Row, Checkbox, Tooltip} from '@nextui-org/react';
import {IoExpand} from 'react-icons/io5';
import {AiOutlineHeart} from 'react-icons/ai';
import {BsCameraVideo, BsChatSquare, BsShare} from 'react-icons/bs';
import {FaPlus} from 'react-icons/fa';
import ReactEcharts from 'echarts-for-react';
import {ImFilePdf} from 'react-icons/im';
import bwFlag from '../data/bw-flag.png';
import zimFlag from '../data/zim-flag.png';
import {useStateContext} from '../contexts/ContextProvider';
import {TiTick} from "react-icons/ti";
import {FcCancel} from "react-icons/fc";
import {AiOutlineEye} from "react-icons/ai";
import UsersAccountsDashboard from "../components/New/UsersAccountsDashboard";
import AllPost from "../components/New/AllPosts";
import Interactions from "../components/New/Analytics/Interactions";
import InteractionsCharts from "../components/New/Analytics/InteractionsCharts";

const Analytics = () => {
    const {globalRadius} = useStateContext();
    const [selected, setSelected] = React.useState(new Set(['Botswana']));

    const selectedValue = React.useMemo(
        () => Array.from(selected).join(', ').replaceAll('_', ' '),
        [selected],
    );

    const [selected2, setSelected2] = React.useState(new Set(['Daily']));

    const selected2Value = React.useMemo(
        () => Array.from(selected2).join(', ').replaceAll('_', ' '),
        [selected2],
    );

    const [visible, setVisible] = React.useState(false);
    const handler = () => setVisible(true);

    const closeHandler = () => {
        setVisible(false);
    };

    const interactionOption = {
        xAxis: {
            data: ['18-24', '25-34', '35-44', '45-54', '55+'],
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
            splitLine: {
                show: false,
            }
        },
        tooltip: {
            trigger: 'item',
        },
        legend: {
            show: true,
            type: "scroll"
        },
        series: [
            {
                type: 'bar',
                data: [23, 20, 14, 20, 23, 17, 13],
                itemStyle: {
                    barBorderRadius: 50,
                    borderWidth: 0.5,
                    borderType: 'solid',
                    backgroundColor: '#FB3958',
                    color: '#FB3958',
                },
                barWidth: '15%',
            },
            {
                type: 'bar',
                data: [11, 10, 9, 10, 17, 12, 9],
                itemStyle: {
                    barBorderRadius: 50,
                    borderWidth: 0.5,
                    borderType: 'solid',
                    backgroundColor: '#0680B5',
                    color: '#0680B5',
                },
                barWidth: '18%',
            },
        ],
    };

    const locationOption = {
        tooltip: {
            trigger: 'item',
        },
        legend: {
            show: true,
            type: "scroll"
        },
        series: [
            {
                name: 'Location',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: true,
                label: {
                    show: false,
                    position: 'center',
                },
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
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
                        name: 'Cities',
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
                        name: 'Town',
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
                        name: 'Villages',
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

    const adminGroupByGender = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: '5%',
            left: 'center'
        },
        series: [
            {
                name: 'Admin Group By Gender',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: true,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 40,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    {value: 1048, name: 'Male'},
                    {value: 735, name: 'Female'},
                    {value: 300, name: 'Other'}
                ]
            }
        ]
    };

    const adminGroupByRole = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            show: true,
            type: "scroll"
        },
        series: [
            {
                name: 'Admin Group By Gender',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: true,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 40,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    {value: 1048, name: 'Admin'},
                    {value: 735, name: 'Super Admin'},
                    {value: 3030, name: 'Reviewer'}
                ]
            }
        ]
    };

    const adminGroupByRegion = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            show: true,
            type: "scroll"
        },
        series: [
            {
                name: 'Admin Group By Region',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: true,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 40,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: true
                },
                data: [
                    {value: 1048, name: 'Gaborone'},
                    {value: 7135, name: 'Central'},
                    {value: 1048, name: 'Ghanzi'},
                    {value: 1735, name: 'Kgalagadi'},
                    {value: 1048, name: 'Kgatleng'},
                    {value: 7135, name: 'Kweneng'},
                    {value: 1048, name: 'North East'},
                    {value: 735, name: 'South East'},
                    {value: 3200, name: 'Southern'}
                ]
            }
        ]
    };

    const adminGroupByInvite = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            show: true,
            type: "scroll"
        },
        series: [
            {
                name: 'Admin Group By Region',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: true,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 40,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: true
                },
                data: [
                    {value: 1048, name: 'registred'},
                    {value: 735, name: 'pending'}
                ]
            }
        ]
    };

    const userStatus = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            show: true,
            type: "scroll"
        },
        series: [
            {
                name: 'Admin Group By Region',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: true,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 40,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: true
                },
                data: [
                    {value: 1048, name: 'Active'},
                    {value: 135, name: 'Suspended'},
                    {value: 73, name: 'Deleted'},
                ]
            }
        ]
    };

    const userLoggedIn = {
        xAxis: {
            type: 'category',
            data: ['13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [23, 45, 76, 34, 12, 67, 99],
                type: 'line',
                smooth: true,
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 40,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: true
                }
            }
        ]
    }

    const userDailyLogins = {
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [6723, 5475, 7666, 3476, 1662, 7667, 699],
                type: 'line',
                smooth: true,
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 40,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: true
                }
            }
        ]
    }

    const userWeeklyLogins = {
        xAxis: {
            type: 'category',
            data: ['Week 1', 'Week 2', 'Week 3', 'Week 4']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [6723, 5475, 9666, 3476],
                type: 'bar',
                smooth: true,
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 40,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: true
                }
            }
        ]
    }

    const userMonthlyLogins = {
        xAxis: {
            type: 'category',
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [97620, 26700, 16650, 84450, 76780, 46710, 44130, 15660, 43280, 43270, 43211, 43213],
                type: 'bar',
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 40,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: true
                }
            }
        ]
    }

    const reportsTotal = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            show: true,
            type: "scroll"
        },
        series: [
            {
                name: 'Admin Group By Region',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: true,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 40,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: true
                },
                data: [
                    {value: 248, name: 'Inappropriate Language'},
                    {value: 408, name: 'Adult Content'},
                    {value: 148, name: 'Violence'},
                    {value: 118, name: 'Harmful or dangerous acts'},
                    {value: 108, name: 'Shocking content'},
                    {value: 618, name: 'Recreational drugs and drug-related content'},
                    {value: 648, name: 'Hateful and derogatory content'},
                ]
            }
        ]
    };

    const dailyReports = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            show: true,
            type: "scroll"
        },
        series: [
            {
                name: 'Admin Group By Region',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: true,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 40,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: true
                },
                data: [
                    {value: 2748, name: 'Inappropriate Language'},
                    {value: 7408, name: 'Adult Content'},
                    {value: 1848, name: 'Violence'},
                    {value: 1188, name: 'Harmful or dangerous acts'},
                    {value: 9108, name: 'Shocking content'},
                    {value: 6018, name: 'Recreational drugs and drug-related content'},
                    {value: 6480, name: 'Hateful and derogatory content'},
                ]
            }
        ]
    }

    const weeklyReports = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            show: true,
            type: "scroll"
        },
        series: [
            {
                name: 'Admin Group By Region',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: true,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 40,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: true
                },
                data: [
                    {value: 25248, name: 'Inappropriate Language'},
                    {value: 67408, name: 'Adult Content'},
                    {value: 98148, name: 'Violence'},
                    {value: 11218, name: 'Harmful or dangerous acts'},
                    {value: 63108, name: 'Shocking content'},
                    {value: 98618, name: 'Recreational drugs and drug-related content'},
                    {value: 17648, name: 'Hateful and derogatory content'},
                ]
            }
        ]
    }

    const monthlyReports = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            show: true,
            type: "scroll"
        },
        series: [
            {
                name: 'Admin Group By Region',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: true,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 40,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: true
                },
                data: [
                    {value: 987248, name: 'Inappropriate Language'},
                    {value: 764408, name: 'Adult Content'},
                    {value: 568148, name: 'Violence'},
                    {value: 234118, name: 'Harmful or dangerous acts'},
                    {value: 888108, name: 'Shocking content'},
                    {value: 235618, name: 'Recreational drugs and drug-related content'},
                    {value: 783648, name: 'Hateful and derogatory content'},
                ]
            }
        ]
    }

    const postFrequencyToday = {
        xAxis: {
            type: 'category',
            data: ['13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [523, 145, 1, 324, 121, 467, 699],
                type: 'line',
                smooth: true,
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 40,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: true
                }
            }
        ]
    }

    const postFrequencyThisWeek = {
        xAxis: {
            type: 'category',
            data: ['Week 1', 'Week 2', 'Week 3', 'Week 4']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [6723, 5475, 9666, 3476],
                type: 'line',
                smooth: true,
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 40,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: true
                }
            }
        ]
    }

    const postFrequencyWeekly = {
        xAxis: {
            type: 'category',
            data: ['Week 1', 'Week 2', 'Week 3', 'Week 4']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [672, 545, 966, 76],
                type: 'bar',
                smooth: true,
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 40,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: true
                }
            }
        ]
    }

    const postFrequencyMonthly = {
        xAxis: {
            type: 'category',
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [97620, 21700, 16650, 84450, 76780, 46710, 44130, 15660, 43280, 43270, 43211, 43213],
                type: 'bar',
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 40,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: true
                }
            }
        ]
    }

    const postTypesCount = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            show: true,
            type: "scroll"
        },
        series: [
            {
                name: 'Admin Group By Region',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: true,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 40,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: true
                },
                data: [
                    {value: 987248, name: 'Videos'},
                    {value: 764408, name: 'Music'},
                ]
            }
        ]
    }

    return (
        <>
            <Grid container p={4} pb={0}>
                <NUIDropdown>
                    <NUIDropdown.Button style={{
                        background: '#ffffff',
                        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                        fontSize: '22px',
                        padding: '25px',
                        color: '#000000'
                    }} className="app-color-secondary-4" css={{tt: 'capitalize'}}>
                        <Grid>
                            <img src={bwFlag} alt="" style={{
                                width: '30px',
                                borderRadius: '50%',
                                marginRight: '10px',
                                border: '1px solid grey'
                            }}/>
                        </Grid>
                        {selectedValue}
                    </NUIDropdown.Button>
                    <NUIDropdown.Menu aria-label="Static Actions" selectedKeys={selected}
                                      selectionMode="single" onSelectionChange={setSelected}>
                        <NUIDropdown.Item key="new">
                            <Grid container alignItems="center" direction="row">
                                <img src={bwFlag} alt="" style={{
                                    width: '30px',
                                    borderRadius: '50%',
                                    marginRight: '10px',
                                    border: '1px solid grey'
                                }}/>
                                Botswana
                            </Grid>
                        </NUIDropdown.Item>
                        <NUIDropdown.Item key="copy">
                            <Grid container alignItems="center" direction="row">
                                <img src={zimFlag} alt="" style={{
                                    width: '30px',
                                    borderRadius: '50%',
                                    marginRight: '10px',
                                    border: '1px solid grey'
                                }}/>
                                Some country
                            </Grid>
                        </NUIDropdown.Item>
                        <NUIDropdown.Item key="edit">
                            <Grid container alignItems="center" direction="row">
                                <img src={zimFlag} alt="" style={{
                                    width: '30px',
                                    borderRadius: '50%',
                                    marginRight: '10px',
                                    border: '1px solid grey'
                                }}/>
                                Some country
                            </Grid>
                        </NUIDropdown.Item>
                        <NUIDropdown.Item key="delete">
                            <Grid container alignItems="center" direction="row">
                                <img src={zimFlag} alt="" style={{
                                    width: '30px',
                                    borderRadius: '50%',
                                    marginRight: '10px',
                                    border: '1px solid grey'
                                }}/>
                                Some country
                            </Grid>
                        </NUIDropdown.Item>
                    </NUIDropdown.Menu>
                </NUIDropdown>
            </Grid>
            <Grid container p={2}>
                <Grid item container xs={12} sm={6} md={7} p={2}>
                    <Grid item p={4} container xs={12} sx={{
                        borderRadius: globalRadius,
                        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                        background: 'white'
                    }}>
                        <Grid item xs={12} container justifyContent="space-between" alignItems="center">
                            <Typography sx={{fontSize: '26px', fontWeight: '500'}}>
                                Interactions
                            </Typography>
                            <Typography sx={{fontStyle: 'italic', cursor: 'pointer'}} onClick={handler}>
                                <Grid className="app-color-secondary-3" item container justifyContent="space-between"
                                      alignItems="center" spacing="2">
                                    Expand Appearance
                                    <IoExpand style={{marginLeft: '10px'}}/>
                                </Grid>
                            </Typography>
                        </Grid>

                        <Grid item xs={12} container>
                            <Interactions/>
                        </Grid>
                    </Grid>
                    <Grid mt={2} p={4} item container xs={12} sx={{
                        borderRadius: globalRadius,
                        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                        background: 'white'
                    }}>
                        <Grid item xs={12} mb={3} container justifyContent="space-between" alignItems="center">
                            <Typography sx={{fontSize: '26px', fontWeight: '500'}}>
                                Registration / Gender
                            </Typography>
                            <NUIDropdown>
                                <NUIDropdown.Button style={{
                                    background: '#ffffff',
                                    borderRadius: '50px',
                                    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
                                }} className="app-color-secondary-4" css={{tt: 'capitalize'}}>
                                    {selected2Value}
                                </NUIDropdown.Button>
                                <NUIDropdown.Menu aria-label="Static Actions" selectedKeys={selected2}
                                                  selectionMode="single" onSelectionChange={setSelected2}>
                                    <NUIDropdown.Item key="new">
                                        Daily
                                    </NUIDropdown.Item>
                                    <NUIDropdown.Item key="copy">
                                        Monthly
                                    </NUIDropdown.Item>
                                    <NUIDropdown.Item key="edit">
                                        Year
                                    </NUIDropdown.Item>
                                </NUIDropdown.Menu>
                            </NUIDropdown>

                        </Grid>
                        <Grid
                            item
                            xs={12}
                            container
                        >
                            <ReactEcharts option={interactionOption} style={{height: '400px', width: '100%'}}/>
                        </Grid>
                    </Grid>

                </Grid>
                <Grid item container xs={12} sm={6} md={5} p={2}>
                    <Grid p={4} item container xs={12} sx={{
                        borderRadius: globalRadius,
                        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                        background: 'white'
                    }}>
                        <Grid container justifyContent="space-between" alignItems="center">
                            <Typography sx={{fontSize: '26px', fontWeight: '500'}}>
                                Location
                            </Typography>
                            <NUIDropdown>
                                <NUIDropdown.Button style={{
                                    background: '#ffffff',
                                    borderRadius: '50px',
                                    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
                                }} className="app-color-secondary-4" css={{tt: 'capitalize'}}>
                                    {selected2Value}
                                </NUIDropdown.Button>
                                <NUIDropdown.Menu aria-label="Static Actions" selectedKeys={selected2}
                                                  selectionMode="single" onSelectionChange={setSelected2}>
                                    <NUIDropdown.Item key="new">
                                        Daily
                                    </NUIDropdown.Item>
                                    <NUIDropdown.Item key="copy">
                                        Monthly
                                    </NUIDropdown.Item>
                                    <NUIDropdown.Item key="edit">
                                        Year
                                    </NUIDropdown.Item>
                                </NUIDropdown.Menu>
                            </NUIDropdown>

                        </Grid>

                        <Grid item xs={12} container>
                            <ReactEcharts option={locationOption} style={{height: '400px', width: '100%'}}/>
                        </Grid>
                    </Grid>
                    <Grid item mt={2} p={4} container xs={12} sx={{
                        borderRadius: globalRadius,
                        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                        background: 'white'
                    }}>
                        <Grid item container justifyContent="center" alignItems="center">
                            <Typography sx={{fontSize: '26px'}}>
                                Star Of The Day
                            </Typography>

                        </Grid>
                        <Grid item xs={12} container justifyContent="center" alignItems="center">
                            <table style={{height: 'auto', width: '100%'}}>
                                <thead style={{textAlign: 'center', color: '#fff'}} className="bg-gradient">
                                <tr>
                                    <th style={{padding: '10px'}}>Gender</th>
                                    <th style={{padding: '10px'}}>Age</th>
                                    <th style={{padding: '10px'}}>Location</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr style={{textAlign: 'center', paddingTop: '30px', border: '1px solid #A1A0A0'}}>
                                    <td style={{paddingTop: '40px', paddingBottom: '40px'}}>Male</td>
                                    <td style={{
                                        paddingTop: '40px',
                                        paddingBottom: '40px',
                                        border: '1px solid #A1A0A0'
                                    }}>34-45
                                    </td>
                                    <td style={{paddingTop: '40px', paddingBottom: '40px'}}>Serowe</td>
                                </tr>
                                </tbody>
                            </table>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item container xs={12} p={2}>
                    <Grid p={1} item container xs={12} sm={6} md={3}>
                        <Grid p={3} item container xs={12} sx={{
                            borderRadius: globalRadius,
                            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                            background: 'white'
                        }}>
                            <Grid container justifyContent="center" alignItems="center">
                                <Typography sx={{fontSize: '26px', fontWeight: '500'}}>
                                    Admin Gender
                                </Typography>
                            </Grid>
                            <Grid container justifyContent="center" alignItems="center">
                                <ReactEcharts option={adminGroupByGender} style={{width: '100%'}}/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid p={1} item container xs={12} sm={6} md={3}>
                        <Grid p={3} item container xs={12} sx={{
                            borderRadius: globalRadius,
                            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                            background: 'white'
                        }}>
                            <Grid container justifyContent="center" alignItems="center">
                                <Typography sx={{fontSize: '26px', fontWeight: '500'}}>
                                    Admin Region
                                </Typography>
                            </Grid>
                            <Grid container justifyContent="center" alignItems="center">
                                <ReactEcharts option={adminGroupByRegion} style={{width: '100%'}}/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid p={1} item container xs={12} sm={6} md={3}>
                        <Grid p={3} item container xs={12} sx={{
                            borderRadius: globalRadius,
                            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                            background: 'white'
                        }}>
                            <Grid container justifyContent="center" alignItems="center">
                                <Typography sx={{fontSize: '26px', fontWeight: '500'}}>
                                    Admin Roles
                                </Typography>
                            </Grid>
                            <Grid container justifyContent="center" alignItems="center">
                                <ReactEcharts option={adminGroupByRole} style={{width: '100%'}}/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid p={1} item container xs={12} sm={6} md={3}>
                        <Grid p={3} item container xs={12} sx={{
                            borderRadius: globalRadius,
                            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                            background: 'white'
                        }}>
                            <Grid container justifyContent="center" alignItems="center">
                                <Typography sx={{fontSize: '26px', fontWeight: '500'}}>
                                    Admin Invites
                                </Typography>
                            </Grid>
                            <Grid container justifyContent="center" alignItems="center">
                                <ReactEcharts option={adminGroupByInvite} style={{width: '100%'}}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item container xs={12} p={2}>
                    <Grid p={4} item container xs={12} sx={{
                        borderRadius: globalRadius,
                        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                        background: 'white'
                    }}>
                        <Grid style={{width: '100%', overflow: 'auto'}}>
                            <Table
                                bordered={false}
                                shadow={false}
                                aria-label="roles table"
                                style={{
                                    height: "auto",
                                    minWidth: '100%',
                                }}
                            >
                                <Table.Header>
                                    <Table.Column>ROLE</Table.Column>
                                    <Table.Column>PERMISSIONS</Table.Column>
                                    <Table.Column>COUNT</Table.Column>
                                    <Table.Column>CREATED</Table.Column>
                                    <Table.Column></Table.Column>
                                </Table.Header>
                                <Table.Body>
                                    <Table.Row key="1">
                                        <Table.Cell>Super Admin</Table.Cell>
                                        <Table.Cell>
                                            <Tooltip content={(
                                                <ul style={{color: '#17C964'}}>
                                                    <li><TiTick style={{display: 'inline'}}/> Declare Users</li>
                                                    <li><TiTick style={{display: 'inline'}}/> Message Users</li>
                                                    <li><TiTick style={{display: 'inline'}}/> View Admins</li>
                                                </ul>
                                            )} css={{width: 'auto'}}>
                                                <Text css={{
                                                    background: '#17C964',
                                                    margin: '0 4px',
                                                    color: '#ffffff',
                                                    borderRadius: '50px',
                                                    padding: '2px 15px'
                                                }}>
                                                    3 allowed
                                                </Text>
                                            </Tooltip>
                                            <Tooltip content={(
                                                <ul style={{color: '#F31260'}}>
                                                    <li><FcCancel style={{display: 'inline'}}/> Delete Admin</li>
                                                    <li><FcCancel style={{display: 'inline'}}/> Delete Users</li>
                                                </ul>
                                            )} css={{width: 'auto'}}>
                                                <Text css={{
                                                    background: '#F31260',
                                                    margin: '0 4px',
                                                    color: '#ffffff',
                                                    borderRadius: '50px',
                                                    padding: '2px 15px'
                                                }}>
                                                    2 denied
                                                </Text>
                                            </Tooltip>
                                        </Table.Cell>
                                        <Table.Cell>34</Table.Cell>
                                        <Table.Cell>13 May 2020 - 05:05</Table.Cell>
                                        <Table.Cell><AiOutlineEye style={{fontSize: '27px'}}/></Table.Cell>
                                    </Table.Row>
                                    <Table.Row key="2">
                                        <Table.Cell>Admin</Table.Cell>
                                        <Table.Cell>
                                            <Tooltip content={(
                                                <ul style={{color: '#17C964'}}>
                                                    <li><TiTick style={{display: 'inline'}}/> Declare Users</li>
                                                    <li><TiTick style={{display: 'inline'}}/> Message Users</li>
                                                </ul>
                                            )} css={{width: 'auto'}}>
                                                <Text css={{
                                                    background: '#17C964',
                                                    margin: '0 4px',
                                                    color: '#ffffff',
                                                    borderRadius: '50px',
                                                    padding: '2px 15px'
                                                }}>
                                                    2 allowed
                                                </Text>
                                            </Tooltip>
                                            <Tooltip content={(
                                                <ul style={{color: '#F31260'}}>
                                                    <li><FcCancel style={{display: 'inline'}}/> Delete Admin</li>
                                                    <li><FcCancel style={{display: 'inline'}}/> Delete Users</li>
                                                    <li><FcCancel style={{display: 'inline'}}/> View Admins</li>
                                                </ul>
                                            )} css={{width: 'auto'}}>
                                                <Text css={{
                                                    background: '#F31260',
                                                    margin: '0 4px',
                                                    color: '#ffffff',
                                                    borderRadius: '50px',
                                                    padding: '2px 15px'
                                                }}>
                                                    3 denied
                                                </Text>
                                            </Tooltip>
                                        </Table.Cell>
                                        <Table.Cell>102</Table.Cell>
                                        <Table.Cell>01 Dec 2021 - 21:01</Table.Cell>
                                        <Table.Cell><AiOutlineEye style={{fontSize: '27px'}}/></Table.Cell>
                                    </Table.Row>
                                    <Table.Row key="3">
                                        <Table.Cell>Reviewer</Table.Cell>
                                        <Table.Cell>
                                            <Tooltip content={(
                                                <ul style={{color: '#17C964'}}>
                                                    <li><TiTick style={{display: 'inline'}}/> Message Users</li>
                                                </ul>
                                            )} css={{width: 'auto'}}>
                                                <Text css={{
                                                    background: '#17C964',
                                                    margin: '0 4px',
                                                    color: '#ffffff',
                                                    borderRadius: '50px',
                                                    padding: '2px 15px'
                                                }}>
                                                    1 allowed
                                                </Text>
                                            </Tooltip>
                                            <Tooltip content={(
                                                <ul style={{color: '#F31260'}}>
                                                    <li><FcCancel style={{display: 'inline'}}/> Delete Admin</li>
                                                    <li><FcCancel style={{display: 'inline'}}/> Delete Users</li>
                                                    <li><FcCancel style={{display: 'inline'}}/> View Admins</li>
                                                    <li><FcCancel style={{display: 'inline'}}/> Declare Users</li>
                                                </ul>
                                            )} css={{width: 'auto'}}>
                                                <Text css={{
                                                    background: '#F31260',
                                                    margin: '0 4px',
                                                    color: '#ffffff',
                                                    borderRadius: '50px',
                                                    padding: '2px 15px'
                                                }}>
                                                    4 denied
                                                </Text>
                                            </Tooltip>
                                        </Table.Cell>
                                        <Table.Cell>789</Table.Cell>
                                        <Table.Cell>12 Oct 2021 - 03:56</Table.Cell>
                                        <Table.Cell><AiOutlineEye style={{fontSize: '27px'}}/></Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item container xs={12} p={2}>
                    <Grid p={1} item container xs={12} sm={6} md={4}>
                        <Grid p={3} item container xs={12} sx={{
                            borderRadius: globalRadius,
                            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                            background: 'white'
                        }}>
                            <Grid container justifyContent="center" alignItems="center">
                                <Typography sx={{fontSize: '26px', fontWeight: '500'}}>
                                    Users Gender
                                </Typography>
                            </Grid>
                            <Grid container justifyContent="center" alignItems="center">
                                <ReactEcharts option={adminGroupByGender} style={{width: '100%'}}/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid p={1} item container xs={12} sm={6} md={4}>
                        <Grid p={3} item container xs={12} sx={{
                            borderRadius: globalRadius,
                            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                            background: 'white'
                        }}>
                            <Grid container justifyContent="center" alignItems="center">
                                <Typography sx={{fontSize: '26px', fontWeight: '500'}}>
                                    Users Region
                                </Typography>
                            </Grid>
                            <Grid container justifyContent="center" alignItems="center">
                                <ReactEcharts option={adminGroupByRegion} style={{width: '100%'}}/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid p={1} item container xs={12} sm={6} md={4}>
                        <Grid p={3} item container xs={12} sx={{
                            borderRadius: globalRadius,
                            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                            background: 'white'
                        }}>
                            <Grid container justifyContent="center" alignItems="center">
                                <Typography sx={{fontSize: '26px', fontWeight: '500'}}>
                                    Users Status
                                </Typography>
                            </Grid>
                            <Grid container justifyContent="center" alignItems="center">
                                <ReactEcharts option={userStatus} style={{width: '100%'}}/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid p={1} item container xs={12} sm={6} md={6}>
                        <Grid p={3} item container xs={12} sx={{
                            borderRadius: globalRadius,
                            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                            background: 'white'
                        }}>
                            <Grid container justifyContent="center" alignItems="center">
                                <Typography sx={{fontSize: '26px', fontWeight: '500'}}>
                                    User Active Sessions
                                </Typography>
                            </Grid>
                            <Grid container justifyContent="center" alignItems="center">
                                <ReactEcharts option={userLoggedIn} style={{width: '100%'}}/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid p={1} item container xs={12} sm={6} md={6}>
                        <Grid p={3} item container xs={12} sx={{
                            borderRadius: globalRadius,
                            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                            background: 'white'
                        }}>
                            <Grid container justifyContent="center" alignItems="center">
                                <Typography sx={{fontSize: '26px', fontWeight: '500'}}>
                                    User Logins This Week
                                </Typography>
                            </Grid>
                            <Grid container justifyContent="center" alignItems="center">
                                <ReactEcharts option={userDailyLogins} style={{width: '100%'}}/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid p={1} item container xs={12} sm={6} md={6}>
                        <Grid p={3} item container xs={12} sx={{
                            borderRadius: globalRadius,
                            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                            background: 'white'
                        }}>
                            <Grid container justifyContent="center" alignItems="center">
                                <Typography sx={{fontSize: '26px', fontWeight: '500'}}>
                                    User Weekly Logins This Month
                                </Typography>
                            </Grid>
                            <Grid container justifyContent="center" alignItems="center">
                                <ReactEcharts option={userWeeklyLogins} style={{width: '100%'}}/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid p={1} item container xs={12} sm={6} md={6}>
                        <Grid p={3} item container xs={12} sx={{
                            borderRadius: globalRadius,
                            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                            background: 'white'
                        }}>
                            <Grid container justifyContent="center" alignItems="center">
                                <Typography sx={{fontSize: '26px', fontWeight: '500'}}>
                                    User Monthly Logins This Year
                                </Typography>
                            </Grid>
                            <Grid container justifyContent="center" alignItems="center">
                                <ReactEcharts option={userMonthlyLogins} style={{width: '100%'}}/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid p={1} item container xs={12}>
                        <UsersAccountsDashboard mode={'compact'}/>
                    </Grid>

                    <Grid p={1} item container xs={12} sm={6} md={6}>
                        <Grid p={3} item container xs={12} sx={{
                            borderRadius: globalRadius,
                            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                            background: 'white'
                        }}>
                            <Grid container justifyContent="center" alignItems="center">
                                <Typography sx={{fontSize: '26px', fontWeight: '500'}}>
                                    Reports Total
                                </Typography>
                            </Grid>
                            <Grid container justifyContent="center" alignItems="center">
                                <ReactEcharts option={reportsTotal} style={{width: '100%'}}/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid p={1} item container xs={12} sm={6} md={6}>
                        <Grid p={3} item container xs={12} sx={{
                            borderRadius: globalRadius,
                            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                            background: 'white'
                        }}>
                            <Grid container justifyContent="center" alignItems="center">
                                <Typography sx={{fontSize: '26px', fontWeight: '500'}}>
                                    Reports This Week
                                </Typography>
                            </Grid>
                            <Grid container justifyContent="center" alignItems="center">
                                <ReactEcharts option={dailyReports} style={{width: '100%'}}/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid p={1} item container xs={12} sm={6} md={6}>
                        <Grid p={3} item container xs={12} sx={{
                            borderRadius: globalRadius,
                            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                            background: 'white'
                        }}>
                            <Grid container justifyContent="center" alignItems="center">
                                <Typography sx={{fontSize: '26px', fontWeight: '500'}}>
                                    Weekly Reports This Month
                                </Typography>
                            </Grid>
                            <Grid container justifyContent="center" alignItems="center">
                                <ReactEcharts option={weeklyReports} style={{width: '100%'}}/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid p={1} item container xs={12} sm={6} md={6}>
                        <Grid p={3} item container xs={12} sx={{
                            borderRadius: globalRadius,
                            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                            background: 'white'
                        }}>
                            <Grid container justifyContent="center" alignItems="center">
                                <Typography sx={{fontSize: '26px', fontWeight: '500'}}>
                                    Monthly Reports This Year
                                </Typography>
                            </Grid>
                            <Grid container justifyContent="center" alignItems="center">
                                <ReactEcharts option={monthlyReports} style={{width: '100%'}}/>
                            </Grid>
                        </Grid>
                    </Grid>


                    <Grid p={1} item container xs={12} sm={6} md={6}>
                        <Grid p={3} item container xs={12} sx={{
                            borderRadius: globalRadius,
                            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                            background: 'white'
                        }}>
                            <Grid container justifyContent="center" alignItems="center">
                                <Typography sx={{fontSize: '26px', fontWeight: '500'}}>
                                    Post Frequency Today
                                </Typography>
                            </Grid>
                            <Grid container justifyContent="center" alignItems="center">
                                <ReactEcharts option={postFrequencyToday} style={{width: '100%'}}/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid p={1} item container xs={12} sm={6} md={6}>
                        <Grid p={3} item container xs={12} sx={{
                            borderRadius: globalRadius,
                            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                            background: 'white'
                        }}>
                            <Grid container justifyContent="center" alignItems="center">
                                <Typography sx={{fontSize: '26px', fontWeight: '500'}}>
                                    Post Frequency This Week
                                </Typography>
                            </Grid>
                            <Grid container justifyContent="center" alignItems="center">
                                <ReactEcharts option={postFrequencyThisWeek} style={{width: '100%'}}/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid p={1} item container xs={12} sm={6} md={6}>
                        <Grid p={3} item container xs={12} sx={{
                            borderRadius: globalRadius,
                            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                            background: 'white'
                        }}>
                            <Grid container justifyContent="center" alignItems="center">
                                <Typography sx={{fontSize: '26px', fontWeight: '500'}}>
                                    Post Frequency This Month
                                </Typography>
                            </Grid>
                            <Grid container justifyContent="center" alignItems="center">
                                <ReactEcharts option={postFrequencyWeekly} style={{width: '100%'}}/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid p={1} item container xs={12} sm={6} md={6}>
                        <Grid p={3} item container xs={12} sx={{
                            borderRadius: globalRadius,
                            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                            background: 'white'
                        }}>
                            <Grid container justifyContent="center" alignItems="center">
                                <Typography sx={{fontSize: '26px', fontWeight: '500'}}>
                                    Post Types
                                </Typography>
                            </Grid>
                            <Grid container justifyContent="center" alignItems="center">
                                <ReactEcharts option={postTypesCount} style={{width: '100%'}}/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid p={1} item container xs={12}>
                        <Grid p={3} item container xs={12} sx={{
                            borderRadius: globalRadius,
                            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                            background: 'white'
                        }}>
                            <Grid container justifyContent="center" alignItems="center">
                                <Typography sx={{fontSize: '26px', fontWeight: '500'}}>
                                    Post Frequency This Year
                                </Typography>
                            </Grid>
                            <Grid container justifyContent="center" alignItems="center">
                                <ReactEcharts option={postFrequencyMonthly} style={{width: '100%'}}/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid p={1} item container xs={12}>
                        <AllPost/>
                    </Grid>
                </Grid>
            </Grid>

            <Modal blur closeButton width="650px" aria-labelledby="modal-title" open={visible} onClose={closeHandler}>
                <InteractionsCharts/>
            </Modal>
        </>
    );
};

export default Analytics;
