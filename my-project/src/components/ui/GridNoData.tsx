import React from "react";
import { Plus } from "lucide-react";

type GridNoDataProps = {
  title: string;
  message: string;
  buttonText?: string;
  onAdd?: () => void;
  Icon?: React.ElementType;
};

const GridNoData = ({ title, message, buttonText, onAdd, Icon }: GridNoDataProps) => {
  const IconComponent = Icon || Plus;
  return (
    <div className="flex flex-col items-center justify-center flex-1 bg-white rounded-xl border border-gray-100 border-dashed p-8 mx-auto w-full max-w-2xl">
      <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-4">
        <IconComponent className="w-8 h-8" />
      </div>
      <h2 className="text-xl font-semibold text-gray-900 mb-2">
        {title}
      </h2>
      <p className="text-gray-500 text-center max-w-sm mb-6">
        {message}
      </p>
      {buttonText && onAdd && (
        <button
          onClick={onAdd}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2 shadow-md mx-auto">
          <Plus className="w-4 h-4" />
          <span>{buttonText}</span>
        </button>
      )}
    </div>
  );
};

export default GridNoData;
