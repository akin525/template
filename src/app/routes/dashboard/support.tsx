import { useState } from "react";
import { MessageCircle, Send } from "lucide-react";
import DashboardHeader from "@/components/DashboardHeader";
import Sidebar from "@/components/Sidebar";
import { useUser } from "@/context/UserContext.tsx";

export default function SupportPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { user } = useUser() as any;

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 flex">
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-20 z-20 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className="flex-1 flex flex-col">
                <DashboardHeader setSidebarOpen={setSidebarOpen} />

                <main className="flex-1 overflow-y-auto py-10 px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-3xl font-extrabold mb-6 text-gray-800">Support Center</h1>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Telegram Channel */}
                            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-lg hover:shadow-2xl transition-shadow duration-300">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-xl font-semibold text-gray-900">Telegram Channel</h3>
                                    <Send className="text-blue-600 w-6 h-6" />
                                </div>
                                <p className="text-sm text-gray-600 mb-5">
                                    Stay updated with official announcements and news.
                                </p>
                                <a
                                    href={user?.telegramchannel}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full py-3 bg-blue-600 text-white rounded-xl text-center font-semibold hover:bg-blue-700 transition-colors duration-300"
                                >
                                    Join Channel
                                </a>
                            </div>

                            {/* Telegram General Group */}
                            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-lg hover:shadow-2xl transition-shadow duration-300">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-xl font-semibold text-gray-900">Telegram General Group</h3>
                                    <MessageCircle className="text-green-600 w-6 h-6" />
                                </div>
                                <p className="text-sm text-gray-600 mb-5">
                                    Chat, ask questions, and connect with the community.
                                </p>
                                <a
                                    href={user?.telegramgroup}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full py-3 bg-green-600 text-white rounded-xl text-center font-semibold hover:bg-green-700 transition-colors duration-300"
                                >
                                    Join Group
                                </a>
                            </div>
                        </div>

                        {/* Additional Support Info */}
                        <div className="mt-12 text-center text-gray-500 text-sm font-medium">
                            For further assistance, contact our admin via Telegram or email.
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
