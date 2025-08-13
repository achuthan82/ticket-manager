// Import Dependencies
import { useLocation } from "react-router";

// Local Imports
import DocuPromptHeader from "./DocuPromptHeader";
import DocumentsHeader from "./DocumentsHeader";
import UsersHeader from "./UsersHeader";
import PromptHeader from "./PromptHeader";
import SupportUserHeader from "./SupportUserHeader";
import SupportTicketHeader from "./SupportTicketHeader";

// ----------------------------------------------------------------------

export default function DynamicHeader({ onUploadClick, onInviteClick, onExportClick, onOpenModal, onAddUserClick }) {
  const { pathname } = useLocation();

  // Determine which header to show based on the current route
  if (pathname.startsWith('/documents')) {
    return <DocumentsHeader onUploadClick={onUploadClick} />;
  } else if (pathname.startsWith('/users')) {
    return <UsersHeader 
      onInviteClick={onInviteClick} 
      onExportClick={onExportClick} 
    />;
  } 
  else if (pathname.startsWith('/dashboard')) {
    return <DocuPromptHeader />;
  } else if (pathname.startsWith('/prompts')) {
    return <PromptHeader onOpenModal={onOpenModal}/>
  } else if (pathname.startsWith('/support-user')) {
    return <SupportUserHeader 
      onAddUserClick={onAddUserClick}
      onExportClick={onExportClick}
    />
  } else if (pathname.startsWith('/support-ticket')) {
    return <SupportTicketHeader />
  }
} 