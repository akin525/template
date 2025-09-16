import { useState } from "react";
import Sidebar from "../../../components/Sidebar";
import DashboardHeader from "../../../components/DashboardHeader";
import { Link } from "react-router";
import {
    ArrowRightLeft,
    Copy,
    Users,
    Wallet,
    TrendingUp,
    ArrowUpRight,
    Plus,
    Eye,
    EyeOff,
    Gift,
    Zap,
    CheckCircle,
    Clock
} from "lucide-react";
import { useUser } from "@/context/UserContext";
import { toast } from "react-toastify";

export default function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [balanceVisible, setBalanceVisible] = useState(true);
    const { user } = useUser() as any;

    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
    const referralLink = user?.ref_code ? `${baseUrl}/register?ref=${user.ref_code}` : "";

    const handleCopy = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        toast.success(`${label} copied!`);
    };

    // const recentTransactions = [
    //     { id: 1, type: 'Received', amount: 500, status: 'completed', time: '2 min ago' },
    //     { id: 2, type: 'Sent', amount: 250, status: 'pending', time: '1 hour ago' },
    //     { id: 3, type: 'Trade', amount: 1000, status: 'completed', time: '3 hours ago' },
    // ];

    return (
        <div className="min-h-screen bg-gray-50 flex">
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
                    <div className="max-w-6xl mx-auto space-y-8">

                        {/* Welcome Header */}
                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                        Good morning, {user?.firstname}! 👋
                                    </h1>
                                    <p className="text-gray-600">Here's your portfolio overview</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-gray-500 mb-1">Total Balance</p>
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => setBalanceVisible(!balanceVisible)}
                                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                        >
                                            {balanceVisible ? <Eye className="w-5 h-5 text-gray-400" /> : <EyeOff className="w-5 h-5 text-gray-400" />}
                                        </button>
                                        <span className="text-3xl font-bold text-gray-900">
                      {balanceVisible ? `$${(user?.balance || 0).toLocaleString()}` : '••••••'}
                    </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-blue-50 rounded-xl">
                                        <Wallet className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    +2.5%
                  </span>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900">{user?.balance || 0}</h3>
                                <p className="text-sm text-gray-500">USDT Balance</p>
                            </div>

                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-green-50 rounded-xl">
                                        <TrendingUp className="w-6 h-6 text-green-600" />
                                    </div>
                                    <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    +8.2%
                  </span>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900">{user?.earning || 0}</h3>
                                <p className="text-sm text-gray-500">Total Earnings</p>
                            </div>

                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-purple-50 rounded-xl">
                                        <Users className="w-6 h-6 text-purple-600" />
                                    </div>
                                    <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                    +2
                  </span>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900">{user?.referrals?.length || 0}</h3>
                                <p className="text-sm text-gray-500">Referrals</p>
                            </div>

                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-orange-50 rounded-xl">
                                        <ArrowRightLeft className="w-6 h-6 text-orange-600" />
                                    </div>
                                    <span className="text-sm font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
                    +15
                  </span>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900">{user?.transactions?.length || 0}</h3>
                                <p className="text-sm text-gray-500">Transactions</p>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Link
                                    to="/ask"
                                    className="group p-6 border border-gray-200 rounded-xl hover:border-green-200 hover:bg-green-50 transition-all duration-300"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="p-3 bg-green-100 rounded-xl group-hover:bg-green-200 transition-colors">
                                            <ArrowUpRight className="w-6 h-6 text-green-600" />
                                        </div>
                                        <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                      Popular
                    </span>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">Ask USDT SPL</h3>
                                    <p className="text-sm text-gray-600">Create ask orders and earn profits</p>
                                </Link>

                                <Link
                                    to="/bid"
                                    className="group p-6 border border-gray-200 rounded-xl hover:border-blue-200 hover:bg-blue-50 transition-all duration-300"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="p-3 bg-blue-100 rounded-xl group-hover:bg-blue-200 transition-colors">
                                            <Plus className="w-6 h-6 text-blue-600" />
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">Bid USDT SPL</h3>
                                    <p className="text-sm text-gray-600">Place bid orders at your rate</p>
                                </Link>

                                <Link
                                    to="/dashboard/investments"
                                    className="group p-6 border border-gray-200 rounded-xl hover:border-purple-200 hover:bg-purple-50 transition-all duration-300"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="p-3 bg-purple-100 rounded-xl group-hover:bg-purple-200 transition-colors">
                                            <Zap className="w-6 h-6 text-purple-600" />
                                        </div>
                                        <span className="text-xs font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                      New
                    </span>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">Smart Nodes</h3>
                                    <p className="text-sm text-gray-600">Automated passive income</p>
                                </Link>
                            </div>
                        </div>

                        {/* Main Content Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                            {/* Recent Activity */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xl font-bold text-gray-900">Recent Activity</h3>
                                    <Link to="/dashboard/transactions" className="text-sm font-medium text-blue-600 hover:text-blue-700">
                                        View All
                                    </Link>
                                </div>

                                <div className="space-y-4">
                                    {user?.recentBids.map((transaction: any) => (
                                        <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                            <div className="flex items-center gap-4">
                                                <div className={`p-2 rounded-lg ${
                                                    transaction.type === 'Received' ? 'bg-green-100' :
                                                        transaction.type === 'Sent' ? 'bg-red-100' : 'bg-blue-100'
                                                }`}>
                                                    {transaction.status === 'completed' ? (
                                                        <CheckCircle className={`w-5 h-5 ${
                                                            transaction.type === 'Received' ? 'text-green-600' :
                                                                transaction.type === 'Sent' ? 'text-red-600' : 'text-blue-600'
                                                        }`} />
                                                    ) : (
                                                        <Clock className="w-5 h-5 text-yellow-600" />
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900">{transaction.type}</p>
                                                    <p className="text-sm text-gray-500">{transaction.time}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-gray-900">
                                                    {transaction.type === 'Received' ? '+' : '-'}{transaction.amount} USDT
                                                </p>
                                                <span className={`text-xs px-2 py-1 rounded-full ${
                                                    transaction.status === 'completed'
                                                        ? 'bg-green-100 text-green-600'
                                                        : 'bg-yellow-100 text-yellow-600'
                                                }`}>
                          {transaction.status}
                        </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Referral Program */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-orange-100 rounded-lg">
                                        <Gift className="w-6 h-6 text-orange-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">Referral Program</h3>
                                        {/*<p className="text-sm text-gray-500">Earn $25 per friend</p>*/}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="text-center p-4 bg-green-50 rounded-xl">
                                        <p className="text-2xl font-bold text-green-600">{user?.referrals?.length || 0}</p>
                                        <p className="text-sm text-gray-600">Total Referrals</p>
                                    </div>
                                    <div className="text-center p-4 bg-blue-50 rounded-xl">
                                        <p className="text-2xl font-bold text-blue-600">${(user?.referrals?.length || 0) * 25}</p>
                                        <p className="text-sm text-gray-600">Earned</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 mb-2 block">Referral Code</label>
                                        <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-xl border">
                                            <span className="font-mono font-bold text-gray-900 flex-1">{user?.ref_code || "N/A"}</span>
                                            <button
                                                onClick={() => handleCopy(user?.ref_code || "", "Referral code")}
                                                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                                            >
                                                <Copy className="w-4 h-4 text-gray-600" />
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-gray-700 mb-2 block">Referral Link</label>
                                        <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-xl border">
                      <span className="text-sm text-gray-700 flex-1 truncate">
                        {referralLink || "N/A"}
                      </span>
                                            <button
                                                onClick={() => handleCopy(referralLink, "Referral link")}
                                                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                                            >
                                                <Copy className="w-4 h-4 text-gray-600" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Call to Action */}
                        {/*<div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">*/}
                        {/*    <h2 className="text-2xl font-bold mb-4">Ready to Start Trading?</h2>*/}
                        {/*    <p className="text-blue-100 mb-6">Join thousands earning passive income through P2P trading</p>*/}
                        {/*    <div className="flex items-center justify-center gap-4">*/}
                        {/*        <Link*/}
                        {/*            to="/ask"*/}
                        {/*            className="px-6 py-3 bg-white text-blue-600 rounded-xl font-medium hover:bg-gray-100 transition-colors"*/}
                        {/*        >*/}
                        {/*            Start Trading*/}
                        {/*        </Link>*/}
                        {/*        <Link*/}
                        {/*            to="/dashboard/learn"*/}
                        {/*            className="px-6 py-3 bg-white/20 text-white rounded-xl font-medium hover:bg-white/30 transition-colors border border-white/30"*/}
                        {/*        >*/}
                        {/*            Learn More*/}
                        {/*        </Link>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>
                </main>
            </div>
        </div>
    );
}
