// Import Dependencies
import { Outlet, useLocation } from "react-router";
import { useContext, useState } from "react";

// Local Imports
import DynamicHeader from "./Header/DynamicHeader";
import DocuPromptSidebar from "./Sidebar/DocuPromptSidebar";
import { DocumentsContext } from "app/contexts/documents/context";
// import { UsersContext } from "app/contexts/users/context";
import { PromptsContext } from "app/contexts/prompts/context";
import { useSidebarContext } from "app/contexts/sidebar/context";
import clsx from "clsx";
import NewTicketModal from "components/shared/NewTicketModal";

// ----------------------------------------------------------------------

export default function MainLayoutWithContext() {
  const { isExpanded } = useSidebarContext();
  const { pathname } = useLocation();
  const [isNewTicketOpen, setIsNewTicketOpen] = useState(false);
  
  // Get context values for state management
  const documentsContext = useContext(DocumentsContext);
  // const usersContext = useContext(UsersContext);
  const promptsContext = useContext(PromptsContext);

  // Determine which functions to pass based on current route
  const getHeaderProps = () => {
    console.log('Current pathname:', pathname);
    console.log('Documents context:', documentsContext);
    // console.log('Users context:', usersContext);
    console.log('Prompts context:', promptsContext);
    
    if (pathname.startsWith('/documents')) {
      return {
        onUploadClick: documentsContext?.openUploadModal
      };
    } else if (pathname.startsWith('/users')) {
      // return {
      //   onInviteClick: usersContext?.openInviteModal,
      //   onExportClick: usersContext?.exportUsers
      // };
    } else if (pathname.startsWith('/prompts')) {
      return {
        onOpenModal: promptsContext?.openModal
      };
    } else if (pathname.startsWith('/support-user')) {
      return {
        onAddUserClick: () => setIsNewTicketOpen(true),
      };
    }
    return {};
  };
  
  return (
    <div className="flex h-screen overflow-hidden">
      <DocuPromptSidebar />
      <main className={clsx(
        "flex-1 bg-neutral-100 min-w-0 transition-all duration-300 flex flex-col",
        isExpanded ? "lg:ml-0" : "lg:ml-0"
      )}>
        <DynamicHeader {...getHeaderProps()} />
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Outlet />
        </div>
        <NewTicketModal
          open={isNewTicketOpen}
          onClose={() => setIsNewTicketOpen(false)}
          onSubmit={(payload) => {
            console.log('Submitting New Ticket:', payload);
            setIsNewTicketOpen(false);
          }}
        />
      </main>
    </div>
  );
} 