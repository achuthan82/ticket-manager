// Import Dependencies
// import { useState, useEffect } from "react";

// Local Imports
import { SidebarToggleBtn } from "components/shared/SidebarToggleBtn";
import { useSidebarContext } from "app/contexts/sidebar/context";
import { Notifications } from 'components/template/Notifications';

// ----------------------------------------------------------------------

export default function NotificationHeader() {
  const { toggle,isExpanded } = useSidebarContext();

  // const formatDateTime = (date) => {
  //   const options = {
  //     weekday: 'long',
  //     year: 'numeric',
  //     month: 'long',
  //     day: 'numeric',
  //     hour: '2-digit',
  //     minute: '2-digit',
  //     hour12: true
  //   };
  //   return date.toLocaleDateString('en-US', options);
  // };

  return (
    <header className="bg-white shadow-sm border-b border-neutral-300">
      <div className="px-4 sm:px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3 sm:space-x-4">
            {!isExpanded && (
              <SidebarToggleBtn
                className="p-1  lg:hidden"
                onClick={toggle}
              />
            )}
            <div className="min-w-0 flex-1">
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#2A5A9D] truncate">
                Notifications
              </h1>
              <p className="text-sm sm:text-base text-neutral-500 truncate">
                View Notifications
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Action Buttons */}
         
            
            {/* Notifications */}
            <Notifications/>
          
          </div>
        </div>
      </div>
    </header>
  );
} 