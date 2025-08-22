// BasicModal.jsx
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";
import { Button } from "components/ui";

export function Basic({ isOpen, onCancel, onConfirm }) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden px-4 py-6 sm:px-5"
        onClose={onCancel} 
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
          <div className="absolute inset-0 bg-gray-900/50 transition-opacity dark:bg-black/40" />
        </TransitionChild>

        {/* Modal Panel */}
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <DialogPanel className="scrollbar-sm relative flex w-[450px] max-w-xl flex-col overflow-y-auto rounded-lg bg-white p-12 text-center transition-opacity duration-300 dark:bg-dark-700 sm:px-5">
            <XCircleIcon className="mx-auto inline size-20 shrink-0" />

            <div className="mt-4">
              <DialogTitle
                as="h3"
                className="text-xl font-semibold text-gray-800 dark:text-dark-100"
              >
                Close Ticket?
              </DialogTitle>

              <p className="mt-2 text-gray-600">
                Are you sure you want to close this ticket? This action cannot be undone.
              </p>

              {/* Buttons */}
              <div className="mt-6 flex justify-center gap-3">
                <Button onClick={onCancel} color="neutral" className="px-6">
                  Cancel
                </Button>
                <Button onClick={onConfirm} color="success" className="px-6">
                  OK
                </Button>
              </div>
            </div>
          </DialogPanel>
        </TransitionChild>
      </Dialog>
    </Transition>
  );
}
