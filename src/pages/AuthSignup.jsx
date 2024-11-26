import React, {useEffect, useState} from 'react';
import {
    Input,
    Button as NextUIButton, Loading, Dropdown, Text,
} from '@nextui-org/react';
import Grid from '@mui/material/Grid';
import {Link, useNavigate, useParams} from 'react-router-dom';
import '../App.css';
import toast from 'react-hot-toast';
import {Typography} from '@mui/material';
import axios from 'axios';
import pattern from '../data/pattern.png';
import logo from '../data/ImpressUsLogo.svg';
import {globalConfig} from '../globalConfig';
import UseToken from '../hooks/UseToken';

function AuthSignup() {
    const [, setToken] = UseToken();
    const {userID} = useParams();
    const [isError, setIsError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const {backend} = globalConfig;
    const navigate = useNavigate();
    const isMounted = true;

    const [selected, setSelected] = React.useState(new Set(['gaborone']));

    const selectedValue = React.useMemo(
        () => Array.from(selected).join(', ').replaceAll('_', ' '),
        [selected],
    );

    const signUpFunction = async () => {
        setLoading(true);
        toast.dismiss();
        toast.loading('saving your details...');
        await axios.post(
            `${backend}/register`,
            {
                inviteId: userID,
                password,
                fullName,
                displayName,
                phoneNumber: phone,
                role: 'admin',
                region: selectedValue,
            },
        )
            .then(() => {
                toast.dismiss();
                setLoading(false);
                if (isMounted) {
                    setFullName('')
                    setPhone('')
                    setDisplayName('')
                    setPassword('')
                    setPasswordConfirm('')
                    toast.success('account created successfully');
                    setTimeout(() => {
                        navigate('/login')
                    }, 300)
                } else {
                    setFullName('')
                    setPhone('')
                    setDisplayName('')
                    setPassword('')
                    setPasswordConfirm('')
                    toast.success('account created successfully');
                    setTimeout(() => {
                        navigate('/login')
                    }, 300)
                }
            })
            .catch((error) => {
                console.error(error);
                toast.dismiss();
                setLoading(false);

                if (error.response) {
                    // if status is unauthorised
                    if (error.response.status === 401) {
                        toast.dismiss();
                        toast.error('Invalid invite ID');
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

    useEffect(() => {
        if (!userID) {
            setIsError(true);
        }
    }, []);

    const filterArray = (a, b) => a.filter((e) => e != b);

    const checkName = (name = '', max = 2, min = 1) => {
        let nameArray = name.split(' ');
        nameArray = [...new Set(nameArray)];
        nameArray = filterArray(nameArray, '');

        return nameArray.length >= min && nameArray.length <= max;
    };

    return (
        <Grid container sx={{minHeight: '100vh'}}>
            {
                !isError ? (
                    <>
                        <Grid item container xs={5} p={10} alignItems="flex-start" justifyContent="flex-start">
                            <Grid item container xs={12} alignSelf="flex-start">
                    <span style={{width: '60px', height: '60px', padding: '4px', background: '#6C0F13'}}>
                      <img src={logo} width={52} alt=""/>
                    </span>
                            </Grid>
                            <Grid xs={12} alignSelf="flex-start" item container justifyContent="center"
                                  alignItems="flex-start">
                                <Typography sx={{fontSize: '55px', fontWeight: '600', textAlign: 'center'}}>Welcome
                                    Back</Typography>
                                <Typography mt={2} sx={{fontSize: '20px', textAlign: 'center', color: '#A1A0A0'}}>Welcome
                                    back. Please enter your details</Typography>
                            </Grid>
                        </Grid>
                        <Grid item container xs={7} alignItems="center" justifyContent="center">
                            <Grid item container xs={12} p={5} justifyContent="center" alignItems="flex-start">

                                <Grid item xs={12} sm={6} md={4} p={1}>
                                    <Input label="Full Name" bordered fullWidth color="primary" size="lg"
                                           placeholder="Enter Full Name" onChange={(e) => setFullName(e.target.value)}
                                           value={fullName} css={{mb: '6px', background: '#ffffff'}}/>
                                </Grid>

                                <Grid item xs={12} sm={6} md={4} p={1}>
                                    <Input label="Display Name" bordered fullWidth color="primary" size="lg"
                                           placeholder="Enter Display Name"
                                           onChange={(e) => setDisplayName(e.target.value)} value={displayName}
                                           css={{mb: '6px', background: '#ffffff'}}/>
                                </Grid>

                                <Grid item xs={12} sm={6} md={4} p={1}>
                                    <Text style={{marginBottom: '2px'}}>Region</Text>
                                    <Dropdown css={{width: '100%'}}>
                                        <Dropdown.Button flat color="secondary" css={{
                                            tt: 'capitalize',
                                            width: '100%',
                                            padding: '22px',
                                            background: '#ffffff',
                                            color: '#A0A6B2',
                                            textAlign: 'start',
                                            border: '2px solid #D9D9D9'
                                        }}>
                                            {selectedValue}
                                        </Dropdown.Button>
                                        <Dropdown.Menu
                                            fullWidth
                                            aria-label="Single selection actions"
                                            disallowEmptySelection
                                            selectionMode="single"
                                            selectedKeys={selected}
                                            onSelectionChange={setSelected}
                                        >
                                            Central, Ghanzi, Kgalagadi, Kgatleng, Kweneng, North East, North West, South
                                            East, and Southern
                                            <Dropdown.Item key="gaborone">Gaborone</Dropdown.Item>
                                            <Dropdown.Item key="central">Central</Dropdown.Item>
                                            <Dropdown.Item key="ghanzi">Ghanzi</Dropdown.Item>
                                            <Dropdown.Item key="kgalagadi">Kgalagadi</Dropdown.Item>
                                            <Dropdown.Item key="kgatleng">Kgatleng</Dropdown.Item>
                                            <Dropdown.Item key="kweneng">Kweneng</Dropdown.Item>
                                            <Dropdown.Item key="north_east">North East</Dropdown.Item>
                                            <Dropdown.Item key="south_east">South East</Dropdown.Item>
                                            <Dropdown.Item key="southern">Southern</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Grid>

                                <Grid item xs={12} sm={6} md={4} p={1}>
                                    <Input label="Phone Number" bordered fullWidth color="primary" size="lg"
                                           type={"number"}
                                           placeholder="Enter Phone Number" onChange={(e) => setPhone(e.target.value)}
                                           value={phone} css={{mb: '6px', background: '#ffffff'}}/>
                                </Grid>

                                <Grid item xs={12} sm={6} md={4} p={1}>
                                    <Input.Password label="Password" bordered fullWidth color="primary" size="lg"
                                                    placeholder="Enter Password"
                                                    onChange={(e) => setPassword(e.target.value)} value={password}
                                                    css={{mb: '6px', background: '#ffffff'}}/>
                                </Grid>

                                <Grid item xs={12} sm={6} md={4} p={1}>
                                    <Input.Password label="Confirm Password" bordered fullWidth color="primary"
                                                    size="lg" placeholder="Confirm Password"
                                                    onChange={(e) => setPasswordConfirm(e.target.value)}
                                                    value={passwordConfirm} css={{mb: '6px', background: '#ffffff'}}/>
                                </Grid>

                                <Grid item xs={12} p={1}>

                                    <NextUIButton
                                        css={{
                                            borderRadius: '$xs', // radii.xs
                                            padding: '25px',
                                            border: '$space$1 solid transparent',
                                            background: '#6C0F13', // colors.pink800
                                            color: '$pink100',
                                            '&:hover': {
                                                background: '#EF3D5B',
                                            },
                                        }}
                                        light
                                        disabled={!checkName(fullName, 2, 2) || !checkName(displayName, 1, 1) || password !== passwordConfirm || password.length < 6 || phone.length < 7}
                                        onPress={() => signUpFunction()}
                                        className="btn-disabled"
                                    >
                                        {loading && <Loading color="currentColor" size="sm"/>}
                                        {!loading && 'Sign Up '}

                                    </NextUIButton>
                                    <Text style={{color: '#A1A0A0', marginTop: '15px'}} mt={3}>
                                        Already have an account?
                                        <Text as={Link} to="/login" css={{marginLeft: '10px', cursor: 'pointer'}}>Log
                                            in</Text>
                                    </Text>
                                </Grid>

                            </Grid>
                        </Grid>
                        <Grid item container xs={12} alignSelf="flex-end" sx={{
                            height: '70px',
                            backgroundImage: `url(${pattern})`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover'
                        }}/>
                    </>
                ) : (
                    <Grid container xs={12} direction="column" justifyContent="center" alignItems="center"
                          sx={{height: '37vh'}}>
                        <Typography sx={{color: '#A1A1A1', fontSize: '35px', fontWeight: '500'}}>Invalid</Typography>
                        <Typography sx={{color: '#A1A1A1', fontSize: '35px', fontWeight: '500'}}>User ID</Typography>
                    </Grid>
                )
            }
        </Grid>
    );
}

export default AuthSignup;
