import { Button, Input, ScrollShadow, Select } from "components/ui";
import {
  ArrowUpTrayIcon,
  FunnelIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

const ChatTemplate = () => {
  return (
    <div>
      <div className="flex flex-1 overflow-hidden">
        {/* ticket listing */}
        <div className="w-1/3 overflow-y-auto border-r border-gray-200 bg-white">
          {/* Filters */}
          <ScrollShadow
            orientation="horizontal"
            className="h-170 overflow-hidden sm:overflow-auto sm:overflow-x-auto"
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
                  <img
                    src="https://ui-avatars.com/api/?name=John+Doe&background=0a5a78&color=fff&size=20"
                    className="mr-2 h-5 w-5 rounded-full"
                    alt=""
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
                  <img
                    src="https://ui-avatars.com/api/?name=Jane+Smith&background=5ab453&color=fff&size=20"
                    className="mr-2 h-5 w-5 rounded-full"
                    alt=""
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
            <div className="flex items-start justify-between">
              <div className="">
                <h2 className="text-xl font-bold text-gray-900">
                  #TK-1024 - Payment Issue
                </h2>
                <div className="mt-2 flex items-center space-x-4">
                  <div className="flex items-center">
                    <img
                      src="https://ui-avatars.com/api/?name=Michael+Johnson&background=0a5a78&color=fff&size=32"
                      className="mr-2 h-8 w-8 rounded-full"
                      alt=""
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
                  <span className="text-gray-300">.</span>
                  <span className="text-sm text-gray-500">
                    Created 5 mins ago
                  </span>
                  <span className="text-gray-300">.</span>
                  <span
                    style={{ color: "red" }}
                    className="priority-high text-sm font-medium"
                  >
                    High Priority
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <label
                    htmlFor=""
                    className="text-sm font-medium text-gray-700"
                  >
                    Status:
                  </label>
                  <Select
                    defaultValue="Status"
                    data={["New", "Open", "Pending", "Resolved", "Closed"]}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <label
                    htmlFor=""
                    className="text-sm font-medium text-gray-700"
                  >
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
          <div className="relative flex-1 overflow-hidden">
            <div className="h-full overflow-y-auto p-6 pb-28">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <img
                    src="https://ui-avatars.com/api/?name=Michael+Johnson&background=0a5a78&color=fff&size=40"
                    className="h-10 w-10 rounded-full"
                    alt=""
                  />
                  <div className="flex-1">
                    <div className="mb-1 flex items-center space-x-2">
                      <span className="font-medium text-gray-900">
                        Micheal Johnson
                      </span>
                      <span className="text-xs text-gray-500">5 mins ago</span>
                    </div>

                    <div
                      style={{
                        backgroundColor: "#f3f3f6",
                        maxWidth: "70%",
                        wordWrap: "break-word",
                      }}
                      className="rounded-lg p-4"
                    >
                      <p className="text-gray-700\">
                        Im having trouble processing my subscription payment.
                        The system keeps showing an error message when I try to
                        update my credit card information.
                      </p>
                      <p className="mt-2 text-gray-700">
                        Error message: Payment method could not be verified.
                      </p>
                      <p className="mt-2 text-gray-700">
                        Ive tried multiple times with different cards but
                        getting the same error.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div className="flex justify-center">
                  <div className="flex rounded-full bg-yellow-50 px-4 py-2 text-sm text-yellow-800">
                    <InformationCircleIcon className="h-5 w-5" />
                    <span>Ticket assigned to John Doe</span>
                  </div>
                </div>
                {/* agent response section */}
                <div className="flex items-start justify-end space-x-3">
                  <div className="max-w-lg flex-1">
                    <div className="psace-x-2 mb-1 flex items-center justify-end">
                      <span className="text-xs text-gray-500">2 mins ago</span>
                      <span className="font-medium text-gray-900">
                        John Doe
                      </span>
                    </div>
                    <div
                      style={{
                        backgroundColor: "#c9e0e5",
                        marginLeft: "auto",
                        maxWidth: "70%",
                        wordWrap: "break-word",
                      }}
                      className="rounded-lg p-4"
                    >
                      <p className="text-gray-700">Hi Micheal</p>
                      <p className="mt-2 text-gray-700">
                        Im sorry to hear you are experiencing issues with
                        updating your payment method. Ive checked your account
                        and i can see the error in our system{" "}
                      </p>
                      <p className="tetx-gray-700 mt-2">
                        Im escalating this to our technical team for immediate
                        resolution. In the meantime, I can process your payment
                        manually if you would like to continue your subcription
                        without interruption.{" "}
                      </p>
                      <p className="tetx-gray-700 mt-2">
                        Would you prefer to wait for the fix or shall I assist
                        you with a manual payment?
                      </p>
                    </div>
                  </div>
                  <img
                    src="https://ui-avatars.com/api/?name=John+Doe&background=5ab453&color=fff&size=40"
                    className="h-10 w-10 rounded-full"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>

          {/* reply section */}
          <div className="sbsolute right-0 bottom-0 left-0 border-t border-gray-300 p-4">
            <div className="flex items-start space-x-3">
              <img
                src="	https://ui-avatars.com/api/?name=Admin+User&background=0a5a78&color=fff&size=40"
                className="h-10 w-10 rounded-full"
                alt=""
              />
              <div className="flex-1">
                <textarea
                  placeholder="Type your response..."
                  className="focus:ring-atoll w-full resize-none rounded-lg border border-gray-400 px-4 py-3 focus:ring-2 focus:outline-none"
                  rows="3"
                  name=""
                  id=""
                ></textarea>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
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
                  <div className="flex items-center space-x-3">
                    {/* <label htmlFor="" className="flex items-center">
                      <Input type="checkbox" className="mr-2"/>
                      <span className="text-sm text-gray-700">Send Email notification</span>
                    </label> */}
                    <Button className="bg-atoll hover:bg-opacity-90 rounded-lg px-4 py-2 text-white">
                      Send Response
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* the settings modal */}
      <div className="insert-0 bg-opacity-50 fixed z-50 hidden h-full w-full overflow-y-auto bg-gray-600">
        <div className="top 20 relative mx-auto w-full max-w-2xl rounded-lg border bg-white p-5 shadow-lg">
          <div className="flex items-center justify-between border-b pb-4">
            <div className="mt-6 space-y-6">
              <div className="">
                <h4 className="font-semmibold mb-3 text-lg text-gray-900">
                  Auto-Close Settings
                </h4>
                <div className="space-y-3">
                  <label htmlFor="" className="flex items-center">
                    <input type="checkbox" checked className="mr-3" />
                    <span className="text-gray-700">
                      Enable auto-close for inactive Tickets
                    </span>
                  </label>
                  <div className="ml-6 flex items-center space-x-3">
                    <label htmlFor="" className="text-sm text-gray-600">
                      Close Tickets after{" "}
                    </label>
                    <input
                      type="number"
                      value="7"
                      className="w-16 rounded border border-gray-300 px-2 py-1 text-sm"
                    />
                    <span className="text-sm text-gray-600">
                      Days of Inactivity
                    </span>
                  </div>
                </div>
              </div>
              {/* Email */}
              <div>
                <h4 className="tetx-gray-900 mb-3 text-lg font-semibold">
                  Email Notifications
                </h4>
                <div className="space-y-3">
                  <label htmlFor="" className="flex items-center">
                    <input type="checkbox" checked className="mr-3" />
                    <span className="text-gray-700">
                      Send Email on new Ticket
                    </span>
                  </label>
                  <label htmlFor="" className="flex items-center">
                    <input type="checkbox" checked className="mr-3" />
                    <span className="text-gray-700">
                      Send Email on ticket Assignment
                    </span>
                  </label>
                  <label htmlFor="" className="flex items-center">
                    <input type="checkbox" checked className="mr-3" />
                    <span className="text-gray-700">
                      Send Email on customer reply
                    </span>
                  </label>
                  <label htmlFor="" className="flex items-center">
                    <input type="checkbox" checked className="mr-3" />
                    <span className="text-gray-700">
                      Send daily summary to admins
                    </span>
                  </label>
                </div>
              </div>
              {/* response goals sectios */}
              <div className="">
                <h4 className="tetx-gray-600 text-lg font-semibold">
                  Response Time Goals
                </h4>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="" className="tetx-gray-600 text-sm">
                      High Priority
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        value="2"
                        className="w-16 rounded border border-gray-300 px-2 py-1 text-sm"
                      />
                      <span className="tetx-sm text-gray-600">hours</span>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="" className="tetx-sm text-gray-600">
                      Medium Priority
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        value="8"
                        className="w-16 rounded border border-gray-300 px-2 py-1 text-sm"
                      />
                      <span className="text-sm text-gray-600">hours</span>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="" className="tetx-sm text-gray-600">
                      Low Priority
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        value="24"
                        className="w-16 rounded border border-gray-300 px-2 py-1 text-sm"
                      />
                      <span className="text-sm text-gray-600">hours</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8 flex justify-end space-x-3">
                <Button className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50">
                  Cancel
                </Button>
                <Button className="bg-atoll hover:bg-opacity-90 rounded-lg px-4 py-2 text-white">
                  Save Settings
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatTemplate;
