import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { getAuthToken } from "@/utils/auth";
import DashboardHeader from "@/components/DashboardHeader";
import Sidebar from "@/components/Sidebar";
import { Dialog } from "@headlessui/react";
import { toast } from "react-toastify";
import {
    Copy,
    ArrowLeft,
    Clock,
    CheckCircle,
    XCircle,
    AlertCircle,
    User,
    Wallet,
    Calendar,
    DollarSign,
    Hash,
    Send,
    Eye,
    RefreshCw,
    TrendingUp,
    Users,
    Activity,
    X
} from "lucide-react";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const token = getAuthToken();

export default function BidDetail() {
    const { id } = useParams();
    const [bid, setBid] = useState<any>(null);
    const [peers, setPeers] = useState<any[]>([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedPeerId, setSelectedPeerId] = useState<number | null>(null);
    const [hashTag, setHashTag] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchBid = async () => {
            try {
                const res = await fetch(`${baseUrl}bid-details/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = await res.json();
                setBid(data.data);
                setPeers(data.peers || []);
            } catch (err) {
                console.error("Failed to fetch bid", err);
            } finally {
                setLoading(false);
            }
        };

        fetchBid();
    }, [id]);

    const submitHashTag = async () => {
        if (!selectedPeerId || !hashTag.trim()) {
            toast.error("Please enter a valid payment hash tag.");
            return;
        }

        setIsSubmitting(true);

        try {
            const res = await fetch(`${baseUrl}bid-payment/${id}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ hash_tag: hashTag })
            });

            const result = await res.json();
            if (result.success) {
                toast.success("Hash tag submitted successfully.");
                setHashTag("");
                setShowModal(false);
                window.location.reload();
            } else {
                toast.error("Failed to submit hash tag.");
            }
        } catch (err) {
            toast.error("An error occurred.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const getStatusConfig = (status: string, isPayment = false) => {
        const configs = {
            awaiting_payment: { color: "text-yellow-600", bg: "bg-yellow-50", icon: Clock, border: "border-yellow-200" },
            success: { color: "text-green-600", bg: "bg-green-50", icon: CheckCircle, border: "border-green-200" },
            paired: { color: "text-blue-600", bg: "bg-blue-50", icon: Users, border: "border-blue-200" },
            completed: { color: "text-emerald-600", bg: "bg-emerald-50", icon: CheckCircle, border: "border-emerald-200" },
            approved: { color: "text-green-600", bg: "bg-green-50", icon: CheckCircle, border: "border-green-200" },
            payment_confirmed: { color: "text-blue-600", bg: "bg-blue-50", icon: CheckCircle, border: "border-blue-200" },
            payment_submitted: { color: "text-purple-600", bg: "bg-purple-50", icon: Send, border: "border-purple-200" },
            confirmed: { color: "text-green-600", bg: "bg-green-50", icon: CheckCircle, border: "border-green-200" },
            pending: { color: "text-yellow-600", bg: "bg-yellow-50", icon: Clock, border: "border-yellow-200" },
            failed: { color: "text-red-600", bg: "bg-red-50", icon: XCircle, border: "border-red-200" },
            undecided: { color: "text-gray-600", bg: "bg-gray-50", icon: AlertCircle, border: "border-gray-200" },
        };
        return configs[status?.toLowerCase()] || configs.pending;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex">
                <Sidebar isOpen={false} onClose={() => {}} />
                <div className="flex-1 flex flex-col">
                    <DashboardHeader setSidebarOpen={setSidebarOpen} />
                    <div className="flex-1 flex items-center justify-center">
                        <div className="text-center">
                            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-gray-500">Loading bid details...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!bid) {
        return (
            <div className="min-h-screen bg-gray-50 flex">
                <Sidebar isOpen={false} onClose={() => {}} />
                <div className="flex-1 flex flex-col">
                    <DashboardHeader setSidebarOpen={setSidebarOpen} />
                    <div className="flex-1 flex items-center justify-center">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <XCircle className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Bid Not Found</h3>
                            <p className="text-gray-500">The bid you're looking for doesn't exist or has been removed.</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {sidebarOpen && (
                <div className="fixed inset-0 bg-black/20 z-20 lg:hidden"
                     onClick={() => setSidebarOpen(false)}/>
            )}
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)}/>

            <div className="flex-1 flex flex-col">
                <DashboardHeader setSidebarOpen={setSidebarOpen}/>

                <main className="flex-1 overflow-y-auto p-6">
                    <div className="max-w-6xl mx-auto space-y-8">

                        {/* Header */}
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => window.history.back()}
                                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5 text-gray-600" />
                            </button>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Buy Order Details</h1>
                                <p className="text-gray-600 mt-1">Order ID: {bid.trx}</p>
                            </div>
                        </div>

                        {/* Main Bid Info */}
                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-green-50 rounded-xl">
                                    <TrendingUp className="w-8 h-8 text-green-600" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">{bid.amount} USDT</h2>
                                    <p className="text-gray-500">Buy Order Amount</p>
                                </div>
                                <div className="ml-auto">
                                    <StatusBadge status={bid.status} />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <DetailCard
                                    icon={<DollarSign className="w-5 h-5 text-blue-600" />}
                                    label="Amount to Pair"
                                    value={`${bid.amount_to_pair} USDT`}
                                    bgColor="bg-blue-50"
                                />
                                <DetailCard
                                    icon={<Activity className="w-5 h-5 text-purple-600" />}
                                    label="Paired Amount"
                                    value={`${bid.paired_amount} USDT`}
                                    bgColor="bg-purple-50"
                                />
                                <DetailCard
                                    icon={<Hash className="w-5 h-5 text-gray-600" />}
                                    label="Transaction ID"
                                    value={bid.trx}
                                    bgColor="bg-gray-50"
                                    copyable
                                />
                                <DetailCard
                                    icon={<Calendar className="w-5 h-5 text-orange-600" />}
                                    label="Created At"
                                    value={new Date(bid.created_at).toLocaleDateString()}
                                    bgColor="bg-orange-50"
                                />
                            </div>
                        </div>

                        {/* Peers Section */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-6 border-b border-gray-100">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-blue-50 rounded-xl">
                                            <Users className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900">Matched Peers</h3>
                                            <p className="text-sm text-gray-500">{peers.length} peer(s) found</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => window.location.reload()}
                                        className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                                        title="Refresh"
                                    >
                                        <RefreshCw className="w-5 h-5 text-gray-600" />
                                    </button>
                                </div>
                            </div>

                            <div className="p-6">
                                {peers.length === 0 ? (
                                    <div className="text-center py-12">
                                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Users className="w-8 h-8 text-gray-400" />
                                        </div>
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">No Peers Yet</h3>
                                        <p className="text-gray-500">Your order is waiting to be matched with sellers.</p>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        {peers.map((peer) => (
                                            <PeerCard
                                                key={peer.id}
                                                peer={peer}
                                                onSubmitHash={() => {
                                                    setSelectedPeerId(peer.id);
                                                    setShowModal(true);
                                                }}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Hash Tag Modal */}
            <Dialog open={showModal} onClose={() => setShowModal(false)} className="relative z-50">
                <div className="fixed inset-0 bg-black/50" aria-hidden="true"/>
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                        <div className="flex items-center justify-between mb-6">
                            <Dialog.Title className="text-xl font-bold text-gray-900">
                                Submit Payment Hash
                            </Dialog.Title>
                            <button
                                onClick={() => setShowModal(false)}
                                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Transaction Hash Tag
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your payment transaction hash..."
                                    value={hashTag}
                                    onChange={(e) => setHashTag(e.target.value)}
                                    className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <p className="text-xs text-gray-500 mt-2">
                                    This should be the transaction hash from your payment
                                </p>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={submitHashTag}
                                    disabled={isSubmitting || !hashTag.trim()}
                                    className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    {isSubmitting ? "Submitting..." : "Submit Hash"}
                                </button>
                            </div>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </div>
    );
}

// Detail Card Component
function DetailCard({ icon, label, value, bgColor, copyable = false }: {
    icon: React.ReactNode;
    label: string;
    value: string;
    bgColor: string;
    copyable?: boolean;
}) {
    const handleCopy = () => {
        navigator.clipboard.writeText(value);
        toast.success(`${label} copied!`);
    };

    return (
        <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 ${bgColor} rounded-lg`}>
                    {icon}
                </div>
                <span className="text-sm font-medium text-gray-600">{label}</span>
            </div>
            <div className="flex items-center justify-between">
                <p className="font-semibold text-gray-900 text-sm">{value}</p>
                {copyable && (
                    <button
                        onClick={handleCopy}
                        className="p-1 hover:bg-gray-200 rounded transition-colors"
                    >
                        <Copy className="w-4 h-4 text-gray-500" />
                    </button>
                )}
            </div>
        </div>
    );
}

// Peer Card Component
function PeerCard({ peer, onSubmitHash }: { peer: any; onSubmitHash: () => void }) {
    const handleCopyWallet = () => {
        navigator.clipboard.writeText(peer.ask.bep_address);
        toast.success("Wallet address copied!");
    };

    return (
        <div className="border border-gray-200 rounded-2xl p-6 hover:border-gray-300 transition-colors">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-xl">
                        <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-900">{peer.ask_user.username}</h4>
                        <p className="text-sm text-gray-500">{peer.ask_user.email}</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">{peer.pair_amount} USDT</p>
                    <p className="text-sm text-gray-500">Paired Amount</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-3">
                    <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Reference</p>
                        <p className="text-sm font-mono bg-gray-50 px-2 py-1 rounded">{peer.reference}</p>
                    </div>
                    <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Due Date</p>
                        <p className="text-sm text-gray-900">{new Date(peer.due_at).toLocaleString()}</p>
                    </div>
                </div>

                <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Wallet Address</p>
                    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                        <Wallet className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span className="text-sm font-mono text-gray-900 truncate">
                            {peer.ask.bep_address}
                        </span>
                        <button
                            onClick={handleCopyWallet}
                            className="p-1 hover:bg-gray-200 rounded transition-colors flex-shrink-0"
                        >
                            <Copy className="w-4 h-4 text-gray-500" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-3">
                    <StatusBadge status={peer.payment_status} isPayment />
                    {peer.status !== "undecided" && <StatusBadge status={peer.status} />}
                </div>

                {peer.payment_status !== "payment_submitted" && (
                    <button
                        onClick={onSubmitHash}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors"
                    >
                        <Send className="w-4 h-4" />
                        Submit Payment
                    </button>
                )}
            </div>
        </div>
    );
}

// Status Badge Component
function StatusBadge({ status, isPayment = false }: { status: string; isPayment?: boolean }) {
    const config = getStatusConfig(status, isPayment);
    const StatusIcon = config.icon;
    const label = formatLabel(status);

    return (
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.color} border ${config.border}`}>
            <StatusIcon className="w-3 h-3" />
            {label}
        </div>
    );
}

function getStatusConfig(status: string, isPayment = false) {
    const configs = {
        awaiting_payment: { color: "text-yellow-600", bg: "bg-yellow-50", icon: Clock, border: "border-yellow-200" },
        success: { color: "text-green-600", bg: "bg-green-50", icon: CheckCircle, border: "border-green-200" },
        paired: { color: "text-blue-600", bg: "bg-blue-50", icon: Users, border: "border-blue-200" },
        completed: { color: "text-emerald-600", bg: "bg-emerald-50", icon: CheckCircle, border: "border-emerald-200" },
        approved: { color: "text-green-600", bg: "bg-green-50", icon: CheckCircle, border: "border-green-200" },
        payment_confirmed: { color: "text-blue-600", bg: "bg-blue-50", icon: CheckCircle, border: "border-blue-200" },
        payment_submitted: { color: "text-purple-600", bg: "bg-purple-50", icon: Send, border: "border-purple-200" },
        confirmed: { color: "text-green-600", bg: "bg-green-50", icon: CheckCircle, border: "border-green-200" },
        pending: { color: "text-yellow-600", bg: "bg-yellow-50", icon: Clock, border: "border-yellow-200" },
        failed: { color: "text-red-600", bg: "bg-red-50", icon: XCircle, border: "border-red-200" },
        undecided: { color: "text-gray-600", bg: "bg-gray-50", icon: AlertCircle, border: "border-gray-200" },
    };
    return configs[status?.toLowerCase()] || configs.pending;
}

function formatLabel(label: string): string {
    return label.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}
