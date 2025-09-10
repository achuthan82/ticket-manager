import { useState, useEffect } from "react";
import FAQItem from "./FAQItem";
import FAQModal from "./FAQModal";
import { addFaq, getFaqs, updateFaq, deleteFaq } from "utils/ManageFaqService";
import {
  Pagination,
  PaginationItems,
  PaginationNext,
  PaginationPrevious,
} from "components/ui";

const categoryNameMap = {
  "82b5d872-744d-429a-ab2b-9a3694e10ea7": "Billing",
  "5601d4a7-a534-4da1-aac3-95c10e2e212b": "Leads",
  "52b9f447-6818-4de3-88b3-4f26f9b1f70b": "Technical",
  "6e4aee31-3191-4510-8bcd-11a384098e61": "Feature",
  "63da341a-ccb4-40df-bf9d-ab8b112ad3f2": "General",
};

export default function FAQPage() {
  const [faqs, setFaqs] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);
  const [loading, setLoading] = useState(false);

  // pagination state (from backend)
  const [page, setPage] = useState(1);
  const perPage = 7;
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Fetch FAQs with backend pagination
  const fetchFaqs = async () => {
  setLoading(true);
  try {
    const result = await getFaqs({ page, per_page: perPage });
    if (result.success) {
      const faqsWithOpen = result.data.map((faq) => ({
        ...faq,
        open: false,
        category_name: categoryNameMap[faq.category_id] || "General",
      }));

      setFaqs(faqsWithOpen);
      setTotalItems(result.pagination.total);
      setTotalPages(Math.ceil(result.pagination.total / result.pagination.per_page));
    } else {
      console.error("Failed to fetch FAQs:", result.error);
    }
  } catch (err) {
    console.error("Error fetching FAQs:", err);
  } finally {
    setLoading(false);
  }
};


  // Refetch when page changes
  useEffect(() => {
    fetchFaqs();
  }, [page]);

  // 🔥 Listen for "openFaqModal" event from header
  useEffect(() => {
    const handleOpen = () => handleOpenModal(null);
    window.addEventListener("openFaqModal", handleOpen);
    return () => window.removeEventListener("openFaqModal", handleOpen);
  }, []);

  const handleToggle = (id) => {
    setFaqs((prev) =>
      prev.map((faq) => (faq.id === id ? { ...faq, open: !faq.open } : faq))
    );
  };

  const handleOpenModal = (faq = null) => {
    setEditingFaq(faq);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingFaq(null);
    setModalOpen(false);
  };

  const handleSave = async (formData) => {
    try {
      if (editingFaq) {
        const result = await updateFaq(editingFaq.id, formData);
        if (result.success) {
          await fetchFaqs();
          handleCloseModal();
        }
      } else {
        const result = await addFaq(formData);
        if (result.success) {
          await fetchFaqs();
          handleCloseModal();
        }
      }
    } catch (err) {
      console.error("Error saving FAQ:", err);
    }
  };

  const handleDelete = async (faqId) => {
    try {
      const result = await deleteFaq(faqId);
      if (result.success) {
        await fetchFaqs();
      }
    } catch (err) {
      console.error("Failed to delete FAQ:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {loading ? (
        <div className="text-center text-gray-500">Loading FAQs...</div>
      ) : totalItems === 0 ? (
        <div className="rounded-lg bg-gray-100 p-6 text-center text-gray-600">
          No FAQs available.
        </div>
      ) : (
        <div className="mx-auto mt-6 max-w-3xl space-y-4">
          {faqs.map((faq) => (
            <FAQItem
              key={faq.id}
              faq={faq}
              onToggle={() => handleToggle(faq.id)}
              onEdit={(faqDetails) => handleOpenModal(faqDetails)}
              onDelete={() => handleDelete(faq.id)}
            />
          ))}

          <div className="mt-6 flex items-center justify-between text-sm text-gray-600">
            <span>
              Showing {(page - 1) * perPage + 1}–
              {Math.min(page * perPage, totalItems)} of {totalItems} FAQs
            </span>

            <Pagination total={totalPages} value={page} onChange={setPage}>
              <PaginationPrevious />
              <PaginationItems />
              <PaginationNext />
            </Pagination>
          </div>
        </div>
      )}

      {modalOpen && (
        <FAQModal
          faq={editingFaq}
          open={modalOpen}
          onClose={handleCloseModal}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
