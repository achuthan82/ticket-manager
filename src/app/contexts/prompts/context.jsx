// Import Dependencies
import { createContext, useContext, useState } from "react";

// ----------------------------------------------------------------------

const PromptsContext = createContext();

export const usePromptsContext = () => {
  const context = useContext(PromptsContext);
  if (!context) {
    throw new Error("usePromptsContext must be used within a PromptsProvider");
  }
  return context;
};

export const PromptsProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const value = {
    // Modal state
    isModalOpen,
    setIsModalOpen,
    openModal,
    closeModal
    // Documents state
    
  };

  return (
    <PromptsContext.Provider value={value}>
      {children}
    </PromptsContext.Provider>
  );
};

export { PromptsContext }; 