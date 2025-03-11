import React, { useState } from "react";
import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/common/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/common/Footer";
import Breadcrumb from "../components/common/Breadcrumb";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex h-screen">
      <Sidebar isOpen={isSidebarOpen} />
      <div className="flex flex-col flex-1">
        <Navbar toggleSidebar={toggleSidebar} />
        <div className="flex-grow p-5 overflow-auto h-screen">
          <Breadcrumb />
          <main>
            <Outlet />
          </main>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
