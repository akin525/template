import { useEffect, useState } from 'react';
import Sidebar from "@/components/Sidebar.tsx";
import DashboardHeader from "@/components/DashboardHeader.tsx";
import { useUser } from "@/context/UserContext.tsx";
import axios from 'axios';
import { getAuthToken } from "@/utils/auth.tsx";
import { FaCopy, FaCheckCircle, FaLink, FaUserFriends } from 'react-icons/fa';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

type Referral = {
    username: string;
    email: string;
};

export default function ReferralPage() {
    const [copiedText, setCopiedText] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [referralHistory, setReferralHistory] = useState<Referral[]>([]);
    const { user } = useUser() as any;

    const siteOrigin = typeof window !== "undefined" ? window.location.origin : "";
    const referralCode = user?.ref_code || "N/A";
    const referralLink = user?.ref_code ? `${siteOrigin}/register?ref=${user.ref_code}` : "";

    const copyToClipboard = async (text: string) => {
        await navigator.clipboard.writeText(text);
        setCopiedText(text);
        setTimeout(() => setCopiedText(''), 2000);
    };

    useEffect(() => {
        const fetchReferrals = async () => {
            try {
                const token = getAuthToken();
                const response = await axios.get(`${apiBaseUrl}referrals`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response.data?.success) {
                    setReferralHistory(response.data.data.data || []);
                } else {
                    setReferralHistory([]);
                }
            } catch (error) {
                console.error("Failed to fetch referral history:", error);
            }
        };

        fetchReferrals();
    }, []);

    return (
        <div className="min-h-screen flex bg-gradient-to-b from-[#f7fafc] to-[#e6f0f6] text-gray-800">
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-20 z-20 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className="flex-1 flex flex-col overflow-hidden">
                <DashboardHeader setSidebarOpen={setSidebarOpen} />

                <main className="flex-1 overflow-y-auto p-6">
                    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
                        {/* Referral Info Card */}
                        <section className="bg-white rounded-3xl shadow-lg p-8 space-y-6 border border-gray-200">
                            <h2 className="text-2xl font-semibold text-teal-600 text-center">🎁 Your Referral Info</h2>

                            <div className="space-y-4">
                                <label className="block text-sm font-medium text-gray-600">Referral Code</label>
                                <div className="flex items-center bg-gray-100 px-4 py-3 rounded-xl text-gray-800 shadow-inner">
                                    <span className="flex-1 font-semibold">{referralCode}</span>
                                    <button
                                        onClick={() => copyToClipboard(referralCode)}
                                        className="ml-4 p-2 rounded-lg hover:bg-teal-100 transition text-teal-600"
                                        title="Copy code"
                                    >
                                        {copiedText === referralCode ? (
                                            <FaCheckCircle className="text-green-500" />
                                        ) : (
                                            <FaCopy />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="block text-sm font-medium text-gray-600">Referral Link</label>
                                <div className="flex items-center bg-gray-100 px-4 py-3 rounded-xl text-gray-800 break-all shadow-inner">
                                    <span className="flex-1 text-xs select-all">{referralLink || 'No referral link available'}</span>
                                    {referralLink && (
                                        <button
                                            onClick={() => copyToClipboard(referralLink)}
                                            className="ml-4 p-2 rounded-lg hover:bg-teal-100 transition text-teal-600"
                                            title="Copy link"
                                        >
                                            {copiedText === referralLink ? (
                                                <FaCheckCircle className="text-green-500" />
                                            ) : (
                                                <FaLink />
                                            )}
                                        </button>
                                    )}
                                </div>
                            </div>

                            <p className="text-center text-gray-500 text-sm mt-6">
                                Share your referral link to earn rewards when your friends sign up!
                            </p>
                        </section>

                        {/* Referral History Card */}
                        <section className="bg-white rounded-3xl shadow-lg p-8 border border-gray-200">
                            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3 text-teal-600">
                                <FaUserFriends /> Referral History
                            </h2>

                            {referralHistory.length === 0 ? (
                                <p className="text-gray-400 text-center text-sm">You haven’t referred anyone yet.</p>
                            ) : (
                                <ul className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                                    {referralHistory.map((ref, idx) => (
                                        <li
                                            key={idx}
                                            className="bg-gray-50 p-4 rounded-xl flex justify-between items-center shadow-sm border border-gray-100 hover:shadow-md transition"
                                        >
                                            <div>
                                                <p className="font-semibold text-gray-800">{ref.username || 'Unnamed User'}</p>
                                                <p className="text-xs text-gray-500">{ref.email}</p>
                                            </div>
                                            <FaCheckCircle className="text-green-500 text-lg" />
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </section>
                    </div>
                </main>
            </div>
        </div>
    );
}
