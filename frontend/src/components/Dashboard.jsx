import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
function Dashboard() {
  return (
    <div className="grid h-full grid-rows-[auto_1fr] gap-10 sm:grid-cols-[15rem_1fr] sm:gap-0">
      <div className="flex flex-col gap-4">
        <Sidebar />
      </div>
      <div className="px-5 sm:px-10">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
