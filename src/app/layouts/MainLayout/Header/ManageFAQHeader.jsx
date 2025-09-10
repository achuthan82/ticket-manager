import { SidebarToggleBtn } from "components/shared/SidebarToggleBtn";
import { useSidebarContext } from "app/contexts/sidebar/context";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Button } from "components/ui";
import { Notifications } from "components/template/Notifications";
import { useNotificationContext } from "app/contexts/notification/context";
export default function FAQHeader({ onAddClick }) {
  const { toggle } = useSidebarContext();
  const {callApi, setCallApi} = useNotificationContext()
  return (
    <header className="border-b border-neutral-300 bg-white shadow-sm">
      <div className="px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Sidebar Toggle (mobile only) */}
            <SidebarToggleBtn
              className="p-1 text-[#2A5A9D] hover:text-[#1A3A6C] lg:hidden"
              onClick={toggle}
            />
            <div className="min-w-0 flex-1">
              <h1 className="truncate text-lg font-bold text-[#2A5A9D] sm:text-xl lg:text-2xl">
                FAQ Management
              </h1>
              <p className="truncate text-sm text-neutral-500 sm:text-base">
                Add, edit, and manage frequently asked questions
              </p>
            </div>
          </div>

          {/* Add FAQ Button */}
          <div className="flex space-x-2">
            <Button
              onClick={() => {onAddClick();setCallApi(!callApi)}}
              color="primary"
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-white shadow"
            >
              <PlusIcon className="h-5 w-5" /> Add FAQ
            </Button>
            <div>
              <Notifications />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
