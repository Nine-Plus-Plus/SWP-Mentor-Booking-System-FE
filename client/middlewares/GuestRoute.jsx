import { Navigate } from 'react-router-dom';
import path from '../src/utils/path';

const GuestRoute = ({ element: Component }) => {
  const token = localStorage.getItem('token');
  
  return token ? <Navigate to={'/'} /> : <Component />;
};

export default GuestRoute;
