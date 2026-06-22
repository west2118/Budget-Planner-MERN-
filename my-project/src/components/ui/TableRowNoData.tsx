import React from "react";

const TableRowNoData = ({ title, col }: { title: string; col: number }) => {
  return (
    <tr>
      <td colSpan={col} className="px-6 py-8 text-center text-gray-500">
        No {title} found.
      </td>
    </tr>
  );
};

export default TableRowNoData;
