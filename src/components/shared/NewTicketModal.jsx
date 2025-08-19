import { Fragment, useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { ArrowUpTrayIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Button, Input, Select, Textarea, Upload } from "components/ui";
import { useListState } from "hooks";
import clsx from "clsx";
import { FileItem } from "components/shared/form/FileItem";
import { useDropzone } from "react-dropzone";



export default function NewTicketModal({ open, onClose, onSubmit }) {

  const [files, { remove, append }] = useListState();

  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("medium");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [attachment, setAttachment] = useState(null);


  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (files) => {
      append(...files);
      setAttachment(files[0]); 
    },
    accept: { "image/png": [".png", ".jpeg", ".jpg"] },
  });

  const categories = [
    { label: "Select a category", value: "" },
    { label: "Billing & Payments", value: "billing" },
    { label: "Leads & Territories", value: "leads" },
    { label: "Technical Support", value: "technical" },
    { label: "Feature Request", value: "feature" },
    { label: "General Enquiry", value: "general" },
  ]

  const handleSubmit = (e) => {
    e?.preventDefault?.(); 
    
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
      className={`priority-low rounded-lg p-3 cursor-pointer text-center border-l-4 ${priority === value
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
        className="fixed inset-0 overflow-y-auto z-50"
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
          <div className="fixed inset-0 bg-gray-900/50 pointer-events-none" />
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
          <DialogPanel className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-lg bg-white">
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
                  
                </div>

                <div className="mb-4">
                  <div className="mb-2 text-sm font-medium text-neutral-500">
                    Priority
                  </div>
                  <div className="grid grid-cols-3 gap-3">
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
                  
                </div>

                <div className="mb-4">
                  <Textarea
                    label="Description"
                    rows={6}
                    placeholder="Please provide detailed information about your issue..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  
                </div>
                
                {/* Uplaod Area */}
                <div className="mt-8">
                  <div className="mb-2 text-sm font-medium text-neutral-500">
                    Attachments (optional)
                  </div>
                  <div>
                    
                    <Upload inputProps={{ ...getInputProps() }} {...getRootProps()}>
                      {({ ...props }) => (
                        <Button
                          {...props}
                          unstyled
                          className={clsx(
                            "mt-3 w-full shrink-0 flex-col rounded-lg border-2 border-dashed py-4",
                            isDragActive
                              ? "border-primary-600 dark:border-primary-500"
                              : "border-gray-300 dark:border-dark-450"
                          )}
                        >
                          <ArrowUpTrayIcon className="size-8 text-gray-500" />
                          <span
                            className={clsx(
                              "pointer-events-none mt-2",
                              isDragActive
                                ? "text-primary-600 dark:text-primary-400"
                                : "text-gray-600 dark:text-dark-200"
                            )}
                          >
                            <span className="text-primary-600 dark:text-primary-400">
                              Browse
                            </span>
                            <span> or drop your files here</span>
                            <span><p className="mt-1 text-xs">
                              You can upload .png, .jpg and .jpeg file formats.
                            </p></span>
                          </span>
                        </Button>
                      )}
                    </Upload>
                    <div className="mt-4 flex flex-col space-y-4">
                      {files.map((file, index) => (
                        <FileItem
                          handleRemove={() => remove(index)}
                          file={file}
                          key={index}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </form>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 px-5 py-3 flex-shrink-0">
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
