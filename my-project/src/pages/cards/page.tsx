import { Plus } from "lucide-react";
import CardsCard from "../../components/cards/CardsCard";
import type { CardType } from "../../lib/types";
import { useCards } from "../../hooks/useCards";
import SummaryCards from "../../components/cards/SummaryCards";
import { useState } from "react";
import FormDataCardModal from "../../components/cards/FormDataCardModal";
import DeleteCardModal from "../../components/cards/DeleteCardModal";
import CardGridSkeleton from "../../components/ui/CardGridSkeleton";
import GridErrorHandling from "../../components/ui/GridErrorHandling";
import GridNoData from "../../components/ui/GridNoData";
import Pagination from "../../components/ui/Pagination";

const CardsPage = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);

  const { data, error, isLoading } = useCards(page, limit);

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
      {isLoading && <CardGridSkeleton />}

      {!isLoading && error && <GridErrorHandling title="cards" />}

      {!isLoading && !error && data && data.cards && data.cards.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
            {data.cards.map((card: CardType) => (
              <CardsCard
                key={card._id}
                card={card}
                handleSelectCard={handleSelectCard}
                handleSelectedIdCard={handleSelectedIdCard}
              />
            ))}
          </div>
          {data.totalPages > 1 && (
            <div className="mt-8">
              <Pagination
                limit={limit}
                page={page}
                total={data.total}
                totalPages={data.totalPages}
                setPage={setPage}
                setLimit={setLimit}
              />
            </div>
          )}
        </>
      )}

      {!isLoading && !error && (!data || !data.cards || data.cards.length === 0) && (
        <GridNoData
          title="No cards yet"
          message="Add your credit, debit, or cash cards to track your spending sources."
          buttonText="Add New Card"
          onAdd={() => setIsModalOpen(true)}
        />
      )}

      {isModalOpen && (
        <FormDataCardModal
          isModalOpen={isModalOpen}
          isCloseModal={() => setIsModalOpen(false)}
          isEdit={isEdit}
          selectedCard={selectedCard}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteCardModal
          isModalOpen={isDeleteModalOpen}
          isCloseModal={() => setIsDeleteModalOpen(false)}
          selectedCard={selectedCard}
        />
      )}
    </div>
  );
};

export default CardsPage;
