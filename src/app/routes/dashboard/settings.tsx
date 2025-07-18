import { useState } from "react";
import Sidebar from "../../../components/Sidebar";
import DashboardHeader from "../../../components/DashboardHeader";
import { User, Bell, Shield, Lock } from "lucide-react";

export default function Settings() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [alertEnabled, setAlertEnabled] = useState(true);
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
    const [telegramId, setTelegramId] = useState("");
    const [pin, setPin] = useState("");
    const [confirmPin, setConfirmPin] = useState("");

    const handleSaveSettings = () => {
        console.log({
            telegramId,
            pin,
            confirmPin,
            alertEnabled,
            twoFactorEnabled,
        });
        alert("Settings saved!");
    };

    const handleUpdateTelegramId = () => {
        alert(`Telegram ID updated to: ${telegramId}`);
    };

    return (
        <div className="min-h-screen flex bg-gray-50 text-gray-900">
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-30 z-20 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className="flex-1 flex flex-col overflow-hidden">
                <DashboardHeader setSidebarOpen={setSidebarOpen} />

                <main className="flex-1 overflow-y-auto px-6 sm:px-10 lg:px-12 py-10">
                    <div className="max-w-4xl mx-auto space-y-12">
                        <h1 className="text-4xl font-extrabold tracking-tight">Settings</h1>

                        {/* Profile Settings */}
                        <section className="bg-white p-8 rounded-3xl border border-gray-200 shadow-lg space-y-6">
                            <div className="flex items-center gap-3">
                                <User className="text-blue-600" />
                                <h2 className="text-2xl font-semibold text-gray-800">Telegram ID</h2>
                            </div>

                            <div className="flex gap-4 items-center mt-6">
                                <input
                                    type="text"
                                    placeholder="Telegram ID"
                                    value={telegramId}
                                    onChange={(e) => setTelegramId(e.target.value)}
                                    className="flex-1 p-4 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition"
                                />
                                <button
                                    onClick={handleUpdateTelegramId}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition"
                                >
                                    Update
                                </button>
                            </div>
                        </section>

                        {/* Notification Settings */}
                        <section className="bg-white p-8 rounded-3xl border border-gray-200 shadow-lg space-y-6">
                            <div className="flex items-center gap-3">
                                <Bell className="text-yellow-500" />
                                <h2 className="text-2xl font-semibold text-gray-800">Notification Settings</h2>
                            </div>

                            <div className="flex items-center justify-between">
                <span className="text-base text-gray-600">
                  Alert me when a peer is available
                </span>
                                <button
                                    onClick={() => setAlertEnabled(!alertEnabled)}
                                    aria-pressed={alertEnabled}
                                    className={`relative w-14 h-8 flex items-center rounded-full p-1 transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                                        alertEnabled ? "bg-green-500" : "bg-gray-300"
                                    }`}
                                >
                  <span
                      className={`bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ${
                          alertEnabled ? "translate-x-6" : "translate-x-0"
                      }`}
                  ></span>
                                </button>
                            </div>
                        </section>

                        {/* Security Settings */}
                        <section className="bg-white p-8 rounded-3xl border border-gray-200 shadow-lg space-y-6">
                            <div className="flex items-center gap-3">
                                <Shield className="text-red-500" />
                                <h2 className="text-2xl font-semibold text-gray-800">Security</h2>
                            </div>

                            <div className="flex items-center justify-between">
                <span className="text-base text-gray-600">
                  Enable Two-Factor Authentication
                </span>
                                <button
                                    onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                                    aria-pressed={twoFactorEnabled}
                                    className={`relative w-14 h-8 flex items-center rounded-full p-1 transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                                        twoFactorEnabled ? "bg-green-500" : "bg-gray-300"
                                    }`}
                                >
                  <span
                      className={`bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ${
                          twoFactorEnabled ? "translate-x-6" : "translate-x-0"
                      }`}
                  ></span>
                                </button>
                            </div>

                            {twoFactorEnabled && (
                                <div className="mt-6">
                                    <label className="block text-sm mb-2 text-gray-700 font-medium">
                                        Enter PIN
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="Enter your PIN"
                                        value={pin}
                                        onChange={(e) => setPin(e.target.value)}
                                        className="p-4 border border-gray-300 rounded-lg w-full text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                                    />
                                </div>
                            )}
                        </section>

                        {/* PIN Setup */}
                        <section className="bg-white p-8 rounded-3xl border border-gray-200 shadow-lg space-y-6">
                            <div className="flex items-center gap-3">
                                <Lock className="text-purple-600" />
                                <h2 className="text-2xl font-semibold text-gray-800">PIN Setup</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <input
                                    type="password"
                                    placeholder="Enter New PIN"
                                    value={pin}
                                    onChange={(e) => setPin(e.target.value)}
                                    className="p-4 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600 transition"
                                />
                                <input
                                    type="password"
                                    placeholder="Confirm New PIN"
                                    value={confirmPin}
                                    onChange={(e) => setConfirmPin(e.target.value)}
                                    className="p-4 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600 transition"
                                />
                            </div>
                        </section>

                        {/* Save Button */}
                        <div className="flex justify-center">
                            <button
                                onClick={handleSaveSettings}
                                className="mt-8 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-12 rounded-2xl shadow-lg transition focus:outline-none focus:ring-4 focus:ring-green-400"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
