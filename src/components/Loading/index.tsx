import React from 'react'

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
      <div className="text-white text-center">
        <svg
          className="animate-spin h-10 w-10 mx-auto mb-2 text-synapsis-primary"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 4.418 3.582 8 8 8v-4.009zm16-1.282A7.962 7.962 0 0020 12h4c0 4.418-3.582 8-8 8v-4.009zm-8-5.292A7.963 7.963 0 018 4.009V0c4.418 0 8 3.582 8 8h-4zm-2 1.283V20c4.418 0 8-3.582 8-8h-4a7.963 7.963 0 01-4-2.009z"
          ></path>
        </svg>
        <p>Loading...</p>
      </div>
    </div>
  )
}
