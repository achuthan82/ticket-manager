// Import Dependencies
import { BellIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'

// Local Imports
import { SidebarToggleBtn } from "components/shared/SidebarToggleBtn";
import { useSidebarContext } from "app/contexts/sidebar/context";

// ----------------------------------------------------------------------

export default function SupportTicketHeader() {
  const { toggle } = useSidebarContext();

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
                Support Ticket Management
              </h1>
              <p className="text-sm sm:text-base text-neutral-500 truncate">
                Manage and respond to customer support requests
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Settings Icon */}
            <button className="p-2 text-neutral-500 hover:text-[#2A5A9D] transition-colors">
              <Cog6ToothIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            
            {/* Notifications */}
            <button className="relative p-2 text-neutral-500 hover:text-[#2A5A9D] transition-colors">
              <BellIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#DC3545] rounded-full"></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
