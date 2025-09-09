// Import Dependencies
import { Outlet, useLocation } from "react-router";
import { useContext, useEffect, useState } from "react";

// Local Imports
import DynamicHeader from "./Header/DynamicHeader";
import DocuPromptSidebar from "./Sidebar/DocuPromptSidebar";
import { DocumentsContext } from "app/contexts/documents/context";
// import { UsersContext } from "app/contexts/users/context";
import { PromptsContext } from "app/contexts/prompts/context";
import { useSidebarContext } from "app/contexts/sidebar/context";
import clsx from "clsx";
import NewTicketModal from "components/shared/NewTicketModal";
import FAQModal from "app/pages/FAQ/FAQModal";
import { addFaq } from "utils/ManageFaqService";

// ----------------------------------------------------------------------

export default function MainLayoutWithContext() {
  const { isExpanded } = useSidebarContext();
  const { pathname } = useLocation();
  const [isNewTicketOpen, setIsNewTicketOpen] = useState(false);
  const [prefillCategory, setPrefillCategory] = useState("");
  // for FAQ
  const [isFAQModalOpen, setIsFAQModalOpen] = useState(false);
  const [editingFAQ, setEditingFAQ] = useState(null);

  useEffect(() => {
    const handleOpenModal = (e) => {
      setPrefillCategory(e.detail?.category || "");
      setIsNewTicketOpen(true);
    };

    window.addEventListener("openNewTicketModal", handleOpenModal);
    return () =>
      window.removeEventListener("openNewTicketModal", handleOpenModal);
  }, []);

  const isTicketChat = /^\/support-user\/[^/]+$/.test(pathname);

  // Get context values for state management
  const documentsContext = useContext(DocumentsContext);
  // const usersContext = useContext(UsersContext);
  const promptsContext = useContext(PromptsContext);

  // Determine which functions to pass based on current route
  const getHeaderProps = () => {
    console.log("Current pathname:", pathname);
    console.log("Documents context:", documentsContext);
    // console.log('Users context:', usersContext);
    console.log("Prompts context:", promptsContext);

    if (pathname.startsWith("/documents")) {
      return {
        onUploadClick: documentsContext?.openUploadModal,
      };
    } else if (pathname.startsWith("/users")) {
      // return {
      //   onInviteClick: usersContext?.openInviteModal,
      //   onExportClick: usersContext?.exportUsers
      // };
    } else if (pathname.startsWith("/prompts")) {
      return {
        onOpenModal: promptsContext?.openModal,
      };
    } else if (pathname.startsWith("/support-user")) {
      return {
        onAddUserClick: () => setIsNewTicketOpen(true),
      };
    } else if (pathname.startsWith("/faq")) {
      return {
        onAddFaqClick: () => {
          setEditingFAQ(null); // new FAQ
          setIsFAQModalOpen(true);
        },
      };
    }

    return {};
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <DocuPromptSidebar />
      <main
        className={clsx(
          "flex min-w-0 flex-1 flex-col bg-neutral-100 transition-all duration-300",
          isExpanded ? "lg:ml-0" : "lg:ml-0",
        )}
      >
        <DynamicHeader {...getHeaderProps()} />

        <div
          className={`flex-1 overflow-y-auto ${
            isTicketChat ? "" : "p-4 sm:p-6"
          }`}
        >
          {/* <div className="flex-1 overflow-y-auto p-4 sm:p-6"> */}

          <Outlet />
        </div>
        <NewTicketModal
          open={isNewTicketOpen}
          prefillCategory={prefillCategory}
          onClose={() => setIsNewTicketOpen(false)}
          onSubmit={(payload) => {
            console.log("Submitting New Ticket:", payload);
            setIsNewTicketOpen(false);
          }}
        />

        <FAQModal
          faq={editingFAQ}
          onClose={() => setIsFAQModalOpen(false)}
          onSave={async (data) => {
            try {
              const result = await addFaq(data);
              console.log("FAQ created:", result);
              setIsFAQModalOpen(false);
            } catch (err) {
              console.error(err);
            }
          }}
          open={isFAQModalOpen}
        />
      </main>
    </div>
  );
}
