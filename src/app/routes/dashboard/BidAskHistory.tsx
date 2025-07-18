import { useState, useEffect } from "react";
import { getAuthToken } from "@/utils/auth";
import DashboardHeader from "@/components/DashboardHeader";
import Sidebar from "@/components/Sidebar";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const token = getAuthToken();

export default function BidAskHistory() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [bids, setBids] = useState<any[]>([]);
    const [asks, setAsks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<"bids" | "asks">("bids");
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    useEffect(() => {
        fetchData(currentPage);
    }, [activeTab, currentPage]);

    const fetchData = async (page = 1) => {
        setLoading(true);
        try {
            const endpoint = activeTab === "bids" ? "bids" : "asks";
            const res = await fetch(`${baseUrl}${endpoint}?page=${page}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            const items = data.data?.data || [];
            activeTab === "bids" ? setBids(items) : setAsks(items);
            setLastPage(data.data?.last_page || 1);
            setCurrentPage(data.data?.current_page || 1);
        } catch (err) {
            console.error("Failed to fetch history", err);
        } finally {
            setLoading(false);
        }
    };

    const renderCard = (item: any, type: "bid" | "ask") => (
        <Link to={`/${type}s/${item.id}`} key={item.id}>
            <div className="p-5 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-transform hover:scale-[1.02] cursor-pointer">
                <p className="text-gray-900 font-semibold text-lg">{item.amount} USDT</p>
                <p className="text-gray-500 text-xs mt-1">
                    {formatDistanceToNow(new Date(item.created_at))} ago
                </p>
                <p className="text-gray-600 text-sm mt-2">TRX: <span className="text-gray-800 font-medium">{item.trx}</span></p>
                <p className="text-gray-600 text-sm mt-1">
                    Status:{" "}
                    <span
                        className={`font-semibold ${
                            item.status === "pending"
                                ? "text-yellow-500"
                                : item.status === "success"
                                    ? "text-green-600"
                                    : item.status === "paired"
                                        ? "text-blue-500"
                                        : item.status === "completed"
                                            ? "text-blue-700"
                                            : item.status === "partly_paired"
                                                ? "text-purple-500"
                                                : "text-red-500"
                        }`}
                    >
                        {item.status}
                    </span>
                </p>
            </div>
        </Link>
    );

    const Pagination = () => (
        <div className="flex justify-center mt-8 space-x-4">
            <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white text-sm disabled:opacity-50"
            >
                Prev
            </button>
            <span className="text-gray-600 text-sm self-center">
                Page {currentPage} of {lastPage}
            </span>
            <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, lastPage))}
                disabled={currentPage === lastPage}
                className="px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white text-sm disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex">
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-30 z-20 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className="flex-1 flex flex-col">
                <DashboardHeader setSidebarOpen={setSidebarOpen} />

                <main className="flex-1 overflow-y-auto py-10 px-6 lg:px-10">
                    <div className="max-w-7xl mx-auto">
                        <h1 className="text-2xl font-semibold mb-8 text-center text-blue-700">Bid & Ask History</h1>

                        <div className="flex space-x-4 justify-center bg-white border border-gray-200 p-2 rounded-xl max-w-md mx-auto mb-10 shadow-sm">
                            <button
                                onClick={() => {
                                    setActiveTab("bids");
                                    setCurrentPage(1);
                                }}
                                className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
                                    activeTab === "bids"
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-100 text-gray-600 hover:bg-blue-100"
                                }`}
                            >
                                Bids
                            </button>
                            <button
                                onClick={() => {
                                    setActiveTab("asks");
                                    setCurrentPage(1);
                                }}
                                className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
                                    activeTab === "asks"
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-100 text-gray-600 hover:bg-blue-100"
                                }`}
                            >
                                Asks
                            </button>
                        </div>

                        {loading ? (
                            <p className="text-center text-gray-500">Loading history...</p>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {(activeTab === "bids" ? bids : asks).length ? (
                                        (activeTab === "bids" ? bids : asks).map((item) =>
                                            renderCard(item, activeTab === "bids" ? "bid" : "ask")
                                        )
                                    ) : (
                                        <p className="text-gray-500 text-center col-span-full">No {activeTab} found.</p>
                                    )}
                                </div>
                                <Pagination />
                            </>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}
