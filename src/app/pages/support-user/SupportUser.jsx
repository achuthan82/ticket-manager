// SupportUser.jsx
import { useMemo, useState } from "react";
import { CreditCardIcon, UsersIcon, Cog6ToothIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
import HelpSection from "./HelpSection";
import TicketsSection from "./TicketsSection";
import { Multiple } from "./Accordion";



export default function SupportUser() {
  const [filter, setFilter] = useState("all");

  const categories = useMemo(() => [
    {
      key: 'billing',
      icon: CreditCardIcon,
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
  ], []);

  const tickets = useMemo(() => [
    {
      id: '#TK-1018',
      title: 'Territory not showing leads',
      excerpt: "I purchased the Miami territory but I'm not receiving any leads from that area. The dashboard shows...",
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
      excerpt: 'I was charged twice this month for my subscription. Can you please check and refund...?',
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
  ], []);

  return (
    <div className="space-y-8">
      <HelpSection categories={categories} />
      <TicketsSection tickets={tickets} filter={filter} setFilter={setFilter} />
      <Multiple/>
    </div>
  );
}
