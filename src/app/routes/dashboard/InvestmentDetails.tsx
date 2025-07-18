import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getAuthToken } from "@/utils/auth.tsx";
import Sidebar from "@/components/Sidebar.tsx";
import DashboardHeader from "@/components/DashboardHeader.tsx";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export default function InvestmentDetails() {
    const { id } = useParams();
    const [investment, setInvestment] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const res = await fetch(`${baseUrl}investment-details/${id}`, {
                    headers: {
                        Authorization: `Bearer ${getAuthToken()}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!res.ok) throw new Error("Failed to fetch investment details");

                const result = await res.json();
                setInvestment(result?.data);
            } catch (err: any) {
                setError(err.message || "An error occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [id]);

    const StatusBadge = ({ status }: { status: string }) => {
        let color = "bg-gray-300 text-gray-700";
        if (status === "running") color = "bg-yellow-400 text-black";
        else if (status === "completed") color = "bg-green-500 text-white";
        else if (status === "failed") color = "bg-red-500 text-white";
        return (
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${color}`}>
                {status.toUpperCase()}
            </span>
        );
    };

    return (
        <div className="min-h-screen flex bg-gray-100 text-gray-900">
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-30 z-20 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className="flex-1 flex flex-col overflow-hidden">
                <DashboardHeader setSidebarOpen={setSidebarOpen} />
                <main className="p-6 max-w-5xl mx-auto w-full">
                    <h1 className="text-4xl font-bold text-center mb-10 tracking-tight">
                        🧾 Investment Overview
                    </h1>

                    {loading ? (
                        <p className="text-center text-gray-600">Loading details...</p>
                    ) : error ? (
                        <p className="text-center text-red-600">Error: {error}</p>
                    ) : !investment ? (
                        <p className="text-center text-gray-600">No investment found.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-300">
                                <h2 className="text-xl font-bold mb-4">📦 Node Details</h2>
                                <div className="space-y-3 text-sm">
                                    <Detail label="Reference" value={investment.reference} />
                                    <Detail label="Amount" value={`${investment.amount} USDT`} />
                                    <Detail label="Expected Profit" value={`${investment.expected_profit} USDT`} />
                                    <Detail label="Expected Return" value={`${investment.expected_return} USDT`} />
                                    <Detail
                                        label="Return Date"
                                        value={new Date(investment.return_date).toLocaleString()}
                                    />
                                    <Detail
                                        label="Created"
                                        value={new Date(investment.created_at).toLocaleString()}
                                    />
                                    <Detail label="Status" value={<StatusBadge status={investment.status} />} />
                                </div>
                            </div>

                            {investment.bid && (
                                <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-300">
                                    <h2 className="text-xl font-bold mb-4">💰 Bid Details</h2>
                                    <div className="space-y-3 text-sm">
                                        <Detail label="Transaction ID" value={investment.bid.trx} />
                                        <Detail label="Bid Amount" value={`${investment.bid.amount} USDT`} />
                                        <Detail label="Paired Amount" value={`${investment.bid.paired_amount} USDT`} />
                                        <Detail label="Amount to Pair" value={`${investment.bid.amount_to_pair} USDT`} />
                                        <Detail
                                            label="Created"
                                            value={new Date(investment.bid.created_at).toLocaleString()}
                                        />
                                        <Detail label="Status" value={<StatusBadge status={investment.bid.status} />} />
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

function Detail({ label, value }: { label: string; value: any }) {
    return (
        <div className="flex justify-between items-center">
            <span className="text-gray-600">{label}:</span>
            <span className="font-medium">{value}</span>
        </div>
    );
}
