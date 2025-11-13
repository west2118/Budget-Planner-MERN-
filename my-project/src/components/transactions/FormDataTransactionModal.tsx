import { X } from "lucide-react";
import { startTransition, useEffect } from "react";
import ReactDOM from "react-dom";
import { useForm } from "../../hooks/useForm";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import type { CardType } from "../../lib/types";

type FormDataTransactionProps = {
  isModalOpen: boolean;
  isCloseModal: () => void;
  token: string | null;
  dataCards: CardType[];
};

type FormData = {
  cardId: string;
  goalId: string;
  type: string;
  amount: number;
  category: string;
  date: string;
  note: string;
};

const FormDataTransaction = ({
  isModalOpen,
  isCloseModal,
  token,
  dataCards,
}: FormDataTransactionProps) => {
  const queryClient = useQueryClient();
  const { formData, handleChange, setField } = useForm<FormData>({
    cardId: "",
    goalId: "",
    type: "",
    amount: 0,
    category: "",
    date: "",
    note: "",
  });

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      // let res;

      // if (isEdit) {
      //   if (!selectedCard) return;

      //   res = await axios.put(
      //     `http://localhost:8080/api/v1/card/${selectedCard?._id}`,
      //     { formData },
      //     {
      //       headers: { Authorization: `Bearer ${token}` },
      //     }
      //   );
      // } else {
      //   res = await axios.post("http://localhost:8080/api/v1/card", formData, {
      //     headers: { Authorization: `Bearer ${token}` },
      //   });
      // }

      const res = await axios.post(
        "http://localhost:8080/api/v1/transaction",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return res.data;
    },
    onSuccess: (response) => {
      isCloseModal();
      toast.success(response.message);
      queryClient.invalidateQueries({ queryKey: ["user-transactions"] });
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const handleSubmitTransaction = (e: any) => {
    e.preventDefault();

    startTransition(async () => mutation.mutate(formData));
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isModalOpen]);

  console.log(formData);

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <div
      onClick={isCloseModal}
      className="fixed flex inset-0 bg-black/50 items-center justify-center p-4 z-50">
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto hide-scrollbar">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Add Transaction
            </h3>
            <button
              onClick={isCloseModal}
              className="text-gray-400 hover:text-gray-600 transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmitTransaction} className="space-y-4">
            {/* Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => setField("type", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="" disabled>
                  Select type
                </option>
                <option value="Income">Income</option>
                <option value="Expense">Expense</option>
              </select>
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amount
              </label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                min={1}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="0.00"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setField("category", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="" disabled>
                  Select category
                </option>
                <option value="Food & Dining">Food & Dining</option>
                <option value="Shopping">Shopping</option>
                <option value="Transport">Transport</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Bills">Bills</option>
                <option value="Salary">Salary</option>
                <option value="Freelance">Freelance</option>
              </select>
            </div>

            {/* Linked Card */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Linked Card (Optional)
              </label>
              <select
                value={formData.cardId}
                onChange={(e) => setField("cardId", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="" disabled>
                  Select card
                </option>
                {dataCards?.map((card) => (
                  <option key={card._id} value={card._id}>
                    {card.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Linked Goal */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Linked Goal (Optional)
              </label>
              <select
                value={formData.goalId}
                onChange={(e) => setField("goalId", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="" disabled>
                  Select goal
                </option>
                <option value="Emergency Fund">Emergency Fund</option>
                <option value="New Laptop">New Laptop</option>
                <option value="Vacation">Vacation</option>
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setField("date", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Note */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Note
              </label>
              <textarea
                name="note"
                value={formData.note}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Add a note..."
              />
            </div>

            {/* Buttons */}
            <div className="flex space-x-3 pt-4">
              <button
                onClick={isCloseModal}
                type="button"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                Add Transaction
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>,
    modalRoot
  );
};

export default FormDataTransaction;
