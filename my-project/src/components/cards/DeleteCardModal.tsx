import { X, AlertTriangle, Loader } from "lucide-react";
import { startTransition, useEffect, useTransition } from "react";
import type { CardType } from "../../lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

type DeleteCardModalProps = {
  token: string | null;
  isModalOpen: boolean;
  isCloseModal: () => void;
  selectedCard: CardType | null;
};

const DeleteCardModal = ({
  token,
  isModalOpen,
  isCloseModal,
  selectedCard,
}: DeleteCardModalProps) => {
  const queryClient = useQueryClient();
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

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await axios.delete(
        `http://localhost:8080/api/v1/card/${selectedCard?._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

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

  const handleDeleteCard = (e: any) => {
    e.preventDefault();

    startTransition(async () => mutation.mutate());
  };

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  return (
    <div
      onClick={isCloseModal}
      className="fixed inset-0 bg-black/50 bg-opacity-50 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ease-in-out">
      {/* Modal Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl shadow-2xl max-w-md w-full transform transition-all duration-300 ease-out">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Delete Card
              </h3>
              <p className="text-sm text-gray-500">
                This action cannot be undone
              </p>
            </div>
          </div>
          <button
            onClick={isCloseModal}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          <p className="text-gray-700">
            Are you sure you want to delete the card{" "}
            <span className="font-semibold">
              {`${selectedCard?.type} ${selectedCard?.name}`}
            </span>
            ? This action will permanently remove the card from your account.
          </p>
        </div>

        {/* Modal Footer */}
        <div className="flex space-x-3 p-6 border-t border-gray-200">
          <button
            disabled={isPending}
            onClick={isCloseModal}
            className="flex-1 px-4 py-2.5 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-200 border border-gray-300">
            Cancel
          </button>
          <button
            disabled={isPending}
            onClick={handleDeleteCard}
            className="flex-1 flex items-center justify-center px-4 py-2.5 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-all duration-200 shadow-sm hover:shadow-md">
            {isPending && <Loader className="animate-spin h-5 w-5 mr-2" />}
            Delete Card
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCardModal;
