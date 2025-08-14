import { Button } from '@headlessui/react'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

const TicketChatHeader = ({ticketId}) => {
  return (
    <>
    <header className="bg-white shadow-sm border-b border-neutral-300">
          <div className="px-4 sm:px-6 py-4">
            <div className="flex justify-between items-center">
              
              {/* Left section */}
              <div className="flex items-center space-x-3 sm:space-x-4">
                {/* Back arrow */}
                <Button className="text-neutral-500 hover:text-neutral-700">
                  <ArrowLeftIcon className="w-5 h-5"/>
                </Button>
    
                {/* Ticket info */}
                <div className="sm:flex-row sm:items-center sm:space-x-3">
                  
                  {/* Ticket title */}
                  <h1 className="text-sm sm:text-base md:text-lg font-bold text-neutral-900 mb-1">
                    #{ticketId} - Territory not showing leads
                  </h1>
    
                  {/* Status & timestamps */}
                  <div className="flex gap-4">
                    
                    {/* Status badge */}
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full">
                      Open
                    </span>
    
                    {/* Created & updated times */}
                    <div className="flex gap-3 items-center text-xs sm:text-sm text-neutral-500">
                      <span>Created 2 days ago</span>
                      <span>•</span>
                      <span>Last updated 2 hours ago</span>
                    </div>
                  </div>
                </div>
              </div>
    
              {/* Right section */}
              <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                Close Ticket
              </button>
            </div>
          </div>
        </header>
    </>
  )
}

export default TicketChatHeader