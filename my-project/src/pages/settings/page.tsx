import React from "react";
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

const SettingsPage = () => {
  // Static settings data
  const settingsSections = [
    {
      title: "General Settings",
      icon: SettingsIcon,
      items: [
        {
          id: "currency",
          label: "Currency",
          description: "Select your preferred currency for all transactions",
          type: "select",
          value: "USD",
          options: [
            { value: "USD", label: "US Dollar ($)" },
            { value: "EUR", label: "Euro (€)" },
            { value: "GBP", label: "British Pound (£)" },
            { value: "JPY", label: "Japanese Yen (¥)" },
            { value: "CAD", label: "Canadian Dollar (C$)" },
            { value: "AUD", label: "Australian Dollar (A$)" },
          ],
        },
        {
          id: "language",
          label: "Language",
          description: "Choose your preferred language",
          type: "select",
          value: "en",
          options: [
            { value: "en", label: "English" },
            { value: "es", label: "Spanish" },
            { value: "fr", label: "French" },
            { value: "de", label: "German" },
            { value: "pt", label: "Portuguese" },
          ],
        },
        {
          id: "date-format",
          label: "Date Format",
          description: "How dates are displayed throughout the app",
          type: "select",
          value: "mm-dd-yyyy",
          options: [
            { value: "mm-dd-yyyy", label: "MM-DD-YYYY" },
            { value: "dd-mm-yyyy", label: "DD-MM-YYYY" },
            { value: "yyyy-mm-dd", label: "YYYY-MM-DD" },
          ],
        },
      ],
    },
    {
      title: "Appearance",
      icon: Palette,
      items: [
        {
          id: "theme",
          label: "Theme",
          description: "Choose between light and dark mode",
          type: "toggle",
          value: "light",
          options: [
            { value: "light", label: "Light" },
            { value: "dark", label: "Dark" },
            { value: "system", label: "System" },
          ],
        },
        {
          id: "compact-mode",
          label: "Compact Mode",
          description: "Reduce spacing for more content on screen",
          type: "switch",
          value: false,
        },
        {
          id: "animations",
          label: "Animations",
          description: "Enable or disable interface animations",
          type: "switch",
          value: true,
        },
      ],
    },
    {
      title: "Notifications",
      icon: Bell,
      items: [
        {
          id: "email-notifications",
          label: "Email Notifications",
          description: "Receive updates and reports via email",
          type: "switch",
          value: true,
        },
        {
          id: "push-notifications",
          label: "Push Notifications",
          description: "Get notified about important updates",
          type: "switch",
          value: true,
        },
        {
          id: "budget-alerts",
          label: "Budget Alerts",
          description: "Get notified when approaching budget limits",
          type: "switch",
          value: true,
        },
        {
          id: "goal-reminders",
          label: "Goal Reminders",
          description: "Reminders about your savings goals",
          type: "switch",
          value: false,
        },
      ],
    },
    {
      title: "Privacy & Security",
      icon: Shield,
      items: [
        {
          id: "biometric-auth",
          label: "Biometric Authentication",
          description: "Use fingerprint or face ID to secure your app",
          type: "switch",
          value: false,
        },
        {
          id: "auto-lock",
          label: "Auto Lock",
          description: "Automatically lock app after 5 minutes of inactivity",
          type: "switch",
          value: true,
        },
        {
          id: "data-encryption",
          label: "Data Encryption",
          description: "Encrypt all your financial data locally",
          type: "switch",
          value: true,
        },
      ],
    },
    {
      title: "Data Management",
      icon: Database,
      items: [
        {
          id: "auto-backup",
          label: "Automatic Backup",
          description: "Automatically backup your data weekly",
          type: "switch",
          value: true,
        },
        {
          id: "backup-frequency",
          label: "Backup Frequency",
          description: "How often to create automatic backups",
          type: "select",
          value: "weekly",
          options: [
            { value: "daily", label: "Daily" },
            { value: "weekly", label: "Weekly" },
            { value: "monthly", label: "Monthly" },
          ],
        },
      ],
    },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">
          Personalize your app experience and preferences
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Profile Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">John Doe</h3>
              <p className="text-gray-600">john.doe@example.com</p>
              <p className="text-sm text-gray-500">Member since January 2024</p>
            </div>
            <button className="px-4 py-2 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Settings Sections */}
        {/* {settingsSections.map((section, sectionIndex) => {
          const SectionIcon = section.icon;
          return (
            <div
              key={sectionIndex}
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <SectionIcon className="w-5 h-5 text-blue-500" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {section.title}
                </h2>
              </div>

              <div className="space-y-6">
                {section.items.map((item, itemIndex) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0">
                    <div className="flex-1">
                      <label
                        htmlFor={item.id}
                        className="block text-sm font-medium text-gray-900">
                        {item.label}
                      </label>
                      <p className="text-sm text-gray-500 mt-1">
                        {item.description}
                      </p>
                    </div>

                    <div className="ml-4">
                      {item.type === "select" && (
                        <select
                          id={item.id}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white min-w-[140px]"
                          defaultValue={item.value}>
                          {item.options.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      )}

                      {item.type === "toggle" && (
                        <div className="flex items-center space-x-3 bg-gray-100 rounded-lg p-1">
                          {item.options.map((option) => (
                            <button
                              key={option.value}
                              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                                item.value === option.value
                                  ? "bg-white text-gray-900 shadow-sm"
                                  : "text-gray-600 hover:text-gray-900"
                              }`}>
                              {option.label}
                            </button>
                          ))}
                        </div>
                      )}

                      {item.type === "switch" && (
                        <button
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            item.value ? "bg-blue-500" : "bg-gray-300"
                          }`}>
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              item.value ? "translate-x-6" : "translate-x-1"
                            }`}
                          />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })} */}

        {/* Danger Zone */}
        {/* <div className="bg-white rounded-xl shadow-sm p-6 border border-red-200 mb-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-red-50 rounded-lg">
              <Trash2 className="w-5 h-5 text-red-500" />
            </div>
            <h2 className="text-xl font-semibold text-red-700">Danger Zone</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-4">
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  Export Data
                </h3>
                <p className="text-sm text-gray-500">
                  Download all your data as a backup
                </p>
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 text-green-700 border border-green-200 rounded-lg hover:bg-green-50 transition-colors">
                <Download className="w-4 h-4" />
                <span>Export Backup</span>
              </button>
            </div>

            <div className="flex items-center justify-between py-4 border-t border-gray-100">
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  Import Data
                </h3>
                <p className="text-sm text-gray-500">
                  Restore from a previous backup
                </p>
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
                <Upload className="w-4 h-4" />
                <span>Import Backup</span>
              </button>
            </div>

            <div className="flex items-center justify-between py-4 border-t border-gray-100">
              <div>
                <h3 className="text-sm font-medium text-red-700">
                  Reset All Data
                </h3>
                <p className="text-sm text-red-600">
                  Permanently delete all your transactions and settings
                </p>
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors">
                <Trash2 className="w-4 h-4" />
                <span>Reset Data</span>
              </button>
            </div>
          </div>
        </div> */}

        {/* App Info */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="text-center">
            <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              FinTrack Pro
            </h3>
            <p className="text-gray-600 mb-4">Version 2.1.0</p>
            <div className="flex justify-center space-x-4 text-sm text-gray-500">
              <span>© 2024 FinTrack</span>
              <span>•</span>
              <button className="text-blue-600 hover:text-blue-700">
                Privacy Policy
              </button>
              <span>•</span>
              <button className="text-blue-600 hover:text-blue-700">
                Terms of Service
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
    </div>
  );
};

export default SettingsPage;
