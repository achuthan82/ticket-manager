// Import Dependencies
// import { useState, useEffect } from "react";
import { BellIcon,  PlusIcon } from '@heroicons/react/24/outline'

// Local Imports
import { SidebarToggleBtn } from "components/shared/SidebarToggleBtn";
import { useSidebarContext } from "app/contexts/sidebar/context";
import { Button } from "components/ui";
import { usePromptsContext } from 'app/contexts/prompts/context';
// ----------------------------------------------------------------------

export default function PromptHeader({ onOpenModal }) {
  const { toggle } = useSidebarContext();
  const {openModal} = usePromptsContext()
  // const formatDateTime = (date) => {
  //   const options = {
  //     weekday: 'long',
  //     year: 'numeric',
  //     month: 'long',
  //     day: 'numeric',
  //     hour: '2-digit',
  //     minute: '2-digit',
  //     hour12: true
  //   };
  //   return date.toLocaleDateString('en-US', options);
  // };

  return (
    <header className="bg-white shadow-sm border-b border-neutral-300">
      <div className="px-4 sm:px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <SidebarToggleBtn 
              className="text-[#2A5A9D] hover:text-[#1A3A6C] p-1 lg:hidden"
              onClick={toggle}
            />
            <div className="min-w-0 flex-1">
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#2A5A9D] truncate">
                Prompt Management
              </h1>
              <p className="text-sm sm:text-base text-neutral-500 truncate">
                Create and manage AI prompts for document editing
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Action Buttons */}
            <div className="hidden sm:flex items-center space-x-2">
              <Button 
                color='primary' 
                className="px-3 py-2 text-sm" 
                onClick={onOpenModal || openModal}
              >
                <span className="flex items-center space-x-2">
                  <PlusIcon className="w-4 h-4" />
                  <span>Create Prompt</span>
                </span>
              </Button>
             
            </div>
            
            {/* Notifications */}
            <button className="relative p-2 text-neutral-500 hover:text-[#2A5A9D] transition-colors">
              <BellIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#DC3545] rounded-full"></span>
            </button>
            
            {/* Date/Time */}
            {/* <div className="text-xs sm:text-sm text-neutral-500 hidden sm:block">
              <span className="hidden md:inline">{formatDateTime(currentDateTime)}</span>
              <span className="md:hidden">
                {currentDateTime.toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true
                })}
              </span>
            </div> */}
          </div>
        </div>
      </div>
    </header>
  );
} 