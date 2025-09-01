import {
  ClockIcon,
  PlusIcon,
  ArrowPathIcon,
  CheckIcon,
  ChatBubbleLeftIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import ChatTemplate from "./ChatTemplate";

// Example backend response (this will come from API later)
const backendData = [
  { label: "New Tickets", value: 5, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200", icon: PlusIcon },
  { label: "Open", value: 12, color: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-200", icon: ClockIcon },
  { label: "Pending", value: 8, color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-200", icon: ArrowPathIcon },
  { label: "Resolved", value: 45, color: "text-green-600", bg: "bg-green-50", border: "border-green-200", icon: CheckIcon },
  { label: "Avg Response", value: "2.4h", color: "text-indigo-900", bg: "bg-indigo-100", border: "border-indigo-500", icon: ChatBubbleLeftIcon },
  { label: "Satisfaction", value: "94%", color: "text-green-600", bg: "bg-green-50", border: "border-green-200", icon: HeartIcon },
];

const RectangularCards = () => {
  return (
    <div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3 lg:grid-cols-6">
        {backendData.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="rounded-md border border-neutral-300 bg-white p-3 shadow-sm"
            >
              <div className="mt-1 flex items-center justify-between">
                <div>
                  <p className="mb-1 text-xs font-medium text-gray-500">
                    {item.label}
                  </p>
                  <h3 className={`text-2xl font-bold ${item.color}`}>
                    {item.value}
                  </h3>
                </div>
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full ${item.border} ${item.bg}`}
                >
                  <Icon className={`h-6 w-6 ${item.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Additional content */}
      <div className="mt-5">
        <ChatTemplate />
      </div>
    </div>
  );
};

export default RectangularCards;
