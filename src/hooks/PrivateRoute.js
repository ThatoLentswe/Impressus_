import { Navigate } from 'react-router-dom';
import UseUser from './UseUser';

function PrivateRoute({ children }) {
  const user = UseUser() || 'x';

  // eslint-disable-next-line react/react-in-jsx-scope
  return (typeof user) === 'string' && user !== 'x' ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
