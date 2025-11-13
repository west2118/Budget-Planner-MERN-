// import { useQueries } from "@tanstack/react-query";
// import axios from "axios";

// const useTransactionData = (token: string | null) => {
//   const results = useQueries({
//     queries: [
//       {
//         queryKey: ["user-transactions"],
//         queryFn: async () => {
//           const res = await axios.get(
//             "http://localhost:8080/api/v1/transaction",
//             {
//               headers: { Authorization: `Bearer ${token}` },
//             }
//           );
//           return res.data;
//         },
//         enabled: !!token,
//       },
//       {
//         queryKey: ["user-cards"],
//         queryFn: async () => {
//           const res = await axios.get("http://localhost:8080/api/v1/card", {
//             headers: { Authorization: `Bearer ${token}` },
//           });
//           return res.data;
//         },
//         enabled: !!token,
//       },
//     ],
//   });

//   const [transactionsQuery, cardsQuery] = results;

//   return {
//     transactions: transactionsQuery.data,
//     cards: cardsQuery.data,
//     isLoading: transactionsQuery.isLoading || cardsQuery.isLoading,
//     error: transactionsQuery.error || cardsQuery.error,
//   };
// };

// export default useTransactionData;
