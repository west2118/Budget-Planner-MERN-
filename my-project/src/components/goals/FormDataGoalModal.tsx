import { useMutation, useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";
import { startTransition, useEffect } from "react";
import ReactDOM from "react-dom";
import { useForm } from "../../hooks/useForm";
import { categories } from "../../lib/constants";
import axios from "axios";
import { toast } from "react-toastify";

type FormDataGoalModalProps = {
  isModalOpen: boolean;
  isCloseModal: () => void;
  token: string | null;
  isEdit: boolean;
  selectedGoal: any;
};

type FormData = {
  title: string;
  category: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  description: string;
};

const FormDataGoalModal = ({
  isModalOpen,
  isCloseModal,
  token,
  isEdit,
  selectedGoal,
}: FormDataGoalModalProps) => {
  const queryClient = useQueryClient();
  const { formData, handleChange, setField } = useForm<FormData>({
    title: "",
    category: "",
    targetAmount: 0,
    currentAmount: 0,
    deadline: "",
    description: "",
  });

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

  // useEffect(() => {
  //   if (!selectedCard) return;

  //   setField("name", selectedCard?.name || "");
  //   setField("balance", selectedCard?.balance || "");
  //   setField("type", selectedCard?.type || "");
  //   setField("budgetLimit", selectedCard?.budgetLimit || "");
  // }, [selectedCard]);

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      let res;

      if (isEdit) {
        if (!selectedGoal) return;

        res = await axios.put(
          `http://localhost:8080/api/v1/card/${selectedGoal?._id}`,
          { formData },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else {
        res = await axios.post("http://localhost:8080/api/v1/goal", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      return res.data;
    },
    onSuccess: (response) => {
      isCloseModal();
      toast.success(response.message);
      queryClient.invalidateQueries({ queryKey: ["user-goals"] });
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const handleSubmitGoal = (e: any) => {
    e.preventDefault();

    startTransition(async () => mutation.mutate(formData));
  };

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <div
      onClick={isCloseModal}
      className="flex fixed inset-0 bg-black/50 items-center justify-center p-4 z-50">
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Create New Goal
            </h3>
            <button
              onClick={isCloseModal}
              className="text-gray-400 hover:text-gray-600 transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmitGoal} className="space-y-4">
            {/* Goal Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Goal Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Emergency Fund, New Car, Vacation"
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
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.label} value={category.label}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Target Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Target Amount
              </label>
              <input
                type="number"
                step="0.01"
                min={10}
                name="targetAmount"
                value={formData.targetAmount}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="0.00"
              />
            </div>

            {/* Current Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Amount{" "}
                <span className="text-gray-500 text-sm">(Optional)</span>
              </label>
              <input
                type="number"
                step="0.01"
                name="currentAmount"
                value={formData.currentAmount}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="0.00"
              />
              <p className="text-xs text-gray-500 mt-1">
                Amount already saved for this goal
              </p>
            </div>

            {/* Deadline */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Deadline
              </label>
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description{" "}
                <span className="text-gray-500 text-sm">(Optional)</span>
              </label>
              <textarea
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Add a description for your goal..."
              />
            </div>

            {/* Buttons */}
            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                Create Goal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>,
    modalRoot
  );
};

export default FormDataGoalModal;
