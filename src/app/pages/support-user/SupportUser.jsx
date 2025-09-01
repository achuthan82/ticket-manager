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

  const faqs = [
    {
      id: "faq-1",
      question: "How do I update my payment method?",
      answer:
        "To update your payment method, go to Account Settings > Billing > Payment Methods. Click 'Update' next to your current card or 'Add New Payment Method' to add a different card.",
    },
    {
      id: "faq-2",
      question: "What is the lead response time guarantee?",
      answer:
        "Our lead response time guarantee ensures that all inquiries are addressed within the agreed SLA timeframe. This helps maintain high customer satisfaction and trust.",
    },
    {
      id: "faq-3",
      question: "Can I change my territory selection?",
      answer:
        "Territory changes are subject to availability. Please contact our support team to request a territory change.",
    },
  ];

  return (
    <div className="space-y-8">
      <HelpSection categories={categories} />
      <TicketsSection filter={filter} setFilter={setFilter} />
      <Multiple faqs={faqs} />
    </div>
  );
}
