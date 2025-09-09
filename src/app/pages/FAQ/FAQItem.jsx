import { useRef, useState, useEffect } from "react";
import {
  PencilSquareIcon,
  TrashIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import { getViewCount } from "utils/ManageFaqService"; // your API function

export default function FAQItem({ faq, onToggle, onEdit, onDelete }) {
  const [height, setHeight] = useState(0);
  const [viewCount, setViewCount] = useState(null);
  const contentRef = useRef(null);

  // Animate height and fetch view count when FAQ is opened
  useEffect(() => {
    if (faq.open) {
      setHeight(contentRef.current.scrollHeight);

      // Fetch view count only when FAQ is opened
      const fetchViewCount = async () => {
        try {
          const result = await getViewCount(faq.id);
          if (result.success && result.data) {
            // ⚡ Correctly access the nested data
            setViewCount(result.data.data.view_count ?? 0); // fallback to 0 if null
          }
        } catch (err) {
          console.error("Failed to fetch view count:", err);
        }
      };

      fetchViewCount();
    } else {
      setHeight(0);
    }
  }, [faq.open, faq.id]);

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden transition-shadow hover:shadow-md">
      {/* Question Header */}
      <div
        onClick={onToggle}
        className="flex cursor-pointer items-center justify-between p-4"
      >
        <h2 className="font-medium text-gray-800">{faq.question}</h2>
        {faq.open ? (
          <ChevronUpIcon className="h-5 w-5 text-gray-500 transition-transform duration-200" />
        ) : (
          <ChevronDownIcon className="h-5 w-5 text-gray-500 transition-transform duration-200" />
        )}
      </div>

      {/* Answer Section */}
      <div
        ref={contentRef}
        style={{ height }}
        className="transition-height duration-300 ease-in-out border-t border-gray-100 px-4 overflow-hidden"
      >
        <div className="py-4 text-gray-600 space-y-2">
          <div>
            <span className="font-semibold">Question:</span> {faq.question}
          </div>
          <div>
            <span className="font-semibold">Answer:</span>{" "}
            <span
              className="prose prose-sm"
              dangerouslySetInnerHTML={{ __html: faq.answer }}
            />
          </div>
          <div>
            <span className="font-semibold">Category Name:</span>{" "}
            {faq.category_name || "General"}
          </div>
          <div>
            <span className="font-semibold">View Count:</span>{" "}
            {viewCount !== null ? viewCount : "Loading..."}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pb-4">
          {onEdit && (
            <button
              onClick={onEdit}
              className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
            >
              <PencilSquareIcon className="h-4 w-4" /> Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={onDelete}
              className="flex items-center gap-1 text-sm text-red-600 hover:underline"
            >
              <TrashIcon className="h-4 w-4" /> Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
