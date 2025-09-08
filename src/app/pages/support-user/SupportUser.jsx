import { useState } from "react";
import { CreditCardIcon, UsersIcon, Cog6ToothIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
import HelpSection from "./HelpSection";
import TicketsSection from "./TicketsSection";
import { Multiple } from "./Accordion";

export default function SupportUser() {
  const [filter, setFilter] = useState("all");

  const categories = [
    {
      key: "billing",
      icon: CreditCardIcon,
      title: "Billing & Payments",
      subtitle: "Subscription & payment issues",
      colorClasses: { bg: "bg-blue-100", text: "text-blue-700" },
    },
    {
      key: "leads",
      icon: UsersIcon,
      title: "Leads & Territories",
      subtitle: "Lead quality & territory access",
      colorClasses: { bg: "bg-green-100", text: "text-green-700" },
    },
    {
      key: "technical",
      icon: Cog6ToothIcon,
      title: "Technical Support",
      subtitle: "Platform & system issues",
      colorClasses: { bg: "bg-purple-100", text: "text-purple-700" },
    },
    {
      key: "general",
      icon: QuestionMarkCircleIcon,
      title: "General Inquiry",
      subtitle: "Other questions & feedback",
      colorClasses: { bg: "bg-yellow-100", text: "text-yellow-700" },
    },
  ];

  const categoryOptions = [
    { label: "Billing & Payments", value: "billing" },
    { label: "Leads & Territories", value: "leads" },
    { label: "Technical Support", value: "technical" },
    { label: "Feature Requests", value: "feature" },
    { label: "General Inquiry", value: "general" },
  ];


  return (
    <div className="space-y-8">
      <HelpSection categories={categories} />
      <TicketsSection filter={filter} setFilter={setFilter} />
      <Multiple categoryOptions={categoryOptions} />
    </div>
  );
}
