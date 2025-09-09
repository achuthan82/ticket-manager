import { useState, useEffect } from "react";
import FAQItem from "./FAQItem";
import FAQModal from "./FAQModal";
import { addFaq, getFaqs, updateFaq, deleteFaq } from "utils/ManageFaqService";

// Map backend UUIDs to human-readable category names
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

  // Fetch all FAQs
const fetchFaqs = async () => {
  setLoading(true);
  try {
    const result = await getFaqs({ page: 1, per_page: 50 });
    if (result.success) {
      const faqsWithOpen = (result.data.data || []).map((faq) => ({
        ...faq,
        open: false,
        category_name: categoryNameMap[faq.category_id] || "General", // <-- Add this line
      }));
      setFaqs(faqsWithOpen);
    } else {
      console.error("Failed to fetch FAQs:", result.error);
    }
  } catch (err) {
    console.error("Error fetching FAQs:", err);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchFaqs();
  }, []);

  // Toggle accordion
  const handleToggle = (id) => {
    setFaqs((prev) =>
      prev.map((faq) =>
        faq.id === id ? { ...faq, open: !faq.open } : faq
      )
    );
  };

  // Open modal for edit or add
  const handleOpenModal = (faq = null) => {
    setEditingFaq(faq);
    setModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setEditingFaq(null);
    setModalOpen(false);
  };

  // Save FAQ (add or update)
  const handleSave = async (formData) => {
    if (editingFaq) {
      const result = await updateFaq(editingFaq.id, formData);
      if (result.success) {
        setFaqs((prev) =>
          prev.map((faq) =>
            faq.id === editingFaq.id
              ? {
                  ...faq,
                  ...formData,
                  open: faq.open,
                  category_name:
                    categoryNameMap[formData.category_id] || "General",
                }
              : faq
          )
        );
        handleCloseModal();
      }
    } else {
      const result = await addFaq(formData);
      if (result.success) {
        setFaqs((prev) => [
          ...prev,
          {
            ...result.data,
            open: false,
            category_name: categoryNameMap[result.data.category_id] || "General",
          },
        ]);
        handleCloseModal();
      }
    }
  };

  // Optional: handleDelete function if you implement delete
  const handleDelete = async (faqId) => {
    try {
      const result = await deleteFaq(faqId);
      if (result.success) {
        setFaqs((prev) => prev.filter((faq) => faq.id !== faqId));
      }
    } catch (err) {
      console.error("Failed to delete FAQ:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {loading ? (
        <div className="text-center text-gray-500">Loading FAQs...</div>
      ) : faqs.length === 0 ? (
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
              onEdit={() => handleOpenModal(faq)}
              onDelete={() => handleDelete(faq.id)}
            />
          ))}
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
