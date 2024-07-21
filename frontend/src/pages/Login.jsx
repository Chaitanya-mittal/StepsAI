import { useNavigate } from "react-router-dom";

import { useEffect } from "react";
import AuthenticateUser from "../components/AuthenticateUser";
import { useAuthContext } from "../context/AuthProvider";

function Login() {
  const { currDoctor, setAuthenticated } = useAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (currDoctor) {
      setAuthenticated(true);
      navigate("/app", { replace: true });
    }
  }, []);
  return <AuthenticateUser />;
}

export default Login;
