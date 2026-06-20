type TopSpendingCategoriesProps = {
  data: { category: string; amount: number; percentage: number }[] | undefined;
};

const TopSpendingCategories = ({ data }: TopSpendingCategoriesProps) => {
  const total = data?.reduce((sum, item) => sum + item.amount, 0) || 0;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Top Spending Categories
        </h3>
        <span className="text-sm text-gray-500">Total: ${total.toLocaleString()}</span>
      </div>
      <div className="space-y-4">
        {(data || []).map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">{item.category}</span>
              <span className="font-semibold text-gray-900">
                ${item.amount.toLocaleString()} ({item.percentage}%)
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="h-2 rounded-full bg-blue-500 transition-all duration-500"
                style={{ width: `${item.percentage}%` }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSpendingCategories;
