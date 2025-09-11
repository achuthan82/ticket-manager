import { Fragment, useEffect, useState } from "react";
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
import { useForm, Controller } from "react-hook-form";
import { createTicket, getCategories } from "utils/supportUserService";
import { toast } from "sonner";
import { useNotificationContext } from "app/contexts/notification/context";

export default function NewTicketModal({ open, onClose, prefillCategory }) {
  const [files, { remove, append }] = useListState();
  const [attachment, setAttachment] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const { callApi, setCallApi } = useNotificationContext();

  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      category: "",
      priority: "low",
      subject: "",
      description: "",
    },
  });

  // 🔹 Fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      const result = await getCategories();
      if (result.success) {
        const formatted = result.data.map((c) => ({
          label: c.name,
          value: c.id, // ✅ backend category ID
        }));
        setCategories([{ label: "Select a category", value: "" }, ...formatted]);
      } else {
        toast.error(result.error || "Failed to load categories");
      }
      setLoadingCategories(false);
    };
    fetchCategories();
  }, []);

  // 🔹 Pre-fill category when HelpSection clicks
  useEffect(() => {
    if (prefillCategory) {
      setValue("category", prefillCategory, { shouldValidate: true });
    }
  }, [prefillCategory, setValue]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (files) => {
      append(...files);
      setAttachment(files[0]);
    },
    accept: { "image/png": [".png", ".jpeg", ".jpg"] },
  });

  const clearFiles = () => {
    for (let i = files.length - 1; i >= 0; i--) {
      remove(i);
    }
  };

  const submitForm = async (data) => {
    const payload = {
      ...data,
      attachment,
    };

    const result = await createTicket(payload);

    if (result?.data?.status === 201) {
      toast.success("Ticket created successfully!");
      window.dispatchEvent(new Event("ticketCreated"));

      reset();
      setAttachment(null);
      clearFiles();
      setCallApi(!callApi);
      onClose?.();
    } else {
      toast.error(
        `Failed to create ticket: ${result?.error || "Unknown error"}`
      );
    }
  };

  const handleClose = () => {
    reset();
    setAttachment(null);
    clearFiles();
    onClose?.();
  };

  const PriorityCard = ({ value, title, subtitle, colorClasses, selected }) => (
    <button
      type="button"
      onClick={() => setValue("priority", value, { shouldValidate: true })}
      className={`rounded-lg p-3 cursor-pointer text-center border-l-4 ${selected === value
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
        onClose={handleClose}
      >
        {/* Backdrop */}
        <TransitionChild as={Fragment}>
          <div className="fixed inset-0 bg-gray-900/50 pointer-events-none" />
        </TransitionChild>

        {/* Modal */}
        <TransitionChild as={Fragment}>
          <DialogPanel className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-lg bg-white">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-3 flex-shrink-0">
              <DialogTitle className="text-lg font-semibold text-neutral-900">
                Create New Support Ticket
              </DialogTitle>
              <button
                onClick={handleClose}
                className="p-1 text-neutral-500 hover:text-neutral-700"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto">
              <form onSubmit={handleSubmit(submitForm)} className="px-5 py-4">
                {/* Category */}
                <div className="mb-4">
                  <Controller
                    name="category"
                    control={control}
                    rules={{ required: "Category is required" }}
                    render={({ field }) => (
                      <Select
                        label="Category"
                        {...field}
                        data={categories}
                        className="w-full"
                        disabled={loadingCategories}
                      />
                    )}
                  />
                  {errors.category && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.category.message}
                    </p>
                  )}
                </div>

                {/* Priority */}
                <div className="mb-4">
                  <div className="mb-2 text-sm font-medium text-neutral-500">
                    Priority
                  </div>
                  <Controller
                    name="priority"
                    control={control}
                    rules={{ required: "Priority is required" }}
                    render={({ field }) => (
                      <div className="grid grid-cols-3 gap-3">
                        <PriorityCard
                          value="low"
                          title="Low"
                          subtitle="General questions"
                          selected={field.value}
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
                          selected={field.value}
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
                          selected={field.value}
                          colorClasses={{
                            text: "text-red-700",
                            activeBorder: "border-red-400",
                            activeBg: "bg-red-50",
                          }}
                        />
                      </div>
                    )}
                  />
                </div>

                {/* Subject */}
                <div className="mb-4">
                  <Controller
                    name="subject"
                    control={control}
                    rules={{ required: "Subject is required" }}
                    render={({ field }) => (
                      <Input
                        label="Subject"
                        placeholder="Brief description of your issue"
                        {...field}
                      />
                    )}
                  />
                </div>

                {/* Description */}
                <div className="mb-4">
                  <Controller
                    name="description"
                    control={control}
                    rules={{ required: "Description is required" }}
                    render={({ field }) => (
                      <Textarea
                        label="Description"
                        rows={6}
                        placeholder="Please provide detailed information..."
                        {...field}
                      />
                    )}
                  />
                </div>

                {/* Upload */}
                <div className="mt-8">
                  <div className="mb-2 text-sm font-medium text-neutral-500">
                    Attachments (optional)
                  </div>
                  <Upload inputProps={{ ...getInputProps() }} {...getRootProps()}>
                    {({ ...props }) => (
                      <Button
                        {...props}
                        unstyled
                        className={clsx(
                          "mt-3 w-full shrink-0 flex-col rounded-lg border-2 border-dashed py-4",
                          isDragActive
                            ? "border-primary-600"
                            : "border-gray-300"
                        )}
                      >
                        <ArrowUpTrayIcon className="size-8 text-gray-500" />
                        <span className="pointer-events-none mt-2 text-gray-600">
                          <span className="text-primary-600">Browse</span>
                          <span> or drop your files here</span>
                          <p className="mt-1 text-xs">
                            You can upload .png, .jpg and .jpeg file formats.
                          </p>
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
              </form>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 px-5 py-3 flex-shrink-0">
              <Button
                variant="outlined"
                color="primary"
                onClick={handleClose}
                type="button"
              >
                Cancel
              </Button>
              <Button color="primary" onClick={handleSubmit(submitForm)}>
                Submit
              </Button>
            </div>
          </DialogPanel>
        </TransitionChild>
      </Dialog>
    </Transition>
  );
}
