import { Avatar, Button, Input, ScrollShadow, Select } from "components/ui";
import {
  ArrowUpTrayIcon,
  FunnelIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

const ChatTemplate = () => {
  return (
    <div>
      <div className="flex flex-1 overflow-y-auto">
        {/* ticket listing */}
        <div className="w-full overflow-y-auto border-r border-gray-200 bg-white sm:w-1/2 lg:w-1/3">
          {/* Filters */}
          <ScrollShadow
            orientation="horizontal"
            className="hide-scrollbar h-[42rem] overflow-hidden sm:overflow-auto sm:overflow-x-auto"
          >
            <div className="border-b border-gray-200 p-4">
              {/* Search + Button */}
              <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:space-x-2">
                <Input className="w-full" placeholder="Search Tickets..." />
                <Button
                  className="h-10 w-full flex-shrink-0 p-2 sm:w-10"
                  variant="flat"
                  color="neutral"
                >
                  <FunnelIcon className="h-6 w-6" />
                </Button>
              </div>

              {/* Filters row */}
              <div className="flex flex-col gap-2 sm:flex-row sm:space-x-2">
                <Select
                  defaultValue="All Status"
                  data={[
                    "All Status",
                    "New",
                    "Open",
                    "Pending",
                    "Resolved",
                    "Closed",
                  ]}
                />
                <Select
                  defaultValue="All Priority"
                  data={["High", "Low", "Medium", "All Priority"]}
                />
                <Select
                  defaultValue="All Agents"
                  data={["All Agents", "Unassigned", "John Doe", "Jane Smith"]}
                />
              </div>

              {/* Tickets */}
              <div className="mt-4 space-y-4">
                {/* Ticket 1 */}
                <div
                  className="ticket rounded-md bg-blue-50 p-4 shadow-sm transition hover:bg-gray-50"
                  style={{
                    cursor: "pointer",
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                >
                  <div className="mb-2 flex items-start justify-between">
                    <div>
                      <p className="font-medium text-gray-900">
                        #TK-1024 - Payment Issue
                      </p>
                      <p className="text-sm text-gray-600">Micheal Johnson</p>
                    </div>
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">
                      New
                    </span>
                  </div>
                  <p className="mb-2 line-clamp-2 text-sm text-gray-700">
                    Im having trouble processing my subscription payment. The
                    system keeps showing an error...
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">5 mins ago</span>
                    <span className="rounded-full px-3 py-1 text-xs font-semibold text-red-600">
                      High Priority
                    </span>
                  </div>
                </div>

                {/* Ticket 2 */}
                <div className="rounded-md bg-white p-4 shadow-sm hover:bg-gray-50">
                  <div className="mb-2 flex items-start justify-between">
                    <div>
                      <p className="font-medium text-gray-900">
                        #TK-1023 - Lead Quality Question
                      </p>
                      <p className="text-sm text-gray-600">Sarah Williams</p>
                    </div>
                    <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800">
                      Open
                    </span>
                  </div>
                  <p className="mb-2 line-clamp-2 text-sm text-gray-700">
                    I received leads from the Miami area but the response rate
                    is lower than expected...
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">2 hours ago</span>
                    <span className="rounded-full px-3 py-1 text-xs font-semibold text-yellow-600">
                      Medium Priority
                    </span>
                  </div>
                </div>

                {/* Ticket 3 */}
                <div className="rounded-md bg-white p-4 shadow-sm hover:bg-gray-50">
                  <div className="mb-2 flex items-start justify-between">
                    <div>
                      <p className="font-medium text-gray-900">
                        #TK-1022 - Feature Request
                      </p>
                      <p className="text-sm text-gray-600">Robert Davis</p>
                    </div>
                    <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-800">
                      Pending
                    </span>
                  </div>
                  <p className="mb-2 line-clamp-2 text-sm text-gray-700">
                    Would it be possible to add a feature for scheduling
                    automated follow-up emails...
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Yesterday</span>
                    <span className="rounded-full px-3 py-1 text-xs font-semibold text-green-600">
                      Low Priority
                    </span>
                  </div>
                </div>

                {/* Ticket 4 */}
                <div className="rounded-md bg-white p-4 shadow-sm hover:bg-gray-50">
                  <div className="mb-2 flex items-start justify-between">
                    <div>
                      <p className="font-medium text-gray-900">
                        #TK-1021 - Territory Access
                      </p>
                      <p className="text-sm text-gray-600">Lisa Chen</p>
                    </div>
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">
                      Resolved
                    </span>
                  </div>
                  <p className="mb-2 line-clamp-2 text-sm text-gray-700">
                    I purchased access to the California territory but Im not
                    seeing any leads...
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">2 days ago</span>
                    <span className="rounded-full px-3 py-1 text-xs font-semibold text-red-600">
                      High Priority
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollShadow>
        </div>

        {/* ticket details */}

        <div className="flex flex-1 flex-col bg-white">
          <div className="border border-gray-200 p-4 sm:p-6">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              {/* Left side: Ticket info */}
              <div className="min-w-0 flex-1">
                <h2 className="truncate text-base font-bold text-gray-900 sm:text-lg md:text-xl">
                  #TK-1024 - Payment Issue
                </h2>

                {/* User Info + Meta */}
                <div className="mt-3 flex flex-col gap-2 text-sm sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3">
                  <div className="flex max-w-full min-w-[200px] items-center">
                    <Avatar
                      initialColor="info"
                      className="mr-2"
                      name="Micheal John"
                    />
                    <div className="min-w-0">
                      <p className="font-medium text-gray-900">
                        Micheal Johnson
                      </p>
                      <p className="truncate text-xs text-gray-500 sm:text-sm">
                        micheal.j@email.com
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-2 text-gray-500">
                    <span className="hidden sm:inline">•</span>
                    <span>Created 5 mins ago</span>
                    <span className="hidden sm:inline">•</span>
                    <span className="font-medium text-red-600">
                      High Priority
                    </span>
                  </div>
                </div>
              </div>

              {/* Right side: Select controls */}
              <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center md:w-auto">
                <div className="flex w-full items-center space-x-2 sm:w-auto">
                  <label className="shrink-0 text-sm font-medium text-gray-700">
                    Status:
                  </label>
                  <Select
                    defaultValue="Status"
                    data={["New", "Open", "Pending", "Resolved", "Closed"]}
                    className="flex-1 sm:flex-none"
                  />
                </div>

                <div className="flex w-full items-center space-x-2 sm:w-auto">
                  <label className="shrink-0 text-sm font-medium text-gray-700">
                    Assign to:
                  </label>
                  <Select
                    defaultValue="Assigned"
                    data={[
                      "Unassigned",
                      "John Doe",
                      "Jane Smith",
                      "Admin User",
                    ]}
                    className="flex-1 sm:flex-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* messaging section */}
          <div className="relative flex flex-1 flex-col overflow-hidden">
            {/* Messages container with proper scrolling */}
            <div className="absolute inset-0 flex-1 overflow-hidden">
              <ScrollShadow
                orientation="vertical"
                className="h-full max-h-[calc(800px-400px)] overflow-y-auto"
              >
                <div className="space-y-4 p-3 sm:p-4 md:p-6">
                  {/* User Message */}
                  <div className="flex flex-col items-start sm:flex-row sm:space-x-3">
                    <Avatar
                      initialColor="info"
                      className="mr-2 mb-2 sm:mb-0"
                      name="Micheal John"
                    />
                    <div className="flex-1">
                      <div className="mb-1 flex flex-wrap items-center space-x-2">
                        <span className="font-medium text-gray-900">
                          Micheal Johnson
                        </span>
                        <span className="text-xs text-gray-500">
                          5 mins ago
                        </span>
                      </div>

                      <div className="max-w-full rounded-lg bg-gray-100 p-3 break-words text-gray-700 sm:p-4 md:max-w-[75%]">
                        <p>
                          Im having trouble processing my subscription payment.
                          The system keeps showing an error message when I try
                          to update my credit card information.
                        </p>
                        <p className="mt-2">
                          Error message: Payment method could not be verified.
                        </p>
                        <p className="mt-2">
                          Ive tried multiple times with different cards but
                          getting the same error.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="flex justify-center">
                    <div className="flex items-center rounded-full bg-yellow-50 px-3 py-1.5 text-xs text-yellow-800 sm:text-sm">
                      <InformationCircleIcon className="mr-1 h-4 w-4 sm:h-5 sm:w-5" />
                      <span>Ticket assigned to John Doe</span>
                    </div>
                  </div>

                  {/* Agent Response */}
                  <div className="flex flex-col items-start justify-end sm:flex-row sm:items-end sm:space-x-3">
                    <div className="order-2 max-w-full flex-1 sm:order-1 sm:max-w-lg">
                      <div className="mb-1 flex flex-wrap items-center justify-end space-x-2">
                        <span className="text-xs text-gray-500">
                          2 mins ago
                        </span>
                        <span className="font-medium text-gray-900">
                          John Doe
                        </span>
                      </div>
                      <div className="ml-auto max-w-full rounded-lg bg-teal-100 p-3 break-words text-gray-700 sm:p-4 md:max-w-[75%]">
                        <p>Hi Micheal</p>
                        <p className="mt-2">
                          Im sorry to hear you are experiencing issues with
                          updating your payment method. Ive checked your account
                          and I can see the error in our system.
                        </p>
                        <p className="mt-2">
                          Im escalating this to our technical team for immediate
                          resolution. In the meantime, I can process your
                          payment manually if you would like to continue your
                          subscription without interruption.
                        </p>
                        <p className="mt-2">
                          Would you prefer to wait for the fix or shall I assist
                          you with a manual payment?
                        </p>
                      </div>
                    </div>
                    <Avatar
                      initialColor="success"
                      className="order-1 mb-2 h-9 w-9 rounded-full sm:order-2 sm:mb-0 sm:h-10 sm:w-10"
                      name="John Doe"
                    />
                  </div>

                  {/* More messages… */}
                </div>
              </ScrollShadow>
            </div>

            {/* reply section - now matches the width of ticket details */}
            <div className="absolute right-0 bottom-0 left-0 border-t border-gray-300 bg-white p-3 sm:p-4">
              <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-3">
                {/* Avatar */}
                <div className="mb-2 flex flex-shrink-0 justify-center sm:mb-0 sm:justify-start">
                  <Avatar
                    initialColor="info"
                    className="mr-0 sm:mr-0"
                    name="Admin User"
                  />
                </div>

                {/* Input + Actions */}
                <div className="flex flex-1 flex-col">
                  <textarea
                    placeholder="Type your response..."
                    className="focus:ring-atoll w-full resize-none rounded-lg border border-gray-400 px-3 py-2 text-sm focus:ring-2 focus:outline-none sm:px-4 sm:py-3 sm:text-base"
                    rows="3"
                  ></textarea>

                  {/* Bottom Actions */}
                  <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    {/* Left Actions */}
                    <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
                      <Button
                        variant="flat"
                        className="flex items-center justify-center text-gray-400 hover:text-gray-600 sm:justify-start"
                      >
                        <ArrowUpTrayIcon className="h-5 w-5" />
                      </Button>
                      <Select
                        defaultValue="Use Template"
                        data={[
                          "Use Template",
                          "Payment Issue Response",
                          "Feature Request Response",
                          "General Inquiry",
                        ]}
                        className="w-full sm:w-auto"
                      />
                    </div>

                    {/* Right Action */}
                    <div className="flex w-full justify-end sm:w-auto">
                      <Button className="bg-atoll hover:bg-opacity-90 w-full rounded-lg px-4 py-2 text-white sm:w-auto">
                        Send Response
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatTemplate;
