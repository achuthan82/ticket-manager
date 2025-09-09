import { useState, useEffect } from "react";
import { getNotification } from "utils/notificationService";
import { toast } from "sonner";
import {
  CheckCircleIcon,
  // ArchiveBoxXMarkIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
  EyeIcon,
  PencilSquareIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { Avatar, Button } from "components/ui";
import moment from "moment";
import clsx from "clsx";

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
const NotificationList = () => {
  const types = {
    1: {
      title: "Ticket Created",
      Icon: PlusCircleIcon,
      color: "primary",
    },
    2: {
      title: "Ticket Assigned",
      Icon: CheckCircleIcon,
      color: "success",
    },
    3: {
      title: "Comment Added",
      Icon: DocumentTextIcon,
      color: "neutral",
    },
    4: {
      title: "Status Changed",
      Icon: ExclamationTriangleIcon,
      color: "error",
    },
    5: {
      title: "Ticket Edited",
      Icon: PencilSquareIcon,
      color: "info",
    },
  };
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const fetchNotifications = (viewed) => {
    setLoading(true);
    getNotification(1, perPage, viewed)
      .then((response) => {
        if (response.success) {
          console.log("pagination", response.data.pagination);
          if (response.data.data) {
            setNotifications(response.data.data);
            if (response.data.pagination) {
              setTotalPages(response.data.pagination.total);
            }
          }
        } else {
          toast.error("Failed to fetch notifications");
          setNotifications([]);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchNotifications(selectedIndex);
  }, [selectedIndex]);
  const NotificationTable = ({ readOnly }) => {
    return (
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-primary-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
              Sl No
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
              Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
              Message
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
              Created
            </th>
            {!readOnly && (
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                Mark as Viewed
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="4" className="px-6 py-4 text-center">
                <div className="flex justify-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
                </div>
              </td>
            </tr>
          ) : notifications.length > 0 ? (
            notifications.map((notification, index) => {
              const { event, message } = notification;
              const typeInfo = types[event] || {};
              const TypeIcon = typeInfo.Icon;

              return (
                <tr
                  key={notification.id || index}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-3">
                      <Avatar size={10} initialColor={typeInfo.color}>
                        {TypeIcon && <TypeIcon className="size-6" />}
                      </Avatar>
                      <span className="font-medium">{typeInfo.title}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2">{message}</td>
                  <td className="px-4 py-2">
                    <div className="">
                      {moment(
                        notification.created_at,
                        "MM-DD-YYYY HH:mm:ss",
                      ).fromNow()}
                    </div>
                  </td>
                  {!readOnly && (
                    <td className="px-4 py-2">
                      <button
                        className="rounded-full p-2 hover:bg-gray-200"
                        onClick={() =>
                          console.log("Mark viewed", notification.id)
                        }
                      >
                        <EyeIcon className="size-5 text-gray-600" />
                      </button>
                    </td>
                  )}
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={4} className="px-4 py-6 text-center text-gray-500">
                No notifications found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
  };
  return (
    <div className="p-4">
      <TabGroup selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        {/* Tab Headers */}
        <TabList className="hide-scrollbar flex overflow-x-auto">
          <Tab
            className={({ selected }) =>
              clsx(
                "shrink-0 border-b-2 px-3 py-2 font-medium whitespace-nowrap",
                selected
                  ? "border-primary-600 text-primary-600 dark:border-primary-500 dark:text-primary-400"
                  : "dark:hover:text-dark-100 dark:focus:text-dark-100 border-transparent hover:text-gray-800 focus:text-gray-800",
              )
            }
            as={Button}
            unstyled
          >
            Viewed Notifications
          </Tab>{" "}
          <Tab
            className={({ selected }) =>
              clsx(
                "shrink-0 border-b-2 px-3 py-2 font-medium whitespace-nowrap",
                selected
                  ? "border-primary-600 text-primary-600 dark:border-primary-500 dark:text-primary-400"
                  : "dark:hover:text-dark-100 dark:focus:text-dark-100 border-transparent hover:text-gray-800 focus:text-gray-800",
              )
            }
            as={Button}
            unstyled
          >
            New Notifications
          </Tab>
        </TabList>

        {/* Shared Content */}
        <TabPanels className="mt-4">
          <TabPanel>
            <NotificationTable readOnly={true} />
          </TabPanel>

          <TabPanel>
            <NotificationTable readOnly={false} />
          </TabPanel>
        </TabPanels>
      </TabGroup>
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            className="rounded-md border px-3 py-1 text-sm disabled:opacity-50"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Prev
          </button>
          <span className="text-sm text-gray-600">
            Page {page} of {totalPages}
          </span>
          <button
            className="rounded-md border px-3 py-1 text-sm disabled:opacity-50"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationList;
