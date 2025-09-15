import { useEffect, useState } from "react";
import {
  ClockIcon,
  PlusIcon,
  ArrowPathIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import ChatTemplate from "./ChatTemplate";
import {
  getSupportTickets,
  getTicketCounts,
} from "../../../utils/SupportTicketService";

const RectangularCards = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [ticketCounts, setTicketCounts] = useState({
    New: 0,
    Open: 0,
    Pending: 0,
    Resolved: 0,
  });

  // ✅ Fetch ticket list (for ChatTemplate)
  const fetchTickets = async () => {
    setLoading(true);
    setError(null);

    let timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (timeZone === "Asia/Calcutta") timeZone = "Asia/Kolkata";

    try {
      const response = await getSupportTickets({
        page: 1,
        per_page: 200,
        time_zone: timeZone,
      });

      if (response.success && response.data?.data?.[0]) {
        const ticketsArray = response.data.data[0];
        setTickets(ticketsArray);
      } else {
        setError(response.error || "Failed to fetch tickets");
      }
    } catch (err) {
      console.error(err);
      setError("Error fetching tickets");
    }
    setLoading(false);
  };

  // ✅ Fetch ticket counts (from /dashboard)
  const fetchTicketCounts = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getTicketCounts();
      if (response.success && response.data) {
        setTicketCounts(response.data);
      } else {
        setError(response.error || "Failed to fetch ticket counts");
      }
    } catch (err) {
      console.error(err);
      setError("Error fetching ticket counts");
    }

    setLoading(false);
  };

  // ✅ Run both APIs on mount
  useEffect(() => {
    fetchTickets();
    fetchTicketCounts();
  }, []);

  const cardsData = [
    {
      label: "New Tickets",
      value: ticketCounts.New,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-200",
      icon: PlusIcon,
    },
    {
      label: "Open",
      value: ticketCounts.Open,
      color: "text-yellow-600",
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      icon: ClockIcon,
    },
    {
      label: "Pending",
      value: ticketCounts.Pending,
      color: "text-purple-600",
      bg: "bg-purple-50",
      border: "border-purple-200",
      icon: ArrowPathIcon,
    },
    {
      label: "Resolved",
      value: ticketCounts.Resolved,
      color: "text-green-600",
      bg: "bg-green-50",
      border: "border-green-200",
      icon: CheckIcon,
    },
  ];

  return (
    <div className="p-3 sm:p-5">
      {/* Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {cardsData.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="flex flex-col justify-between rounded-md border border-neutral-300 bg-white p-4 shadow-sm sm:p-5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="mb-1 text-xs font-medium text-gray-500 sm:text-sm">
                    {item.label}
                  </p>
                  <h3 className={`text-xl font-bold sm:text-2xl ${item.color}`}>
                    {item.value}
                  </h3>
                </div>
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full sm:h-12 sm:w-12 ${item.border} ${item.bg}`}
                >
                  <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${item.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Chat section */}
      <div className="mt-6 sm:mt-8">
        <ChatTemplate
          tickets={tickets}
          ticketCounts={ticketCounts}
          loading={loading}
          error={error}
          refreshTickets={() => {
            fetchTickets();
            fetchTicketCounts();
          }}
        />
      </div>
    </div>
  );
};

export default RectangularCards;
