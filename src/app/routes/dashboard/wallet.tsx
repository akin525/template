import { useState, useEffect } from "react";
import { Link } from "react-router";
import { X, ArrowDown, Wallet2 } from "lucide-react";
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
    const { user } = useUser();

    const summary = [
        { label: "Total Balance", value: user?.balance, icon: <Wallet2 className="w-8 h-8 text-blue-400" /> },
        { label: "Total Earning", value: user?.earning, icon: <ArrowDown className="w-8 h-8 text-green-400" /> },
        { label: "Running Invest", value: user?.runningInvest, icon: <ArrowDown className="w-8 h-8 text-yellow-400" /> },
    ];

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

    return (
        <div className="min-h-screen flex bg-gradient-to-br from-white to-gray-100 text-gray-800">
            {/* Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/10 z-20 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)}/>

            <div className="flex-1 flex flex-col overflow-hidden">
                <DashboardHeader setSidebarOpen={setSidebarOpen}/>

                <main className="flex-1 overflow-y-auto p-8 max-w-7xl mx-auto">
                    {/* Header */}
                    <div
                        className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center mb-12 gap-4">
                        <h1 className="text-4xl font-extrabold tracking-tight">Wallet Overview</h1>
                        <nav className="flex gap-4">
                            <Link to="/ask"
                                  className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-semibold shadow-md">
                                Ask
                            </Link>
                            <Link to="/bid"
                                  className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg text-sm font-semibold shadow-md">
                                Bids
                            </Link>
                            <Link to="/history"
                                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-5 py-2 rounded-lg text-sm font-semibold shadow-md">
                                History
                            </Link>
                        </nav>
                    </div>

                    {/* Summary Cards */}
                    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {summary.map((item, idx) => (
                            <div key={idx}
                                 className="bg-white rounded-3xl p-6 flex items-center justify-between border border-gray-200 shadow hover:shadow-md transition">
                                <div>
                                    <p className="text-gray-500 uppercase tracking-wider text-xs font-semibold">{item.label}</p>
                                    <h2 className="text-3xl font-bold mt-1">{item.value ?? "0"} USDT</h2>
                                </div>
                                <div className="p-3 bg-gray-100 rounded-full">{item.icon}</div>
                            </div>
                        ))}
                    </section>

                    {/* Transactions Table */}
                    <section>
                        <h2 className="text-2xl font-bold mb-6">Recent Transactions</h2>
                        <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow">
                            {loading ? (
                                <p className="text-center p-10 text-gray-500 font-medium">Loading...</p>
                            ) : transactions.length === 0 ? (
                                <p className="text-center p-10 text-gray-500 font-medium">No transactions found.</p>
                            ) : (
                                <table className="min-w-full table-fixed border-collapse">
                                    <thead className="bg-gray-100 sticky top-0">
                                    <tr>
                                        {["Type", "Date", "Status", "Amount"].map((header) => (
                                            <th key={header}
                                                className="py-4 px-6 text-left text-gray-600 font-semibold text-sm uppercase tracking-wide">
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {transactions.map((txn) => (
                                        <tr key={txn.id}
                                            className="border-t border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
                                            onClick={() => setSelectedTransaction(txn)}>
                                            <td className="py-3 px-6 font-medium">{txn.trx_type}</td>
                                            <td className="px-6">{new Date(txn.created_at).toLocaleDateString()}</td>
                                            <td className={`px-6 font-semibold ${
                                                txn.status === "success" ? "text-green-600"
                                                    : txn.status === "pending" ? "text-yellow-600"
                                                        : "text-red-600"
                                            }`}>
                                                {txn.status.charAt(0).toUpperCase() + txn.status.slice(1)}
                                            </td>
                                            <td className="px-6 font-mono">{parseFloat(txn.amount).toFixed(2)} USDT</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </section>

                    {/* Slide-In Transaction Details Drawer */}
                    {selectedTransaction && (
                        <aside className="fixed inset-0 z-50 flex justify-end bg-black/10 backdrop-blur-sm">
                            <div
                                className="bg-white max-w-md w-full h-full p-8 overflow-y-auto shadow-2xl flex flex-col">
                                <header className="flex items-center justify-between mb-8">
                                    <h3 className="text-2xl font-bold text-gray-800">Transaction Details</h3>
                                    <button aria-label="Close details" onClick={() => setSelectedTransaction(null)}
                                            className="text-gray-500 hover:text-gray-800 transition">
                                        <X className="w-7 h-7"/>
                                    </button>
                                </header>
                                <div className="space-y-5 text-sm text-gray-600">
                                    <DetailRow label="Type" value={selectedTransaction.trx_type}/>
                                    <DetailRow label="Status" value={
                                        <span className={`font-semibold ${
                                            selectedTransaction.status === "success" ? "text-green-600"
                                                : selectedTransaction.status === "pending" ? "text-yellow-600"
                                                    : "text-red-600"
                                        }`}>
                                    {selectedTransaction.status.charAt(0).toUpperCase() + selectedTransaction.status.slice(1)}
                                </span>
                                    }/>
                                    <DetailRow label="Amount"
                                               value={`${parseFloat(selectedTransaction.amount).toFixed(2)} USDT`}/>
                                    <DetailRow label="Balance Before" value={selectedTransaction.bal_before}/>
                                    <DetailRow label="Balance After" value={selectedTransaction.bal_after}/>
                                    <DetailRow label="Wallet" value={selectedTransaction.wallet}/>
                                    <DetailRow label="Transaction ID" value={selectedTransaction.trx}/>
                                    <DetailRow label="Date"
                                               value={new Date(selectedTransaction.created_at).toLocaleString()}/>
                                </div>
                            </div>
                        </aside>
                    )}
                </main>
            </div>
        </div>

    );
};

const DetailRow = ({label, value}: { label: string; value: React.ReactNode }) => (
    <div className="flex justify-between border-b border-gray-700 pb-3 last:border-none">
        <span className="font-semibold text-gray-400">{label}:</span>
        <span className="font-mono">{value}</span>
    </div>
);

export default WalletPage;
