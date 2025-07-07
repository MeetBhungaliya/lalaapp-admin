import { useState } from "react";
import { Outlet } from "react-router";
import Header from "./header";
import Sidebar from "./sidebar";

const Layout = () => {
  const [isSidebar, setIsSidebar] = useState(false);
  return (
    <section className="flex bg-[#F7F8FD]">
      <Sidebar isSidebar={isSidebar} setIsSidebar={setIsSidebar} />
      <div className="w-full h-dvh flex flex-col overflow-hidden">
        <Header setIsSidebar={setIsSidebar} />
        <Outlet />
      </div>
    </section>
  );
};

export default Layout;
