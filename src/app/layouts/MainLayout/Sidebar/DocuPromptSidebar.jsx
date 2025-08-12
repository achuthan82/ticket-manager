// Import Dependencies
import { useLocation, Link } from "react-router";
import { useState } from "react";
import clsx from "clsx";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

// Local Imports
import { useSidebarContext } from "app/contexts/sidebar/context";
import { useAuthContext } from "app/contexts/auth/context";
import { navigation } from "app/navigation";
import { isRouteActive } from "utils/isRouteActive";
import { SidebarToggleBtn } from "components/shared/SidebarToggleBtn";
import { ConfirmModal } from "components/shared/ConfirmModal";

// ----------------------------------------------------------------------

export default function DocuPromptSidebar() {
  const { pathname } = useLocation();
  const { isExpanded, close, toggle } = useSidebarContext();
  const { user, logout } = useAuthContext();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Check if we're on mobile (md and down)
  const isMobile = window.innerWidth < 768;

  const getUserInitials = (user) => {
    console.log(user);
    if (!user?.name) return "U";
    return (user.name)
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const handleLogoutConfirm = async () => {
    setShowLogoutConfirm(false);
    await logout();
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isExpanded && isMobile && (
        <div
          className="bg-opacity-50 fixed inset-0 z-40 bg-black"
          onClick={close}
        />
      )}

      <aside
        className={clsx(
          "fixed inset-y-0 left-0 z-50 bg-[#0D1F3D] text-white transition-all duration-300 ease-in-out lg:relative lg:z-auto",
          isExpanded
            ? "w-64 translate-x-0"
            : isMobile
              ? "w-64 -translate-x-full"
              : "w-16 translate-x-0 lg:w-16"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div style={{ minHeight: '80px' }} className={clsx(
            "flex h-16 items-center mt-2 relative",
            isExpanded ? "justify-between px-4 lg:px-6" : "justify-center px-2"
          )}>
            <div className="flex items-center min-w-0">
              <div
                className={clsx(
                  "bg-[#00B4D8] text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xl flex-shrink-0 cursor-pointer transition-colors duration-200",
                  !isExpanded && "hover:bg-[#6CD9EA]"
                )}
                onClick={!isExpanded ? toggle : undefined}
                title={!isExpanded ? "Expand sidebar" : undefined}
              >
                D
              </div>
              {isExpanded && (
                <span className="text-xl font-bold ml-3 transition-opacity duration-300">
                  DocuPrompt Hub
                </span>
              )}
            </div>
            {isExpanded && (
              <SidebarToggleBtn
                className="text-white hover:text-[#D6F4FA] flex-shrink-0 transition-all duration-300"
                onClick={toggle}
              />
            )}
          </div>

          {/* Navigation */}
          <nav className={clsx(
            "flex-1 py-6 space-y-1",
            isExpanded ? "px-4 lg:px-6 overflow-y-auto" : "px-2 overflow-hidden"
          )}>
            {navigation.map((item) => {
              const isActive = isRouteActive(item.path, pathname);
              const Icon = item.Icon;

              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={clsx(
                    "flex items-center rounded-lg transition-colors duration-200 group relative",
                    isExpanded ? "space-x-3 px-4 py-3" : "justify-center p-3",
                    isActive
                      ? "bg-[#1A3A6C] text-white"
                      : "text-[#D6F4FA] hover:bg-[#1A3A6C] hover:text-white"
                  )}
                  title={!isExpanded ? item.title : undefined}
                >
                  <div className="relative flex-shrink-0">
                    <Icon className="w-5 h-5" />
                    {item.badge && !isExpanded && (
                      <span className="absolute -top-1 -right-1 bg-[#00B4D8] text-white text-xs w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  {isExpanded && (
                    <>
                      <span className="flex-1 transition-opacity duration-300">
                        {item.title}
                      </span>
                      {item.badge && (
                        <span className="bg-[#00B4D8] text-white text-xs px-2 py-1 rounded-full ml-auto">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                  {/* Tooltip for collapsed state */}
                  {!isExpanded && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-[#1A3A6C] text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                      {item.title}
                      {item.badge && (
                        <span className="ml-2 bg-[#00B4D8] text-white text-xs px-1.5 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User Profile */}
          <div className={clsx(
            "border-t border-[#1A3A6C]",
            isExpanded ? "p-4 lg:p-6" : "p-2"
          )}>
            <div className={clsx(
              "flex items-center group relative",
              isExpanded ? "space-x-3" : "justify-center"
            )}>
              <div className="w-10 h-10 rounded-full bg-[#00B4D8] flex items-center justify-center font-semibold flex-shrink-0">
                {getUserInitials(user)}
              </div>
              {!isExpanded && (
                <button
                  className="absolute inset-0 w-full h-full bg-[#1A3A6C] opacity-0 hover:opacity-100 transition-all duration-200 rounded-lg flex items-center justify-center"
                  title="Logout"
                  onClick={handleLogoutClick}
                >
                  <ArrowRightOnRectangleIcon className="w-5 h-5 text-white" />
                </button>
              )}
              {isExpanded && (
                <>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold truncate">
                      {user?.first_name + " " + user?.last_name || "User"}
                    </div>
                    <div className="text-xs text-[#D6F4FA] truncate">
                      {user?.role_id === 1 ? "Admin" : "User"}
                    </div>
                  </div>
                  <button
                    className="text-[#D6F4FA] hover:text-white transition-colors flex-shrink-0"
                    title="Logout"
                    onClick={handleLogoutClick}
                  >
                    <ArrowRightOnRectangleIcon className="w-5 h-5" />
                  </button>
                </>
              )}
              {/* Tooltip for collapsed state */}
              {!isExpanded && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-[#1A3A6C] text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                  {user?.name || "User"}
                  <div className="text-xs text-[#D6F4FA]">
                    {user?.role || "Administrator"}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>


      {/* Logout Confirmation Modal */}
      <ConfirmModal
        show={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        onOk={handleLogoutConfirm}
        state="pending"
        messages={{
          pending: {
            title: "Sign Out",
            description:
              "Are you sure you want to sign out? You will be redirected to the login page.",
            actionText: "Sign Out",
          },
        }}
      />
    </>
  );
}
