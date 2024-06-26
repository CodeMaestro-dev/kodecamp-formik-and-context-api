import PropTypes from "prop-types";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export default function ProtectedRoute({ component: Component }) {
  const { user } = useContext(AuthContext);
  return user ? <Component /> : <Navigate to="/login" />;
}

ProtectedRoute.propTypes = {
  component: PropTypes.any,
};
