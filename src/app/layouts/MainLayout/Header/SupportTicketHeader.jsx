// Import Dependencies
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
// Local Imports
import { SidebarToggleBtn } from "components/shared/SidebarToggleBtn";
import { useSidebarContext } from "app/contexts/sidebar/context";
import { useState } from "react";
import TicketModal from "app/pages/support-ticket/TicketModal";
import { Notifications } from "components/template/Notifications";
import { useNotificationContext } from "app/contexts/notification/context";
// import { Button } from "@headlessui/react";

// ----------------------------------------------------------------------

export default function SupportTicketHeader() {
  const [isSettingsModalOpen, setSettingsModalOpen] = useState(false);
  const { toggle } = useSidebarContext();
  const { callApi, setCallApi } = useNotificationContext();

  return (
    <header className="border-b border-neutral-300 bg-white shadow-sm">
      <div className="px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <SidebarToggleBtn
              className="p-1 text-[#2A5A9D] hover:text-[#1A3A6C] lg:hidden"
              onClick={toggle}
            />
            <div className="min-w-0 flex-1">
              <h1 className="truncate text-lg font-bold text-[#2A5A9D] sm:text-xl lg:text-2xl">
                Support Ticket Management
              </h1>
              <p className="truncate text-sm text-neutral-500 sm:text-base">
                Manage and respond to customer support requests
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Settings Icon */}
            <button
              onClick={() => setSettingsModalOpen(true)}
              className="p-2 text-neutral-500 transition-colors hover:text-[#2A5A9D]"
            >
              <Cog6ToothIcon className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            {/* Notifications */}
            <button
              onClick={() => {
                setCallApi(!callApi);
              }}
              className="relative p-2 text-neutral-500 transition-colors hover:text-[#2A5A9D]"
            >
              <Notifications />
            </button>
          </div>
        </div>
      </div>
      {/* the settings modal */}
      {isSettingsModalOpen && (
        <TicketModal setSettingsModalOpen={setSettingsModalOpen} />
      )}
    </header>
  );
}
