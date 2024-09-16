import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.user);

  console.log('User state:', user);

  return user ? children : <Navigate to="/User" />;
};

export default ProtectedRoute;