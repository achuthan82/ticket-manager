import { Button } from '@headlessui/react'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import moment from 'moment'
const TicketChatHeader = ({ticketId,backToTickets,closeTicket, headerDetails}) => {
  
  const badgeStyles = {
    1: "bg-amber-100 text-amber-800", // Open
    2: "bg-blue-100 text-blue-800",   // Pending
    3: "bg-green-100 text-green-800", // Resolved
    4: "bg-gray-200 text-gray-700",   // Closed
  };

  const statusLabels = {
    1: "Open",
    2: "Pending",
    3: "Resolved",
    4: "Closed",
  };
  return (
    <>
    <header className="bg-white shadow-sm border-b border-neutral-300">
          <div className="px-4 sm:px-6 py-4">
            <div className="flex justify-between items-center">
              
              {/* Left section */}
              <div className="flex items-center space-x-3 sm:space-x-4">
                {/* Back arrow */}
                <Button className="text-neutral-500 hover:text-neutral-700" onClick={backToTickets}>
                  <ArrowLeftIcon className="w-5 h-5"/>
                </Button>
    
                {/* Ticket info */}
                <div className="sm:flex-row sm:items-center sm:space-x-3">
                  
                  {/* Ticket title */}
                  <h1 className="text-sm sm:text-base md:text-lg font-bold text-neutral-900 mb-1">
                    #{ticketId} - {headerDetails?.subject || 'N/A'}
                  </h1>
    
                  {/* Status & timestamps */}
                  <div className="flex gap-4">
                    
                    {/* Status badge */}
                    {
                      headerDetails?.status && <span className={`${badgeStyles[headerDetails.status] || badgeStyles[1]} text-xs font-medium px-2 py-1 rounded-full`}>
                      {statusLabels[headerDetails.status]}
                    </span>
                    }
                    
    
                    {/* Created & updated times */}
                    <div className="flex gap-3 items-center text-xs sm:text-sm text-neutral-500">
                      <span>Created {headerDetails?.created_at ? moment(headerDetails.created_at, "MM-DD-YYYY HH:mm:ss").fromNow():'N/A'} </span>
                      <span>•</span>
                      <span>Last updated {headerDetails?.created_at ? moment(headerDetails.created_at, "MM-DD-YYYY HH:mm:ss").fromNow():'N/A'}</span>
                    </div>
                  </div>
                </div>
              </div>
    
              {/* Right section */}
              <button className="text-red-600 hover:text-red-800 text-sm font-medium" onClick={closeTicket}>
                Close Ticket
              </button>
            </div>
          </div>
        </header>
    </>
  )
}

export default TicketChatHeader