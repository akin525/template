import { useState } from "react";
import { getAuthToken } from "@/utils/auth";
import DashboardHeader from "@/components/DashboardHeader";
import Sidebar from "@/components/Sidebar";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const token = getAuthToken();

export default function BidStatusSearch() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [status, setStatus] = useState("pending");
    const [bids, setBids] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchBidsByStatus = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${baseUrl}bids/${status}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            setBids(data.data?.data || []);
        } catch (err) {
            console.error("Failed to fetch bids by status", err);
            setBids([]);
        } finally {
            setLoading(false);
        }
    };

    const renderCard = (item: any) => (
        <Link to={`/bids/${item.id}`} key={item.id}>
            <div className="bg-[#1a202c] border border-[#2D3748] p-5 rounded-xl hover:border-blue-500 hover:shadow-xl transition-all">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400 text-sm">Bid ID</span>
                    <span className="text-white text-sm font-medium">{item.id}</span>
                </div>
                <p className="text-2xl font-bold text-white mb-1">{item.amount} USDT</p>
                <p className="text-xs text-gray-400 mb-2">{formatDistanceToNow(new Date(item.created_at))} ago</p>
                <p className="text-sm text-gray-400">TRX: <span className="text-white">{item.trx}</span></p>
                <p className="mt-1 text-sm">
                    Status:{" "}
                    <span className={`font-semibold ${
                        item.status === "pending"
                            ? "text-yellow-400"
                            : item.status === "completed"
                                ? "text-green-500"
                                : "text-red-500"
                    }`}>
                        {item.status}
                    </span>
                </p>
            </div>
        </Link>
    );

    return (
        <div className="min-h-screen bg-[#0b1120] text-white flex">
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className="flex-1 flex flex-col">
                <DashboardHeader setSidebarOpen={setSidebarOpen} />

                <main className="flex-1 overflow-y-auto py-12 px-6 lg:px-16">
                    <div className="max-w-5xl mx-auto">
                        <h1 className="text-4xl font-extrabold text-center mb-10">🎯 Filter Bids by Status</h1>

                        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-10">
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="bg-[#1F2937] border border-gray-600 text-white px-4 py-2 rounded-md w-full md:w-60 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                                {/* Add more statuses as needed */}
                            </select>

                            <button
                                onClick={fetchBidsByStatus}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-md transition-all"
                            >
                                🔍 Search
                            </button>
                        </div>

                        {loading ? (
                            <p className="text-center text-gray-400">Loading bids...</p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {bids.length ? (
                                    bids.map((bid) => renderCard(bid))
                                ) : (
                                    <p className="text-gray-500 col-span-full text-center">No bids found for the selected status.</p>
                                )}
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}
