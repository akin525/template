import { useEffect, useState } from "react";
import { getAuthToken } from "@/utils/auth.tsx";
import Sidebar from "@/components/Sidebar.tsx";
import DashboardHeader from "@/components/DashboardHeader.tsx";
import { useNavigate } from "react-router";
import { FiClock, FiDollarSign, FiCheckCircle, FiTrendingUp, FiCalendar, FiRefreshCcw } from "react-icons/fi";

interface Investment {
    id: number;
    amount: number;
    expected_profit: number;
    expected_return: number;
    return_date: string;
    reference: string;
    status: string;
    created_at: string;
}

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const token = getAuthToken();

export default function InvestmentsPage() {
    const [investments, setInvestments] = useState<Investment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchInvestments = async () => {
            try {
                const res = await fetch(`${baseUrl}investments`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!res.ok) throw new Error("Failed to fetch investments");

                const result = await res.json();
                setInvestments(result?.data?.data || []);
            } catch (err: any) {
                setError(err.message || "An error occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchInvestments();
    }, []);

    const getStatusColor = (status: string) => {
        switch (status) {
            case "completed":
                return "text-green-600 bg-green-100";
            case "running":
                return "text-yellow-600 bg-yellow-100";
            default:
                return "text-red-600 bg-red-100";
        }
    };

    return (
        <div className="min-h-screen flex bg-gradient-to-br from-white to-gray-100 text-gray-900">
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-30 z-20 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className="flex-1 flex flex-col overflow-hidden">
                <DashboardHeader setSidebarOpen={setSidebarOpen} />

                <main className="p-6 max-w-7xl mx-auto w-full">
                    <h1 className="text-4xl font-extrabold text-center mb-8 tracking-tight">
                        Your Energy Nodes
                    </h1>

                    {loading ? (
                        <p className="text-center text-gray-500 text-lg flex items-center justify-center space-x-2">
                            <FiRefreshCcw className="animate-spin" />
                            <span>Loading investments...</span>
                        </p>
                    ) : error ? (
                        <p className="text-center text-red-500 text-lg">{error}</p>
                    ) : investments.length === 0 ? (
                        <p className="text-center text-gray-500 text-lg">
                            No energy nodes found.
                        </p>
                    ) : (
                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {investments.map((inv) => (
                                <div
                                    key={inv.id}
                                    onClick={() => navigate(`/investments/${inv.id}`)}
                                    className="cursor-pointer bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition-transform transform hover:scale-[1.03]"
                                >
                                    <div className="flex justify-between items-center mb-4">
                                        <p className="text-sm text-gray-500 uppercase tracking-wide font-semibold">
                                            Reference
                                        </p>
                                        <span className="text-xs text-gray-400 italic select-all">{inv.reference}</span>
                                    </div>

                                    <div className="space-y-3 text-sm text-gray-700">
                                        <div className="flex items-center space-x-2">
                                            <FiClock className="text-gray-500" />
                                            <p>Created: <time dateTime={inv.created_at}>{new Date(inv.created_at).toLocaleDateString()}</time></p>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <FiCalendar className="text-gray-500" />
                                            <p>Return Date: <time dateTime={inv.return_date}>{new Date(inv.return_date).toLocaleDateString()}</time></p>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <FiDollarSign className="text-blue-600" />
                                            <p className="font-semibold text-blue-600">{Number(inv.amount).toLocaleString()} USDT</p>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <FiTrendingUp className="text-green-600" />
                                            <p className="font-semibold text-green-600">+{Number(inv.expected_profit).toLocaleString()} USDT</p>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <FiCheckCircle className="text-purple-600" />
                                            <p className="font-semibold text-purple-600">{Number(inv.expected_return).toLocaleString()} USDT</p>
                                        </div>
                                    </div>

                                    <div
                                        className={`mt-6 inline-block px-4 py-1 rounded-full font-semibold text-sm ${getStatusColor(
                                            inv.status
                                        )}`}
                                    >
                                        Status: {inv.status.charAt(0).toUpperCase() + inv.status.slice(1)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
