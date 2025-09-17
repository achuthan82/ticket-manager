import { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Transition, Dialog } from "@headlessui/react";
import { getCategories } from "utils/ManageFaqService"; //  new API
import { toast } from "sonner";
import { Button } from "components/ui";

export default function FAQModal({ faq, open, onClose, onSave }) {
  const [form, setForm] = useState({ question: "", answer: "", category: "" });
  const [categories, setCategories] = useState([]); // categories from API
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  //  Fetch categories when modal opens
  useEffect(() => {
    if (open) {
      (async () => {
        const res = await getCategories();

        if (res.status === 200) {
          console.log("Categories loaded:", res.data);
          setCategories(res.data);
        } else if (res.status === 204) {
          toast.info("No categories found.");
          setCategories([]);
        } else {
          setError(res.error || "Failed to load categories");
        }
      })();
    }
  }, [open]);

  //  Populate form when editing
  useEffect(() => {
    if (faq) {
      setForm({
        question: faq.question || "",
        answer: faq.answer || "",
        category: faq.category_id || "", // use category_id directly
      });
    } else {
      setForm({ question: "", answer: "", category: "" });
    }
    setError("");
  }, [faq?.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      await onSave({
        question: form.question,
        answer: form.answer,
        category_id: form.category, //  no map, send actual id
      });
    } catch (err) {
      setError(err.message || "Failed to save FAQ");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Transition show={open}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-white/30 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <Dialog.Title className="text-xl font-semibold text-gray-800">
                    {faq ? "Edit FAQ" : "Add FAQ"}
                  </Dialog.Title>
                  <button onClick={onClose} disabled={saving}>
                    <XMarkIcon className="h-6 w-6 text-gray-500 hover:text-gray-700" />
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                  {/* Error */}
                  {error && (
                    <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
                      {error}
                    </div>
                  )}

                  {/* Question */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Question
                    </label>
                    <input
                      type="text"
                      value={form.question}
                      onChange={(e) =>
                        setForm({ ...form, question: e.target.value })
                      }
                      required
                      disabled={saving}
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 disabled:cursor-not-allowed disabled:bg-gray-100"
                    />
                  </div>

                  {/* Answer */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Answer
                    </label>
                    <textarea
                      value={form.answer}
                      onChange={(e) =>
                        setForm({ ...form, answer: e.target.value })
                      }
                      disabled={saving}
                      className="mt-1 min-h-[150px] w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 disabled:cursor-not-allowed disabled:bg-gray-100"
                    />
                  </div>

                  {/* Category (dynamic from API) */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Category
                    </label>
                    <select
                      value={form.category}
                      onChange={(e) =>
                        setForm({ ...form, category: e.target.value })
                      }
                      disabled={saving}
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                    >
                      <option value="">-- Select Category --</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-end gap-3">
                    <Button type="button" onClick={onClose} disabled={saving}>
                      Cancel
                    </Button>
                    <Button
                      variant="neutral"
                      className="bg-[#2A5A9D] text-white hover:bg-[#1A3A6C]"
                      type="submit"
                      disabled={saving}
                      // className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {saving && (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      )}
                      {saving ? "Saving..." : faq ? "Update" : "Add"}
                    </Button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
