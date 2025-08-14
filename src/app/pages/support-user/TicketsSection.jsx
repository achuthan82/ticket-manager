// TicketsSection.jsx
import { Select } from "components/ui";
import { useNavigate } from "react-router";

function StatusBadge({ status }) {
  const styles = {
    open: 'bg-amber-100 text-amber-800',
    pending: 'bg-blue-100 text-blue-800',
    resolved: 'bg-green-100 text-green-800',
  };
  const text = status.charAt(0).toUpperCase() + status.slice(1);
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${styles[status]}`}>
      {text}
    </span>
  );
}

function TicketCard({ id, title, excerpt, status, meta = [], created }) {

  const navigate = useNavigate();

  const updatedMeta = meta.find((m) => m.label === 'Updated');
  const resolvedMeta = meta.find((m) => m.label === 'Resolved');
  const headlineLabel = updatedMeta ? 'Updated' : resolvedMeta ? 'Resolved' : null;
  const headlineValue = updatedMeta?.value ?? resolvedMeta?.value;

  let displayMeta = meta.filter((m) => m.label !== 'Updated' && m.label !== 'Resolved');
  if (created && !displayMeta.some((m) => m.label === 'Created')) {
    displayMeta = [{ label: 'Created', value: created }, ...displayMeta];
  }

  return (
    <button
      type="button"
      onClick={() => navigate(`/support-user/${id}`)}
      className="w-full rounded-xl border border-neutral-200 bg-white p-6 text-left shadow-sm transition-all hover:shadow-md"
    >
      <div className="flex flex-wrap items-center gap-3">
        <div className="text-base font-semibold text-neutral-900">{id} - {title}</div>
        <StatusBadge status={status} />
        {headlineLabel && (
          <span className="text-xs text-neutral-500">{headlineLabel} {headlineValue}</span>
        )}
      </div>
      <p className="mt-2 line-clamp-2 text-sm text-neutral-600">{excerpt}</p>
      <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-neutral-500">
        {displayMeta.map((m) => (
          <span key={m.label} className="flex items-center gap-1">
            <span>{m.label}:</span>
            <span className="text-neutral-700">{m.value}</span>
          </span>
        ))}
      </div>
    </button>
  );
}

export default function TicketsSection({ tickets, filter, setFilter }) {
  const visibleTickets = filter === "all" ? tickets : tickets.filter((t) => t.status === filter);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-neutral-900">My Support Tickets</h2>
        <div className="w-40">
          <Select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            data={[
              { label: 'All Tickets', value: 'all' },
              { label: 'Open', value: 'open' },
              { label: 'Resolved', value: 'resolved' },
              { label: 'Pending', value: 'pending' },
              { label: 'Closed', value: 'closed' },
            ]}
          />
        </div>
      </div>
      <div className="mt-6 space-y-5">
        {visibleTickets.map((t) => (
          <TicketCard key={t.id} {...t} />
        ))}
      </div>
    </div>
  );
}
