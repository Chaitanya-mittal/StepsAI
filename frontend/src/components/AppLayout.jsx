import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

function AppLayout() {
  return (
    <section className="grid min-h-screen w-screen grid-rows-[auto_1fr_auto]">
      <Navbar />
      <main className="h-full w-full border bg-stone-50 px-4 py-10">
        <Outlet />
      </main>
      <Footer />
    </section>
  );
}

export default AppLayout;
