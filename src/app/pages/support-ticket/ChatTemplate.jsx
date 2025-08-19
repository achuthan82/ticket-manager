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
        <div className="w-1/3 overflow-y-auto border-r border-gray-200 bg-white">
          {/* Filters */}
          <ScrollShadow
            orientation="horizontal"
            className="hide-scrollbar h-170 overflow-hidden sm:overflow-auto sm:overflow-x-auto"
          >
            <div className="border-b border-gray-200 p-4">
              <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:space-x-2">
                <Input className="w-100" placeholder="Search Tickets..." />
                <Button
                  className="h-10 w-full flex-shrink-0 p-2 sm:w-10"
                  variant="flat"
                  color="neutral"
                >
                  <FunnelIcon className="h-6 w-6" />
                </Button>
              </div>
              <div className="flex flex-1 space-x-2">
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

              {/* Ticket 1 */}
              <div
                className="ticket mt-4 bg-blue-50 p-4 transition duration-200 hover:bg-gray-50"
                style={{
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  padding: "1rem",
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
                  <span
                    style={{
                      fontSize: "0.75rem",
                      padding: "0.25rem 0.75rem",
                      borderRadius: "9999px",
                      fontWeight: "600",
                      backgroundColor: "#dbeafe",
                      color: "#1e40af",
                    }}
                  >
                    New
                  </span>
                </div>
                <p className="mb-2 line-clamp-2 text-sm text-gray-700">
                  Im having trouble processing my subscription payment. The
                  system keeps showing an error...
                </p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">5 mins ago</span>
                  <span
                    className="font-medium"
                    style={{
                      fontSize: "0.75rem",
                      padding: "0.25rem 0.75rem",
                      borderRadius: "9999px",
                      fontWeight: "600",
                      color: "red",
                    }}
                  >
                    High Priority
                  </span>
                </div>
              </div>

              {/* Ticket 2 */}
              <div className="mt-4 bg-white p-4 shadow-sm hover:bg-gray-50">
                <div className="mb-2 flex items-start justify-between">
                  <div>
                    <p className="font-medium text-gray-900">
                      #TK-1023 - Lead Quality Question
                    </p>
                    <p className="text-sm text-gray-600">Sarah Williams</p>
                  </div>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      padding: "0.25rem 0.75rem",
                      borderRadius: "9999px",
                      fontWeight: "600",
                      backgroundColor: "#fef3c7",
                      color: "#92400e",
                    }}
                  >
                    Open
                  </span>
                </div>
                <p className="mb-2 line-clamp-2 text-sm text-gray-700">
                  I received leads from the Miami area but the response rate is
                  lower than expected...
                </p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">2 hours ago</span>
                  <span
                    className="font-medium"
                    style={{
                      fontSize: "0.75rem",
                      padding: "0.25rem 0.75rem",
                      borderRadius: "9999px",
                      fontWeight: "600",
                      color: "#f59e0b",
                    }}
                  >
                    Medium Priority
                  </span>
                </div>
                <div className="mt-2 flex items-center">
                  <Avatar
                    size={7}
                    className="mr-2"
                    initialColor="primary"
                    name="John Doe"
                  />
                  <span className="text-xs text-gray-600">
                    Assigned to John Doe
                  </span>
                </div>
              </div>

              {/* Ticket 3 */}
              <div className="mt-4 bg-white p-4 shadow-sm hover:bg-gray-50">
                <div className="mb-2 flex items-start justify-between">
                  <div>
                    <p className="font-medium text-gray-900">
                      #TK-1022 - Feature Request
                    </p>
                    <p className="text-sm text-gray-600">Robert Davis</p>
                  </div>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      padding: "0.25rem 0.75rem",
                      borderRadius: "9999px",
                      fontWeight: "600",
                      backgroundColor: "#e0e7ff",
                      color: "#3730a3",
                    }}
                  >
                    Pending
                  </span>
                </div>
                <p className="mb-2 line-clamp-2 text-sm text-gray-700">
                  Would it be possible to add a feature for scheduling automated
                  follow-up emails...
                </p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Yesterday</span>
                  <span
                    className="font-medium"
                    style={{
                      fontSize: "0.75rem",
                      padding: "0.25rem 0.75rem",
                      borderRadius: "9999px",
                      fontWeight: "600",
                      color: "green",
                    }}
                  >
                    Low Priority
                  </span>
                </div>
                <div className="mt-2 flex items-center">
                  <Avatar
                    size={7}
                    initialColor="success"
                    name="Jane Smith"
                    className="mr-2"
                  />
                  <span className="text-xs text-gray-600">
                    Assigned to Jane Smith
                  </span>
                </div>
              </div>

              {/* Ticket 4 */}
              <div className="mt-4 bg-white p-4 shadow-sm hover:bg-gray-50">
                <div className="mb-2 flex items-start justify-between">
                  <div>
                    <p className="font-medium text-gray-900">
                      #TK-1021 - Territory Access
                    </p>
                    <p className="text-sm text-gray-600">Lisa Chen</p>
                  </div>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      padding: "0.25rem 0.75rem",
                      borderRadius: "9999px",
                      fontWeight: "600",
                      backgroundColor: "#dbeafe",
                      color: "#1e40af",
                    }}
                  >
                    Resolved
                  </span>
                </div>
                <p className="mb-2 line-clamp-2 text-sm text-gray-700">
                  I purchased access to the California territory but Im not
                  seeing any leads...
                </p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">2 days ago</span>
                  <span
                    className="font-medium"
                    style={{
                      fontSize: "0.75rem",
                      padding: "0.25rem 0.75rem",
                      borderRadius: "9999px",
                      fontWeight: "600",
                      color: "red",
                    }}
                  >
                    High Priority
                  </span>
                </div>
              </div>
            </div>
          </ScrollShadow>
        </div>

        {/* ticket details */}

        <div className="flex flex-1 flex-col bg-white">
          <div className="border border-gray-200 p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              {/* Left side: Ticket info */}
              <div>
                <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
                  #TK-1024 - Payment Issue
                </h2>

                {/* User Info + Meta */}
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                  <div className="flex items-center">
                    <Avatar
                      initialColor="info"
                      className="mr-2"
                      name="Micheal John"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Micheal Johnson
                      </p>
                      <p className="text-xs text-gray-500">
                        micheal.j@email.com
                      </p>
                    </div>
                  </div>

                  <span className="hidden text-gray-300 sm:inline">•</span>
                  <span className="text-sm text-gray-500">
                    Created 5 mins ago
                  </span>

                  <span className="hidden text-gray-300 sm:inline">•</span>
                  <span className="text-sm font-medium text-red-600">
                    High Priority
                  </span>
                </div>
              </div>

              {/* Right side: Select controls */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-700">
                    Status:
                  </label>
                  <Select
                    defaultValue="Status"
                    data={["New", "Open", "Pending", "Resolved", "Closed"]}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-700">
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
                  />
                </div>
              </div>
            </div>
          </div>

          {/* mesaaging */}
          {/* messaging section */}
          <div className="relative flex-1">
            <div className="h-full overflow-y-auto p-4 pb-28 sm:p-6">
              <ScrollShadow
                orientation="vertical"
                className="h-[calc(100vh-220px)] overflow-y-auto p-4 sm:p-6"
              >
                <div className="space-y-4">
                  {/* User Message */}

                  <div className="flex flex-col items-start sm:flex-row sm:space-x-3">
                    <Avatar
                      initialColor="info"
                      className="mr-2"
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

                      <div className="max-w-full rounded-lg bg-gray-100 p-4 break-words text-gray-700 sm:max-w-[70%]">
                        <p>
                          I’m having trouble processing my subscription payment.
                          The system keeps showing an error message when I try
                          to update my credit card information.
                        </p>
                        <p className="mt-2">
                          Error message: Payment method could not be verified.
                        </p>
                        <p className="mt-2">
                          I’ve tried multiple times with different cards but
                          getting the same error.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="flex justify-center">
                    <div className="flex items-center rounded-full bg-yellow-50 px-4 py-2 text-sm text-yellow-800">
                      <InformationCircleIcon className="mr-1 h-5 w-5" />
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
                      <div className="ml-auto max-w-full rounded-lg bg-teal-100 p-4 break-words text-gray-700 sm:max-w-[70%]">
                        <p>Hi Micheal</p>
                        <p className="mt-2">
                          I’m sorry to hear you are experiencing issues with
                          updating your payment method. I’ve checked your
                          account and I can see the error in our system.
                        </p>
                        <p className="mt-2">
                          I’m escalating this to our technical team for
                          immediate resolution. In the meantime, I can process
                          your payment manually if you would like to continue
                          your subscription without interruption.
                        </p>
                        <p className="mt-2">
                          Would you prefer to wait for the fix or shall I assist
                          you with a manual payment?
                        </p>
                      </div>
                    </div>
                    <Avatar
                      initialColor="success"
                      className="order-1 mb-2 h-10 w-10 rounded-full sm:order-2 sm:mb-0"
                      name="John Doe"
                    />
                  </div>
                </div>
              </ScrollShadow>
            </div>
          </div>

          {/* reply section */}
          <div className="fixed bottom-0 w-9/15  border-t border-gray-300 bg-white p-3 sm:p-4">
            <div className="flex  flex-col sm:flex-row sm:items-start sm:space-x-3">
              {/* Avatar */}
              <div className="mb-2 flex-shrink-0 sm:mb-0">
                <Avatar
                  initialColor="info"
                  className="mr-2 sm:mr-0"
                  name="Admin User"
                />
              </div>

              {/* Input + Actions */}
              <div className="flex-1">
                <textarea
                  placeholder="Type your response..."
                  className="focus:ring-atoll w-full resize-none rounded-lg border border-gray-400 px-3 py-2 text-sm focus:ring-2 focus:outline-none sm:px-4 sm:py-3 sm:text-base"
                  rows="3"
                ></textarea>

                {/* Bottom Actions */}
                <div className="mt-3 flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                  {/* Left Actions */}
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <Button
                      variant="flat"
                      className="text-gray-400 hover:text-gray-600"
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
                    />
                  </div>

                  {/* Right Action */}
                  <div className="flex justify-end">
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
  );
};

export default ChatTemplate;
