import { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Transition, Dialog } from "@headlessui/react";

// Map categories to backend UUIDs
const categoryMap = {
  billing: "82b5d872-744d-429a-ab2b-9a3694e10ea7",
  leads: "5601d4a7-a534-4da1-aac3-95c10e2e212b",
  technical: "52b9f447-6818-4de3-88b3-4f26f9b1f70b",
  feature: "6e4aee31-3191-4510-8bcd-11a384098e61",
  general: "63da341a-ccb4-40df-bf9d-ab8b112ad3f2",
};

export default function FAQModal({ faq, open, onClose, onSave }) {
  const [form, setForm] = useState({
    question: "",
    answer: "",
    category: "general",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (faq) {
      const categoryKey =
        Object.keys(categoryMap).find(
          (key) => categoryMap[key] === faq.category_id
        ) || "general";
      setForm({
        question: faq.question,
        answer: faq.answer,
        category: categoryKey,
      });
    } else {
      setForm({ question: "", answer: "", category: "general" });
    }
  }, [faq]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave({
        question: form.question,
        answer: form.answer,
        category_id: categoryMap[form.category],
      });
    } catch (err) {
      console.error("Failed to save FAQ", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Transition show={open}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={onClose}
      >
        {/* Backdrop */}
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
                <div className="flex items-center justify-between">
                  <Dialog.Title className="text-xl font-semibold text-gray-800">
                    {faq ? "Edit FAQ" : "Add FAQ"}
                  </Dialog.Title>
                  <button onClick={onClose} disabled={saving}>
                    <XMarkIcon className="h-6 w-6 text-gray-500 hover:text-gray-700" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
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
                    <div
                      contentEditable={!saving}
                      className="mt-1 min-h-[150px] w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 disabled:cursor-not-allowed disabled:bg-gray-100"
                      onInput={(e) =>
                        setForm({ ...form, answer: e.currentTarget.innerHTML })
                      }
                      dangerouslySetInnerHTML={{ __html: form.answer }}
                    />
                  </div>

                  {/* Category */}
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
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 disabled:cursor-not-allowed disabled:bg-gray-100"
                    >
                      {Object.keys(categoryMap).map((key) => (
                        <option key={key} value={key}>
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={onClose}
                      disabled={saving}
                      className="rounded-lg border border-gray-300 px-4 py-2 text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={saving}
                      className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {saving && (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      )}
                      {saving ? "Saving..." : faq ? "Update" : "Add"}
                    </button>
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
