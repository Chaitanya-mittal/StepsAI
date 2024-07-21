import { HashLoader } from "react-spinners";

function Loader() {
  return (
    <div className="fixed left-0 top-0 z-[2000] flex h-screen w-screen items-center justify-center bg-[#ffffff8e] backdrop-blur-md">
      <HashLoader />
    </div>
  );
}

export default Loader;
