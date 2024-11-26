import UseToken from './UseToken';

function UseUser() {
  const [token] = UseToken();

  return token;
}

export default UseUser;
