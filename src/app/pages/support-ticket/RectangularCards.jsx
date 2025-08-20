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
import ChatTemplate from "./ChatTemplate";
// import { useState } from "react";

const RectangularCards = () => {
  
  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3 lg:grid-cols-6">
        {/* Card 1: New Tickets */}
        <div className="rounded-md border border-neutral-300 bg-white p-3 shadow-sm">
          <div className="mt-1 flex items-center justify-between">
            <div>
              <p className="mb-1 text-xs font-medium text-gray-500">
                New Tickets
              </p>
              <h3 className="text-2xl font-bold text-blue-600">5</h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-blue-200 bg-blue-50">
              <PlusIcon className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Card 2: Open */}
        <div className="rounded-md border border-neutral-300 bg-white p-3 shadow-sm">
          <div className="mt-1 flex items-center justify-between">
            <div>
              <p className="mb-1 text-xs font-medium text-gray-500">Open</p>
              <h3 className="text-2xl font-bold text-yellow-600">12</h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-yellow-200 bg-yellow-50">
              <ClockIcon className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        {/* Card 3: Pending */}
        <div className="rounded-md border border-neutral-300 bg-white p-3 shadow-sm">
          <div className="mt-1 flex items-center justify-between">
            <div>
              <p className="mb-1 text-xs font-medium text-gray-500">Pending</p>
              <h3 className="text-2xl font-bold text-purple-600">8</h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-purple-200 bg-purple-50">
              <ArrowPathIcon className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Card 4: Resolved */}
        <div className="rounded-md border border-neutral-300 bg-white p-3 shadow-sm">
          <div className="mt-1 flex items-center justify-between">
            <div>
              <p className="mb-1 text-xs font-medium text-gray-500">Resolved</p>
              <h3 className="text-2xl font-bold text-green-600">45</h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-green-200 bg-green-50">
              <CheckIcon className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        {/* Card 5: Avg Response */}
        <div className="rounded-md border border-neutral-300 bg-white p-3 shadow-sm">
          <div className="mt-1 flex items-center justify-between">
            <div>
              <p className="mb-1 text-xs font-medium text-gray-500">
                Avg Response
              </p>
              <h3 className="text-2xl font-bold text-indigo-900">2.4h</h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-indigo-500 bg-indigo-100">
              <ChatBubbleLeftIcon className="h-6 w-6 text-indigo-900" />
            </div>
          </div>
        </div>

        {/* Card 6: Satisfaction */}
        <div className="rounded-md border border-neutral-300 bg-white p-3 shadow-sm">
          <div className="mt-1 flex items-center justify-between">
            <div>
              <p className="mb-1 text-xs font-medium text-gray-500">
                Satisfaction
              </p>
              <h3 className="text-2xl font-bold text-green-600">94%</h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-green-200 bg-green-50">
              <HeartIcon className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Additional content will go here */}
      <div  className="mt-5">
        {/* chat template */}
        <ChatTemplate/>

      </div>
    </div>
  );
};

export default RectangularCards;
