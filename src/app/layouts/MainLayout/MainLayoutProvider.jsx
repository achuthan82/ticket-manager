// Import Dependencies
import { DocumentsProvider } from "app/contexts/documents/context";
import { UsersProvider } from "app/contexts/users/context";
import { PromptsProvider } from "app/contexts/prompts/context";
import MainLayoutWithContext from "./MainLayoutWithContext";

// ----------------------------------------------------------------------

export default function MainLayoutProvider() {
  return (
    <DocumentsProvider>
      <UsersProvider>
        <PromptsProvider>
          <MainLayoutWithContext />
        </PromptsProvider>
      </UsersProvider>
    </DocumentsProvider>
  );
} 