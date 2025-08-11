// Import Dependencies
import { Outlet } from "react-router";

// Local Imports
import DynamicHeader from "./Header/DynamicHeader";
import DocuPromptSidebar from "./Sidebar/DocuPromptSidebar";

// ----------------------------------------------------------------------

import { useSidebarContext } from "app/contexts/sidebar/context";
import clsx from "clsx";

export default function MainLayout() {
  const { isExpanded } = useSidebarContext();
  
  return (
    <div className="flex h-screen overflow-hidden">
      <DocuPromptSidebar />
      <main className={clsx(
        "flex-1 overflow-y-auto bg-neutral-100 min-w-0 transition-all duration-300",
        isExpanded ? "lg:ml-0" : "lg:ml-0"
      )}>
        <DynamicHeader />
        <div className="p-4 sm:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
