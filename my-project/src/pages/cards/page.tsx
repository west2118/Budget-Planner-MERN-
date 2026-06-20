import { Plus } from "lucide-react";
import CardsCard from "../../components/cards/CardsCard";
import type { CardType } from "../../lib/types";
import { useCards } from "../../hooks/useCards";
import SummaryCards from "../../components/cards/SummaryCards";
import { useState } from "react";
import FormDataCardModal from "../../components/cards/FormDataCardModal";
import DeleteCardModal from "../../components/cards/DeleteCardModal";
import { useUserStore } from "../../stores/useUserStore";

const CardsPage = () => {
  const token = useUserStore((state) => state.userToken);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { data, error, isLoading } = useCards();

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
      <SummaryCards />

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
      {isLoading ? (
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg text-center" role="alert">
          Failed to load cards.
        </div>
      ) : (
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
      )}

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
