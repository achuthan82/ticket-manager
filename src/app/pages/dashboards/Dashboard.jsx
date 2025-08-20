
// Import Dependencies
import { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";
import { 
  DocumentTextIcon, 
  UsersIcon, 
  // ChatBubbleLeftRightIcon, 
  ClockIcon,
  // EyeIcon
} from '@heroicons/react/24/outline'

// ----------------------------------------------------------------------

const Dashboard = () => {
  const documentChartRef = useRef(null);
  const userChartRef = useRef(null);

  // Recent Documents Data
  // const recentDocuments = [
  //   {
  //     id: 1,
  //     name: "Contract_Amendment_2025.docx",
  //     version: "Version 3",
  //     type: "Legal",
  //     user: "Sarah Johnson",
  //     status: "In Progress",
  //     modified: "5 mins ago",
  //     typeColor: "bg-purple-100 text-purple-800",
  //     statusColor: "bg-yellow-100 text-yellow-800"
  //   },
  //   {
  //     id: 2,
  //     name: "The_Silent_Echo_Chapter_12.doc",
  //     version: "Version 8",
  //     type: "Manuscript",
  //     user: "Michael Chen",
  //     status: "Completed",
  //     modified: "2 hours ago",
  //     typeColor: "bg-pink-100 text-pink-800",
  //     statusColor: "bg-green-100 text-green-800"
  //   },
  //   {
  //     id: 3,
  //     name: "NDA_Template_v2.docx",
  //     version: "Version 1",
  //     type: "Legal",
  //     user: "Emma Davis",
  //     status: "Draft",
  //     modified: "5 hours ago",
  //     typeColor: "bg-purple-100 text-purple-800",
  //     statusColor: "bg-gray-100 text-gray-800"
  //   }
  // ];

  useEffect(() => {
    let documentChart = null;
    let userChart = null;

    // Document Activity Chart
    if (documentChartRef.current) {
      documentChart = new ApexCharts(documentChartRef.current, {
        chart: {
          type: 'line',
          height: 300,
          toolbar: {
            show: false
          },
          redrawOnWindowResize: true,
          redrawOnParentResize: true
        },
        series: [{
          name: 'Documents Created',
          data: [65, 78, 90, 85, 95, 88, 92],
          color: '#2A5A9D'
        }, {
          name: 'Documents Edited',
          data: [40, 55, 65, 60, 70, 58, 62],
          color: '#00B4D8'
        }],
        xaxis: {
          categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yaxis: {
          min: 0,
          max: 100
        },
        stroke: {
          curve: 'smooth',
          width: 3
        },
        grid: {
          borderColor: '#E5E7EB',
          strokeDashArray: 4
        },
        legend: {
          position: 'top',
          horizontalAlign: 'left'
        }
      });
      documentChart.render();
    }

    // User Activity Chart
    if (userChartRef.current) {
      userChart = new ApexCharts(userChartRef.current, {
        chart: {
          type: 'donut',
          height: 300,
          redrawOnWindowResize: true,
          redrawOnParentResize: true
        },
        series: [65, 25, 10],
        labels: ['Active', 'Inactive', 'New'],
        colors: ['#2A5A9D', '#00B4D8', '#4A7EC3'],
        legend: {
          position: 'bottom'
        },
        plotOptions: {
          pie: {
            donut: {
              size: '60%'
            }
          }
        }
      });
      userChart.render();
    }

    // Cleanup function to destroy charts when component unmounts
    return () => {
      if (documentChart) {
        documentChart.destroy();
      }
      if (userChart) {
        userChart.destroy();
      }
    };
  }, []);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Stats Grid */}
      <div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-6 sm:gap-6">
        {/* Total Documents */}
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-neutral-300">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="bg-[#D6E5F5] text-[#2A5A9D] w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center">
              <DocumentTextIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <span className="text-xs sm:text-sm text-[#28A745] bg-[#D1E7DD] px-2 py-1 rounded">+12%</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-[#2A5A9D]">1,284</h3>
          <p className="text-neutral-500 text-xs sm:text-sm">Total Documents</p>
        </div>
        
        {/* Active Users */}
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-neutral-300">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="bg-[#D6F4FA] text-[#00B4D8] w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center">
              <UsersIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <span className="text-xs sm:text-sm text-[#28A745] bg-[#D1E7DD] px-2 py-1 rounded">+5%</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-[#2A5A9D]">324</h3>
          <p className="text-neutral-500 text-xs sm:text-sm">Active Users</p>
        </div>
        
        {/* Active Prompts */}
        {/* <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-neutral-300">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="bg-[#D6E5F5] text-[#2A5A9D] w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center">
              <ChatBubbleLeftRightIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <span className="text-xs sm:text-sm text-[#FFC107] bg-[#FFF3CD] px-2 py-1 rounded">+2%</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-[#2A5A9D]">42</h3>
          <p className="text-neutral-500 text-xs sm:text-sm">Active Prompts</p>
        </div> */}
        
        {/* Processing Time */}
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-neutral-300">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="bg-[#D6F4FA] text-[#00B4D8] w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center">
              <ClockIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <span className="text-xs sm:text-sm text-[#28A745] bg-[#D1E7DD] px-2 py-1 rounded">-8%</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-[#2A5A9D]">2.4s</h3>
          <p className="text-neutral-500 text-xs sm:text-sm">Avg. Processing Time</p>
        </div>
      </div>
      
      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        {/* Document Activity Chart */}
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-neutral-300">
          <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Document Activity</h3>
          <div ref={documentChartRef} className="w-full"></div>
        </div>
        
        {/* User Activity Chart */}
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-neutral-300">
          <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">User Activity</h3>
          <div ref={userChartRef} className="w-full"></div>
        </div>
      </div>

      {/* Recent Documents Table */}
      {/* <div className="bg-white rounded-xl shadow-sm border border-neutral-300">
        <div className="p-4 sm:p-6 border-b border-neutral-200">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-semibold text-[#2A5A9D]">Recent Documents</h3>
            <a href="#" className="text-[#2A5A9D] hover:text-[#1A3A6C] text-sm font-medium transition-colors">
              View All
            </a>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full min-w-full">
            <thead className="bg-neutral-50">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-neutral-700 uppercase tracking-wider">
                  Document
                </th>
                <th className="hidden md:table-cell px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-neutral-700 uppercase tracking-wider">
                  Type
                </th>
                <th className="hidden lg:table-cell px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-neutral-700 uppercase tracking-wider">
                  User
                </th>
                <th className="hidden md:table-cell px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-neutral-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="hidden lg:table-cell px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-neutral-700 uppercase tracking-wider">
                  Modified
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-neutral-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              {recentDocuments.map((doc) => (
                <tr key={doc.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <DocumentTextIcon className="w-8 h-8 text-[#2A5A9D]" />
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-neutral-900">
                          {doc.name}
                        </div>
                        <div className="text-sm text-neutral-500">
                          {doc.version}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="hidden md:table-cell px-4 sm:px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${doc.typeColor}`}>
                      {doc.type}
                    </span>
                  </td>
                  <td className="hidden lg:table-cell px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                    {doc.user}
                  </td>
                  <td className="hidden md:table-cell px-4 sm:px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${doc.statusColor}`}>
                      {doc.status}
                    </span>
                  </td>
                  <td className="hidden lg:table-cell px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                    {doc.modified}
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-[#2A5A9D] hover:text-[#1A3A6C] transition-colors">
                      <EyeIcon className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div> */}
    </div>
  );
};

export default Dashboard;