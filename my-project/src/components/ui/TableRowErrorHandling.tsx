import React from "react";

const TableRowErrorHandling = ({ col, title, refetch }: { col: number; title: string; refetch?: () => void }) => {
  return (
    <tr>
      <td colSpan={col} className="px-6 py-8 text-center text-red-500">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg inline-block" role="alert">
          <strong className="font-bold">Error! </strong>
          <span className="block sm:inline">Failed to load {title} data. Please try again later.</span>
          {refetch && (
            <button onClick={refetch} className="ml-4 text-blue-600 hover:underline">
              Retry
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};

export default TableRowErrorHandling;
