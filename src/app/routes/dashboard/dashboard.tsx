import { useState } from "react";
import Sidebar from "../../../components/Sidebar";
import DashboardHeader from "../../../components/DashboardHeader";
import { Link } from "react-router";
import { ArrowRightLeft, Copy, Users, Wallet, Gift } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { toast } from "react-toastify";

export default function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { user } = useUser() as any;

    const baseUrl =
        typeof window !== "undefined" ? window.location.origin : "";
    const referralLink = user?.ref_code
        ? `${baseUrl}/register?ref=${user.ref_code}`
        : "";

    const handleCopy = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        toast.success(`${label} copied!`);
    };

    const StatCard = ({
                          title,
                          value,
                          icon: Icon,
                          color = "text-gray-700",
                      }: {
        title: string;
        value: string | number;
        icon: any;
        color?: string;
    }) => (
        <div className="bg-gradient-to-tr from-gray-100 to-white p-5 rounded-2xl shadow-md border border-gray-200 hover:shadow-xl transition">
            <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium text-gray-600">{title}</h4>
                <Icon className={`w-6 h-6 ${color}`} />
            </div>
            <div className="text-3xl font-bold text-gray-900">{value}</div>
        </div>
    );

    const ActivityCard = ({
                              label,
                              data,
                              link,
                          }: {
        label: string;
        data: any[];
        link: string;
    }) => (
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">{label}</h3>
                <Link
                    to={link}
                    className="text-sm text-blue-600 hover:underline font-medium"
                >
                    View All
                </Link>
            </div>
            <ul className="space-y-2 text-sm text-gray-700">
                {data?.length ? (
                    data.map((item: any, index: number) => (
                        <li key={index} className="flex justify-between items-center border-b py-2">
                            <span>{item.amount} USDT</span>
                            <span
                                className={
                                    item.status === "pending"
                                        ? "text-yellow-500"
                                        : "text-green-600"
                                }
                            >
                {item.status}
              </span>
                        </li>
                    ))
                ) : (
                    <li className="text-gray-400">No recent activity.</li>
                )}
            </ul>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 flex">
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-20 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className="flex-1 flex flex-col overflow-hidden">
                <DashboardHeader setSidebarOpen={setSidebarOpen} />

                <main className="flex-1 overflow-y-auto px-6 py-10">
                    <div className="max-w-7xl mx-auto space-y-12">
                        <h1 className="text-3xl font-bold text-gray-800">
                            Welcome back, {user?.firstname} 👋
                        </h1>

                        {/* Stats */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            <StatCard
                                title="USDT Balance"
                                value={`${user?.balance || 0} USDT`}
                                icon={Wallet}
                                color="text-green-500"
                            />
                            <StatCard
                                title="Earnings"
                                value={`${user?.earning || 0} USDT`}
                                icon={Gift}
                                color="text-yellow-500"
                            />
                            <StatCard
                                title="Referrals"
                                value={user?.referrals?.length || 0}
                                icon={Users}
                                color="text-blue-500"
                            />
                            <StatCard
                                title="Transactions"
                                value={user?.transactions?.length || 0}
                                icon={ArrowRightLeft}
                                color="text-purple-500"
                            />
                        </div>

                        {/* Quick Actions & Referral */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
                                <div className="flex flex-col gap-3">
                                    <Link
                                        to="/ask"
                                        className="py-3 text-center bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium"
                                    >
                                        Ask USDT
                                    </Link>
                                    <Link
                                        to="/bid"
                                        className="py-3 text-center bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium"
                                    >
                                        Create Bid
                                    </Link>
                                    <Link
                                        to="/dashboard/wallet/usdt"
                                        className="py-3 text-center bg-gray-700 hover:bg-gray-800 text-white rounded-lg font-medium"
                                    >
                                        View Wallet
                                    </Link>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">Referral Program</h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm text-gray-600 mb-1 block">Referral Code</label>
                                        <div className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded-lg">
                                            <span className="font-mono text-gray-700">{user?.ref_code || "N/A"}</span>
                                            <button
                                                onClick={() => handleCopy(user?.ref_code || "", "Referral code")}
                                            >
                                                <Copy className="w-5 h-5 text-gray-500" />
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-600 mb-1 block">Referral Link</label>
                                        <div className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded-lg">
                      <span className="font-mono text-gray-700 truncate">
                        {referralLink || "N/A"}
                      </span>
                                            <button
                                                onClick={() => handleCopy(referralLink, "Referral link")}
                                            >
                                                <Copy className="w-5 h-5 text-gray-500" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <ActivityCard
                                label="Recent Bids"
                                data={user?.recentBids}
                                link="/bid"
                            />
                            <ActivityCard
                                label="Recent Asks"
                                data={user?.recentAsks}
                                link="/ask"
                            />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
