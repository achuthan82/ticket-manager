import { Avatar, Button, Input, ScrollShadow, Select } from "components/ui";
// import { Toaster as  toast } from "sonner";
import {
  ArrowUpTrayIcon,
  FunnelIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import {
  editSupportTicketStatus,
  getSupportTickets,
} from "../../../utils/SupportTicketService";
import { toast } from "sonner";

// 🕒 Helper to format "time ago"
const formatTimeAgo = (dateString) => {
  const now = new Date();
  const past = new Date(dateString.replace(/-/g, "/"));
  const diff = Math.floor((now - past) / 1000);

  if (diff < 60) return `${diff} sec${diff !== 1 ? "s" : ""} ago`;
  if (diff < 3600)
    return `${Math.floor(diff / 60)} min${Math.floor(diff / 60) !== 1 ? "s" : ""} ago`;
  if (diff < 86400)
    return `${Math.floor(diff / 3600)} hour${Math.floor(diff / 3600) !== 1 ? "s" : ""} ago`;
  if (diff < 2592000)
    return `${Math.floor(diff / 86400)} day${Math.floor(diff / 86400) !== 1 ? "s" : ""} ago`;
  return `${Math.floor(diff / 2592000)} month${Math.floor(diff / 2592000) !== 1 ? "s" : ""} ago`;
};

const ChatTemplate = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("All Status");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [priorityFilter, setPriorityFilter] = useState("All Priority");

  const statusMap = {
    1: "New",
    2: "Open",
    3: "Pending",
    4: "Resolved",
    5: "Closed",
  };

  // 🔁 reverse mapping
  const statusLabelToNumber = Object.fromEntries(
    Object.entries(statusMap).map(([num, label]) => [label, Number(num)]),
  );

  const priorityMap = {
    1: "Low Priority",
    2: "Medium Priority",
    3: "High Priority",
  };

  // Fetch tickets
  const fetchTickets = async () => {
    setLoading(true);
    setError(null);
    let timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (timeZone === "Asia/Calcutta") timeZone = "Asia/Kolkata";

    try {
      const response = await getSupportTickets({
        page: 1,
        per_page: 50,
        time_zone: timeZone,
      });
      if (response.success) {
        const ticketsArray = response.data?.data?.[0] || [];
        const normalizedTickets = ticketsArray.map((t) => ({
          ...t,
          statusLabel: statusMap[t.status] || "Unknown",
          priorityLabel: priorityMap[t.priority] || "Normal",
        }));
        setTickets(normalizedTickets);
        if (normalizedTickets.length > 0)
          setSelectedTicket(normalizedTickets[0]);
      } else {
        setError(response.error || "Failed to fetch tickets");
      }
    } catch (err) {
      console.error(err);
      setError("Error fetching tickets");
    }
    setLoading(false);
  };

  // 🔹 Update ticket status with API call
const handleStatusChange = async (newStatusLabel) => {
  if (!selectedTicket) return;

  const newStatusNumber = statusLabelToNumber[newStatusLabel];

  const res = await editSupportTicketStatus(selectedTicket.id, newStatusNumber);

  if (res.success) {
    // ✅ Update selected ticket (right panel)
    setSelectedTicket((prev) => ({
      ...prev,
      status: newStatusNumber,
      statusLabel: newStatusLabel,
    }));

    // ✅ Update the ticket inside the left-hand tickets list
    setTickets((prevTickets) =>
      prevTickets.map((t) =>
        t.id === selectedTicket.id
          ? { ...t, status: newStatusNumber, statusLabel: newStatusLabel }
          : t
      )
    );

    // alert(`✅ Status changed to ${newStatusLabel}`);
    toast.success(`Ticket Status updated to ${newStatusLabel}`)
  } else {
    console.error("❌ Failed to update status:", res.error);
    alert("Failed to update ticket status. Please try again.");
  }
};


  useEffect(() => {
    fetchTickets();
    handleStatusChange();
  }, []);

  // Filter tickets by status and search query
  const filteredTickets = tickets.filter((t) => {
    const matchesFilter =
      filter === "All Status" ? true : t.statusLabel === filter;
    const matchesPriority =
      priorityFilter === "All Priority"
        ? true
        : t.priorityLabel === priorityFilter;
    const matchesSearch =
      t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.id.toString().includes(searchQuery);

    return matchesFilter && matchesPriority && matchesSearch;
  });

  // const updateStatus = (newStatus) =>
  //   setSelectedTicket((prev) => ({ ...prev, status: newStatus }));
  const updateAssignee = (newAssignee) =>
    setSelectedTicket((prev) => ({ ...prev, assignee: newAssignee }));

  return (
    <div className="mx-auto flex h-screen max-h-[calc(100vh-240px)] w-full max-w-screen-2xl flex-col overflow-hidden">
      <div className="flex flex-1 flex-col overflow-hidden md:flex-row">
        {/* Ticket List */}
        <div className="flex w-full flex-col overflow-hidden border-b border-gray-200 bg-white md:w-1/2 md:border-r md:border-b-0 lg:w-1/3">
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
            {/* Filters + Search */}
            <div className="flex-shrink-0 border-b border-gray-200 p-3 sm:p-4">
              <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2">
                <Input
                  className="w-full"
                  placeholder="Search Tickets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button
                  className="h-10 w-full flex-shrink-0 p-2 sm:w-10"
                  variant="flat"
                  color="neutral"
                >
                  <FunnelIcon className="h-6 w-6" />
                </Button>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:gap-2">
                <Select
                  className="rounded-md border border-black px-3 py-2 text-sm"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  data={[
                    { label: "All Status", value: "All Status" },
                    { label: "New", value: "New" },
                    { label: "Open", value: "Open" },
                    { label: "Pending", value: "Pending" },
                    { label: "Resolved", value: "Resolved" },
                    { label: "Closed", value: "Closed" },
                  ]}
                />

                <Select
                  className="rounded-md border border-black px-3 py-2 text-sm"
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  data={["All Priority", "High", "Medium", "Low"]}
                />

                {/* Agents Filter */}
                <Select
                  className="rounded-md border border-black px-3 py-2 text-sm"
                  defaultValue="All Agents"
                  data={["All Agents", "Unassigned", "John Doe", "Jane Smith"]}
                />
              </div>
            </div>

            {/* Tickets Scroll */}
            <ScrollShadow className="hide-scrollbar flex-1 space-y-4 overflow-y-auto">
              {loading && (
                <p className="p-4 text-gray-500">Loading tickets...</p>
              )}
              {error && <p className="p-4 text-red-500">{error}</p>}
              {!loading && !error && filteredTickets.length === 0 && (
                <p className="p-4 text-gray-500">No tickets found.</p>
              )}
              {!loading &&
                !error &&
                filteredTickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    onClick={() => setSelectedTicket(ticket)}
                    className={`group cursor-pointer border border-gray-200 p-2 shadow-sm transition-all duration-200 ${selectedTicket?.id === ticket.id ? "border-blue-400 bg-blue-50" : "bg-white hover:-translate-y-1 hover:shadow-md"} `}
                  >
                    <div className="group cursor-pointer border border-gray-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md sm:p-5">
                      <div className="mb-3 flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
                        <div>
                          <p className="text-sm font-semibold text-gray-900 sm:text-base">
                            #{ticket.id} – {ticket.subject}
                          </p>
                          <p className="text-xs text-gray-500 sm:text-sm">
                            {ticket.name}
                          </p>
                        </div>
                        <span
                          className={`rounded-full px-3 py-1 text-[11px] font-medium sm:text-xs ${
                            ticket.statusLabel === "Open"
                              ? "bg-yellow-100 text-yellow-800"
                              : ticket.statusLabel === "Pending"
                                ? "bg-purple-100 text-purple-800"
                                : ticket.statusLabel === "Resolved"
                                  ? "bg-green-100 text-green-800"
                                  : ticket.statusLabel === "New"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {ticket.statusLabel}
                        </span>
                      </div>
                      <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-gray-700">
                        {ticket.description || "No description provided"}
                      </p>
                      <div className="flex flex-col gap-2 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between">
                        <span>{formatTimeAgo(ticket.created_at)}</span>
                        <span
                          className={`rounded-full px-3 py-1 text-[11px] font-medium sm:text-xs ${
                            ticket.priorityLabel === "High Priority"
                              ? "text-red-600"
                              : ticket.priorityLabel === "Medium Priority"
                                ? "text-yellow-600"
                                : "text-green-600"
                          }`}
                        >
                          {ticket.priorityLabel}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </ScrollShadow>
          </div>
        </div>

        {/* Ticket Details */}
        <div className="flex w-full flex-1 flex-col overflow-hidden bg-white">
          {selectedTicket && (
            <>
              {/* Ticket Info Header */}
              <div className="flex-shrink-0 border border-gray-200 bg-white p-2 sm:p-3 md:p-4">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="min-w-0 flex-1">
                    <h4 className="truncate text-sm font-semibold text-gray-900 sm:text-base md:text-lg">
                      #{selectedTicket.id}-{selectedTicket.subject}
                    </h4>
                    <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4">
                      <div className="flex w-full items-center sm:w-auto">
                        <Avatar
                          initialColor="info"
                          className="mr-2 h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9"
                          name={selectedTicket.name}
                        />
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-gray-900 sm:text-sm md:text-base">
                            {selectedTicket.name}
                          </p>
                          <p className="truncate text-[10px] text-gray-500 sm:text-xs md:text-sm">
                            {selectedTicket.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-2 text-[10px] text-gray-500 sm:text-xs md:text-sm">
                        <span className="hidden sm:inline">•</span>
                        <span>
                          Created {formatTimeAgo(selectedTicket.created_at)}
                        </span>
                        <span className="hidden sm:inline">•</span>
                        <span
                          className={`font-medium ${
                            selectedTicket.priorityLabel === "High Priority"
                              ? "text-red-600"
                              : selectedTicket.priorityLabel ===
                                  "Medium Priority"
                                ? "text-yellow-600"
                                : "text-green-600"
                          }`}
                        >
                          {selectedTicket.priorityLabel || "Normal"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center md:w-auto">
                    <div className="flex w-full items-center space-x-2 sm:w-auto">
                      <label className="shrink-0 text-xs font-medium text-gray-700 sm:text-sm">
                        Status:
                      </label>
                      <Select
                        value={selectedTicket.statusLabel}
                        data={["New", "Open", "Pending", "Resolved", "Closed"]}
                        onChange={(e) => handleStatusChange(e.target.value)}
                        className="flex-1 text-xs sm:flex-none sm:text-sm"
                      />
                    </div>
                    <div className="flex w-full items-center space-x-2 sm:w-auto">
                      <label className="shrink-0 text-xs font-medium text-gray-700 sm:text-sm">
                        Assign to:
                      </label>
                      <Select
                        value={selectedTicket.assignee || "Unassigned"}
                        data={[
                          "Unassigned",
                          "John Doe",
                          "Jane Smith",
                          "Admin User",
                        ]}
                        onChange={(e) => updateAssignee(e.target.value)} // ✅ correct
                        className="flex-1 text-xs sm:flex-none sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Messaging Section */}
              {/* --- This section can later be made dynamic from ticket messages --- */}
              <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
                <div className="relative max-h-screen flex-1 overflow-y-auto">
                  <div
                    orientation="vertical"
                    className="h-full w-full overflow-y-auto"
                  >
                    <div className="space-y-2 p-2 sm:space-y-3 sm:p-3 md:p-4 lg:p-6">
                      {/* User Message */}
                      <div className="flex flex-col items-start sm:flex-row sm:gap-2">
                        <Avatar
                          initialColor="info"
                          className="mr-2 mb-2 h-7 w-7 sm:mb-0 sm:h-8 sm:w-8 md:h-9 md:w-9"
                          name="Micheal John"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="mb-1 flex flex-wrap items-center gap-2">
                            <span className="text-sm font-medium text-gray-900">
                              Micheal Johnson
                            </span>
                            <span className="text-[11px] text-gray-500 sm:text-xs">
                              5 mins ago
                            </span>
                          </div>
                          <div className="max-w-full rounded-lg bg-gray-100 p-2 text-sm break-words text-gray-700 sm:max-w-[85%] sm:p-3 md:max-w-[75%] lg:max-w-[70%]">
                            <p>
                              Im having trouble processing my subscription
                              payment. The system keeps showing an error message
                              when I try to update my credit card information.
                            </p>
                            <p className="mt-1">
                              Error message: Payment method could not be
                              verified.
                            </p>
                            <p className="mt-1">
                              Ive tried multiple times with different cards but
                              getting the same error.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Notes */}
                      <div className="flex justify-center px-1">
                        <div className="flex items-center rounded-full bg-yellow-50 px-2.5 py-1 text-[11px] text-yellow-800 sm:text-xs md:text-sm">
                          <InformationCircleIcon className="mr-1 h-4 w-4 sm:h-4 sm:w-4" />
                          <span className="truncate">
                            Ticket assigned to John Doe
                          </span>
                        </div>
                      </div>

                      {/* Agent Response */}
                      <div className="flex flex-col items-start justify-end sm:flex-row sm:items-end sm:gap-2">
                        <div className="order-2 max-w-full min-w-0 flex-1 sm:order-1 sm:max-w-md md:max-w-lg lg:max-w-xl">
                          <div className="mb-1 flex flex-wrap items-center justify-end gap-2">
                            <span className="text-[11px] text-gray-500 sm:text-xs">
                              2 mins ago
                            </span>
                            <span className="text-sm font-medium text-gray-900">
                              John Doe
                            </span>
                          </div>
                          <div className="ml-auto max-w-full rounded-lg bg-teal-100 p-2 text-sm break-words text-gray-700 sm:max-w-[85%] sm:p-3 md:max-w-[75%] lg:max-w-[70%]">
                            <p>Hi Micheal</p>
                            <p className="mt-1">
                              Im sorry to hear you are experiencing issues with
                              updating your payment method. Ive checked your
                              account and I can see the error in our system.
                            </p>
                            <p className="mt-1">
                              Im escalating this to our technical team for
                              immediate resolution. In the meantime, I can
                              process your payment manually if you would like to
                              continue your subscription without interruption.
                            </p>
                            <p className="mt-1">
                              Would you prefer to wait for the fix or shall I
                              assist you with a manual payment?
                            </p>
                          </div>
                        </div>
                        <Avatar
                          initialColor="success"
                          className="order-1 mb-2 h-7 w-7 rounded-full sm:order-2 sm:mb-0 sm:h-8 sm:w-8 md:h-9 md:w-9"
                          name="John Doe"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reply Section */}
              <div className="flex-1 border-t border-gray-300 bg-white p-2 sm:p-3 md:p-4">
                <div className="flex w-full flex-col sm:flex-row sm:items-start sm:space-x-3">
                  {/* Avatar */}
                  <div className="mb-2 flex flex-shrink-0 justify-center sm:mb-0 sm:justify-start">
                    <Avatar
                      initialColor="info"
                      className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10"
                      name="Admin User"
                    />
                  </div>

                  {/* Input & Actions */}
                  <div className="flex flex-1 flex-col">
                    <textarea
                      placeholder="Type your response..."
                      className="focus:ring-atoll w-full resize-none rounded-lg border border-gray-400 px-2 py-2 text-sm focus:ring-2 focus:outline-none sm:px-3 sm:py-2 sm:text-sm md:px-4 md:py-3 md:text-base"
                      rows="3"
                    ></textarea>

                    <div className="mt-3 flex flex-col gap-2 sm:mt-2 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center sm:gap-2">
                        <Button
                          variant="flat"
                          className="flex items-center justify-center text-gray-400 hover:text-gray-600 sm:justify-start"
                        >
                          <ArrowUpTrayIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                        </Button>

                        <Select
                          defaultValue="Use Template"
                          data={[
                            "Use Template",
                            "Payment Issue Response",
                            "Feature Request Response",
                            "General Inquiry",
                          ]}
                          className="w-full text-sm sm:w-44 md:w-52 lg:w-64"
                        />
                      </div>

                      <div className="flex w-full justify-end sm:w-auto">
                        <Button className="bg-atoll hover:bg-opacity-90 w-full rounded-lg px-3 py-2 text-sm text-white sm:w-auto sm:px-4 sm:py-2 md:px-5 md:py-2.5 lg:px-6 lg:py-3">
                          Send Response
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {/* <SonnerToaster richColors position="top-right" /> */}
    </div>
  );
};

export default ChatTemplate;
