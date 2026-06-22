import { useEffect, useTransition } from "react";
import { useForm } from "../../hooks/useForm";
import api from "../../lib/api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Modal from "../ui/Modal";
import { Loader } from "lucide-react";
import { useUserStore } from "../../stores/useUserStore";

type EditProfileProps = {
  isModalOpen: boolean;
  isCloseModal: () => void;
};

type FormData = {
  firstName: string;
  lastName: string;
};

const EditProfileModal = ({ isModalOpen, isCloseModal }: EditProfileProps) => {
  const [isPending, startTransition] = useTransition();
  const { user, setUser } = useUserStore();
  
  const { formData, handleChange, setField } = useForm<FormData>({
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    if (user) {
      setField("firstName", user.firstName || "");
      setField("lastName", user.lastName || "");
    }
  }, [user, isModalOpen]);

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await api.put("/user/profile", formData);
      return res.data;
    },
    onSuccess: (response) => {
      setUser(response.user);
      isCloseModal();
      toast.success(response.message);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => mutation.mutate(formData));
  };

  return (
    <Modal
      isModalOpen={isModalOpen}
      isCloseModal={isCloseModal}
      title="Edit Profile"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. John"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. Doe"
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
            Save Changes
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditProfileModal;
