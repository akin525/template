import { useState, useEffect } from "react";
import { getAuthToken } from "@/utils/auth";
import DashboardHeader from "@/components/DashboardHeader";
import Sidebar from "@/components/Sidebar";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router";
import {
    TrendingUp,
    TrendingDown,
    Clock,
    CheckCircle,
    XCircle,
    Users,
    Search,
    Activity,
    ChevronLeft,
    ChevronRight,
    Eye,
    MoreHorizontal
} from "lucide-react";

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
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

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

    const getStatusConfig = (status: string) => {
        const configs = {
            pending: { color: "text-yellow-600", bg: "bg-yellow-50", icon: Clock, label: "Pending" },
            success: { color: "text-green-600", bg: "bg-green-50", icon: CheckCircle, label: "Success" },
            paired: { color: "text-blue-600", bg: "bg-blue-50", icon: Users, label: "Paired" },
            completed: { color: "text-emerald-600", bg: "bg-emerald-50", icon: CheckCircle, label: "Completed" },
            partly_paired: { color: "text-purple-600", bg: "bg-purple-50", icon: Activity, label: "Partly Paired" },
            failed: { color: "text-red-600", bg: "bg-red-50", icon: XCircle, label: "Failed" },
        };
        return configs[status as keyof typeof configs] || configs.pending;
    };

    const filteredItems = (activeTab === "bids" ? bids : asks).filter(item => {
        const matchesSearch = item.trx.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.amount.toString().includes(searchTerm);
        const matchesStatus = statusFilter === "all" || item.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const renderCard = (item: any, type: "bid" | "ask") => {
        const statusConfig = getStatusConfig(item.status);
        const StatusIcon = statusConfig.icon;

        return (
            <div key={item.id} className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-xl ${type === "bid" ? "bg-green-50" : "bg-blue-50"}`}>
                            {type === "bid" ?
                                <TrendingUp className="w-6 h-6 text-green-600" /> :
                                <TrendingDown className="w-6 h-6 text-blue-600" />
                            }
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">{item.amount} USDT</h3>
                            <p className="text-sm text-gray-500">
                                {formatDistanceToNow(new Date(item.created_at))} ago
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${statusConfig.bg}`}>
                            <StatusIcon className={`w-4 h-4 ${statusConfig.color}`} />
                            <span className={`text-sm font-medium ${statusConfig.color}`}>
                                {statusConfig.label}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Transaction ID</span>
                        <span className="font-mono text-gray-900 bg-gray-50 px-2 py-1 rounded text-xs">
                            {item.trx.slice(0, 12)}...
                        </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Type</span>
                        <span className={`font-medium ${type === "bid" ? "text-green-600" : "text-blue-600"}`}>
                            {type === "bid" ? "Buy Order" : "Sell Order"}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Link
                        to={`/${type}s/${item.id}`}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-xl font-medium transition-colors group-hover:bg-gray-100"
                    >
                        <Eye className="w-4 h-4" />
                        View Details
                    </Link>
                    <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                        <MoreHorizontal className="w-5 h-5 text-gray-400" />
                    </button>
                </div>
            </div>
        );
    };

    const Pagination = () => (
        <div className="flex items-center justify-between mt-8">
            <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>Showing page {currentPage} of {lastPage}</span>
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                </button>

                <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, lastPage) }, (_, i) => {
                        const page = i + 1;
                        return (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`w-10 h-10 rounded-xl text-sm font-medium transition-colors ${
                                    currentPage === page
                                        ? "bg-blue-500 text-white"
                                        : "text-gray-700 hover:bg-gray-100"
                                }`}
                            >
                                {page}
                            </button>
                        );
                    })}
                </div>

                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, lastPage))}
                    disabled={currentPage === lastPage}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    Next
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/20 z-20 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className="flex-1 flex flex-col">
                <DashboardHeader setSidebarOpen={setSidebarOpen} />

                <main className="flex-1 overflow-y-auto p-6">
                    <div className="max-w-7xl mx-auto space-y-8">

                        {/* Header */}
                        <div className="text-center">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Trading History</h1>
                            <p className="text-gray-600">View and manage your bid and ask orders</p>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-green-50 rounded-xl">
                                        <TrendingUp className="w-5 h-5 text-green-600" />
                                    </div>
                                    <span className="text-sm font-medium text-gray-600">Total Bids</span>
                                </div>
                                <p className="text-2xl font-bold text-gray-900">{bids.length}</p>
                            </div>

                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-blue-50 rounded-xl">
                                        <TrendingDown className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <span className="text-sm font-medium text-gray-600">Total Asks</span>
                                </div>
                                <p className="text-2xl font-bold text-gray-900">{asks.length}</p>
                            </div>

                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-purple-50 rounded-xl">
                                        <Activity className="w-5 h-5 text-purple-600" />
                                    </div>
                                    <span className="text-sm font-medium text-gray-600">Active Orders</span>
                                </div>
                                <p className="text-2xl font-bold text-gray-900">
                                    {[...bids, ...asks].filter(item => item.status === 'pending').length}
                                </p>
                            </div>

                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-emerald-50 rounded-xl">
                                        <CheckCircle className="w-5 h-5 text-emerald-600" />
                                    </div>
                                    <span className="text-sm font-medium text-gray-600">Completed</span>
                                </div>
                                <p className="text-2xl font-bold text-gray-900">
                                    {[...bids, ...asks].filter(item => item.status === 'completed').length}
                                </p>
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                                {/* Tab Switcher */}
                                <div className="flex items-center bg-gray-100 p-1 rounded-xl">
                                    <button
                                        onClick={() => {
                                            setActiveTab("bids");
                                            setCurrentPage(1);
                                        }}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                            activeTab === "bids"
                                                ? "bg-white text-green-600 shadow-sm"
                                                : "text-gray-600 hover:text-green-600"
                                        }`}
                                    >
                                        <TrendingUp className="w-4 h-4" />
                                        Buy Orders
                                    </button>
                                    <button
                                        onClick={() => {
                                            setActiveTab("asks");
                                            setCurrentPage(1);
                                        }}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                            activeTab === "asks"
                                                ? "bg-white text-blue-600 shadow-sm"
                                                : "text-gray-600 hover:text-blue-600"
                                        }`}
                                    >
                                        <TrendingDown className="w-4 h-4" />
                                        Sell Orders
                                    </button>
                                </div>

                                {/* Search and Filter */}
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                                        <input
                                            type="text"
                                            placeholder="Search by TRX ID or amount..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                                        />
                                    </div>

                                    <select
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                        className="px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="all">All Status</option>
                                        <option value="pending">Pending</option>
                                        <option value="success">Success</option>
                                        <option value="paired">Paired</option>
                                        <option value="completed">Completed</option>
                                        <option value="partly_paired">Partly Paired</option>
                                        <option value="failed">Failed</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        {loading ? (
                            <div className="text-center py-12">
                                <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
                                <p className="text-gray-500">Loading your trading history...</p>
                            </div>
                        ) : filteredItems.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    {activeTab === "bids" ?
                                        <TrendingUp className="w-8 h-8 text-gray-400" /> :
                                        <TrendingDown className="w-8 h-8 text-gray-400" />
                                    }
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    No {activeTab === "bids" ? "buy orders" : "sell orders"} found
                                </h3>
                                <p className="text-gray-500 mb-6">
                                    {searchTerm || statusFilter !== "all"
                                        ? "Try adjusting your search or filter criteria"
                                        : `Start creating ${activeTab === "bids" ? "buy" : "sell"} orders to see them here`
                                    }
                                </p>
                                {!searchTerm && statusFilter === "all" && (
                                    <div className="flex items-center justify-center gap-4">
                                        <Link
                                            to="/bid"
                                            className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-colors"
                                        >
                                            <TrendingUp className="w-5 h-5" />
                                            Create Buy Order
                                        </Link>
                                        <Link
                                            to="/ask"
                                            className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors"
                                        >
                                            <TrendingDown className="w-5 h-5" />
                                            Create Sell Order
                                        </Link>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredItems.map((item) =>
                                        renderCard(item, activeTab === "bids" ? "bid" : "ask")
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
