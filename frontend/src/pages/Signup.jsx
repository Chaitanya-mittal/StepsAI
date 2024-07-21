import { useNavigate } from "react-router-dom";
import CreateDoctor from "../features/doctors/CreateDoctor";
import { useAuthContext } from "../context/AuthProvider";
import { useEffect } from "react";

function Signup() {
  const { currDoctor, setAuthenticated } = useAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (currDoctor) {
      console.log(currDoctor);
      setAuthenticated(true);
      navigate("/app", { replace: true });
    }
  }, []);
  return (
    <section className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex flex-col items-center">
        <CreateDoctor />
      </div>
    </section>
  );
}

export default Signup;
