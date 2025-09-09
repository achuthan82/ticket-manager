// Import Dependencies
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  TabGroup,
  TabPanel,
  TabPanels,
  Transition,
} from "@headlessui/react";
import PropTypes from "prop-types";
import {
  // ArchiveBoxXMarkIcon,
  Cog6ToothIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
// import clsx from "clsx";
import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router";
import moment from "moment";
// Local Imports
import { Avatar, AvatarDot, Badge, Button } from "components/ui";
import { useThemeContext } from "app/contexts/theme/context";
import AlarmIcon from "assets/dualicons/alarm.svg?react";
import GirlEmptyBox from "assets/illustrations/girl-empty-box.svg?react";
import { getNotification } from "utils/notificationService";

// ----------------------------------------------------------------------

const types = {
  1: {
    title: "Ticket Created",
    Icon: EnvelopeIcon,
    color: "primary",
  },
  2: {
    title: "Ticket Assigned",
    Icon: IoCheckmarkDoneOutline,
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
    Icon: ExclamationTriangleIcon,
    color: "info",
  },
};

// const fakeNotifications = [
//   {
//     id: 1,
//     title: "User Photo Changed",
//     description: "John Doe changed his avatar photo",
//     type: "log",
//     time: "2 hours ago",
//   },
//   {
//     id: 2,
//     title: "New user registered",
//     description: "Jane Doe has registered",
//     type: "message",
//     time: "2 hours ago",
//   },
//   {
//     id: 3,
//     title: "Security alert",
//     description: "New device login detected ",
//     type: "security",
//     time: "11 hours ago",
//   },
//   {
//     id: 4,
//     title: "Design ERP Completed",
//     description: "Design ERP completed",
//     type: "task",
//     time: "a day ago",
//   },
//   {
//     id: 5,
//     title: "Weekly Report",
//     description: "The weekly report was uploaded",
//     type: "log",
//     time: "2 days ago",
//   },
//   {
//     id: 6,
//     title: "Vercel Conf",
//     description: "Join to online Vercel conference",
//     type: "message",
//     time: "3 days ago",
//   },
//   {
//     id: 7,
//     title: "Images Added",
//     description: "Mores Clarke added new image gallery",
//     type: "log",
//     time: "5 days ago",
//   },
// ];
const sampleNotifications = [
  {
    id: 101,
    message: "New ticket assigned",
    ticket_id: 555,
    event_id: 2,
    created_at: "09-08-2025 20:12:34",
    viewed: false,
  },
  {
    id: 102,
    message: "Ticket updated",
    ticket_id: 556,
    event_id: 5,
    created_at: "09-07-2025 18:45:12",
    viewed: true,
  },
  {
    id: 103,
    message: "Ticket Created",
    ticket_id: 556,
    event_id: 1,
    created_at: "09-07-2025 18:45:12",
    viewed: true,
  },
  {
    id: 104,
    message: "Comment Added",
    ticket_id: 556,
    event_id: 3,
    created_at: "09-07-2025 18:45:12",
    viewed: true,
  },
  {
    id: 105,
    message: "Status Changed",
    ticket_id: 556,
    event_id: 4,
    created_at: "09-07-2025 18:45:12",
    viewed: true,
  },
];
const typesKey = Object.keys(types);

export function Notifications() {
  const [notifications, setNotifications] = useState(sampleNotifications);
  const [activeTab] = useState(0);

  const filteredNotifications = notifications.filter(
    (notification) => notification.type === Object.keys(types)[activeTab - 1],
  );

  // const removeNotification = (id) => {
  //   setNotifications((n) => n.filter((n) => n.id !== id));
  // };

  const clearNotifications = () => {
    if (activeTab === 0) {
      setNotifications([]);
    } else {
      setNotifications((n) =>
        n.filter((n) => n.type !== typesKey[activeTab - 1]),
      );
    }
  };
  const fetchNotifications = () => {
    getNotification(1, 5).then((response) => {
      if (response.success) {
        console.log("Messages:", response.data);
        if (response.data.data) {
          // setMessages(response.data.data);
        }
      } else {
        console.error("Error:", response.error);
      }
    });
  };
  useEffect(() => {
    fetchNotifications();
  }, []);
  return (
    <Popover className="relative flex">
      <PopoverButton
        as={Button}
        variant="flat"
        isIcon
        className="relative size-9 rounded-full"
      >
        <AlarmIcon className="dark:text-dark-100 size-6 text-gray-900" />
        {notifications.length > 0 && (
          <AvatarDot
            color="error"
            isPing
            className="top-0 ltr:right-0 rtl:left-0"
          />
        )}
      </PopoverButton>
      <Transition
        enter="transition ease-out"
        enterFrom="opacity-0 translate-y-2"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-2"
      >
        <PopoverPanel
          anchor={{ to: "bottom end", gap: 8 }}
          className="border-gray-150 shadow-soft dark:border-dark-800 dark:bg-dark-700 dark:shadow-soft-dark z-70 mx-4 flex  w-[calc(100vw-2rem)] bg-white flex-col rounded-lg border  sm:m-0 sm:w-80"
        >
          {({ close }) => (
            <div className="flex grow flex-col overflow-hidden">
              <div className="dark:bg-dark-800 rounded-t-lg bg-gray-100">
                <div className="flex items-center justify-between px-4 pt-2">
                  <div className="flex items-center gap-2">
                    <h3 className="dark:text-dark-100 font-medium text-gray-800">
                      Notifications
                    </h3>
                    {notifications.length > 0 && (
                      <Badge
                        color="primary"
                        className="h-5 rounded-full px-1.5"
                        variant="soft"
                      >
                        {notifications.length}
                      </Badge>
                    )}
                  </div>
                  <Button
                    component={Link}
                    to="/settings/notifications"
                    className="size-7 rounded-full ltr:-mr-1.5 rtl:-ml-1.5"
                    isIcon
                    variant="flat"
                    onClick={close}
                  >
                    <Cog6ToothIcon className="size-4.5" />
                  </Button>
                </div>
              </div>
              <TabGroup
                as={Fragment}
                selectedIndex={activeTab}
                // onChange={setActiveTab}
              >
                {(notifications.length > 0 && activeTab === 0) ||
                filteredNotifications.length > 0 ? (
                  <TabPanels as={Fragment}>
                    <TabPanel className= {`custom-scrollbar grow space-y-7 overflow-x-hidden overflow-y-auto p-4 outline-hidden`}>
                      {notifications.map((item) => (
                        <NotificationItem
                          key={item.id}
                          // remove={removeNotification}
                          data={item}
                        />
                      ))}
                    </TabPanel>
                    {/* {typesKey.map((key) => (
                      <TabPanel
                        key={key}
                        className="custom-scrollbar scrollbar-hide grow space-y-4 overflow-y-auto overflow-x-hidden p-4"
                      >
                        {filteredNotifications.map((item) => (
                          <NotificationItem
                            key={item.id}
                            remove={removeNotification}
                            data={item}
                          />
                        ))}
                      </TabPanel>
                    ))} */}
                  </TabPanels>
                ) : (
                  <Empty />
                )}
              </TabGroup>
              {((notifications.length > 0 && activeTab === 0) ||
                filteredNotifications.length > 0) && (
                <div className="dark:bg-dark-800 shrink-0 overflow-hidden rounded-b-lg bg-gray-100">
                  <Button
                    // variant="flat"
                    component={Link}
                    to="/notifications"
                    color="primary"
                    className="w-full rounded-t-none"
                    onClick={clearNotifications}
                  >
                    <span>View all notifications</span>
                  </Button>
                </div>
              )}
            </div>
          )}
        </PopoverPanel>
      </Transition>
    </Popover>
  );
}

function Empty() {
  const { primaryColorScheme: primary, darkColorScheme: dark } =
    useThemeContext();
  return (
    <div className="grid grow place-items-center text-center">
      <div className="">
        <GirlEmptyBox
          className="mx-auto w-40"
          style={{ "--primary": primary[500], "--dark": dark[500] }}
        />
        <div className="mt-6">
          <p>No new notifications yet</p>
        </div>
      </div>
    </div>
  );
}

function NotificationItem({ data }) {
  const Icon = types[data.event_id].Icon;
  return (
    <div className="group flex items-center justify-between gap-3">
      <div className="flex min-w-0 gap-3">
        <Avatar
          size={10}
          initialColor={types[data.event_id].color}
          classNames={{ display: "rounded-lg" }}
        >
          <Icon className="size-4.5" />
        </Avatar>
        <div className="min-w-0">
          <p className="dark:text-dark-100 -mt-0.5 truncate font-medium text-gray-800">
            {types[data.event_id].title}
          </p>
          <div className="mt-0.5 truncate text-xs">{data.message}</div>
          <div className="dark:text-dark-300 mt-1 truncate text-xs text-gray-400">
            {moment(data.created_at, "MM-DD-YYYY HH:mm:ss").fromNow()}
          </div>
        </div>
      </div>
      {/* <Button
        variant="flat"
        isIcon
        onClick={() => remove(data.id)}
        className="size-7 rounded-full opacity-0 group-hover:opacity-100 ltr:-mr-2 rtl:-ml-2"
      >
        <ArchiveBoxXMarkIcon className="size-4" />
      </Button> */}
    </div>
  );
}

NotificationItem.propTypes = {
  data: PropTypes.object,
  remove: PropTypes.func,
};
