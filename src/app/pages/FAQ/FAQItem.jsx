import { useRef, useState, useEffect } from "react";
import {
  PencilSquareIcon,
  TrashIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import { getViewCount } from "utils/ManageFaqService";

export default function FAQItem({ faq, onToggle, onEdit, onDelete }) {
  const [height, setHeight] = useState(0);
  const [viewCount, setViewCount] = useState(null);
  const [details, setDetails] = useState(null);
  const contentRef = useRef(null);

  // 🔑 Sync details whenever faq changes (after update/edit)
 useEffect(() => {
  if (faq) {
    setDetails(faq.details || faq);
  }
}, [faq]);


  // Adjust height dynamically when open + details available
  useEffect(() => {
    if (faq.open && details && contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [faq.open, details]);

  // Fetch details when opening for the first time
  useEffect(() => {
    if (faq.open && !details?.answer) {
      const fetchDetails = async () => {
        try {
          const result = await getViewCount(faq.id);
          if (result.success && result.data) {
            const fetched = result.data.data;
            setDetails((prev) => ({ ...prev, ...fetched }));
            setViewCount(fetched.view_count ?? 0);
          }
        } catch (err) {
          console.error("Failed to fetch view count:", err);
        }
      };
      fetchDetails();
    }
  }, [faq.open, faq.id]);

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
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
        className="transition-[height] overflow-hidden border-t border-gray-100 px-4 duration-300 ease-in-out"
      >
        <div className="relative flex min-h-[80px] items-center justify-center space-y-2 py-4 text-gray-600">
          {/* Loading state */}
          {faq.open && !details && (
            <div className="absolute inset-0 flex items-center justify-center text-gray-500 italic">
              Loading details...
            </div>
          )}

          {/* Loaded details */}
          {details && (
            <div className="w-full">
              <div>
                <span className="font-semibold">Question:</span>{" "}
                {details.question}
              </div>
              <div>
                <span className="font-semibold">Answer:</span>{" "}
                <span
                  className="prose prose-sm"
                  dangerouslySetInnerHTML={{ __html: details.answer }}
                />
              </div>
              <div>
                <span className="font-semibold">Category:</span>{" "}
                {details.category_name || "General"}
              </div>
              <div>
                <span className="font-semibold">Helpful:</span>{" "}
                {details.helpful_count}
              </div>
              <div>
                <span className="font-semibold">Unhelpful:</span>{" "}
                {details.unhelpful_count}
              </div>
              <div>
                <span className="font-semibold">View Count:</span>{" "}
                {viewCount ?? "Loading..."}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                {onEdit && (
                  <button
                    onClick={() => onEdit(details ? { ...faq, ...details } : faq)}
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
          )}
        </div>
      </div>
    </div>
  );
}
