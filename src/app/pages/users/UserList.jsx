import {
  PencilIcon,
  MagnifyingGlassIcon,
  UserPlusIcon,
  UserGroupIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/solid";
const UserList = () => {
  const users = [];
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
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {userCounts?.active + userCounts?.inactive}
              </p>
            </div>
            <div className="shieldnest-bg1 flex h-12 w-12 items-center justify-center rounded-full">
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
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {userCounts?.active}
              </p>
            </div>
            <div className="shieldnest-bg2 flex h-12 w-12 items-center justify-center rounded-full">
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
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {userCounts?.inactive}
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600">
              <ExclamationTriangleIcon className="h-6 w-6 text-white" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default UserList;
