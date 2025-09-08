import { useEffect, useState } from "react";
import {
  ChevronDownIcon,
  HandThumbUpIcon as SolidHandThumbUpIcon,
} from "@heroicons/react/20/solid";
import { HandThumbUpIcon as OutlineHandThumbUpIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import {
  Select,
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from "components/ui";
import { getFaqs, toggleFaqHelpful } from "utils/supportUserService";

const Multiple = ({ categoryOptions }) => {
  const [faqs, setFaqs] = useState([]);
  const [category, setCategory] = useState("billing"); // default billing
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchFaqs() {
      setLoading(true);
      setError("");

      try {
        const { success, data, error: fetchError } = await getFaqs({
          page,
          per_page: perPage,
          category,
        });

        if (success && data?.data?.length) {
          setFaqs(
            data.data.map((f) => ({
              id: f.id,
              question: f.question,
              answer: f.answer,
              is_helpful: f.is_helpful || false, // ensure boolean
            }))
          );

          if (data.meta?.total_pages) {
            setTotalPages(data.meta.total_pages);
          } else {
            setTotalPages(data.data.length < perPage ? page : page + 1);
          }
        } else {
          setError(fetchError || "No FAQs found");
        }
      } catch (err) {
        console.error("Error fetching FAQs:", err);
        setError("Something went wrong while fetching FAQs.");
      }

      setLoading(false);
    }

    fetchFaqs();
  }, [category, page, perPage]);

  const handleToggleHelpful = async (faqId, currentValue) => {
    try {
      const newValue = !currentValue;
      await toggleFaqHelpful(faqId, newValue);

      setFaqs((prev) =>
        prev.map((f) =>
          f.id === faqId ? { ...f, is_helpful: newValue } : f
        )
      );
    } catch (err) {
      console.error("Error toggling helpful:", err);
    }
  };

  return (
    <div className="w-full">
      {/* Header with filter */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Frequently Asked Questions
        </h2>
        <div className="w-50">
          <Select
            className="text-sm border border-black rounded-md px-3 py-2"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
            data={categoryOptions}
          />
        </div>
      </div>

      {/* FAQ Accordion */}
      {loading ? (
        <p className="text-center text-gray-500">Loading FAQs...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : faqs.length === 0 ? (
        <p className="text-center text-gray-500">No FAQs found</p>
      ) : (
        <Accordion
          multiple
          className="flex flex-col divide-y divide-gray-150 dark:divide-dark-500"
        >
          {faqs.map(({ id, question, answer, is_helpful }, index) => (
            <AccordionItem
              key={id}
              value={id}
              className={clsx(
                "group overflow-hidden",
                index === 0 && "rounded-t-lg",
                index === faqs.length - 1 && "rounded-b-lg"
              )}
            >
              <AccordionButton
                className={clsx(
                  "flex w-full cursor-pointer items-center justify-between p-4 text-base font-medium text-gray-700 outline-none ring-primary-500/50 ring-offset-2 ring-offset-white focus-visible:ring dark:text-dark-100 dark:ring-offset-dark-700 transition-colors duration-200",
                  "bg-white group-hover:bg-[#FFFEF0]"
                )}
              >
                {({ open }) => (
                  <>
                    <p>{question}</p>
                    <div
                      className={clsx(
                        "text-sm font-normal leading-none text-gray-400 transition-transform duration-300 dark:text-dark-300",
                        open && "-rotate-180"
                      )}
                    >
                      <ChevronDownIcon className="size-6" />
                    </div>
                  </>
                )}
              </AccordionButton>
              <AccordionPanel className="p-4 pt-0 transition-colors duration-200 bg-white group-hover:bg-[#FFFEF0]">
                {/* Answer text */}
                <p className="text-gray-700 mb-2">{answer}</p>

                {/* Like button below answer, aligned right */}
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => handleToggleHelpful(id, is_helpful)}
                    className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors"
                  >
                    {is_helpful ? (
                      <SolidHandThumbUpIcon className="size-5 text-blue-600" />
                    ) : (
                      <OutlineHandThumbUpIcon className="size-5" />
                    )}
                    <span className="text-sm">
                      {is_helpful ? "Marked Helpful" : "Mark as Helpful"}
                    </span>
                  </button>
                </div>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      )}

      {/* Pagination */}
      {!loading && !error && totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            className="px-3 py-1 rounded-md border text-sm disabled:opacity-50"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Prev
          </button>
          <span className="text-sm text-gray-600">
            Page {page} of {totalPages}
          </span>
          <button
            className="px-3 py-1 rounded-md border text-sm disabled:opacity-50"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export { Multiple };
