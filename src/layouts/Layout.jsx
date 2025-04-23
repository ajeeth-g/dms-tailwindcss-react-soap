import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Breadcrumb from "../components/common/Breadcrumb";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import Sidebar from "../components/common/Sidebar";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex h-screen bg-slate-100 transition-colors dark:bg-slate-950">
      <Sidebar isOpen={isSidebarOpen} />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Header toggleSidebar={toggleSidebar} />

        {/* content area */}
        <div className="flex-1 overflow-auto p-5">
          <Breadcrumb />
          <main className="py-6">
            <Outlet />
          </main>
        </div>

        <Footer />
      </div>
    </div>

  );
};

export default Layout;
