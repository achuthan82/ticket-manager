import { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Transition,
  Dialog,
  TransitionChild,
  DialogPanel,
} from "@headlessui/react";
import { getCategories } from "utils/ManageFaqService";
import { toast } from "sonner";
import { Button, Input } from "components/ui";
import { useForm } from "react-hook-form";

export default function FAQModal({ faq, open, onClose, onSave }) {
  const [categories, setCategories] = useState([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Validation rules
  const formOption = {
    question: { required: "Question is required" },
    answer: { required: "Answer is required" },
    category: { required: "Category is required" },
  };

  // Fetch categories when modal opens
  useEffect(() => {
    if (open) {
      (async () => {
        const res = await getCategories();
        if (res.status === 200) {
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

  // Populate form when editing
  // Populate form when editing
  useEffect(() => {
    if (faq && categories.length > 0) {
      reset({
        question: faq.question || "",
        answer: faq.answer || "",
        category: faq.category_id || "",
      });
    } else if (!faq) {
      reset({ question: "", answer: "", category: "" });
    }
    setError("");
  }, [faq, categories, reset]);

  const onSubmit = async (data) => {
    setError("");
    setSaving(true);
    try {
      await onSave({
        question: data.question,
        answer: data.answer,
        category_id: data.category,
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
        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-white/30 backdrop-blur-sm" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-3xl transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
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
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="mt-4 space-y-4"
                >
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
                    <Input
                      placeholder="Enter question"
                      disabled={saving}
                      {...register("question", formOption.question)}
                      error={errors?.question?.message}
                    />
                  </div>

                  {/* Answer */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Answer
                    </label>
                    <textarea
                      {...register("answer", formOption.answer)}
                      disabled={saving}
                      placeholder="Enter answer"
                      className={`mt-1 min-h-[150px] w-full rounded-lg border ${
                        errors?.answer ? "border-red-500" : "border-gray-300"
                      } px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 disabled:cursor-not-allowed disabled:bg-gray-100`}
                    />
                    {errors?.answer && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.answer.message}
                      </p>
                    )}
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Category
                    </label>
                    <select
                      {...register("category", formOption.category)}
                      disabled={saving}
                      className={`mt-1 w-full rounded-lg border ${
                        errors?.category ? "border-red-500" : "border-gray-300"
                      } px-3 py-2`}
                    >
                      <option value="">-- Select Category --</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                    {errors?.category && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.category.message}
                      </p>
                    )}
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
                    >
                      {saving && (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      )}
                      {saving ? "Saving..." : faq ? "Update" : "Add"}
                    </Button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
