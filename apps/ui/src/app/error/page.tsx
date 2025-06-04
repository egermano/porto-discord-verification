export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <svg
          className="mx-auto mb-4 h-16 w-16 text-red-500 dark:text-red-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 48 48"
        >
          <circle cx="24" cy="24" r="22" strokeWidth="4" />
          <line x1="16" y1="16" x2="32" y2="32" strokeWidth="4" />
          <line x1="32" y1="16" x2="16" y2="32" strokeWidth="4" />
        </svg>
        <h1 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-100">
          Something went wrong
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          An unexpected error has occurred. Please try again later.
        </p>
        <a
          href="/"
          className="inline-block px-6 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded hover:bg-blue-700 dark:hover:bg-blue-600 transition"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}
