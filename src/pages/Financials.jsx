import {Grid, Typography} from '@mui/material';
import {Button as NUIButton} from '@nextui-org/react';
import React from 'react';
import {useStateContext} from '../contexts/ContextProvider';
import PaymentRecords from "../components/New/PaymentRecords";

const Financials = () => {
    const {globalRadius} = useStateContext();

    const revenueStats = [{name: 'Daily', value: 'P 2 000.00'}, {
        name: 'Weekly',
        value: 'P 10 000.00'
    }, {name: 'Monthly', value: 'P 90 000.00'}, {name: 'Yearly', value: 'P 200 000.00'}];
    const packageSales = [
        {
            name: '24 Hours',
            data: [
                {
                    name: 'Daily Sales',
                    value: '30',
                },
                {
                    name: 'Weekly Sales',
                    value: '3 000',
                },
                {
                    name: 'Monthly Sales',
                    value: '60 000',
                },
                {
                    name: 'Yearly Sales',
                    value: '170 000',
                },
            ],
        },
        {
            name: '15 Days',
            data: [
                {
                    name: 'Daily Sales',
                    value: '100',
                },
                {
                    name: 'Weekly Sales',
                    value: '4500',
                },
                {
                    name: 'Monthly Sales',
                    value: '45 000',
                },
                {
                    name: 'Yearly Sales',
                    value: '200 000',
                },
            ],
        },
        {
            name: '30 Days',
            data: [
                {
                    name: 'Daily Sales',
                    value: '30',
                },
                {
                    name: 'Weekly Sales',
                    value: '500',
                },
                {
                    name: 'Monthly Sales',
                    value: '10 000',
                },
                {
                    name: 'Yearly Sales',
                    value: '90 000',
                },
            ],
        },
    ];
    return (
        <Grid container p={2}>
            <Grid p={3} xs={12} sx={{
                borderRadius: globalRadius,
                boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                background: 'white'
            }} container justifyContent="flex-start" alignItems="center">

                <Grid xs={12} item direction="row">
                    <Typography ml={2} sx={{fontSize: '25px', fontWeight: '300'}}>
                        Revenue Stats
                    </Typography>
                </Grid>

                {
                    revenueStats.map((stats, index) => (
                        <Grid xs={6} md={3} key={index} item container direction="row" p={1}>
                            <Grid direction="row" item container p={3} xs={12} style={{
                                borderRadius: globalRadius,
                                boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                                background: 'white'
                            }} justifyContent="center" alignItems="center">
                                <Grid xs={12} item>
                                    <NUIButton auto className="bg-gradient" css={{
                                        color: '#ffffff',
                                        borderRadius: '50px',
                                        marginBottom: '10px',
                                        width: '100%'
                                    }}>
                                        {stats.name}
                                    </NUIButton>
                                </Grid>
                                <Grid xs={12} item container alignItems="center" mt={4} justifyContent="center"
                                      style={{fontSize: '22px', fontWeight: '700'}}>
                                    {stats.value}
                                </Grid>
                                <Grid mt={1} sx={{borderBottom: '1px solid #A1A0A0', width: '60%'}}/>
                            </Grid>
                        </Grid>
                    ))
                }

            </Grid>

            <Grid mt={6} p={3} xs={12} sx={{
                borderRadius: globalRadius,
                boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                background: 'white'
            }} container justifyContent="flex-start" alignItems="center">
                <Grid xs={12} item direction="row">
                    <Typography ml={2} sx={{fontSize: '22px', fontWeight: '300'}}>
                        Package Sales
                    </Typography>
                </Grid>

                {
                    packageSales.map((sale, index) => (
                        <Grid xs={12} md={4} key={index} item container direction="row" p={1}>
                            <Grid direction="row" item container p={3} xs={12} style={{
                                borderRadius: globalRadius,
                                boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                                background: 'white'
                            }} justifyContent="center" alignItems="center">
                                <Grid xs={12} item mb={4}>
                                    <NUIButton auto css={{
                                        color: '#ffffff',
                                        borderRadius: '50px',
                                        marginBottom: '10px',
                                        width: '100%',
                                        background: '#343434'
                                    }}>
                                        {sale.name}
                                    </NUIButton>
                                </Grid>

                                {
                                    sale.data.map((datum, key) => (
                                        <Grid key={key} xs={12} mt={3} item container alignItems="center"
                                              justifyContent="center">
                                            <Grid xs={12} item container alignItems="center" justifyContent="center"
                                                  mt={2} style={{fontSize: '22px'}}>
                                                {datum.name}
                                            </Grid>
                                            <Grid xs={12} item container alignItems="center" mt={2}
                                                  justifyContent="center" style={{fontSize: '22px', fontWeight: '700'}}>
                                                {datum.value}
                                            </Grid>
                                            <Grid sx={{borderBottom: '1px solid #A1A0A0', width: '70%'}}/>
                                        </Grid>
                                    ))
                                }
                            </Grid>
                        </Grid>
                    ))
                }

                <Grid xs={12} item container direction="row" alignItems="center" mt={4} justifyContent="center">
                    <NUIButton auto className="bg-gradient" css={{
                        fontSize: '20px',
                        color: '#ffffff',
                        borderRadius: globalRadius,
                        margin: '20px',
                        padding: '30px 100px'
                    }}>
                        Total Sales
                    </NUIButton>
                    <NUIButton auto css={{
                        fontSize: '20px',
                        background: '#ffffff',
                        color: 'grey',
                        border: '1px solid #A1A0A0',
                        borderRadius: globalRadius,
                        margin: '20px',
                        padding: '30px 100px'
                    }}>
                        Print
                    </NUIButton>
                </Grid>
            </Grid>

            <Grid mt={6} p={3} xs={12} sx={{
                borderRadius: globalRadius,
                boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                background: 'white'
            }} container justifyContent="flex-start" alignItems="center">
                <Grid xs={12} item direction="row">
                    <Typography ml={2} sx={{fontSize: '22px', fontWeight: '300'}}>
                        Payment Records
                    </Typography>
                </Grid>
                <Grid xs={12} item direction="row">
                    <PaymentRecords/>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Financials;
