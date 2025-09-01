import { useEffect, useState } from "react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { Select } from "components/ui";
import { useNavigate } from "react-router";
import { getTickets } from "utils/supportUserService";

function TicketCard({ id, title, excerpt, status, meta = [], created }) {
  const navigate = useNavigate();

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

  const topMeta = meta.find((m) => m.label === "Updated" || m.label === "Resolved");
  const filteredMeta = meta.filter((m) => m.label !== "Updated" && m.label !== "Resolved");
  const bottomMeta = [{ label: "Created", value: created }, ...filteredMeta];

  return (
    <button
      type="button"
      onClick={() => navigate(`/support-user/${id}`)}
      className="w-full rounded-lg bg-white p-6 text-left shadow-sm transition-all hover:shadow-lg"
    >
      {/* Top row */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="font-semibold text-gray-900">
            #{id} - {title}
          </div>
          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${badgeStyles[status]}`}
          >
            {statusLabels[status] || "Unknown"}
          </span>
          {topMeta && (
            <span className="text-sm text-gray-500">
              {topMeta.label} {topMeta.value}
            </span>
          )}
        </div>
        <ChevronRightIcon className="w-5 h-5 text-gray-400" />
      </div>

      <p className="text-gray-600 mb-5">{excerpt}</p>

      <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-neutral-500">
        {bottomMeta.map((m) => (
          <span key={m.label} className="flex items-center gap-1">
            <span className="text-gray-500">{m.label}:</span>
            <span className="text-gray-500">{m.value}</span>
          </span>
        ))}
      </div>
    </button>
  );
}

export default function TicketsSection({ filter, setFilter }) {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchTickets() {
      setLoading(true);
      setError("");

      const params = {
        page: 1,
        per_page: 10,
        time_zone: "Asia/Kolkata",
      };

      // ✅ Only pass status if filter is not "all"
      if (filter !== "all") {
        params.status = filter;
      }

      const { success, data, error } = await getTickets(params);

      if (success && data?.data?.length) {
        const ticketsArray = data.data[0] || [];
        setTickets(
          ticketsArray.map((t) => ({
            id: t.id,
            title: t.subject,
            excerpt: t.description,
            created: t.created_at,
            status: t.status,
          }))
        );
      } else {
        setError(error || "Failed to load tickets");
      }

      setLoading(false);
    }

    fetchTickets();
  }, [filter]);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">My Support Tickets</h2>
        <div className="w-32">
          <Select
            className="text-sm border border-black rounded-md px-3 py-2"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            data={[
              { label: "All Tickets", value: "all" },
              { label: "Open", value: 1 },
              { label: "Pending", value: 2 },
              { label: "Resolved", value: 3 },
              { label: "Closed", value: 4 },
            ]}
          />
        </div>
      </div>

      {/* Tickets */}
      <div className="mt-6 space-y-5">
        {loading ? (
          <p className="text-center text-gray-500">Loading tickets...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : tickets.length === 0 ? (
          <p className="text-center text-gray-500">No tickets found</p>
        ) : (
          tickets.map((t) => <TicketCard key={t.id} {...t} />)
        )}
      </div>
    </div>
  );
}
