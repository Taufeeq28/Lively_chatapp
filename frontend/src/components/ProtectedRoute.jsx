// components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

import PropTypes from 'prop-types';

const ProtectedRoute = ({ children }) => {

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired
};
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
