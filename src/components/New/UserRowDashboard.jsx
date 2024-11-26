import React, {useState} from 'react';
import {Grid, Typography} from '@mui/material';
import {Button as NUIButton, Avatar as NUIAvatar} from '@nextui-org/react';
import {IoMaleOutline} from 'react-icons/io5';
import {BsGenderFemale} from 'react-icons/bs';
import {Link, useNavigate} from 'react-router-dom';
import {useStateContext} from '../../contexts/ContextProvider';
import defaultAvatar from '../../data/default.png';

const UserRowDashboard = ({mode, user, xs = 12, sm = 12, md = 12}) => {
    const navigate = useNavigate();
    const {globalRadius} = useStateContext();
    let avatar = defaultAvatar;
    const [isError, setIsError] = useState({status: null, message: null});

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

    return (
        <>

            {
                isError.status === 'error'
                    ? (
                        <tr>
                            <td>
                                <Typography style={{color: 'red'}}>
                                    Error - {JSON.stringify(isError.message)}
                                </Typography>
                            </td>
                            <td style={{textAlign: 'center', alignItems: 'center', justifyContent: 'center'}}>
                                <Typography style={{color: 'red'}}>
                                    ------
                                </Typography>
                            </td>
                            <td style={{textAlign: 'center', alignItems: 'center', justifyContent: 'center'}}>
                                <Typography style={{color: 'red'}}>
                                    ------
                                </Typography>
                            </td>
                            <td style={{textAlign: 'center', alignItems: 'center', justifyContent: 'center'}}>
                                <Typography style={{color: 'red'}}>
                                    ------
                                </Typography>
                            </td>
                            <td style={{textAlign: 'center', alignItems: 'center', justifyContent: 'center'}}>
                                <Typography style={{color: 'red'}}>
                                    ------
                                </Typography>
                            </td>
                            <td style={{textAlign: 'center', alignItems: 'center', justifyContent: 'center'}}>
                                <Typography style={{color: 'red'}}>
                                    ------
                                </Typography>
                            </td>
                            <td style={{textAlign: 'center', alignItems: 'center', justifyContent: 'center'}}>
                                <Typography style={{color: 'red'}}>
                                    ------
                                </Typography>
                            </td>
                            <td style={{textAlign: 'center', alignItems: 'center', justifyContent: 'center'}}>
                                <Typography style={{color: 'red'}}>
                                    ------
                                </Typography>
                            </td>
                            <td style={{textAlign: 'center', alignItems: 'center', justifyContent: 'center'}}>
                                <Typography style={{color: 'red'}}>
                                    ------
                                </Typography>
                            </td>
                            <td style={{textAlign: 'center', alignItems: 'center', justifyContent: 'center'}}>
                                <Typography style={{color: 'red'}}>
                                    ------
                                </Typography>
                            </td>
                        </tr>
                    )
                    :
                    (
                        <tr>
                            <td>
                                <Grid container direction="column" justifyContent="flex-start" alignItems="center">
                                    {
                                        mode === 'detailed' &&
                                        <NUIAvatar size="lg" css={{border: '.5px solid #EAEBEC'}} src={avatar}/>
                                    }
                                    <Grid pl={1} container justifyContent="center" alignItems="center">
                                        {/*<Typography sx={{fontWeight: '600', fontSize: '15px'}}>{user.name}</Typography>*/}
                                        <Typography sx={{fontSize: '12px'}}>{user.name}</Typography>
                                    </Grid>
                                </Grid>
                            </td>
                            <td>
                                {user.email}
                            </td>
                            <td>
                                <Grid container direction="column" justifyContent="center" alignItems="center">
                                    {
                                        mode === 'detailed' ? user.gender === 'Male' ? (
                                            <IoMaleOutline style={{fontSize: '22px', marginRight: '7px'}}/>) : (
                                            <BsGenderFemale style={{fontSize: '22px', marginRight: '7px'}}/>) : ''
                                    }
                                    <br/>
                                    {user.gender}
                                </Grid>
                            </td>
                            <td>
                                {user.status == '0' && 'active'}
                                {user.status == '1' && 'suspended'}
                                {user.status == '2' && 'deactivated'}
                                {user.status == '3' && 'pending'}
                                {user.status == '4' && 'disabled'}
                                {user.status == '5' && 'deleted'}
                            </td>
                            <td>
                                {user.address}
                            </td>
                            <td>
                                {user.package}
                            </td>
                            <td>
                                {user.phone}
                            </td>
                            <td>
                                <NUIButton size={mode === 'detailed' ? 'md' : 'sm'} as={Link}
                                           to={`/accounts/${user.id}`}
                                           auto
                                           className="bg-gradient"
                                           css={{color: '#ffffff', borderRadius: '9px'}}>
                                    View Profile
                                </NUIButton>
                            </td>
                        </tr>
                    )
            }
            {/*<Grid item xs={xs} sm={sm} md={md} container p={1}>*/}
            {/*    <Grid item container xs={12} sm={12} md={12} p={1} direction="row" sx={{*/}
            {/*        borderRadius: globalRadius,*/}
            {/*        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',*/}
            {/*        background: 'white'*/}
            {/*    }}>*/}

            {/*        <Grid item container xs={3} sm={3} md={3} direction="row" justifyContent="flex-start"*/}
            {/*              alignItems="center">*/}
            {/*            */}
            {/*        </Grid>*/}
            {/*        <Grid item container xs={3} sm={3} md={3} direction="row" justifyContent="flex-end"*/}
            {/*              alignItems="center">*/}
            {/*            <NUIButton as={Link} to={`/accounts/${user.id}`} auto className="bg-gradient"*/}
            {/*                       css={{color: '#ffffff', borderRadius: '9px'}}>*/}
            {/*                View Profile*/}
            {/*            </NUIButton>*/}
            {/*        </Grid>*/}
            {/*    </Grid>*/}
            {/*</Grid>*/}
        </>
    );
};

export default UserRowDashboard;
