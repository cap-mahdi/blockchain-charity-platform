import { FC } from 'react';

interface PaginationProps {
  selectedPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
export const Pagination: FC<PaginationProps> = ({
  selectedPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div>
      <nav
        className="isolate inline-flex -space-x-px rounded-md shadow-sm "
        aria-label="Pagination"
      >
        <button
          disabled={selectedPage === 1}
          onClick={() => onPageChange(selectedPage - 1)}
          className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-red-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
        >
          <span className="sr-only">Previous</span>
          <svg
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => {
              onPageChange(page);
            }}
            className={
              selectedPage === page
                ? 'relative z-10 inline-flex items-center bg-orange px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                : `relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-red-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`
            }
          >
            {page}
          </button>
        ))}
        <button
          disabled={selectedPage === totalPages}
          onClick={() => {
            onPageChange(selectedPage + 1);
          }}
          className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-red-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
        >
          <span className="sr-only">Next</span>
          <svg
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </nav>
    </div>
  );
};
