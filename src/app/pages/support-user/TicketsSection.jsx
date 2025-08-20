// TicketsSection.jsx
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { Select } from "components/ui";
import { useNavigate } from "react-router";

function TicketCard({ id, title, excerpt, status, meta = [], created }) {
  const navigate = useNavigate();

  const badgeStyles = {
    open: "bg-amber-100 text-amber-800",
    pending: "bg-blue-100 text-blue-800",
    resolved: "bg-green-100 text-green-800",
    closed: "bg-gray-200 text-gray-700",
  };

  const topMeta = meta.find((m) => m.label === "Updated" || m.label === "Resolved");

  const filteredMeta = meta.filter(
    (m) => m.label !== "Updated" && m.label !== "Resolved"
  );
  const bottomMeta = [{ label: "Created", value: created }, ...filteredMeta];

  return (
    <button
      type="button"
      onClick={() => navigate(`/support-user/${id}`)}
      className="w-full rounded-lg bg-white p-6 text-left shadow-sm transition-all hover:shadow-lg"
    >
      {/* Top row */}
      <div className="flex items-center justify-between mb-4">
        {/* Left side: title + status + topMeta */}
        <div className="flex items-center gap-4">
          <div className="font-semibold text-gray-900">
            #{id} - {title}
          </div>
          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${badgeStyles[status]}`}
          >
            {status}
          </span>
          {topMeta && (
            <span className="text-sm text-gray-500">
              {topMeta.label} {topMeta.value}
            </span>
          )}
        </div>

        {/* Right side: chevron */}
        <ChevronRightIcon className="w-5 h-5 text-gray-400" />
      </div>


      {/* Excerpt */}
      <p className="text-gray-600 mb-5">{excerpt}</p>

      {/* Bottom row */}
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

export default function TicketsSection({ tickets, filter, setFilter }) {
  const visibleTickets = filter === "all"
    ? tickets
    : tickets.filter((t) => t.status === filter);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          My Support Tickets
        </h2>
        <div className="w-32">
          <Select
            className="text-sm border border-gray-300 rounded-md px-3 py-2"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            data={[
              { label: "All Tickets", value: "all" },
              { label: "Open", value: "open" },
              { label: "Resolved", value: "resolved" },
              { label: "Pending", value: "pending" },
              { label: "Closed", value: "closed" },
            ]}
          />
        </div>
      </div>

      {/* Tickets */}
      <div className="mt-6 space-y-5">
        {visibleTickets.map((t) => (
          <TicketCard key={t.id} {...t} />
        ))}
      </div>
    </div>
  );
}
