import { Navigate } from 'react-router-dom';
import path from '../src/utils/path';

const GuestRoute = ({ Component }) => {
  const token = localStorage.getItem('token');

  return token ? <Navigate to={path.PUBLIC} /> : <Component />;
};

export default GuestRoute;
