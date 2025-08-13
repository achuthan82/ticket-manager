// import React from 'react'

import {
  ClockIcon,
  // CheckCircleIcon,
  // UserGroupIcon,
  // ChatBubbleLeftRightIcon,
  PlusIcon,
  ArrowPathIcon,
  CheckIcon,
  ChatBubbleLeftIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

const RectangularCards = () => {
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {/* Card 1: New Tickets */}
        <div className="rounded-xl border border-neutral-300 bg-white p-6 shadow-sm">
          <div className="mt-3 flex items-center justify-between">
            <div>
              <p className="mb-1 text-base font-medium text-gray-500">
                New Tickets
              </p>
              <h3 className="text-3xl font-bold text-blue-600">5</h3>
            </div>

            {/* Blue Plus Icon with Light Blue Circular Border */}
            <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-blue-200 bg-blue-50">
              <PlusIcon className="h-7 w-7 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Card 2: Open Tickets */}
        <div className="rounded-xl border border-neutral-300 bg-white p-6 shadow-sm">
          <div className="mt-3 flex items-center justify-between">
            <div>
              <p className="mb-1 text-base font-medium text-gray-500">
                Open
              </p>
              <h3 className="text-3xl font-bold text-yellow-600">12</h3>
            </div>

            {/* Blue Plus Icon with Light Blue Circular Border */}
            <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-yellow-200 bg-yellow-50">
              <ClockIcon className="h-7 w-7 text-yellow-600" />
            </div>
          </div>
        </div>

        {/* Card 3: Resolved Today */}
         <div className="rounded-xl border border-neutral-300 bg-white p-6 shadow-sm">
          <div className="mt-3 flex items-center justify-between">
            <div>
              <p className="mb-1 text-base font-medium text-gray-500">
                Pending
              </p>
              <h3 className="text-3xl font-bold text-purple-600">8</h3>
            </div>

            {/* Blue Plus Icon with Light Blue Circular Border */}
            <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-purple-200 bg-purple-50">
              <ArrowPathIcon className="h-7 w-7 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Card 4: Avg Response Time */}
         <div className="rounded-xl border border-neutral-300 bg-white p-6 shadow-sm">
          <div className="mt-3 flex items-center justify-between">
            <div>
              <p className="mb-1 text-base font-medium text-gray-500">
                Resolved
              </p>
              <h3 className="text-3xl font-bold text-green-600">45</h3>
            </div>

            {/* Blue Plus Icon with Light Blue Circular Border */}
            <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-green-200 bg-green-50">
              <CheckIcon className="h-7 w-7 text-green-600" />
            </div>
          </div>
        </div>

        {/* Card 5: Support Agents */}
       <div className="rounded-xl border border-neutral-300 bg-white p-6 shadow-sm">
          <div className="mt-3 flex items-center justify-between">
            <div>
              <p className="mb-1 text-base font-medium text-gray-500">
                Avg Response
              </p>
              <h3 className="text-3xl font-bold text-indigo-900">2.4h</h3>
            </div>

            {/* Blue Plus Icon with Light Blue Circular Border */}
            <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-indigo-500 bg-indigo-100">
              <ChatBubbleLeftIcon className="h-7 w-7 text-indigo-900" />
            </div>
          </div>
        </div>

        {/* Card 6: Customer Satisfaction */}
         <div className="rounded-xl border border-neutral-300 bg-white p-6 shadow-sm">
          <div className="mt-3 flex items-center justify-between">
            <div>
              <p className="mb-1 text-base font-medium text-gray-500">
                Satisfaction
              </p>
              <h3 className="text-3xl font-bold text-green-600">94%</h3>
            </div>

            {/* Blue Plus Icon with Light Blue Circular Border */}
            <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-green-200 bg-green-50">
              <HeartIcon className="h-7 w-7 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Additional content will go here */}
      <div className="p-4">
        <p>More support ticket content will be added here...</p>
      </div>
    </div>
  );
};

export default RectangularCards;
