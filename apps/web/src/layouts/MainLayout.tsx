import { Outlet } from "react-router-dom";
import Nav from "../components/global/Nav";
import Sidebar from "../components/global/Sidebar";
import { useState } from "react";
const MainLayout = () => {
  const [activeLink, setActiveLink] = useState("dashboard");
  return (
    <div className="bg-secondary/50 min-h-screen">
      <Nav activelink={activeLink} setActiveLink={setActiveLink} />
      <div className="mt-5 flex gap-10">
        <Sidebar
          setActiveLink={setActiveLink}
          activeLink={activeLink}
          mobile={false}
        />
        <div className="w-full sm:ml-32 lg:ml-64">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default MainLayout;
