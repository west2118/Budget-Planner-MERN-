import React from "react";

const TableRowSkeleton = ({ columns }: { columns: number }) => {
  return (
    <>
      {[...Array(5)].map((_, i) => (
        <tr key={i} className="animate-pulse">
          {[...Array(columns)].map((_, j) => (
            <td key={j} className="px-6 py-4 whitespace-nowrap">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};

export default TableRowSkeleton;
