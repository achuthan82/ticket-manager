// Import Dependencies
import { Outlet, useLocation } from "react-router";
import { useContext, useEffect, useState } from "react";

// Local Imports
import DynamicHeader from "./Header/DynamicHeader";
import DocuPromptSidebar from "./Sidebar/DocuPromptSidebar";
import { DocumentsContext } from "app/contexts/documents/context";
import { PromptsContext } from "app/contexts/prompts/context";
import { useSidebarContext } from "app/contexts/sidebar/context";
import clsx from "clsx";
import NewTicketModal from "components/shared/NewTicketModal";

// ----------------------------------------------------------------------

export default function MainLayoutWithContext() {
  const { isExpanded } = useSidebarContext();
  const { pathname } = useLocation();
  const [isNewTicketOpen, setIsNewTicketOpen] = useState(false);
  const [prefillCategory, setPrefillCategory] = useState("");

  useEffect(() => {
    const handleOpenModal = (e) => {
      setPrefillCategory(e.detail?.categoryId || "");
      setIsNewTicketOpen(true);
    };

    window.addEventListener("openNewTicketModal", handleOpenModal);
    return () =>
      window.removeEventListener("openNewTicketModal", handleOpenModal);
  }, []);

  const isTicketChat = /^\/support-user\/[^/]+$/.test(pathname);

  const documentsContext = useContext(DocumentsContext);
  const promptsContext = useContext(PromptsContext);

  const getHeaderProps = () => {
    if (pathname.startsWith("/documents")) {
      return { onUploadClick: documentsContext?.openUploadModal };
    } else if (pathname.startsWith("/prompts")) {
      return { onOpenModal: promptsContext?.openModal };
    } else if (pathname.startsWith("/support-user")) {
      return { onAddUserClick: () => setIsNewTicketOpen(true) };
    } else if (pathname.startsWith("/faq")) {
      return {
        onAddFaqClick: () => {
          // 🔥 Dispatch event instead of opening modal here
          window.dispatchEvent(new CustomEvent("openFaqModal"));
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
      </main>
    </div>
  );
}
