import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { getAuthToken } from "@/utils/auth";
import DashboardHeader from "@/components/DashboardHeader";
import Sidebar from "@/components/Sidebar";
import { Dialog } from "@headlessui/react";
import { toast } from "react-toastify";
import { Copy } from "lucide-react";

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

    if (loading) {
        return <div className="min-h-screen bg-white text-gray-900 flex items-center justify-center">Loading...</div>

    }

    if (!bid) {
        return <div className="min-h-screen bg-[#0A0F1F] text-white flex items-center justify-center">Bid not found.</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex">
            {sidebarOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
                     onClick={() => setSidebarOpen(false)}/>
            )}
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)}/>

            <div className="flex-1 flex flex-col">
                <DashboardHeader setSidebarOpen={setSidebarOpen}/>
                <main className="flex-1 overflow-y-auto py-10 px-6 lg:px-12">
                    <div className="max-w-5xl mx-auto bg-gray-100 p-8 rounded-2xl shadow-xl">
                        <h1 className="text-3xl font-bold text-center mb-8">Bid Details</h1>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
                            <Detail label="Amount" value={`${bid.amount} USDT`}/>
                            <Detail label="Amount To Pair" value={`${bid.amount_to_pair} USDT`}/>
                            <Detail label="Paired Amount" value={`${bid.paired_amount} USDT`}/>
                            <Detail label="Transaction ID" value={bid.trx}/>
                            <Detail label="Created At" value={new Date(bid.created_at).toLocaleString()}/>
                            <div>
                                <p className="text-sm text-gray-400">Status</p>
                                <StatusBadge status={bid.status}/>
                            </div>
                        </div>

                        <h2 className="text-2xl font-semibold mb-4">Peers</h2>
                        <div className="space-y-6">
                            {peers.map((peer) => (
                                <div key={peer.id} className="bg-white p-6 rounded-lg border border-gray-300 shadow">
                                    <div className="mb-2 text-sm">
                                        <strong>Paired Amount:</strong> <span>{peer.pair_amount} USDT</span>
                                    </div>
                                    <div className="mb-2 text-sm">
                                        <strong>Reference:</strong> {peer.reference}
                                    </div>
                                    <div className="mb-2 text-sm">
                                        <strong>Ask User:</strong> {peer.ask_user.username} ({peer.ask_user.email})
                                    </div>
                                    <div className="mb-2 text-sm flex items-center gap-2">
                                        <strong>Wallet Address:</strong> {peer.ask.bep_address}
                                        <button
                                            onClick={() => {
                                                navigator.clipboard.writeText(peer.ask.bep_address);
                                                toast.success("Wallet address copied!");
                                            }}
                                            className="hover:text-white text-gray-400"
                                        >
                                            <Copy className="w-4 h-4"/>
                                        </button>
                                    </div>
                                    <div className="mb-2 text-sm">
                                        <strong>Due At:</strong> {new Date(peer.due_at).toLocaleString()}
                                    </div>

                                    <div className="flex items-center gap-3 mt-4">
                                        <StatusBadge status={peer.payment_status} isPayment/>
                                        {peer.status !== "undecided" && <StatusBadge status={peer.status}/>}
                                        {peer.payment_status !== "payment_submitted" && (
                                            <button
                                                onClick={() => {
                                                    setSelectedPeerId(peer.id);
                                                    setShowModal(true);
                                                }}
                                                className="bg-blue-600 hover:bg-blue-500 text-black text-xs font-semibold px-4 py-1.5 rounded-full"
                                            >
                                                Submit Hash Tag
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>

            {/* Modal */}
            <Dialog open={showModal} onClose={() => setShowModal(false)} className="relative z-50">
                <div className="fixed inset-0 bg-black/60" aria-hidden="true"/>
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="w-full max-w-md rounded-xl bg-white p-6 text-gray-900 shadow-lg">
                    <Dialog.Title className="text-lg font-bold mb-4">Enter Payment Hash Tag</Dialog.Title>
                        <input
                            type="text"
                            placeholder="e.g. txhash1234..."
                            value={hashTag}
                            onChange={(e) => setHashTag(e.target.value)}
                            className="w-full p-3 mb-4 rounded bg-gray-100 border border-gray-300 text-sm focus:outline-none"
                        />
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-gray-300 hover:bg-gray-200 rounded text-sm"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={submitHashTag}
                                disabled={isSubmitting}
                                className={`px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded text-sm ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                            >
                                {isSubmitting ? "Submitting..." : "Submit"}
                            </button>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </div>
    );
}

// Reusable Info Display
function Detail({label, value }: { label: string; value: string | number }) {
    return (
        <div>
            <p className="text-sm text-gray-400">{label}</p>
            <p className="text-base font-medium">{value}</p>
        </div>
    );
}

// Status Badge UI
function StatusBadge({ status, isPayment }: { status: string; isPayment?: boolean }) {
    const label = formatLabel(status);
    const base = "px-3 py-1 text-xs font-bold rounded-full";

    const statusColors: Record<string, string> = {
        awaiting_payment: "bg-yellow-100 text-yellow-800",
        success: "bg-green-100 text-green-800",
        paired: "bg-blue-100 text-blue-800",
        completed: "bg-green-200 text-green-900",
        approved: "bg-green-200 text-green-900",
        payment_confirmed: "bg-blue-200 text-blue-900",
        confirmed: "bg-green-100 text-green-900",
        pending: "bg-yellow-200 text-yellow-900",
        failed: "bg-red-100 text-red-800",
        undecided: "bg-gray-300 text-gray-800",
    };


    const style = statusColors[status.toLowerCase()] || "bg-gray-400 text-black";
    return <span className={`${base} ${style}`}>{label}</span>;
}

function formatLabel(label: string): string {
    return label.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}
