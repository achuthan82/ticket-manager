import { 
  PencilIcon, 
  MagnifyingGlassIcon,
  UserPlusIcon,
  UserGroupIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon
} from '@heroicons/react/24/solid';
const UserList = () => {
    const users = []
    const randomColors = [
    "#0a5a78", "#5ab453", "#92c933", "#FF2ECF", "#E000AD", "#FFA71A", "#FF4F1A",
    "#384766", "#506877", "#3D4E70", "#4A4A4F", "#6D7EA1", "#70838F", "#B8008C", "#FF75DF"
  ];
  return (
    <div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className=" p-6 shieldnest-white-column" style={{ borderLeft: `5px solid ${randomColors[0]}` }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{userCounts?.active + userCounts?.inactive}</p>
                </div>
                <div className="w-12 h-12 shieldnest-bg1 rounded-full flex items-center justify-center">
                  <UserGroupIcon className="w-6 h-6 text-white" />
                </div>
              </div>
            </Card>

            <Card className=" p-6 shieldnest-white-column" style={{ borderLeft: `5px solid ${randomColors[1]}` }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Users</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{userCounts?.active}</p>
                </div>
                <div className="w-12 h-12 shieldnest-bg2 rounded-full flex items-center justify-center">
                  <CheckCircleIcon className="w-6 h-6 text-white" />
                </div>
              </div>
            </Card>

            <Card className="p-6 shieldnest-white-column" style={{ borderLeft: `5px solid oklch(57.7% 0.245 27.325)` }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Inactive Users</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{userCounts?.inactive}</p>
                </div>
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                  <ExclamationTriangleIcon className="w-6 h-6 text-white" />
                </div>
              </div>
            </Card>

            {/* <Card className="p-6 shieldnest-white-column" style={{ borderLeft: `5px solid ${randomColors[2]}` }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Agents</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{users.filter(u => u.role?.toLowerCase() === 'agent').length}</p>
                </div>
                <div className="w-12 h-12 shieldnest-bg3 rounded-full flex items-center justify-center">
                  <UserPlusIcon className="w-6 h-6 text-white" />
                </div>
              </div>
            </Card> */}
          </div>
    </div>
  )
}

export default UserList
