import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  if (user === null) {
    return <Navigate to="/signin" />;
  } else {
    return children;
  }
};
export default ProtectedRoute;
