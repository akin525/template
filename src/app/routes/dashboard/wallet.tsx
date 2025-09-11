import { useState, useEffect } from "react";
import { Link } from "react-router";
import {
    X,
    Wallet,
    TrendingUp,
    Activity,
    ArrowUpRight,
    ArrowDownLeft,
    Clock,
    CheckCircle,
    XCircle,
    Download,
    Search,
    DollarSign,
    Eye,
    EyeOff
} from "lucide-react";
import Sidebar from "@/components/Sidebar.tsx";
import DashboardHeader from "@/components/DashboardHeader.tsx";
import { getAuthToken } from "@/utils/auth.tsx";
import { useUser } from "@/context/UserContext.tsx";

interface Transaction {
    id: string;
    trx_type: string;
    created_at: string;
    status: "success" | "pending" | "failed";
    amount: string;
    bal_before: string;
    bal_after: string;
    wallet: string;
    trx: string;
}

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const token = getAuthToken();

const WalletPage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
    const [loading, setLoading] = useState(true);
    const [balanceVisible, setBalanceVisible] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const { user } = useUser();

    const filteredTransactions = transactions.filter(txn => {
        const matchesSearch = txn.trx_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
            txn.trx.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "all" || txn.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    useEffect(() => {
        async function fetchTransactions() {
            try {
                const res = await fetch(`${baseUrl}transactions`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const result = await res.json();
                if (result.success && result.data && result.data.data) {
                    setTransactions(result.data.data);
                }
            } catch (error) {
                console.error("Error fetching transactions:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchTransactions();
    }, []);

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "success":
                return <CheckCircle className="w-5 h-5 text-green-500" />;
            case "pending":
                return <Clock className="w-5 h-5 text-yellow-500" />;
            case "failed":
                return <XCircle className="w-5 h-5 text-red-500" />;
            default:
                return <Clock className="w-5 h-5 text-gray-400" />;
        }
    };

    const getTransactionIcon = (type: string) => {
        const isIncoming = type.toLowerCase().includes('deposit') ||
            type.toLowerCase().includes('receive') ||
            type.toLowerCase().includes('credit');
        return isIncoming ?
            <ArrowDownLeft className="w-5 h-5 text-green-500" /> :
            <ArrowUpRight className="w-5 h-5 text-red-500" />;
    };

    return (
        <div className="min-h-screen flex bg-gray-50">
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/20 z-20 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className="flex-1 flex flex-col overflow-hidden">
                <DashboardHeader setSidebarOpen={setSidebarOpen} />

                <main className="flex-1 overflow-y-auto p-6">
                    <div className="max-w-7xl mx-auto space-y-8">

                        {/* Header */}
                        <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-6">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">Wallet</h1>
                                <p className="text-gray-600">Manage your funds and view transaction history</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Link
                                    to="/ask"
                                    className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl font-medium transition-colors shadow-sm"
                                >
                                    Sell USDT
                                </Link>
                                <Link
                                    to="/bid"
                                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-colors shadow-sm"
                                >
                                    Buy USDT
                                </Link>
                            </div>
                        </div>

                        {/* Balance Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-blue-50 rounded-xl">
                                        <Wallet className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <button
                                        onClick={() => setBalanceVisible(!balanceVisible)}
                                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                    >
                                        {balanceVisible ?
                                            <Eye className="w-5 h-5 text-gray-400" /> :
                                            <EyeOff className="w-5 h-5 text-gray-400" />
                                        }
                                    </button>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                                    {balanceVisible ? `${user?.balance || 0} USDT` : '••••••'}
                                </h3>
                                <p className="text-sm text-gray-500">Available Balance</p>
                            </div>

                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-green-50 rounded-xl">
                                        <TrendingUp className="w-6 h-6 text-green-600" />
                                    </div>
                                    <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                                        +12.5%
                                    </span>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                                    {balanceVisible ? `${user?.earning || 0} USDT` : '••••••'}
                                </h3>
                                <p className="text-sm text-gray-500">Total Earnings</p>
                            </div>

                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-purple-50 rounded-xl">
                                        <Activity className="w-6 h-6 text-purple-600" />
                                    </div>
                                    <span className="text-sm font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                                        Active
                                    </span>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                                    {balanceVisible ? `${user?.runningInvest || 0} USDT` : '••••••'}
                                </h3>
                                <p className="text-sm text-gray-500">Running Investment</p>
                            </div>
                        </div>

                        {/* Transactions Section */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            {/* Transactions Header */}
                            <div className="p-6 border-b border-gray-100">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900 mb-1">Transaction History</h2>
                                        <p className="text-sm text-gray-500">{transactions.length} total transactions</p>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="relative">
                                            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                                            <input
                                                type="text"
                                                placeholder="Search transactions..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>

                                        <select
                                            value={statusFilter}
                                            onChange={(e) => setStatusFilter(e.target.value)}
                                            className="px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        >
                                            <option value="all">All Status</option>
                                            <option value="success">Success</option>
                                            <option value="pending">Pending</option>
                                            <option value="failed">Failed</option>
                                        </select>

                                        <button className="p-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                                            <Download className="w-5 h-5 text-gray-600" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Transactions List */}
                            <div className="p-6">
                                {loading ? (
                                    <div className="text-center py-12">
                                        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
                                        <p className="text-gray-500">Loading transactions...</p>
                                    </div>
                                ) : filteredTransactions.length === 0 ? (
                                    <div className="text-center py-12">
                                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Activity className="w-8 h-8 text-gray-400" />
                                        </div>
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions found</h3>
                                        <p className="text-gray-500 mb-6">
                                            {searchTerm || statusFilter !== "all"
                                                ? "Try adjusting your search or filter criteria"
                                                : "Start trading to see your transaction history"
                                            }
                                        </p>
                                        {!searchTerm && statusFilter === "all" && (
                                            <Link
                                                to="/ask"
                                                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors"
                                            >
                                                <DollarSign className="w-5 h-5" />
                                                Start Trading
                                            </Link>
                                        )}
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {filteredTransactions.map((txn) => (
                                            <div
                                                key={txn.id}
                                                onClick={() => setSelectedTransaction(txn)}
                                                className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl cursor-pointer transition-colors group"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-gray-200 transition-colors">
                                                        {getTransactionIcon(txn.trx_type)}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-900">{txn.trx_type}</p>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            {getStatusIcon(txn.status)}
                                                            <span className="text-sm text-gray-500">
                                                                {new Date(txn.created_at).toLocaleDateString()}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="text-right">
                                                    <p className="font-bold text-gray-900">
                                                        {parseFloat(txn.amount) >= 0 ? '+' : ''}{parseFloat(txn.amount).toFixed(2)} USDT
                                                    </p>
                                                    <span className={`text-xs px-2 py-1 rounded-full ${
                                                        txn.status === "success"
                                                            ? "bg-green-100 text-green-600"
                                                            : txn.status === "pending"
                                                                ? "bg-yellow-100 text-yellow-600"
                                                                : "bg-red-100 text-red-600"
                                                    }`}>
                                                        {txn.status.charAt(0).toUpperCase() + txn.status.slice(1)}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Transaction Details Modal */}
            {selectedTransaction && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-100">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-bold text-gray-900">Transaction Details</h3>
                                <button
                                    onClick={() => setSelectedTransaction(null)}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <X className="w-5 h-5 text-gray-500" />
                                </button>
                            </div>
                        </div>

                        <div className="p-6 space-y-4">
                            <DetailRow label="Transaction Type" value={selectedTransaction.trx_type} />
                            <DetailRow
                                label="Status"
                                value={
                                    <div className="flex items-center gap-2">
                                        {getStatusIcon(selectedTransaction.status)}
                                        <span className={`font-medium ${
                                            selectedTransaction.status === "success" ? "text-green-600"
                                                : selectedTransaction.status === "pending" ? "text-yellow-600"
                                                    : "text-red-600"
                                        }`}>
                                            {selectedTransaction.status.charAt(0).toUpperCase() + selectedTransaction.status.slice(1)}
                                        </span>
                                    </div>
                                }
                            />
                            <DetailRow
                                label="Amount"
                                value={`${parseFloat(selectedTransaction.amount).toFixed(2)} USDT`}
                            />
                            <DetailRow
                                label="Balance Before"
                                value={`${parseFloat(selectedTransaction.bal_before).toFixed(2)} USDT`}
                            />
                            <DetailRow
                                label="Balance After"
                                value={`${parseFloat(selectedTransaction.bal_after).toFixed(2)} USDT`}
                            />
                            <DetailRow label="Wallet" value={selectedTransaction.wallet} />
                            <DetailRow
                                label="Transaction ID"
                                value={
                                    <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                                        {selectedTransaction.trx}
                                    </span>
                                }
                            />
                            <DetailRow
                                label="Date & Time"
                                value={new Date(selectedTransaction.created_at).toLocaleString()}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const DetailRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
    <div className="flex justify-between items-start py-3 border-b border-gray-100 last:border-none">
        <span className="text-sm font-medium text-gray-500">{label}</span>
        <span className="text-sm text-gray-900 text-right max-w-[60%]">{value}</span>
    </div>
);

export default WalletPage;
