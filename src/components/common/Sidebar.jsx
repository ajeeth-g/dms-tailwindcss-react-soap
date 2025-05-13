import {
  CalendarClock,
  ClipboardListIcon,
  FileSearch,
  FileText,
  LayoutDashboard,
  LayoutGrid,
  Trello,
  Users,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import LogoDark from "../../assets/logo-dark.png";
import LogoLight from "../../assets/logo-light.png";
import { useAuth } from "../../context/AuthContext";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { theme } = useAuth();

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-20 flex-shrink-0 flex flex-col
        bg-white shadow-md dark:bg-slate-900 border-r border-slate-300 dark:border-slate-700
        overflow-y-auto

        /* animate both width and transform */
        transform transition-all duration-100 ease-in-out

        /* desktop widths */
        md:relative md:translate-x-0 
        ${isOpen ? "md:w-48" : "md:w-16"}

        /* mobile slide */
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      {/* Logo */}
      <div className="flex items-center justify-center h-14 w-full my-2">
        <img
          src={theme === "dark" ? LogoDark : LogoLight}
          alt="Logo"
          className="h-full w-full object-contain"
        />
      </div>

      {/* mobile close button */}
      {/* <button
        className="p-2 md:hidden self-end"
        onClick={toggleSidebar}
        aria-label="Close sidebar"
      >
        ✕
      </button> */}

      <nav className="flex-1 p-2">
        <ul className="space-y-1">
          {[
            { to: "/", Icon: LayoutDashboard, label: "Dashboard" },
            { to: "/my-team", Icon: Users, label: "My Team" },
            { to: "/category-view", Icon: LayoutGrid, label: "Category" },
            { to: "/document-list", Icon: FileText, label: "Document List" },
            { to: "/document-view", Icon: FileSearch, label: "Document View" },
            { to: "/task-view", Icon: ClipboardListIcon, label: "Task View" },
            { to: "/task", Icon: Trello, label: "Task Dashboard" },
            { to: "/time-sheet", Icon: CalendarClock, label: "Time Sheet" },
          ].map(({ to, Icon, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                title={!isOpen ? label : undefined}
                className={({ isActive }) => {
                  const active = isActive
                    ? "bg-slate-200 dark:bg-slate-700"
                    : "";
                  const sizeClasses = isOpen
                    ? "flex items-center space-x-2 py-2 px-4"
                    : "flex justify-center py-3 w-full";
                  return `${active} ${sizeClasses} rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors`;
                }}
                onClick={() => {
                  if (window.innerWidth < 768) toggleSidebar();
                }}
              >
                <Icon className="h-5 w-5" />
                {isOpen && <span className="text-sm">{label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
