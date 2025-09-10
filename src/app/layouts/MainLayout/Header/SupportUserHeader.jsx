// Import Dependencies
import { PlusIcon } from '@heroicons/react/24/outline'

// Local Imports
import { SidebarToggleBtn } from "components/shared/SidebarToggleBtn";
import { useSidebarContext } from "app/contexts/sidebar/context";
import { Button } from "components/ui";
import { Notifications } from 'components/template/Notifications';
import { useNotificationContext } from 'app/contexts/notification/context';

// ----------------------------------------------------------------------

export default function SupportUserHeader({ onAddUserClick }) {
  const { toggle } = useSidebarContext();

    const {callApi, setCallApi} = useNotificationContext()

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
                Support Center
              </h1>
              <p className="text-sm sm:text-base text-neutral-500 truncate">
                Get help, browse FAQs, or submit a support ticket  
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Action Button */}
            <Button 
              color='primary' 
              className="px-3 py-2 text-sm hidden sm:flex" 
              onClick={() => {
                console.log('New Ticket button clicked');
                onAddUserClick?.();
              }}
            >
              <span className="flex items-center space-x-2">
                <PlusIcon className="w-4 h-4" />
                <span>New Ticket</span>
              </span>
            </Button>
            
            {/* Mobile Action Button */}
            <Button 
              color='primary' 
              className="p-2 sm:hidden" 
              isIcon
              onClick={() => {
                console.log('New Ticket button clicked (mobile)');
                onAddUserClick?.();
              }}
            >
              <PlusIcon className="w-5 h-5" />
            </Button>
            
            {/* Notifications */}
            <button 
            onClick={() => {setCallApi(!callApi)}}
             className="relative p-2 text-neutral-500 hover:text-[#2A5A9D] transition-colors">
              <Notifications className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
