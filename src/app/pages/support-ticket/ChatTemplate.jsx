import { Button, Input, ScrollShadow, Select } from "components/ui";
import { FunnelIcon } from "@heroicons/react/24/outline";

const ChatTemplate = () => {
  return (
    <div>
      
      <div className="flex flex-1 overflow-hidden">
        {/* ticket listing */}
        <div className="w-1/3 overflow-y-auto border-r border-gray-200 bg-white">
          {/* Filters */}
          <ScrollShadow orientation="horizontal" className="h-170 overflow-hidden sm:overflow-auto sm:overflow-x-auto">
          <div className="border-b border-gray-200 p-4">
            <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:space-x-2">
              <Input className="w-100" placeholder="Search Tickets..." />
              <Button className="h-10 w-full sm:w-10 p-2 flex-shrink-0" variant="flat" color="neutral">
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
                Im having trouble processing my subscription payment. The system
                keeps showing an error...
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
                I purchased access to the California territory but Im not seeing
                any leads...
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
        <div className="flex-1 flex flex-col bg-white">
          <div className="border border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div className="">
                <h2 className="text-xl text-gray-900 font-bold">#TK-1024 - Payment Issue</h2>
              </div>
            </div>
          </div>
        </div>

      </div>
      
    </div>
  );
};

export default ChatTemplate;
