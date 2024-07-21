import { useEffect } from "react";
import { useAuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);
  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
