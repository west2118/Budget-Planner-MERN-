import { startTransition, useEffect, useState, useTransition } from "react";
import { useForm } from "../../hooks/useForm";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import type { CardType, GoalType, TransactionType } from "../../lib/types";
import Modal from "../ui/Modal";
import DeleteModal from "../DeleteModal";
import { Loader } from "lucide-react";
import { categories } from "../../lib/constants";

type FormDataTransactionProps = {
  isModalOpen: boolean;
  isCloseModal: () => void;
  token: string | null;
  dataCards: CardType[];
  dataGoals: GoalType[];
  isEdit: boolean;
  selectedTransaction: TransactionType | null;
  isDelete?: boolean;
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
  dataGoals,
  isEdit,
  selectedTransaction,
  isDelete = false,
}: FormDataTransactionProps) => {
  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();
  const { formData, handleChange, setField } = useForm<FormData>({
    cardId: "",
    goalId: "",
    type: "",
    amount: 0,
    category: "",
    date: "",
    note: "",
  });

  useEffect(() => {
    if (!selectedTransaction) return;

    setField("cardId", selectedTransaction?.cardId || "");
    setField("goalId", selectedTransaction?.goalId || "");
    setField("type", selectedTransaction?.type || "");
    setField("amount", selectedTransaction?.amount || 0);
    setField("category", selectedTransaction?.category || "");
    setField("date", selectedTransaction?.date.toString().split("T")[0] || "");
    setField("note", selectedTransaction?.note || "");
  }, [selectedTransaction]);

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const payload = {
        ...formData,
        cardId: formData.cardId || null,
        goalId: formData.goalId || null,
      };

      let res;

      if (isEdit) {
        if (!selectedTransaction) return;

        res = await axios.put(
          `http://localhost:8080/api/v1/transaction/${selectedTransaction?._id}`,
          { formData: payload },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else if (isDelete) {
        if (!selectedTransaction) return;

        res = await axios.delete(
          `http://localhost:8080/api/v1/transaction/${selectedTransaction?._id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else {
        res = await axios.post(
          "http://localhost:8080/api/v1/transaction",
          payload,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }
      return res.data;
    },
    onSuccess: (response) => {
      isCloseModal();
      toast.success(response.message);
      queryClient.invalidateQueries({ queryKey: ["transaction-data"] });
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const handleSubmitTransaction = (e: any) => {
    e.preventDefault();

    startTransition(async () => mutation.mutate(formData));
  };

  if (isDelete) {
    return (
      <DeleteModal
        isPending={isPending}
        header="Transaction"
        isCloseModal={isCloseModal}
        content={selectedTransaction?.category ?? ""}
        handleDelete={handleSubmitTransaction}
      />
    );
  }

  return (
    <Modal
      isModalOpen={isModalOpen}
      isCloseModal={isCloseModal}
      title={isEdit ? "Edit Transaction" : "Add Transaction"}>
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
            {categories?.map((category) => (
              <option key={category.name} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Linked Card */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Linked Card
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
            {dataGoals?.map((goal) => (
              <option key={goal._id} value={goal._id}>
                {goal.title}
              </option>
            ))}
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
            disabled={isPending}
            onClick={isCloseModal}
            type="button"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button
            disabled={isPending}
            type="submit"
            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
            {isPending && <Loader className="animate-spin h-5 w-5" />}
            {isEdit ? "Edit Transaction" : "Add Transaction"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default FormDataTransaction;
