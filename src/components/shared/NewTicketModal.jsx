import { Fragment, useMemo, useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon, ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { Button, Input, Select, Textarea, Upload } from "components/ui";

export default function NewTicketModal({ open, onClose, onSubmit }) {
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("medium");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [errors, setErrors] = useState({});

  const categories = useMemo(
    () => [
    { label: "Select a category", value: "" },
    { label: "Billing & Payments", value: "billing" },
    { label: "Leads & Territories", value: "leads" },
    { label: "Technical Support", value: "technical" },
    { label: "Feature Request", value: "feature" },
    { label: "General Enquiry", value: "general" },
    ],
    []
  );

  const validateForm = () => {
    let newErrors = {};
    if (!category) newErrors.category = "Please select a category.";
    if (!subject.trim()) newErrors.subject = "Subject is required.";
    if (!description.trim()) newErrors.description = "Description is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault?.();
    if (!validateForm()) return;

    const payload = {
      category,
      priority,
      subject,
      description,
      attachment,
    };
    onSubmit ? onSubmit(payload) : console.log("Submit ticket", payload);
    onClose?.();
  };

  const PriorityCard = ({ value, title, subtitle, colorClasses }) => (
    <button
      type="button"
      onClick={() => setPriority(value)}
      className={`flex-1 rounded-lg border px-6 py-5 text-left transition-colors ${priority === value
        ? `${colorClasses.activeBorder} ${colorClasses.activeBg}`
        : "border-neutral-300 hover:border-neutral-400 bg-white"
        }`}
    >
      <div className={`text-base font-semibold ${colorClasses.text}`}>
        {title}
      </div>
      <div className="mt-1 text-xs text-neutral-600">{subtitle}</div>
    </button>
  );

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-[100] flex items-start justify-center px-4 py-10 sm:px-5 pointer-events-none"
        onClose={onClose}
      >
        {/* Backdrop */}
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="absolute inset-0 bg-gray-900/50 pointer-events-none" />
        </TransitionChild>

        {/* Modal */}
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <DialogPanel className="relative w-full max-w-2xl max-h-[90vh] rounded-xl bg-white p-0 shadow-lg transition-all pointer-events-auto flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-3 flex-shrink-0">
              <DialogTitle className="text-lg font-semibold text-neutral-900">
                Create New Support Ticket
              </DialogTitle>
              <button
                onClick={onClose}
                className="p-1 text-neutral-500 hover:text-neutral-700"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto">
              <form onSubmit={handleSubmit} className="px-5 py-4">
                <div className="mb-4">
                  <Select
                    label="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    data={categories}
                    className="w-full"
                    required
                  />
                  {errors.category && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.category}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <div className="mb-2 text-sm font-medium text-neutral-900">
                    Priority
                  </div>
                  <div className="flex gap-3">
                    <PriorityCard
                      value="low"
                      title="Low"
                      subtitle="General questions"
                      colorClasses={{
                        text: "text-green-700",
                        activeBorder: "border-green-400",
                        activeBg: "bg-green-50",
                      }}
                    />
                    <PriorityCard
                      value="medium"
                      title="Medium"
                      subtitle="Service issues"
                      colorClasses={{
                        text: "text-amber-700",
                        activeBorder: "border-amber-400",
                        activeBg: "bg-amber-50",
                      }}
                    />
                    <PriorityCard
                      value="high"
                      title="High"
                      subtitle="Urgent problems"
                      colorClasses={{
                        text: "text-red-700",
                        activeBorder: "border-red-400",
                        activeBg: "bg-red-50",
                      }}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <Input
                    label="Subject"
                    placeholder="Brief description of your issue"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.subject}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <Textarea
                    label="Description"
                    rows={6}
                    placeholder="Please provide detailed information about your issue..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.description}
                    </p>
                  )}
                </div>
 
                <div className="mt-4">
                  <div className="mb-2 text-sm font-medium text-neutral-900">
                    Attachments (optional)
                  </div>
                  <Upload
                    multiple
                    accept="image/png,image/jpeg,application/pdf"  // optional: restrict types
                    onChange={(files) => {
                      const max = 10 * 1024 * 1024; // 10MB
                      const allowed = Array.from(files).filter(
                        f => ["image/png", "image/jpeg", "application/pdf"].includes(f.type) && f.size <= max
                      );
                      setAttachment(allowed);
                    }}
                  >
                    {({ onClick }) => (
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={onClick}
                        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onClick()}
                        className="flex h-56 flex-col items-center justify-center rounded-lg border border-dashed border-neutral-300 p-8 text-center text-neutral-500 hover:border-neutral-400"
                      >
                        <ArrowUpTrayIcon className="h-7 w-7 text-neutral-400" />
                        <div className="mt-2 text-sm">Drop files here or click to upload</div>
                        <div className="mt-1 text-xs text-neutral-400">PNG, JPG, PDF up to 10MB</div>
                      </div>
                    )}
                  </Upload>
                </div>
              </form>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 border-t border-neutral-200 px-5 py-3 flex-shrink-0">
              <Button
                variant="outlined"
                color="primary"
                onClick={onClose}
                type="button"
              >
                Cancel
              </Button>
              <Button color="primary" onClick={handleSubmit} type="submit">
                Submit
              </Button>
            </div>
          </DialogPanel>
        </TransitionChild>
      </Dialog>
    </Transition>
  );
}
