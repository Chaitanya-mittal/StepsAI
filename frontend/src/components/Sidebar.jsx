import { FaRegFilePdf } from "react-icons/fa";
import { MdOutlineSick } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();
  const active = location.pathname.split("/")[2];
  return (
    <ul className="flex flex-col gap-4 rounded-lg bg-white p-4">
      <li
        className={`rounded-md transition-all duration-150 hover:bg-stone-200 ${active && active === "patients" ? "bg-stone-200" : "bg-stone-100"}`}
      >
        <Link to="patients" className="flex w-full items-center gap-2 p-3">
          <span className="text-lg">
            <MdOutlineSick />
          </span>
          <span className="text-sm font-semibold">Patients</span>
        </Link>
      </li>
      <li
        className={`${active && active === "pdfs" ? "bg-stone-200" : "bg-stone-100"} w-full rounded-md transition-all duration-150 hover:bg-stone-200`}
      >
        <Link to="pdfs" className="flex items-center gap-2 p-3">
          <span className="text-lg">
            <FaRegFilePdf />
          </span>
          <span className="text-sm font-semibold">PDFs</span>
        </Link>
      </li>
    </ul>
  );
}

export default Sidebar;
