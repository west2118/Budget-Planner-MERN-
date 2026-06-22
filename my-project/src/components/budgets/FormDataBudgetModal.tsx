import { useEffect, useState, useTransition } from "react";
import { useForm } from "../../hooks/useForm";
import { useCards } from "../../hooks/useCards";
import api from "../../lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import type { BudgetType } from "../../lib/types";
import Modal from "../ui/Modal";
import DeleteModal from "../ui/DeleteModal";
import { Loader } from "lucide-react";
import { categories } from "../../lib/constants";

type FormDataBudgetProps = {
  isModalOpen: boolean;
  isCloseModal: () => void;
  isEdit: boolean;
  selectedBudget: BudgetType | null;
  isDelete?: boolean;
};

type FormData = {
  budgetName: string;
  category: string;
  amount: number;
  period: string;
  cardSelection: "All Cards" | "Selected Cards Only";
  selectedCards: string[];
};

const FormDataBudgetModal = ({
  isModalOpen,
  isCloseModal,
  isEdit,
  selectedBudget,
  isDelete = false,
}: FormDataBudgetProps) => {
  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();
  const { data: cards } = useCards();
  const { formData, handleChange, setField } = useForm<FormData>({
    budgetName: "",
    category: "",
    amount: 0,
    period: "",
    cardSelection: "All Cards",
    selectedCards: [],
  });

  useEffect(() => {
    if (selectedBudget) {
      setField("budgetName", selectedBudget.budgetName || "");
      setField("category", selectedBudget.category || "");
      setField("amount", selectedBudget.amount || 0);
      setField("period", selectedBudget.period || "");
      setField("cardSelection", selectedBudget.cardSelection || "All Cards");
      setField("selectedCards", selectedBudget.selectedCards || []);
    }
  }, [selectedBudget, isEdit]);

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      let res;
      if (isEdit) {
        if (!selectedBudget) return;
        res = await api.put(`/budgets/${selectedBudget._id}`, formData);
      } else if (isDelete) {
        if (!selectedBudget) return;
        res = await api.delete(`/budgets/${selectedBudget._id}`);
      } else {
        res = await api.post("/budgets", formData);
      }
      return res.data;
    },
    onSuccess: (response) => {
      isCloseModal();
      toast.success(response.message);
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
      queryClient.invalidateQueries({ queryKey: ["budgets-summary"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => mutation.mutate(formData));
  };

  if (isDelete) {
    return (
      <DeleteModal
        isPending={isPending}
        header="Budget"
        isCloseModal={isCloseModal}
        content={selectedBudget?.budgetName ?? ""}
        handleDelete={handleSubmit}
      />
    );
  }

  return (
    <Modal
      isModalOpen={isModalOpen}
      isCloseModal={isCloseModal}
      title={isEdit ? "Edit Budget" : "Add Budget"}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Budget Name
          </label>
          <input
            type="text"
            name="budgetName"
            value={formData.budgetName}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. Monthly Groceries"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            value={formData.category}
            onChange={(e) => setField("category", e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            <option value="" disabled>
              Select category
            </option>
            <option value="All">All Categories</option>
            {categories?.map((category) => (
              <option key={category.name} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amount Limit
          </label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            min={1}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="0.00"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Period
          </label>
          <select
            value={formData.period}
            onChange={(e) => setField("period", e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            <option value="" disabled>
              Select period
            </option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
            <option value="Yearly">Yearly</option>
            <option value="One-Time">One-Time</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Apply to Cards
          </label>
          <select
            value={formData.cardSelection}
            onChange={(e) => setField("cardSelection", e.target.value as "All Cards" | "Selected Cards Only")}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            <option value="All Cards">All Cards</option>
            <option value="Selected Cards Only">Selected Cards Only</option>
          </select>
        </div>

        {formData.cardSelection === "Selected Cards Only" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Cards
            </label>
            <div className="space-y-2 border border-gray-300 rounded-lg p-3 max-h-40 overflow-y-auto">
              {cards && cards.length > 0 ? (
                cards.map((card: any) => (
                  <label key={card._id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.selectedCards.includes(card._id)}
                      onChange={(e) => {
                        const current = formData.selectedCards || [];
                        if (e.target.checked) {
                          setField("selectedCards", [...current, card._id]);
                        } else {
                          setField(
                            "selectedCards",
                            current.filter((id) => id !== card._id)
                          );
                        }
                      }}
                      className="rounded text-blue-500 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{card.name} ({card.type})</span>
                  </label>
                ))
              ) : (
                <p className="text-sm text-gray-500">No cards available.</p>
              )}
            </div>
          </div>
        )}

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
            {isEdit ? "Save Changes" : "Create Budget"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default FormDataBudgetModal;
