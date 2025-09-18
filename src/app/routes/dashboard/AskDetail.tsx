import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { getAuthToken } from "@/utils/auth";
import DashboardHeader from "@/components/DashboardHeader";
import Sidebar from "@/components/Sidebar";
import { toast } from "react-toastify";
import { useTheme } from "@/context/ThemeContext"; // Assuming you have a theme context

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const token = getAuthToken();

export default function AskDetail() {
    const { id } = useParams();
    const { isDarkMode } = useTheme(); // Get theme state
    const [ask, setAsk] = useState<any>(null);
    const [peers, setPeers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Modal states
    const [modalOpen, setModalOpen] = useState(false);
    const [peerDetailModalOpen, setPeerDetailModalOpen] = useState(false);
    const [selectedPeer, setSelectedPeer] = useState<any>(null);

    // Action states
    const [actionType, setActionType] = useState<"confirm" | "reject" | null>(null);
    const [rejectReason, setRejectReason] = useState("");
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        async function fetchAsk() {
            setLoading(true);
            try {
                const res = await fetch(`${baseUrl}ask-details/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const json = await res.json();

                if (json.success) {
                    setAsk(json.data);
                    setPeers(json.peers || []);
                } else {
                    toast.error(json.message || "Failed to load ask details");
                    setAsk(null);
                }
            } catch (err) {
                console.error("Failed to fetch ask details:", err);
                toast.error("Network error while fetching ask details");
                setAsk(null);
            } finally {
                setLoading(false);
            }
        }

        if (id) fetchAsk();
    }, [id]);

    const handleActionClick = (peer: any) => {
        setSelectedPeer(peer);
        setActionType(null);
        setRejectReason("");
        setModalOpen(true);
    };

    const handlePeerDetailClick = (peer: any) => {
        setSelectedPeer(peer);
        setPeerDetailModalOpen(true);
    };

    const handleSubmitAction = async () => {
        if (!selectedPeer || !actionType) return;

        setProcessing(true);
        try {
            const endpoint = `${baseUrl}ask-confirmation/${id}/${selectedPeer.id}`;
            const bodyData =
                actionType === "reject"
                    ? { status: "declined", reason: rejectReason }
                    : { status: "approved" };

            const res = await fetch(endpoint, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(bodyData),
            });

            const json = await res.json();

            if (json.success === true) {
                toast.success(
                    actionType === "confirm"
                        ? "Peer confirmed successfully."
                        : "Peer rejected successfully."
                );
                window.location.reload();
            } else {
                toast.error(json.message || "Action failed.");
            }
        } catch (err) {
            console.error("Error submitting action:", err);
            toast.error("Something went wrong.");
        } finally {
            setProcessing(false);
            setModalOpen(false);
        }
    };

    // Theme-based classes
    const themeClasses = {
        background: isDarkMode ? "bg-gray-900" : "bg-gray-50",
        text: isDarkMode ? "text-white" : "text-gray-900",
        card: isDarkMode ? "bg-gray-800" : "bg-white",
        cardBorder: isDarkMode ? "border-gray-700" : "border-gray-200",
        tableHeader: isDarkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700",
        tableRow: isDarkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-50",
        tableDivider: isDarkMode ? "divide-gray-700" : "divide-gray-200",
        modal: isDarkMode ? "bg-gray-800" : "bg-white",
        modalBorder: isDarkMode ? "border-gray-600" : "border-gray-300",
        input: isDarkMode
            ? "bg-gray-700 text-white border-gray-600 focus:ring-blue-500 focus:border-blue-500"
            : "bg-white text-gray-900 border-gray-300 focus:ring-blue-500 focus:border-blue-500",
        secondaryText: isDarkMode ? "text-gray-400" : "text-gray-600",
        mutedText: isDarkMode ? "text-gray-500" : "text-gray-500",
    };

    if (loading)
        return (
            <div className={`min-h-screen ${themeClasses.background} ${themeClasses.text} flex items-center justify-center`}>
                <div className="flex flex-col items-center space-y-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    <p className="text-lg font-medium">Loading ask details...</p>
                </div>
            </div>
        );

    if (!ask)
        return (
            <div className={`min-h-screen ${themeClasses.background} ${themeClasses.text} flex items-center justify-center`}>
                <div className="text-center">
                    <div className="text-6xl mb-4">❌</div>
                    <h1 className="text-2xl font-bold mb-2">Ask Not Found</h1>
                    <p className={themeClasses.secondaryText}>The requested ask could not be found.</p>
                </div>
            </div>
        );

    return (
        <div className={`min-h-screen ${themeClasses.background} ${themeClasses.text} flex transition-colors duration-200`}>
            {/* Overlay for sidebar on mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className="flex-1 flex flex-col">
                <DashboardHeader setSidebarOpen={setSidebarOpen} />
                <main className="flex-1 overflow-y-auto py-6 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto space-y-8">
                        {/* Page Header */}
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold">Ask Details</h1>
                                <p className={`mt-1 ${themeClasses.secondaryText}`}>
                                    Manage and review ask information and peer interactions
                                </p>
                            </div>
                            <div className={`px-4 py-2 rounded-full text-sm font-medium ${
                                ask.status === 'active'
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                            }`}>
                                Status: {ask.status}
                            </div>
                        </div>

                        {/* Ask Info Card */}
                        <section className={`${themeClasses.card} border ${themeClasses.cardBorder} rounded-xl shadow-sm transition-colors duration-200`}>
                            <div className="p-6 sm:p-8">
                                <div className="flex items-center mb-6">
                                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4">
                                        <span className="text-blue-600 dark:text-blue-400 text-xl">💰</span>
                                    </div>
                                    <h2 className="text-xl font-semibold">Transaction Information</h2>
                                </div>

                                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {[
                                        { label: "BEP Address", value: ask.bep_address, icon: "🏦" },
                                        { label: "Amount", value: `${ask.amount} USDT`, icon: "💵" },
                                        { label: "Amount to Pair", value: `${ask.amount_to_pair} USDT`, icon: "🔗" },
                                        { label: "Paired Amount", value: `${ask.paired_amount} USDT`, icon: "✅" },
                                        { label: "Balance Source", value: ask.bal_source, icon: "📊" },
                                        { label: "Balance Before", value: ask.bal_before, icon: "📈" },
                                        { label: "Balance After", value: ask.bal_after, icon: "📉" },
                                        { label: "Transaction ID", value: ask.trx, icon: "🔍" },
                                        { label: "Created At", value: new Date(ask.created_at).toLocaleString(), icon: "📅" },
                                    ].map((item, index) => (
                                        <div key={index} className={`p-4 rounded-lg border ${themeClasses.cardBorder} ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                            <div className="flex items-center mb-2">
                                                <span className="mr-2">{item.icon}</span>
                                                <span className={`text-sm font-medium ${themeClasses.secondaryText}`}>
                                                    {item.label}
                                                </span>
                                            </div>
                                            <p className="font-semibold break-all">{item.value}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* Peers Section */}
                        <section className={`${themeClasses.card} border ${themeClasses.cardBorder} rounded-xl shadow-sm transition-colors duration-200`}>
                            <div className="p-6 sm:p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mr-4">
                                            <span className="text-purple-600 dark:text-purple-400 text-xl">👥</span>
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-semibold">Peer Interactions</h2>
                                            <p className={`text-sm ${themeClasses.secondaryText}`}>
                                                {peers.length} peer{peers.length !== 1 ? 's' : ''} found
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {peers.length === 0 ? (
                                    <div className="text-center py-12">
                                        <div className="text-6xl mb-4">👥</div>
                                        <h3 className="text-lg font-medium mb-2">No Peers Found</h3>
                                        <p className={themeClasses.secondaryText}>
                                            There are no peer interactions for this ask yet.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full">
                                            <thead className={`${themeClasses.tableHeader}`}>
                                            <tr>
                                                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                                                    Reference
                                                </th>
                                                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                                                    Bid User
                                                </th>
                                                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                                                    Pair Amount
                                                </th>
                                                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                                                    Status
                                                </th>
                                                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                                                    Payment Status
                                                </th>
                                                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                                                    Due At
                                                </th>
                                                <th className="px-6 py-4 text-center text-xs font-medium uppercase tracking-wider">
                                                    Action
                                                </th>
                                            </tr>
                                            </thead>
                                            <tbody className={`${themeClasses.tableDivider} divide-y`}>
                                            {peers.map((peer) => (
                                                <tr
                                                    key={peer.id}
                                                    className={`${themeClasses.tableRow} cursor-pointer transition-colors duration-150`}
                                                    onClick={() => handlePeerDetailClick(peer)}
                                                >
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="font-medium">{peer.reference}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-3">
                                                                    <span className="text-blue-600 dark:text-blue-400 text-sm font-medium">
                                                                        {peer.bid_user?.username?.charAt(0)?.toUpperCase() || "?"}
                                                                    </span>
                                                            </div>
                                                            <div>
                                                                <div className="font-medium">
                                                                    {peer.bid_user?.username ?? "N/A"}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="font-semibold text-green-600 dark:text-green-400">
                                                            {peer.pair_amount} USDT
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                                peer.status === 'approved'
                                                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                                    : peer.status === 'declined'
                                                                        ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                                                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                                            }`}>
                                                                {peer.status.replace(/_/g, " ")}
                                                            </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                                peer.payment_status === 'paid'
                                                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                                                            }`}>
                                                                {peer.payment_status}
                                                            </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                        {peer.due_at
                                                            ? new Date(peer.due_at).toLocaleString()
                                                            : "N/A"}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleActionClick(peer);
                                                            }}
                                                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                                        >
                                                            Manage
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>
                </main>
            </div>

            {/* Action Modal */}
            {modalOpen && selectedPeer && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
                    <div className={`${themeClasses.modal} rounded-2xl shadow-2xl w-full max-w-lg border ${themeClasses.modalBorder} transition-colors duration-200`}>
                        <div className="p-6 space-y-6">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-blue-600 dark:text-blue-400 text-2xl">⚡</span>
                                </div>
                                <h2 className="text-2xl font-semibold">Take Action</h2>
                                <p className={`mt-2 ${themeClasses.secondaryText}`}>
                                    Choose an action for peer: {selectedPeer.reference}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={() => setActionType("confirm")}
                                    className={`p-4 rounded-xl font-medium transition-all duration-200 ${
                                        actionType === "confirm"
                                            ? "bg-green-600 text-white ring-2 ring-green-400 shadow-lg"
                                            : `${isDarkMode ? 'bg-gray-700 hover:bg-green-700' : 'bg-gray-100 hover:bg-green-100'} ${themeClasses.text} hover:text-green-700`
                                    }`}
                                >
                                    <div className="text-2xl mb-2">✅</div>
                                    Confirm
                                </button>
                                <button
                                    onClick={() => setActionType("reject")}
                                    className={`p-4 rounded-xl font-medium transition-all duration-200 ${
                                        actionType === "reject"
                                            ? "bg-red-600 text-white ring-2 ring-red-400 shadow-lg"
                                            : `${isDarkMode ? 'bg-gray-700 hover:bg-red-700' : 'bg-gray-100 hover:bg-red-100'} ${themeClasses.text} hover:text-red-700`
                                    }`}
                                >
                                    <div className="text-2xl mb-2">❌</div>
                                    Decline
                                </button>
                            </div>

                            {actionType === "reject" && (
                                <div className="space-y-2">
                                    <label className={`block text-sm font-medium ${themeClasses.text}`}>
                                        Reason for Declining *
                                    </label>
                                    <textarea
                                        className={`w-full rounded-xl p-3 border focus:outline-none focus:ring-2 transition-colors duration-200 ${themeClasses.input}`}
                                        rows={4}
                                        value={rejectReason}
                                        onChange={(e) => setRejectReason(e.target.value)}
                                        placeholder="Please provide a detailed reason for declining this request..."
                                    />
                                </div>
                            )}

                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-600">
                                <button
                                    onClick={() => setModalOpen(false)}
                                    className={`px-6 py-2 rounded-lg font-medium transition-colors duration-200 ${
                                        isDarkMode
                                            ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                                            : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                                    }`}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSubmitAction}
                                    disabled={processing || (actionType === "reject" && !rejectReason.trim())}
                                    className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                                        processing || (actionType === "reject" && !rejectReason.trim())
                                            ? "opacity-50 cursor-not-allowed bg-gray-400"
                                            : "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                    } text-white`}
                                >
                                    {processing ? (
                                        <div className="flex items-center">
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                            Processing...
                                        </div>
                                    ) : (
                                        "Submit Action"
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Peer Detail Modal */}
            {peerDetailModalOpen && selectedPeer && (
                <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center px-4">
                    <div className={`${themeClasses.modal} border ${themeClasses.modalBorder} rounded-2xl w-full max-w-2xl transition-colors duration-200`}>
                        <div className="p-6 space-y-6">
                            <div className="text-center border-b border-gray-200 dark:border-gray-600 pb-4">
                                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-purple-600 dark:text-purple-400 text-2xl">👤</span>
                                </div>
                                <h3 className="text-2xl font-semibold">Peer Details</h3>
                                <p className={`mt-1 ${themeClasses.secondaryText}`}>
                                    Complete information for {selectedPeer.reference}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { label: "Reference", value: selectedPeer.reference, icon: "🔗" },
                                    { label: "Pair Amount", value: `${selectedPeer.pair_amount} USDT`, icon: "💰" },
                                    { label: "Status", value: selectedPeer.status, icon: "📊" },
                                    { label: "Payment Status", value: selectedPeer.payment_status, icon: "💳" },
                                    { label: "Due At", value: selectedPeer.due_at ? new Date(selectedPeer.due_at).toLocaleString() : "N/A", icon: "⏰" },
                                    { label: "Paid At", value: selectedPeer.paid_at ? new Date(selectedPeer.paid_at).toLocaleString() : "N/A", icon: "✅" },
                                    { label: "Confirmed At", value: selectedPeer.confirmed_at ? new Date(selectedPeer.confirmed_at).toLocaleString() : "N/A", icon: "🎉" },
                                    { label: "Hashtag", value: selectedPeer.hash_tag ?? "N/A", icon: "#️⃣" },
                                    { label: "Transaction ID", value: selectedPeer.trx ?? "N/A", icon: "🔍" },
                                ].map((item, index) => (
                                    <div key={index} className={`p-4 rounded-lg border ${themeClasses.cardBorder} ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                        <div className="flex items-center mb-2">
                                            <span className="mr-2">{item.icon}</span>
                                            <span className={`text-sm font-medium ${themeClasses.secondaryText}`}>
                                                {item.label}
                                            </span>
                                        </div>
                                        <p className="font-semibold break-all">{item.value}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-center pt-4 border-t border-gray-200 dark:border-gray-600">
                                <button
                                    onClick={() => setPeerDetailModalOpen(false)}
                                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                >
                                    Close Details
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
