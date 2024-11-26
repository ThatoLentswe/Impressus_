import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { globalConfig } from '../globalConfig';

function makeStringRandom(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random()
        * charactersLength));
  }
  return result;
}

function UseToken() {
  const [cookies, setCookie] = useCookies(['t_r', 't_f', 'r_t']);
  const [token, setTokenInternal] = useState(() => cookies.t_r);
  const [refresh, setTokenRefresh] = useState(() => cookies.r_t);

  const { domain } = globalConfig;
  const ageToLive = 86400;

  const setToken = (newToken, refreshToken) => {
    setCookie(
      't_r',
      newToken,
      { path: '/', sameSite: 'strict', maxAge: ageToLive, domain },
    );
    setCookie(
      'r_t',
      refreshToken,
      { path: '/', sameSite: 'strict', maxAge: ageToLive, domain },
    );
    setCookie(
      't_f',
      makeStringRandom(67),
      { path: '/', sameSite: 'strict', maxAge: ageToLive, domain },
    );

    setTokenInternal(newToken);
    setTokenRefresh(refreshToken);
  };

  return [token, setToken, refresh];
}

export default UseToken;
