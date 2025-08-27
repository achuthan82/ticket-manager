import {
  PencilIcon,
  MagnifyingGlassIcon,
  UserGroupIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/solid";
import { Card } from "components/ui/card";
import { Spinner } from "components/ui";
import { useEffect, useState } from "react";
import { getUsers } from "utils/usersService";
import { toast } from "sonner";
const UserList = () => {
  const [paginatedData, setPaginatedData] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  // const users = [
  //   {
  //     agency_name: "Mamare Agency",
  //     agents: [
  //       {
  //         category: 1,
  //         id: 1123,
  //         source: 1,
  //       },
  //     ],
  //     avatar: null,
  //     created_at: "08-13-2025 10:41:37",
  //     email: "smith.mamre@gmail.com",
  //     id: "ca1e9c91-4a63-431d-a6f5-b3dd8c49138e",
  //     is_active: true,
  //     is_invited: true,
  //     modified_at: "08-13-2025 10:41:38",
  //     name: "Smith",
  //     phone: "2323213232",
  //     registered: false,
  //     role_id: 1,
  //   },
  //   {
  //     agency_name: "Abacies Test",
  //     agents: [
  //       {
  //         category: 1,
  //         id: 1122,
  //         source: 1,
  //       },
  //     ],
  //     avatar: null,
  //     created_at: "08-12-2025 10:35:55",
  //     email: "sma61513@jioso.com",
  //     id: "7e6c7b1e-3c22-4260-a8d2-3397c2f60f78",
  //     is_active: true,
  //     is_invited: true,
  //     modified_at: "08-12-2025 10:35:56",
  //     name: "test approve",
  //     phone: "9447615376",
  //     registered: false,
  //     role_id: 2,
  //   },
  //   {
  //     agency_name: "Abacies Test",
  //     agents: [
  //       {
  //         category: 1,
  //         id: 1121,
  //         source: 1,
  //       },
  //     ],
  //     avatar: null,
  //     created_at: "08-12-2025 10:34:42",
  //     email: "hvf46991@toaik.com",
  //     id: "ca816e2a-9122-4f4d-9252-b4a27203418c",
  //     is_active: true,
  //     is_invited: true,
  //     modified_at: "08-12-2025 10:34:43",
  //     name: "A test 12",
  //     phone: "8921286745",
  //     registered: false,
  //     role_id: 2,
  //   },
  //   {
  //     agency_name: "Abacies Test",
  //     agents: [
  //       {
  //         category: 1,
  //         id: 1120,
  //         source: 1,
  //       },
  //     ],
  //     avatar: null,
  //     created_at: "08-12-2025 10:31:43",
  //     email: "thv23200@toaik.com",
  //     id: "3aaa2297-8d37-41a9-a1c0-fa694727f1cb",
  //     is_active: true,
  //     is_invited: true,
  //     modified_at: "08-12-2025 10:31:44",
  //     name: "Achuthan 3",
  //     phone: "9448721567",
  //     registered: false,
  //     role_id: 2,
  //   },
  //   {
  //     agency_name: "Agency Test",
  //     agents: [
  //       {
  //         category: 1,
  //         id: 1119,
  //         source: 1,
  //       },
  //     ],
  //     avatar: null,
  //     created_at: "08-11-2025 17:46:58",
  //     email: "ben.binu@abacies.in",
  //     id: "73ba57e6-869b-4132-9067-c37234f7a4e4",
  //     is_active: true,
  //     is_invited: true,
  //     modified_at: "08-11-2025 17:46:59",
  //     name: "Ben",
  //     phone: "5943209998",
  //     registered: false,
  //     role_id: 1,
  //   },
  //   {
  //     agency_name: "Abacies test",
  //     agents: [
  //       {
  //         category: 1,
  //         id: 1118,
  //         source: 1,
  //       },
  //     ],
  //     avatar: null,
  //     created_at: "08-11-2025 17:43:32",
  //     email: "abel.thomas@abacies.in",
  //     id: "76d1d55f-f21f-47bd-8099-e6719848bfb1",
  //     is_active: true,
  //     is_invited: true,
  //     modified_at: "08-11-2025 17:43:32",
  //     name: "Abel",
  //     phone: "8941209998",
  //     registered: false,
  //     role_id: 1,
  //   },
  //   {
  //     agency_name: "Abacies test",
  //     agents: [
  //       {
  //         category: 1,
  //         id: 1117,
  //         source: 1,
  //       },
  //     ],
  //     avatar: null,
  //     created_at: "08-11-2025 10:16:39",
  //     email: "achuthan@abacies.in",
  //     id: "38212afc-8949-4c70-b2ca-020ed82b66e5",
  //     is_active: true,
  //     is_invited: true,
  //     modified_at: "08-11-2025 10:16:40",
  //     name: "Achuthan",
  //     phone: "8947209998",
  //     registered: false,
  //     role_id: 1,
  //   },
  //   {
  //     agency_name: "Abacies",
  //     agents: [
  //       {
  //         category: 1,
  //         id: 1019,
  //         source: 1,
  //       },
  //     ],
  //     avatar: null,
  //     created_at: "05-23-2025 12:35:24",
  //     email: "arun_n_a@abacies.in",
  //     id: "1ad56bc3-bb32-41de-9e80-6055b4253dc5",
  //     is_active: true,
  //     is_invited: true,
  //     modified_at: "08-07-2025 18:08:42",
  //     name: "Arun N A",
  //     phone: "9098898989",
  //     registered: true,
  //     role_id: 1,
  //   },
  //   {
  //     agency_name: "Abacies",
  //     agents: [
  //       {
  //         category: 1,
  //         id: 1002,
  //         source: 1,
  //       },
  //     ],
  //     avatar: null,
  //     created_at: "05-21-2025 13:28:45",
  //     email: "smijith@abacies.in",
  //     id: "28659ed0-c500-47c5-9940-138a5df89aa5",
  //     is_active: true,
  //     is_invited: true,
  //     modified_at: "07-29-2025 18:36:27",
  //     name: "Smijith C",
  //     phone: "9090909099",
  //     registered: true,
  //     role_id: 1,
  //   },
  //   {
  //     agency_name: "Abacies Testing ed",
  //     agents: [
  //       {
  //         category: 1,
  //         id: 10215,
  //         source: 1,
  //       },
  //     ],
  //     avatar: null,
  //     created_at: "05-23-2025 14:22:46",
  //     email: "amalu@abacies.in",
  //     id: "bc23d225-ff99-4bf4-9ad8-7a5c3fb58abe",
  //     is_active: true,
  //     is_invited: true,
  //     modified_at: "07-28-2025 12:35:33",
  //     name: "Amalu george",
  //     phone: "7744042964",
  //     registered: true,
  //     role_id: 1,
  //   },
  // ];
  const inviteLoadingId = "";
  const randomColors = [
    "#0a5a78",
    "#5ab453",
    "#92c933",
    "#FF2ECF",
    "#E000AD",
    "#FFA71A",
    "#FF4F1A",
    "#384766",
    "#506877",
    "#3D4E70",
    "#4A4A4F",
    "#6D7EA1",
    "#70838F",
    "#B8008C",
    "#FF75DF",
  ];
  const statusLoadingId = "";
  const getStatusBadge = (status) => {
    const statusCheck =
      status.is_active === true && status.registered === true
        ? 1
        : status.is_active === false
          ? 2
          : status.registered === false
            ? 3
            : 2;
    const statusClasses = {
      1: { name: "active", color: "bg-green-600 text-white" },
      2: { name: "inactive", color: "bg-red-600 text-white" },
      3: { name: "pending", color: "bg-yellow-600 text-white" },
      // 4: {name: 'banned', color: 'bg-gray-600 text-white'}
    };

    return (
      <span
        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusClasses[statusCheck]?.color || "bg-gray-100 text-gray-800"}`}
      >
        {statusClasses[statusCheck]?.name?.charAt(0).toUpperCase() +
          statusClasses[statusCheck]?.name?.slice(1) || ""}
      </span>
    );
  };

  const getRoleBadge = (role) => {
    const u_data = {
      1: { role: "admin", color: "bg-purple-100 text-purple-800" },
      2: { role: "agent", color: "bg-blue-100 text-blue-800" },
      3: { role: "manager", color: "bg-gray-100 text-gray-800" },
    };

    return (
      <span
        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${u_data[role]?.color || "bg-gray-100 text-gray-800"}`}
      >
        {u_data[role]?.role?.charAt(0).toUpperCase() +
          u_data[role]?.role?.slice(1) || ""}
      </span>
    );
  };
  const fetchUserList = (page, per_page) => {
    setLoading(true);
    getUsers({ page, per_page })
      .then((response) => {
        if (response?.success) {
          setUsers(response.data.data);
          setPaginatedData(response.data.pagination);
        } else {
          setUsers([]);
          setPaginatedData([]);
          // toast.error("Failed to fetch user details.");
        }
      })
      .catch(() => {
        setUsers([]);
        setPaginatedData([]);
        toast.error("Failed to fetch user list");
      }).finally(() => {
        setLoading(false)
      })
  };
  useEffect(() => {
    console.log(paginatedData);
    fetchUserList(1, 10);
  }, []);
  return (
    <div>
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card
          className="shieldnest-white-column p-6"
          style={{ borderLeft: `5px solid ${randomColors[0]}` }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">12</p>
            </div>
            <div
              className="flex h-12 w-12 items-center justify-center rounded-full"
              style={{ backgroundColor: randomColors[0] }}
            >
              <UserGroupIcon className="h-6 w-6 text-white" />
            </div>
          </div>
        </Card>

        <Card
          className="shieldnest-white-column p-6"
          style={{ borderLeft: `5px solid ${randomColors[1]}` }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Users</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">8</p>
            </div>
            <div
              className="flex h-12 w-12 items-center justify-center rounded-full"
              style={{ backgroundColor: randomColors[1] }}
            >
              <CheckCircleIcon className="h-6 w-6 text-white" />
            </div>
          </div>
        </Card>

        <Card
          className="shieldnest-white-column p-6"
          style={{ borderLeft: `5px solid oklch(57.7% 0.245 27.325)` }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Inactive Users
              </p>
              <p className="mt-2 text-3xl font-bold text-gray-900">4</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600">
              <ExclamationTriangleIcon className="h-6 w-6 text-white" />
            </div>
          </div>
        </Card>
      </div>
      <Card className="mb-6 bg-white p-6">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
            <input
              type="text"
              placeholder="Search users by name"
              //   value={searchTerm}
              //   onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-gray-300 py-2 pr-4 pl-10 focus:border-[var(--color-atoll)] focus:ring-2 focus:ring-[var(--color-atoll)] focus:outline-none"
            />
          </div>

          <div className="sm:w-48">
            <select
              //   value={selectedRole}
              //   onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-[var(--color-atoll)] focus:ring-2 focus:ring-[var(--color-atoll)] focus:outline-none"
            >
              <option value="0">All Roles</option>
              <option value="1">Admin</option>
              {/* <option value="manager">Manager</option> */}
              <option value="2">Agent</option>
            </select>
          </div>

          <div className="sm:w-48">
            <select
              //   value={selectedStatus}
              //   onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-[var(--color-atoll)] focus:ring-2 focus:ring-[var(--color-atoll)] focus:outline-none"
            >
              <option value="all">All Status</option>
              <option value="1">Active</option>
              <option value="0">Inactive</option>
              <option value="3">Pending</option>
              {/* <option value="suspended">Suspended</option>
                  <option value="banned">Banned</option> */}
            </select>
          </div>
        </div>
      </Card>
      <Card className="shieldnest-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Role & Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center">
                      <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-gray-900"></div>
                      <span className="ml-2">Loading users...</span>
                    </div>
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {(() => {
                          const color =
                            randomColors[
                              users.indexOf(user) % randomColors.length
                            ];
                          return (
                            <div
                              className="flex h-10 w-10 items-center justify-center rounded-full"
                              style={{ backgroundColor: color }}
                            >
                              <span className="text-sm font-medium text-white">
                                {user.name
                                  ?.split(" ")
                                  .map((n) => n[0])
                                  .join("")
                                  .toUpperCase() || "U"}
                              </span>
                            </div>
                          );
                        })()}
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.name}
                          </div>
                          {/* <div className="text-sm text-gray-500">ID: {user.id}</div> */}
                          <div className="text-sm text-gray-900">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {user.phone || "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col space-y-1">
                        {getRoleBadge(user.role_id)}
                        {getStatusBadge(user)}
                      </div>
                    </td>
                    {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.territory || 'Not assigned'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.lastLogin || user.last_login || 'Never'}
                        </td> */}
                    <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                      <div className="flex flex-col space-y-1">
                        <button
                          //   onClick={() => handleEdit(user)}
                          className="flex items-center space-x-1 text-xs text-[var(--color-atoll)] hover:text-[var(--color-atoll)]/80"
                        >
                          <PencilIcon className="h-3 w-3" />
                          <span>Edit</span>
                        </button>
                        {!user.registered && (
                          <button
                            //   onClick={() => handleInvite(user)}
                            className="flex items-center space-x-1 text-xs text-[var(--color-atoll)] hover:text-[var(--color-atoll)]/80"
                          >
                            {inviteLoadingId !== user.id ? (
                              <>
                                <EnvelopeIcon className="h-3 w-3" />
                                <span>Invite Again</span>
                              </>
                            ) : (
                              <Spinner />
                            )}
                          </button>
                        )}

                        {/* Active/Inactive buttons - only show for registered users */}
                        {user.registered && (
                          <>
                            {user.is_active ? (
                              <button
                                // onClick={() => handleStatusChange(user, 'inactive')}
                                disabled={statusLoadingId === user.id}
                                className="flex items-center space-x-1 text-xs text-red-600 hover:text-red-800 disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                {statusLoadingId === user.id ? (
                                  <Spinner />
                                ) : (
                                  <>
                                    <EyeSlashIcon className="h-3 w-3" />
                                    <span>Deactivate</span>
                                  </>
                                )}
                              </button>
                            ) : (
                              <button
                                // onClick={() => handleStatusChange(user, 'active')}
                                disabled={statusLoadingId === user.id}
                                className="flex items-center space-x-1 text-xs text-green-600 hover:text-green-800 disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                {statusLoadingId === user.id ? (
                                  <Spinner />
                                ) : (
                                  <>
                                    <EyeIcon className="h-3 w-3" />
                                    <span>Activate</span>
                                  </>
                                )}
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default UserList;
