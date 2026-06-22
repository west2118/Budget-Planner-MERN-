import React, { useState } from "react";
import {
  Settings as SettingsIcon,
  DollarSign,
  Moon,
  Sun,
  Download,
  Upload,
  Trash2,
  Bell,
  Shield,
  User,
  Palette,
  Database,
  Eye,
  EyeOff,
  Check,
} from "lucide-react";
import EditProfileModal from "../../components/settings/EditProfileModal";
import ChangePasswordModal from "../../components/settings/ChangePasswordModal";
import { useUserStore } from "../../stores/useUserStore";

const SettingsPage = () => {
  const { user } = useUserStore();
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">
          Personalize your app experience and preferences
        </p>
      </div>

      <div className="mx-auto">
        {/* Profile Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">
                {user ? `${user.firstName} ${user.lastName}` : "Loading..."}
              </h3>
              <p className="text-gray-600">{user?.email}</p>
              <p className="text-sm text-gray-500">
                Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : "..."}
              </p>
            </div>
            <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
              <button
                onClick={() => setIsEditProfileOpen(true)}
                className="px-4 py-2 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Edit Details
              </button>
              <button
                onClick={() => setIsChangePasswordOpen(true)}
                className="px-4 py-2 text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal (Static) */}
      <div className="hidden fixed inset-0 bg-black bg-opacity-50 items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl shadow-lg max-w-md w-full">
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-red-50 rounded-lg">
                <Trash2 className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Reset All Data
                </h3>
                <p className="text-sm text-gray-600">
                  This action cannot be undone
                </p>
              </div>
            </div>

            <p className="text-gray-700 mb-6">
              Are you sure you want to reset all your data? This will
              permanently delete all your transactions, goals, cards, and
              settings. Make sure you have exported a backup if you want to
              restore later.
            </p>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-2 text-yellow-800">
                <Shield className="w-4 h-4" />
                <span className="text-sm font-medium">Warning</span>
              </div>
              <p className="text-sm text-yellow-700 mt-1">
                This action is irreversible. All your financial data will be
                lost.
              </p>
            </div>

            <div className="flex space-x-3">
              <button className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                Yes, Reset All Data
              </button>
            </div>
          </div>
        </div>
      </div>
      {isEditProfileOpen && (
        <EditProfileModal
          isModalOpen={isEditProfileOpen}
          isCloseModal={() => setIsEditProfileOpen(false)}
        />
      )}

      {isChangePasswordOpen && (
        <ChangePasswordModal
          isModalOpen={isChangePasswordOpen}
          isCloseModal={() => setIsChangePasswordOpen(false)}
        />
      )}
    </div>
  );
};

export default SettingsPage;
