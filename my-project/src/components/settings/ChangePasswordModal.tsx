import { useTransition } from "react";
import { useForm } from "../../hooks/useForm";
import api from "../../lib/api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Modal from "../ui/Modal";
import { Loader } from "lucide-react";

type ChangePasswordProps = {
  isModalOpen: boolean;
  isCloseModal: () => void;
};

const ChangePasswordModal = ({ isModalOpen, isCloseModal }: ChangePasswordProps) => {
  const [isPending, startTransition] = useTransition();
  
  const { formData, handleChange, setField } = useForm({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await api.put("/user/password", data);
      return res.data;
    },
    onSuccess: (response) => {
      isCloseModal();
      toast.success(response.message);
      // Reset form
      setField("currentPassword", "");
      setField("newPassword", "");
      setField("confirmPassword", "");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    if (formData.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    startTransition(async () => mutation.mutate({
      currentPassword: formData.currentPassword,
      newPassword: formData.newPassword
    }));
  };

  return (
    <Modal
      isModalOpen={isModalOpen}
      isCloseModal={isCloseModal}
      title="Change Password"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Current Password
          </label>
          <input
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your current password"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            New Password
          </label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter a new password"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Confirm New Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Confirm your new password"
          />
        </div>

        <div className="flex space-x-3 pt-4">
          <button
            disabled={isPending}
            onClick={isCloseModal}
            type="button"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            disabled={isPending}
            type="submit"
            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
          >
            {isPending && <Loader className="animate-spin h-5 w-5" />}
            Update Password
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ChangePasswordModal;
