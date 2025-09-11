import { useEffect, useState } from "react";
import {
  CreditCardIcon,
  UsersIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";
import { getCategories } from "utils/supportUserService"; 

function CategoryCard({ icon: Icon, title, subtitle, colorClasses, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-white p-6 rounded-lg shadow-sm text-center 
      transition-all duration-300 ease-in-out 
      hover:shadow-lg hover:-translate-y-2 cursor-pointer"
    >
      <div className="flex flex-col items-center justify-center gap-4">
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-full ${colorClasses.bg} ${colorClasses.text}`}
        >
          <Icon className="h-7 w-7" />
        </div>
        <div className="text-center">
          <div className="text-base font-semibold text-neutral-900">
            {title}
          </div>
          <div className="mt-1 text-sm text-neutral-500">{subtitle}</div>
        </div>
      </div>
    </button>
  );
}

export default function HelpSection() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // icon + styling mapping
  const categoryMeta = {
    "Billing & Payments": {
      icon: CreditCardIcon,
      subtitle: "Subscription & payment issues",
      colorClasses: { bg: "bg-blue-100", text: "text-blue-700" },
    },
    "Leads & Territories": {
      icon: UsersIcon,
      subtitle: "Lead quality & territory access",
      colorClasses: { bg: "bg-green-100", text: "text-green-700" },
    },
    "Technical Support": {
      icon: Cog6ToothIcon,
      subtitle: "Platform & system issues",
      colorClasses: { bg: "bg-purple-100", text: "text-purple-700" },
    },
    "General Inquiry": {
      icon: QuestionMarkCircleIcon,
      subtitle: "Other questions & feedback",
      colorClasses: { bg: "bg-yellow-100", text: "text-yellow-700" },
    },
    "Feature Request": {
      icon: SparklesIcon,
      subtitle: "Suggest new features",
      colorClasses: { bg: "bg-pink-100", text: "text-pink-700" },
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await getCategories();

      if (result.success && result.status === 200) {
        setCategories(result.data);
      } else if (result.success && result.status === 204) {
        setCategories([]); 
      } else {
        console.error("Failed to load categories:", result.error);
        setCategories(null); 
      }

      setLoading(false);
    };
    fetchData();
  }, []);



  const handleCategoryClick = (cat) => {
    window.dispatchEvent(
      new CustomEvent("openNewTicketModal", {
        detail: { categoryId: cat.id, categoryName: cat.name },
      })
    );
  };

  if (loading) {
    return <div className="text-center text-gray-500">Loading categories…</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        How can we help you today?
      </h2>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((cat) => {
          const meta = categoryMeta[cat.name] || {
            icon: QuestionMarkCircleIcon,
            subtitle: "Other category",
            colorClasses: { bg: "bg-gray-100", text: "text-gray-700" },
          };
          return (
            <CategoryCard
              key={cat.id}
              icon={meta.icon}
              title={cat.name}
              subtitle={meta.subtitle}
              colorClasses={meta.colorClasses}
              onClick={() => handleCategoryClick(cat)}
            />
          );
        })}
      </div>
    </div>
  );
}
