import React, { useState, useEffect, useCallback } from "react";
import {
  Home,
  BarChart3,
  Wallet,
  Target as TargetIcon,
  Settings,
  LogOut,
  Menu,
  X,
  CardSim,
} from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  // Memoized resize handler
  const handleResize = useCallback(() => {
    const mobile = window.innerWidth < 1024;
    setIsMobile(mobile);
    if (!mobile) {
      setSidebarOpen(true);
    } else {
      setSidebarOpen(false);
    }
  }, []);

  // Optimized resize listener
  useEffect(() => {
    // Throttle resize events
    let resizeTimeout: any;

    const throttledResize = () => {
      if (!resizeTimeout) {
        resizeTimeout = setTimeout(() => {
          handleResize();
          resizeTimeout = null;
        }, 100);
      }
    };

    window.addEventListener("resize", throttledResize);
    handleResize(); // Initial check

    return () => {
      window.removeEventListener("resize", throttledResize);
      if (resizeTimeout) clearTimeout(resizeTimeout);
    };
  }, [handleResize]);

  // Memoized navigation click handler
  const handleNavClick = useCallback(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [isMobile]);

  // Memoized navigation items
  const navItems = React.useMemo(
    () => [
      { icon: Home, label: "Dashboard", active: true, link: "/dashboard" },
      {
        icon: Wallet,
        label: "Transactions",
        active: false,
        link: "transactions",
      },
      { icon: BarChart3, label: "Analytics", active: false, link: "reports" },
      { icon: TargetIcon, label: "Goals", active: false, link: "goals" },
      { icon: CardSim, label: "Cards", active: false, link: "cards" },
      { icon: Settings, label: "Settings", active: false, link: "settings" },
    ],
    []
  );

  // Toggle sidebar function
  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  return (
    <>
      {/* Backdrop - Only render when needed */}
      {sidebarOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar with optimized transitions */}
      <div
        className={`
          fixed lg:static inset-y-0 left-0 z-30
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }
          ${isMobile ? "w-64" : sidebarOpen ? "w-64" : "w-20"}
          bg-white shadow-xl transition-transform duration-300 ease-out flex flex-col
          lg:flex min-h-screen
        `}>
        {/* Logo Section */}
        <div className="flex items-center justify-between p-4 lg:p-6 border-b border-gray-200">
          <div
            className={`flex items-center space-x-3 ${
              !sidebarOpen && !isMobile && "hidden"
            }`}>
            <div className="w-8 h-8 bg-blue-500 rounded-lg shrink-0 flex items-center justify-center">
              <Wallet className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800 whitespace-nowrap">
              FinTrack
            </span>
          </div>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 shrink-0">
            {sidebarOpen || isMobile ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 px-3 lg:px-4 py-4 lg:py-6">
          <ul className="space-y-1 lg:space-y-2">
            {navItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <li key={index}>
                  <Link
                    to={item.link}
                    onClick={handleNavClick}
                    className={`flex items-center space-x-3 px-3 lg:px-4 py-3 rounded-xl transition-colors duration-200 ${
                      item.active
                        ? "bg-blue-50 text-blue-600 border border-blue-100"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}>
                    <IconComponent className="w-5 h-5 shrink-0" />
                    {(sidebarOpen || isMobile) && (
                      <span className="font-medium whitespace-nowrap">
                        {item.label}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Profile */}
        <div className="p-3 lg:p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center shrink-0">
              <span className="text-white font-semibold text-xs lg:text-sm">
                JD
              </span>
            </div>
            {(sidebarOpen || isMobile) && (
              <div className="flex justify-between items-center w-full">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    John Doe
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    john@example.com
                  </p>
                </div>

                <button className="transition-colors duration-200 hover:text-gray-700">
                  <LogOut className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
