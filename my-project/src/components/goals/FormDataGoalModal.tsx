import { useMutation, useQueryClient } from "@tanstack/react-query";
import { startTransition, useEffect, useTransition } from "react";
import { useForm } from "../../hooks/useForm";
import axios from "axios";
import { toast } from "react-toastify";
import { categoriesGoal } from "../../lib/constants";
import Modal from "../ui/Modal";
import { Loader } from "lucide-react";
import DeleteModal from "../DeleteModal";

type FormDataGoalModalProps = {
  isModalOpen: boolean;
  isCloseModal: () => void;
  token: string | null;
  selectedGoal: any;
  isEdit: boolean;
  isDelete: boolean;
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
  isDelete,
}: FormDataGoalModalProps) => {
  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();
  const { formData, handleChange, setField } = useForm<FormData>({
    title: "",
    category: "",
    targetAmount: 0,
    currentAmount: 0,
    deadline: "",
    description: "",
  });

  useEffect(() => {
    if (!selectedGoal) return;

    setField("title", selectedGoal?.title || "");
    setField("category", selectedGoal?.category || "");
    setField("targetAmount", selectedGoal?.targetAmount || 0);
    setField("currentAmount", selectedGoal?.currentAmount || 0);
    setField("deadline", selectedGoal?.deadline.toString().split("T")[0] || "");
    setField("description", selectedGoal?.description || "");
  }, [selectedGoal]);

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      let res;

      if (isEdit) {
        if (!selectedGoal) return;

        res = await axios.put(
          `http://localhost:8080/api/v1/goal/${selectedGoal?._id}`,
          { formData },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else if (isDelete) {
        res = await axios.delete(
          `http://localhost:8080/api/v1/goal/${selectedGoal?._id}`,
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

  if (isDelete) {
    return (
      <DeleteModal
        isPending={isPending}
        header="Goal"
        isCloseModal={isCloseModal}
        content={selectedGoal?.title ?? ""}
        handleDelete={handleSubmitGoal}
      />
    );
  }

  return (
    <Modal
      isModalOpen={isModalOpen}
      isCloseModal={isCloseModal}
      title={isEdit ? "Edit Goal" : "Add Goal"}>
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
            {categoriesGoal.map((category) => (
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
            disabled={isPending}
            onClick={isCloseModal}
            type="button"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button
            disabled={isPending}
            type="submit"
            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors  flex items-center justify-center gap-2">
            {isPending && <Loader className="animate-spin h-5 w-5" />}
            {isEdit ? "Edit Goal" : "Create Goal"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default FormDataGoalModal;
