import { useNavigate } from "react-router-dom";
import Button from "./Button";

function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center border">
      <div className="flex flex-col items-center gap-4">
        <p className="text-xl font-semibold">Page not found :(</p>
        <Button type="doctor" onClick={() => navigate("/")}>
          <span className="me-4"> ⃪</span>
          <span>Return to HomePage</span>
        </Button>
      </div>
    </div>
  );
}

export default PageNotFound;
