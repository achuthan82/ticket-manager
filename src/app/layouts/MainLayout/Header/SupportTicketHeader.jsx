// Import Dependencies
import { BellIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";

// Local Imports
import { SidebarToggleBtn } from "components/shared/SidebarToggleBtn";
import { useSidebarContext } from "app/contexts/sidebar/context";
import { useState } from "react";
// import { Button } from "@headlessui/react";

// ----------------------------------------------------------------------

export default function SupportTicketHeader() {
  const [isSettingsModalOpen, setSettingsModalOpen] = useState(false);
  const { toggle } = useSidebarContext();

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
            <button className="relative p-2 text-neutral-500 transition-colors hover:text-[#2A5A9D]">
              <BellIcon className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-[#DC3545]"></span>
            </button>
          </div>
        </div>
      </div>
      {/* the settings modal */}
      {isSettingsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="relative mx-auto w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b px-6 py-4">
              <h3 className="text-xl font-semibold text-gray-900">Settings</h3>
              <button
                onClick={() => setSettingsModalOpen(false)}
                className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="space-y-8 px-6 py-5">
              {/* Auto-Close */}
              <section>
                <h4 className="mb-4 text-lg font-medium text-gray-800">
                  Auto-Close Settings
                </h4>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 rounded border-gray-300 text-gray-600 focus:ring-gray-500"
                  />
                  <span className="text-gray-700">
                    Enable auto-close for inactive tickets
                  </span>
                </label>
                <div className="mt-3 ml-7 flex items-center space-x-3">
                  <label className="text-sm text-gray-600">
                    Close tickets after
                  </label>
                  <input
                    type="number"
                    defaultValue={7}
                    className="w-16 rounded-md border border-gray-300 px-2 py-1 text-sm focus:border-gray-500 focus:ring-gray-500"
                  />
                  <span className="text-sm text-gray-600">
                    days of inactivity
                  </span>
                </div>
              </section>

              {/* Email Notifications */}
              <section>
                <h4 className="mb-4 text-lg font-medium text-gray-800">
                  Email Notifications
                </h4>
                <div className="space-y-3">
                  {[
                    "Send email on new ticket",
                    "Send email on ticket assignment",
                    "Send email on customer reply",
                    "Send daily summary to admins",
                  ].map((label, i) => (
                    <label key={i} className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="h-4 w-4 rounded border-gray-300 text-gray-600 focus:ring-gray-500"
                      />
                      <span className="text-gray-700">{label}</span>
                    </label>
                  ))}
                </div>
              </section>

              {/* Response Goals */}
              <section>
                <h4 className="mb-4 text-lg font-medium text-gray-800">
                  Response Time Goals
                </h4>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                  {[
                    { label: "High Priority", value: 2 },
                    { label: "Medium Priority", value: 8 },
                    { label: "Low Priority", value: 24 },
                  ].map((item, i) => (
                    <div key={i}>
                      <label className="block text-sm text-gray-600">
                        {item.label}
                      </label>
                      <div className="mt-1 flex items-center space-x-2">
                        <input
                          type="number"
                          defaultValue={item.value}
                          className="w-16 rounded-md border border-gray-300 px-2 py-1 text-sm focus:border-gray-500 focus:ring-gray-500"
                        />
                        <span className="text-sm text-gray-600">hours</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Footer */}
            <div className="flex justify-end space-x-3 border-t px-6 py-4">
              <button
                onClick={() => setSettingsModalOpen(false)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button className="rounded-lg bg-gray-700 px-4 py-2 text-white hover:bg-gray-800">
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
