// import React from 'react'
export default function WelcomePage() {
  return (
    <div className="min-h-screen flex  justify-center  text-center px-4">
      <div className="mt-18">
        {/* Icon */}
        <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-[var(--color-primary-100)] shadow-sm">
          <span className="text-4xl text-[var(--color-primary-700)] font-bold">🎫</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-extrabold mb-3 text-[var(--color-primary-700)]">
          Welcome to Ticket Manager
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-[var(--color-primary-500)]">
          Manage your support tickets <br /> with ease and confidence.
        </p>
      </div>
    </div>
  );
}


