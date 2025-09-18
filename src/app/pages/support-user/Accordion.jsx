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
import { getFaqDetails, getFaqs, incrementFaqViewCount, toggleFaqHelpful } from "utils/supportUserService";

import {
  Pagination,
  PaginationItems,
  PaginationNext,
  PaginationPrevious,
} from "components/ui";
import { toast } from "sonner";


const Multiple = ({ categoryOptions }) => {
  const [faqs, setFaqs] = useState([]);
  const [category, setCategory] = useState(""); // default billing
  const [page, setPage] = useState(1);
  const [perPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [loadingAnswers, setLoadingAnswers] = useState([]);
  const [openFaqs, setOpenFaqs] = useState([]);

  const handleAccordionToggle = async (faqId) => {
    try {
      if (openFaqs.includes(faqId)) {
        setOpenFaqs((prev) => prev.filter((id) => id !== faqId));
      } else {
        setOpenFaqs((prev) => [...prev, faqId]);
        setLoadingAnswers((prev) => [...prev, faqId]);
        await incrementFaqViewCount(faqId);

        const { success, data, error } = await getFaqDetails(faqId);

        if (success) {
          setFaqs((prev) =>
            prev.map((f) =>
              f.id === faqId
                ? {
                  ...f,
                  answer: data?.answer || "No answer available.",
                  is_helpful: data?.is_helpful ?? null,
                }
                : f
            )
          );
        } else {
          toast.error(error || "Failed to load FAQ details.")
          setFaqs((prev) =>
            prev.map((f) =>
              f.id === faqId
                ? {
                  ...f,
                  answer: "Something went wrong. Please try again later.",
                  is_helpful: null,
                }
                : f
            )
          );
        }

        setLoadingAnswers((prev) => prev.filter((id) => id !== faqId));
      }
    } catch (err) {
      toast.error(err?.message || "Error toggling accordion. Please try again.");
      setLoadingAnswers((prev) => prev.filter((id) => id !== faqId));
      setFaqs((prev) =>
        prev.map((f) =>
          f.id === faqId
            ? {
              ...f,
              answer: "Something went wrong. Please try again later.",
              is_helpful: null,
            }
            : f
        )
      );
    }
  };

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

        if (success) {
          if (data?.status === 204 || !data?.data?.length) {
            setFaqs([]);
            setError("No FAQs found");
            setTotalPages(1);
          } else {
            setFaqs(
              data.data.map((f) => ({
                id: f.id,
                question: f.question,
                answer: f.answer || "", 
                is_helpful: f.is_helpful ?? false,
              }))
            );

            if (data.pagination) {
              setTotalPages(
                Math.ceil(data.pagination.total / data.pagination.per_page)
              );
            } else {
              setTotalPages(1);
            }
          }
        } else {
          setError(fetchError || "Failed to load FAQs");
          setFaqs([]);
          setTotalPages(1);
        }
      } catch (err) {
        toast.error(err?.message || "Something went wrong while fetching FAQs.");
        setError("Something went wrong while fetching FAQs.");
        setFaqs([]);
        setTotalPages(1);
      }
      setLoading(false);
    }

    fetchFaqs();
  }, [category, page, perPage]);


  const handleToggleHelpful = async (faqId, value) => {
    try {
      const res = await toggleFaqHelpful(faqId, value);
      if (res?.status === 201) {
        setFaqs((prev) =>
          prev.map((f) =>
            f.id === faqId ? { ...f, is_helpful: value } : f
          )
        );
         toast.success(res?.message || "Updated successfully!");
      } else {
        toast.error(res?.error || "Something went wrong while updating. Please try again.")
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Network or server error. Please try again later.")
    }
  };



  return (
    <div className="w-full">
      {/* Header with filter */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Frequently Asked Questions
        </h2>
        <div className="w-45">
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
          {faqs.map(({ id, question, answer }, index) => (
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
                onClick={() => handleAccordionToggle(id)}
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
                {loadingAnswers.includes(id) ? (
                  <p className="text-gray-400 italic text-sm">Loading answer...</p>
                ) : (
                  <p className="text-gray-700 mb-2">{answer}</p>
                )}

                <div className="flex justify-end gap-3">
                  {/* Like button */}
                  <button
                    type="button"
                    onClick={() => handleToggleHelpful(id, true)}
                    disabled={loadingAnswers.includes(id)} // disable during loading
                    className={clsx(
                      "flex items-center gap-2 transition-colors",
                      loadingAnswers.includes(id)
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-gray-500 hover:text-blue-600"
                    )}
                  >
                    {loadingAnswers.includes(id) ? (
                      <OutlineHandThumbUpIcon className="size-5" />
                    ) : faqs.find(f => f.id === id)?.is_helpful === true ? (
                      <SolidHandThumbUpIcon className="size-5 text-blue-600" />
                    ) : (
                      <OutlineHandThumbUpIcon className="size-5" />
                    )}
                    <span className="text-sm">Helpful</span>
                  </button>

                  {/* Dislike button */}
                  <button
                    type="button"
                    onClick={() => handleToggleHelpful(id, false)}
                    disabled={loadingAnswers.includes(id)} // disable during loading
                    className={clsx(
                      "flex items-center gap-2 transition-colors",
                      loadingAnswers.includes(id)
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-gray-500 hover:text-red-600"
                    )}
                  >
                    {loadingAnswers.includes(id) ? (
                      <OutlineHandThumbUpIcon className="size-5 rotate-180" />
                    ) : faqs.find(f => f.id === id)?.is_helpful === false ? (
                      <SolidHandThumbUpIcon className="size-5 text-red-600 rotate-180" />
                    ) : (
                      <OutlineHandThumbUpIcon className="size-5 rotate-180" />
                    )}
                    <span className="text-sm">Not Helpful</span>
                  </button>
                </div>


              </AccordionPanel>

            </AccordionItem>
          ))}
        </Accordion>
      )}

      {/* Pagination */}
      {!loading && !error && totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <Pagination
            total={totalPages}
            value={page}
            onChange={(newPage) => setPage(newPage)}
          >
            <PaginationPrevious />
            <PaginationItems />
            <PaginationNext />
          </Pagination>
        </div>
      )}
    </div>
  );
};

export { Multiple };
