import {
  AlignLeft,
  CloudMoon,
  CloudSun,
  Maximize,
  Minimize,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = ({ toggleSidebar }) => {
  const { userData, logout } = useAuth();
  const navigate = useNavigate();

  // Default to dark if no theme is stored.
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Update localStorage and HTML attribute when theme changes.
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("cmyk");
    }
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar bg-base-300 text-base-content h-16 flex items-center justify-between">
      {/* Navbar start */}
      <div className="flex items-center gap-2">
        <button className="btn btn-ghost btn-circle" onClick={toggleSidebar}>
          <AlignLeft />
        </button>
        {/* This link is hidden on mobile devices */}
        <Link to="/" className="btn btn-ghost text-xl hidden sm:flex ">
          Document Management System
        </Link>
      </div>

      {/* Desktop navbar end */}
      <div className="hidden sm:flex items-center gap-2">
        <div className="border border-gray-700 px-2 py-2 rounded-lg font-semibold">
          Company name goes here..
        </div>
        <button className="btn btn-ghost btn-circle">
          <label className="swap swap-rotate">
            <input
              type="checkbox"
              className="theme-controller"
              value="synthwave"
              onChange={handleToggle}
              checked={theme === "dark"}
            />
            <CloudSun className="swap-off h-5 w-5" />
            <CloudMoon className="swap-on h-5 w-5" />
          </label>
        </button>
        <button className="btn btn-ghost btn-circle" onClick={toggleFullScreen}>
          {isFullscreen ? (
            <Minimize className="h-5 w-5" />
          ) : (
            <Maximize className="h-5 w-5" />
          )}
        </button>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost flex items-center gap-1 px-2"
          >
            <div className="avatar">
              <div className="w-10 h-10 rounded-full">
                <img
                  alt="User avatar"
                  src={`data:image/jpeg;base64,${userData.currentUserImageData}`}
                />
              </div>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-lg font-semibold">
                {userData.currentUserName}
              </span>
              <span className="text-xs text-gray-400">
                {userData.currentUserLogin}
              </span>
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-md dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile navbar end */}
      <div className="flex items-center sm:hidden">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost flex items-center gap-1 px-2"
          >
            <div className="avatar">
              <div className="w-10 h-10 rounded-full">
                <img
                  alt="User avatar"
                  src={`data:image/jpeg;base64,${userData.currentUserImageData}`}
                />
              </div>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-lg font-semibold">
                {userData.currentUserName}
              </span>
              <span className="text-xs text-gray-400">
                {userData.currentUserLogin}
              </span>
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-md dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <button className="btn btn-ghost btn-circle">
                <label className="swap swap-rotate">
                  <input
                    type="checkbox"
                    className="theme-controller"
                    value="synthwave"
                    onChange={handleToggle}
                    checked={theme === "dark"}
                  />
                  <CloudSun className="swap-off h-5 w-5" />
                  <CloudMoon className="swap-on h-5 w-5" />
                </label>
              </button>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
