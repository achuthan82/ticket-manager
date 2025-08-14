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
    return user.name
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
          "fixed inset-y-0 left-0 z-50 bg-white transition-all duration-300 ease-in-out lg:relative lg:z-auto",
          isExpanded
            ? "w-64 translate-x-0"
            : isMobile
              ? "w-64 -translate-x-full"
              : "w-16 translate-x-0 lg:w-16",
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div
            style={{ minHeight: "80px" }}
            className={clsx(
              "relative mt-2 flex h-16 items-center",
              isExpanded
                ? "justify-between px-4 lg:px-6"
                : "justify-center px-2",
            )}
          >
            <div className="flex min-w-0 items-center">
              <div
                className={clsx(
                  "flex h-10 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-lg text-xl font-bold text-white transition-colors duration-200",
                  !isExpanded && "hover:bg-[#6CD9EA]",
                )}
                onClick={!isExpanded ? toggle : undefined}
                title={!isExpanded ? "Expand sidebar" : undefined}
              >
                <img
                  src="/shieldnest-icon.png"
                  alt="ShieldNest"
                  className="h-10 w-10 object-contain"
                />
              </div>
              {isExpanded && (
                <span className="ml-3 text-xl font-bold transition-opacity duration-300">
                  Ticket Manager
                </span>
              )}
            </div>
            {isExpanded && (
              <SidebarToggleBtn
                className="flex-shrink-0 text-white transition-all duration-300 hover:text-[#D6F4FA]"
                onClick={toggle}
              />
            )}
          </div>

          {/* Navigation */}
          <nav
            className={clsx(
              "flex-1 space-y-1 py-6",
              isExpanded
                ? "overflow-y-auto px-4 lg:px-6"
                : "overflow-hidden px-2",
            )}
          >
            {navigation.map((item) => {
              const isActive = isRouteActive(item.path, pathname);
              const Icon = item.Icon;

              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={clsx(
                    "group relative flex items-center rounded-lg transition-colors duration-200",
                    isExpanded ? "space-x-3 px-4 py-3" : "justify-center p-3",
                    isActive
                      ? "bg-[#c9e0e5] text-[#1A3A6C] border-r-[3px] border-r-[#0a5a78]"
                      : "text-gray-700 hover:bg-[#d5e5c3] hover:text-gray-700",
                  )}
                  title={!isExpanded ? item.title : undefined}
                >
                  <div className="relative flex-shrink-0">
                    <Icon className="h-5 w-5" />
                    {item.badge && !isExpanded && (
                      <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#00B4D8] text-xs text-[10px] font-bold text-white">
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
                        <span className="ml-auto rounded-full bg-[#00B4D8] px-2 py-1 text-xs text-white">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                  {/* Tooltip for collapsed state */}
                  {!isExpanded && (
                    <div className="pointer-events-none absolute left-full z-50 ml-2 rounded bg-[#1A3A6C] px-2 py-1 text-sm whitespace-nowrap text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                      {item.title}
                      {item.badge && (
                        <span className="ml-2 rounded-full bg-[#00B4D8] px-1.5 py-0.5 text-xs text-white">
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
          <div
            className={clsx(
              "border-t border-[#1A3A6C]",
              isExpanded ? "p-4 lg:p-6" : "p-2",
            )}
          >
            <div
              className={clsx(
                "group relative flex items-center",
                isExpanded ? "space-x-3" : "justify-center",
              )}
              >
            {/* //// #00B4D8 */}
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#0c4a6e] font-semibold text-white">
                {getUserInitials(user)}
              </div>
              {!isExpanded && (
                <button
                  className="absolute inset-0 flex h-full w-full items-center justify-center rounded-lg bg-[#1A3A6C] opacity-0 transition-all duration-200 hover:opacity-100"
                  title="Logout"
                  onClick={handleLogoutClick}
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5 text-white" />
                </button>
              )}
              {isExpanded && (
                <>
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-semibold">
                      {user?.name || "User"}
                    </div>
                    <div className="truncate text-xs text-gray-700">
                      {user?.role_id === 1 ? "Admin" : "User"}
                    </div>
                  </div>
                  <button
                    className="flex-shrink-0 text-gray-700 transition-colors "
                    title="Logout"
                    onClick={handleLogoutClick}
                  >
                    <ArrowRightOnRectangleIcon className="h-5 w-5" />
                  </button>
                </>
              )}
              {/* Tooltip for collapsed state */}
              {!isExpanded && (
                <div className="pointer-events-none absolute left-full z-50 ml-2 rounded bg-[#1A3A6C] px-2 py-1 text-sm whitespace-nowrap text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
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
