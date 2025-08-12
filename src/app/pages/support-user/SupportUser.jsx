// Import Dependencies
import { useMemo, useState } from 'react';
import { BanknotesIcon, UsersIcon, Cog6ToothIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/solid'
import { Select } from 'components/ui';

// ----------------------------------------------------------------------

function CategoryCard({ icon: Icon, title, subtitle, colorClasses, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group w-full rounded-2xl border border-neutral-200 bg-white p-6 text-left shadow-sm transition-all hover:shadow-md"
    >
      <div className="flex flex-col items-center justify-center gap-4">
        <div className={`flex h-14 w-14 items-center justify-center rounded-full ${colorClasses.bg} ${colorClasses.text}`}>
          <Icon className="h-7 w-7" />
        </div>
        <div className="text-center">
          <div className="text-base font-semibold text-neutral-900">{title}</div>
          <div className="mt-1 text-sm text-neutral-500">{subtitle}</div>
        </div>
      </div>
    </button>
  );
}

function StatusBadge({ status }) {
  const styles = {
    open: 'bg-amber-100 text-amber-800',
    pending: 'bg-blue-100 text-blue-800',
    resolved: 'bg-green-100 text-green-800',
  };
  const text = status.charAt(0).toUpperCase() + status.slice(1);
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${styles[status]}`}>{text}</span>
  );
}

function TicketCard({ id, title, excerpt, status, meta, created }) {
  return (
    <button
      type="button"
      onClick={() => console.log('Navigate to ticket', id)}
      className="w-full rounded-2xl border border-neutral-200 bg-white p-5 text-left shadow-sm transition-all hover:shadow-md"
    >
      <div className="flex flex-wrap items-center gap-3">
        <div className="text-base font-semibold text-neutral-900">{id} - {title}</div>
        <StatusBadge status={status} />
        {created && (
          <span className="text-xs text-neutral-500">Created {created}</span>
        )}
      </div>
      <p className="mt-2 line-clamp-2 text-sm text-neutral-600">{excerpt}</p>
      <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-neutral-500">
        {meta.map((m) => (
          <span key={m.label} className="flex items-center gap-1">
            <span>{m.label}:</span>
            <span className="text-neutral-700">{m.value}</span>
          </span>
        ))}
      </div>
    </button>
  );
}

export default function SupportUser() {
  const [filter, setFilter] = useState('all');
  const categories = useMemo(
    () => [
      {
        key: 'billing',
        icon: BanknotesIcon,
        title: 'Billing & Payments',
        subtitle: 'Subscription & payment issues',
        colorClasses: { bg: 'bg-blue-100', text: 'text-blue-700' },
      },
      {
        key: 'leads',
        icon: UsersIcon,
        title: 'Leads & Territories',
        subtitle: 'Lead quality & territory access',
        colorClasses: { bg: 'bg-green-100', text: 'text-green-700' },
      },
      {
        key: 'technical',
        icon: Cog6ToothIcon,
        title: 'Technical Support',
        subtitle: 'Platform & system issues',
        colorClasses: { bg: 'bg-purple-100', text: 'text-purple-700' },
      },
      {
        key: 'general',
        icon: QuestionMarkCircleIcon,
        title: 'General Inquiry',
        subtitle: 'Other questions & feedback',
        colorClasses: { bg: 'bg-yellow-100', text: 'text-yellow-700' },
      },
    ],
    [],
  );

  const tickets = useMemo(
    () => [
      {
        id: '#TK-1018',
        title: 'Territory not showing leads',
        excerpt:
          "I purchased the Miami territory but I'm not receiving any leads from that area. The dashboard shows...",
        status: 'open',
        created: '2 days ago',
        meta: [
          { label: 'Updated', value: '2 hours ago' },
          { label: 'Last reply', value: 'Admin Support' },
        ],
      },
      {
        id: '#TK-1012',
        title: 'Billing clarification needed',
        excerpt:
          'I was charged twice this month for my subscription. Can you please check and refund...?',
        status: 'resolved',
        created: '1 week ago',
        meta: [
          { label: 'Resolved', value: '5 days ago' },
          { label: 'Resolved by', value: 'John Doe' },
        ],
      },
      {
        id: '#TK-1024',
        title: 'API rate limits causing delays',
        excerpt: 'Our integration spikes are failing due to rate limiting. Need temporary increase.',
        status: 'pending',
        created: '1 day ago',
        meta: [
          { label: 'Created', value: '1 day ago' },
          { label: 'Assigned to', value: 'Tech Team' },
        ],
      },
    ],
    [],
  );

  const visibleTickets = useMemo(() => {
    if (filter === 'all') return tickets;
    return tickets.filter((t) => t.status === filter);
  }, [filter, tickets]);

  return (
    <div className="space-y-8">
      {/* How can we help */}
      <div>
        <h2 className="text-2xl font-semibold text-neutral-900">How can we help you today?</h2>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.key}
              icon={cat.icon}
              title={cat.title}
              subtitle={cat.subtitle}
              colorClasses={cat.colorClasses}
              onClick={() => console.log('Select category', cat.key)}
            />
          ))}
        </div>
      </div>

      {/* Tickets */}
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-neutral-900">My Support Tickets</h2>
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
    </div>
  );
}
