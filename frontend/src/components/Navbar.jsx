import { Link } from "react-router-dom";
import { FaUserDoctor } from "react-icons/fa6";
import UploadPDF from "../features/pdf/UploadPDF";
import { useAuthContext } from "../context/AuthProvider";
import Button from "./Button";
function Navbar() {
  const { isAuthenticated, logoutDoctorFunc } = useAuthContext();
  function handleClick() {
    logoutDoctorFunc();
  }
  return (
    <nav className="flex h-[60px] w-screen items-center justify-between p-4">
      <h3 className="w-full font-semibold">
        <Link to="/" className="flex w-full items-center gap-2">
          <span>
            <FaUserDoctor />
          </span>
          <span>Doctor Me</span>
        </Link>
      </h3>

      {isAuthenticated && (
        <div className="flex gap-4">
          <div className="flex items-center px-4 text-sm hover:bg-stone-50">
            <UploadPDF />
          </div>
          <Button type="doctor" size="small" onClick={handleClick}>
            Logout
          </Button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
