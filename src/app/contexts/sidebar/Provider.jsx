// Import Dependencies
import PropTypes from "prop-types";

// Local Imports
import { useDisclosure, useDidUpdate, useIsomorphicEffect } from "hooks";
import { useBreakpointsContext } from "../breakpoint/context";
import { SidebarContext } from "./context";

const initialState = {
  isExpanded: true,
  setIsExpanded: () => {},
};

export function SidebarProvider({ children }) {
  const { lgAndDown, name } = useBreakpointsContext();

  const [isExpanded, { open, close, toggle }] = useDisclosure(
    initialState.isExpanded,
  );

  // Close Sidebar when Breakpoint changed (only on mobile)
  useDidUpdate(() => {
    // Only auto-close on mobile, not on tablet/desktop
    if (lgAndDown && window.innerWidth < 768) {
      close();
    }
  }, [name, lgAndDown, close]);

  useIsomorphicEffect(() => {
    const documentBody = document?.body;
    if (documentBody) {
      isExpanded
        ? documentBody.classList.add("is-sidebar-open")
        : documentBody.classList.remove("is-sidebar-open");
    }
  }, [isExpanded]);

  if (!children) {
    return;
  }

  return (
    <SidebarContext
      value={{
        isExpanded,
        toggle,
        open,
        close,
      }}
    >
      {children}
    </SidebarContext>
  );
}

SidebarProvider.propTypes = {
  children: PropTypes.node,
};
