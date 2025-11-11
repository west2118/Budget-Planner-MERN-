import { Plus } from "lucide-react";
import CardsCard from "../../components/cards/CardsCard";
import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "../../stores/useUserStore";
import { fetchData } from "../../lib/utils";
import type { CardType } from "../../lib/types";
import SummaryCards from "../../components/cards/SummaryCards";
import { useState } from "react";
import FormDataCardModal from "../../components/cards/FormDataCardModal";
import DeleteCardModal from "../../components/cards/DeleteCardModal";

const CardsPage = () => {
  const token = useUserStore((state) => state.userToken);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { data, error, isLoading } = useQuery<CardType[]>({
    queryKey: ["user-cards"],
    queryFn: fetchData("http://localhost:8080/api/v1/card", token),
    enabled: !!token,
  });

  const handleSelectCard = (card: CardType) => {
    setIsEdit(true);
    setIsModalOpen(true);
    setSelectedCard(card);
  };

  const handleSelectedIdCard = (card: CardType) => {
    setIsDeleteModalOpen(true);
    setSelectedCard(card);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Cards</h1>
        <p className="text-gray-600">
          Manage your debit, credit, and cash cards
        </p>
      </div>

      {/* Summary Cards */}
      <SummaryCards cards={data} />

      {/* Action Bar */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Your Cards</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 px-4 py-2 shadow-lg bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Add New Card</span>
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        {data?.map((card) => (
          <CardsCard
            key={card._id}
            card={card}
            handleSelectCard={handleSelectCard}
            handleSelectedIdCard={handleSelectedIdCard}
          />
        ))}
      </div>

      {isModalOpen && (
        <FormDataCardModal
          isModalOpen={isModalOpen}
          isCloseModal={() => setIsModalOpen(false)}
          token={token}
          isEdit={isEdit}
          selectedCard={selectedCard}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteCardModal
          token={token}
          isModalOpen={isDeleteModalOpen}
          isCloseModal={() => setIsDeleteModalOpen(false)}
          selectedCard={selectedCard}
        />
      )}
    </div>
  );
};

export default CardsPage;
