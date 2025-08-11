// Import Dependencies
import { createContext, useContext, useState } from "react";

// ----------------------------------------------------------------------

const DocumentsContext = createContext();

export const useDocumentsContext = () => {
  const context = useContext(DocumentsContext);
  if (!context) {
    throw new Error("useDocumentsContext must be used within a DocumentsProvider");
  }
  return context;
};

export const DocumentsProvider = ({ children }) => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [view, setView] = useState('card');

  const openUploadModal = () => {
    console.log('openUploadModal called');
    setIsUploadModalOpen(true);
  };

  const closeUploadModal = () => {
    setIsUploadModalOpen(false);
  };

  const value = {
    // Modal state
    isUploadModalOpen,
    openUploadModal,
    closeUploadModal,
    
    // Documents state
    documents,
    setDocuments,
    loading,
    setLoading,
    selectedDocuments,
    setSelectedDocuments,
    view,
    setView,
  };

  return (
    <DocumentsContext.Provider value={value}>
      {children}
    </DocumentsContext.Provider>
  );
};

export { DocumentsContext }; 