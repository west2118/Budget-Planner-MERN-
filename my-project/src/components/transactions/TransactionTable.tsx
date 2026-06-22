import React, { useState } from "react";
import type { TransactionType } from "../../lib/types";
import TransactionRow from "./TransactionRow";
import { usePaginatedTransactions } from "../../hooks/usePaginatedTransactions";
import Pagination from "../ui/Pagination";
import TableRowSkeleton from "../ui/TableRowSkeleton";
import TableRowErrorHandling from "../ui/TableRowErrorHandling";
import TableRowNoData from "../ui/TableRowNoData";



const TransactionTable = ({
  handleEditTransaction,
  handleDeleteTransaction,
}: {
  handleEditTransaction: (transaction: TransactionType) => void;
  handleDeleteTransaction: (transaction: TransactionType) => void;
}) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data: paginatedResponse, isLoading, isError, refetch } = usePaginatedTransactions(page, limit);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Card
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Note
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {isLoading && <TableRowSkeleton columns={7} />}

            {!isLoading && isError && (
              <TableRowErrorHandling
                col={7}
                title="transactions"
                refetch={refetch}
              />
            )}

            {!isLoading &&
              !isError &&
              paginatedResponse?.data?.map((transaction) => (
                <TransactionRow
                  key={transaction._id}
                  transaction={transaction}
                  handleEditTransaction={handleEditTransaction}
                  handleDeleteTransaction={handleDeleteTransaction}
                />
              ))}

            {!isLoading && !isError && (!paginatedResponse?.data || paginatedResponse.data.length === 0) && (
              <TableRowNoData title="transactions" col={7} />
            )}
          </tbody>

          <tfoot>
            <tr className="border-t border-gray-100">
              <td colSpan={7} className="px-6 py-4">
                <Pagination
                  limit={limit}
                  page={page}
                  total={paginatedResponse?.total}
                  totalPages={paginatedResponse?.totalPages}
                  setPage={(newPage) => setPage(newPage)}
                  setLimit={(newLimit) => {
                    setLimit(newLimit);
                    setPage(1);
                  }}
                />
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;
