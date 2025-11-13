import { Loader, X } from "lucide-react";
import { useEffect, useTransition } from "react";
import ReactDOM from "react-dom";
import { cardType } from "../../lib/constants";
import { useForm } from "../../hooks/useForm";
import axios from "axios";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CardType } from "../../lib/types";

type FormDataCardModalProps = {
  isModalOpen: boolean;
  isCloseModal: () => void;
  token: string | null;
  isEdit: boolean;
  selectedCard: CardType | null;
};

type FormData = {
  name: string;
  balance: 0;
  type: string;
  budgetLimit: string;
};

const FormDataCardModal = ({
  isModalOpen,
  isCloseModal,
  token,
  isEdit,
  selectedCard,
}: FormDataCardModalProps) => {
  const queryClient = useQueryClient();
  const { formData, handleChange, setField } = useForm<FormData>({
    name: "",
    balance: 0,
    type: "",
    budgetLimit: "",
  });
  const [isPending, startTransition] = useTransition();

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

  useEffect(() => {
    if (!selectedCard) return;

    setField("name", selectedCard?.name || "");
    setField("balance", selectedCard?.balance || "");
    setField("type", selectedCard?.type || "");
    setField("budgetLimit", selectedCard?.budgetLimit || "");
  }, [selectedCard]);

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      let res;

      if (isEdit) {
        if (!selectedCard) return;

        res = await axios.put(
          `http://localhost:8080/api/v1/card/${selectedCard?._id}`,
          { formData },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else {
        res = await axios.post("http://localhost:8080/api/v1/card", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      return res.data;
    },
    onSuccess: (response) => {
      isCloseModal();
      toast.success(response.message);
      queryClient.invalidateQueries({ queryKey: ["user-cards"] });
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const handleSubmitCard = (e: any) => {
    e.preventDefault();

    startTransition(async () => mutation.mutate(formData));
  };

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <div
      onClick={isCloseModal}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto hide-scrollbar">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              {isEdit ? "Update Card" : "Add New Card"}
            </h3>
            <button
              onClick={isCloseModal}
              className="text-gray-400 hover:text-gray-600 transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmitCard} className="space-y-4">
            {/* Card Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Card Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Primary Visa, Everyday Debit"
              />
            </div>

            {/* Card Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Card Type
              </label>

              <select
                value={formData.type}
                onChange={(e) => setField("type", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="" disabled>
                  Select card type
                </option>
                {cardType.map((type) => (
                  <option value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            {/* Current Balance */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Balance
              </label>
              <input
                type="number"
                step="0.01"
                name="balance"
                value={formData.balance}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="0.00"
              />
            </div>

            {/* Credit Limit (Conditional) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Credit Limit{" "}
                <span className="text-gray-500 text-sm">(Optional)</span>
              </label>
              <input
                type="number"
                step="0.01"
                min={1000}
                name="budgetLimit"
                value={formData.budgetLimit}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="0.00"
              />
              <p className="text-xs text-gray-500 mt-1">
                Only for credit cards
              </p>
            </div>

            {/* Buttons */}
            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={isCloseModal}
                disabled={isPending}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button
                type="submit"
                disabled={isPending}
                className="flex items-center justify-center gap-2 flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                {isPending && <Loader className="animate-spin h-5 w-5" />}
                <span>{isEdit ? "Update Card" : "Add Card"}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>,
    modalRoot
  );
};

export default FormDataCardModal;
