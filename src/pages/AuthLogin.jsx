import React, { useState } from 'react';
import { BiUserCircle } from 'react-icons/bi';
import { MdPassword } from 'react-icons/md';
import {
  Card,
  Spacer,
  Input,
  Button as NextUIButton, Loading,
} from '@nextui-org/react';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import toast from 'react-hot-toast';
import { Typography } from '@mui/material';
import axios from 'axios';
import pattern from '../data/pattern.png';
import logo from '../data/ImpressUsLogo.svg';
import { globalConfig } from '../globalConfig';
import UseToken from '../hooks/UseToken';

function AuthLogin() {
  const [, setToken] = UseToken();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { backend } = globalConfig;
  const navigate = useNavigate();
  const isMounted = true;

  const signInFunction = async () => {
    setLoading(true);
    toast.dismiss();
    toast.loading('checking your details...');
    await axios.post(
      `${backend}/login`,
      {
        email,
        password,
      },
    )
      .then((response) => {
        setLoading(false);
        toast.dismiss();
        setToken(response.data.token, response.data.token);
        localStorage.setItem('names', 'dummy name');
        if (isMounted) {
          toast.success('log in success');
          // setValue('done!'); // no more error
          navigate('/');
        } else {
          toast.success('log in success');
          navigate('/');
        }
      })
      .catch((error) => {
        toast.dismiss();
        setLoading(false);

        if (error.response) {
          // if status is unauthorised
          if (error.response.status === 401 || error.response.status === 400 || error.response.status === 403 || error.response.status === 422) {
            toast.dismiss();
            toast.error('invalid credentials');
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
    <Grid container sx={{ minHeight: '100vh' }}>
      <Grid item container xs={7}>
        <Grid item container xs={12} p={5} justifyContent="unset" alignItems="normal">
          <span style={{ width: '60px', height: '60px', padding: '4px', background: '#6C0F13' }}>
            <img src={logo} width={52} alt="" />
          </span>
        </Grid>
        <Grid item container xs={12} p={5} justifyContent="center" alignItems="flex-start">
          <Grid xs={12} item container justifyContent="center" alignItems="flex-start"> <Typography sx={{ fontSize: '55px', fontWeight: '600', textAlign: 'center' }}>Welcome Back</Typography> </Grid>
          <Grid xs={12} item container justifyContent="center" alignItems="flex-start"> <Typography sx={{ fontSize: '20px', textAlign: 'center', color: '#A1A0A0' }}>Welcome back. Please enter your details</Typography> </Grid>
          <Grid xs={12} item container justifyContent="center" alignItems="flex-start">
            <Grid xs={12} sm={10} md={7} lg={6}>

              <Input bordered fullWidth label="Username" color="primary" size="lg" placeholder="Enter Username" onChange={(e) => setEmail(e.target.value)} value={email} css={{ mb: '6px', background: '#ffffff' }} />
              <Spacer y={1} />
              <Input.Password bordered label="Password" fullWidth color="primary" size="lg" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} value={password} css={{ mb: '6px', background: '#ffffff' }} />
              <Spacer y={1} />
              <Typography sx={{ textAlign: 'center', color: '#A1A0A0', cursor: 'pointer' }}>Forgot Password</Typography>
              <Spacer y={1} />

              <NextUIButton
                css={{
                  borderRadius: '$xs', // radii.xs
                  width: '100%',
                  padding: '25px',
                  border: '$space$1 solid transparent',
                  background: '#6C0F13', // colors.pink800
                  color: '$pink100',
                  '&:hover': {
                    background: '#EF3D5B',
                  },
                }}
                light
                disabled={!email || password.length < 3}
                onPress={() => signInFunction()}
                className="btn-disabled"
              >
                {loading && <Loading color="currentColor" size="sm" />}
                {!loading && 'Sign In'}
              </NextUIButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid item container xs={12} alignSelf="flex-end" sx={{ height: '100px', backgroundImage: `url(${pattern})`, backgroundPosition: 'center', backgroundSize: 'cover' }} />
      </Grid>
      <Grid item container xs={5} className="bg-gradient" alignItems="center" justifyContent="center">
        <img src={logo} style={{ width: '45%' }} alt="" />
      </Grid>
    </Grid>
  );
}

export default AuthLogin;
