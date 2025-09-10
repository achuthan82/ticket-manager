// Import Dependencies
import { useState, useEffect } from "react";

// Local Imports
import { SidebarToggleBtn } from "components/shared/SidebarToggleBtn";
import { useSidebarContext } from "app/contexts/sidebar/context";
import { Notifications } from "components/template/Notifications";
import { useNotificationContext } from "app/contexts/notification/context";

// ----------------------------------------------------------------------

export default function DocuPromptHeader() {
  const { toggle } = useSidebarContext();
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
    const {callApi, setCallApi} = useNotificationContext()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDateTime = (date) => {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <header className="bg-white shadow-sm border-b border-neutral-300">
      <div className="px-4 sm:px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <SidebarToggleBtn 
              className="text-[#2A5A9D] hover:text-[#1A3A6C] p-1 lg:hidden"
              onClick={toggle}
            />
            <div className="min-w-0 flex-1">
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#2A5A9D] truncate">
                Home
              </h1>
              <p className="text-sm sm:text-base text-neutral-500 truncate">
                Welcome back! Here&apos;s what&apos;s happening today.
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Notifications */}
            <button
               onClick={() => {setCallApi(!callApi)}}
            className="relative p-2 text-neutral-500 hover:text-[#2A5A9D] transition-colors">
              <Notifications/>
            </button>
            
            {/* Date/Time */}
            <div className="text-xs sm:text-sm text-neutral-500 hidden sm:block">
              <span className="hidden md:inline">{formatDateTime(currentDateTime)}</span>
              <span className="md:hidden">
                {currentDateTime.toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true
                })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
} 