import { useState, useEffect } from "react";
import FAQItem from "./FAQItem";
import FAQModal from "./FAQModal";
import {
  addFaq,
  getFaqs,
  updateFaq,
  deleteFaq,
  getCategories,
} from "utils/ManageFaqService";
import {
  Pagination,
  PaginationItems,
  PaginationNext,
  PaginationPrevious,
} from "components/ui";
import { toast } from "sonner";

export default function FAQPage() {
  const [faqs, setFaqs] = useState([]);
  const [categories, setCategories] = useState({}); // dynamic category map
  const [modalOpen, setModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);
  const [loading, setLoading] = useState(true);

  // pagination state (from backend)
  const [page, setPage] = useState(1);
  const perPage = 7;
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  //  Fetch categories once on mount
 useEffect(() => {
  (async () => {
    const res = await getCategories();

    if (res.success && res.status === 200 && res.data.length > 0) {
      // build map {id: name}
      const map = res.data.reduce((acc, cat) => {
        acc[cat.id] = cat.name;
        return acc;
      }, {});
      setCategories(map);
    } else if (res.success && res.status === 204) {
      //  No categories found
      setCategories({});
      toast.info("No categories found");
    } else {
      toast.error(res.error || "Failed to load categories");
    }
  })();
}, []);


  // Fetch FAQs with backend pagination
  const fetchFaqs = async () => {
    setLoading(true);
   try {
  const result = await getFaqs({ page, per_page: perPage });

  if (result.success && result.status === 200) {
    const faqsWithOpen = result.data.map((faq) => ({
      ...faq,
      open: false,
      category_name: categories[faq.category_id] || "Uncategorized",
    }));

    setFaqs(faqsWithOpen);
    setTotalItems(result.pagination.total);
    setTotalPages(
      Math.ceil(result.pagination.total / result.pagination.per_page),
    );
  } else if (result.success && result.status === 204) {
    //  No Content case
    setFaqs([]);
    setTotalItems(0);
    setTotalPages(0);
    toast.info("No data found");
  } else {
    console.error("Failed to fetch FAQs:", result.error);
    toast.error("Failed to load FAQs");
  }
} catch (err) {
  console.error("Error fetching FAQs:", err);
  toast.error("Something went wrong while fetching FAQs");
} finally {
  setLoading(false);
}

  };

  // Refetch when page changes OR categories are loaded
  useEffect(() => {
    if (Object.keys(categories).length > 0) {
      fetchFaqs();
    }
  }, [page, categories]);

  // Listen for "openFaqModal" event from header
  useEffect(() => {
    const handleOpen = () => handleOpenModal(null);
    window.addEventListener("openFaqModal", handleOpen);
    return () => window.removeEventListener("openFaqModal", handleOpen);
  }, []);

  const handleToggle = (id) => {
    setFaqs((prev) =>
      prev.map((faq) => (faq.id === id ? { ...faq, open: !faq.open } : faq)),
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
        if (
          result.success &&
          (result.status === 200 || result.status === 201)
        ) {
          await fetchFaqs();
          handleCloseModal();
          toast.success("FAQ updated");
        }
      } else {
        const result = await addFaq(formData);
        if (
          result.success &&
          (result.status === 200 || result.status === 201)
        ) {
          await fetchFaqs();
          handleCloseModal();
          toast.success("FAQ added");
        } else {
          toast.error("Failed to add FAQ. Unexpected status code.");
        }
      }
    } catch (err) {
      console.error("Error saving FAQ:", err);
      toast.error("Failed to save FAQ");
    }
  };

  const handleDelete = async (faqId) => {
    try {
      const result = await deleteFaq(faqId);
      if (result.success && result.status === 200) {
        toast.success("FAQ deleted successfully");
        await fetchFaqs();
      } else {
        toast.error(result.error || "Failed to delete FAQ");
      }
    } catch (err) {
      console.error("Failed to delete FAQ:", err);
      toast.error("Failed to delete FAQ");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {loading ? (
        <div className="rounded-lg bg-gray-100 p-4 text-center text-gray-600">Loading FAQs...</div>
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
