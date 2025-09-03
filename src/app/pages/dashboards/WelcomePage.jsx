// import React from 'react'
export default function WelcomePage() {
  return (
    <div className="flex min-h-screen justify-center px-4 text-center">
      <div className="mt-18">
        {/* Icon */}
         <div className="bg-white shadow-lg rounded-2xl p-10  w-full text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[var(--color-primary-100)] shadow-sm">
            <span className="text-4xl font-bold text-[var(--color-primary-700)]">
              🎫
            </span>
          </div>

          {/* Title */}
          <h1 className="mb-3 text-2xl font-extrabold text-[#2A5A9D]">
            Welcome to Ticket Manager
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-[#2A5A9D]">
            Manage your support tickets with ease and confidence.
          </p>
        </div>
      </div>
    </div>
  );
}
