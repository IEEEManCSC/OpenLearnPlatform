import { Outlet } from "react-router-dom";
import Nav from "../components/global/Nav";
import Sidebar from "../components/global/Sidebar";
import { useState } from "react";
const MainLayout = () => {
  const [activeLink,setActiveLink]=useState('dashboard')
  return (
    <div className="bg-gray-50 h-screen">
      <Nav activelink={activeLink} setActiveLink={setActiveLink} />
      <div className="flex gap-10 mt-5">
        <Sidebar setActiveLink={setActiveLink} activeLink={activeLink} mobile={false} />
        <Outlet />
      </div>
    </div>
  );
};
export default MainLayout;
