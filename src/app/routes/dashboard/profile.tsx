import { useUser } from "@/context/UserContext.tsx";
import Sidebar from '../../../components/Sidebar';
import DashboardHeader from '../../../components/DashboardHeader';
import { useState } from 'react';
import { User, DollarSign, Shield } from 'lucide-react';

export default function Profile() {
    const { user } = useUser();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    if (!user) return <div className="text-gray-900 p-8 bg-gray-100 min-h-screen flex items-center justify-center">Loading...</div>;

    const handleProfileUpdate = () => {
        // Add your update logic here
        setModalOpen(false);
    };

    return (
        <div className="min-h-screen flex bg-gradient-to-b from-[#F9FAFB] to-[#E5E7EB] text-gray-900">
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-10 z-20 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className="flex-1 flex flex-col overflow-hidden">
                <DashboardHeader setSidebarOpen={setSidebarOpen} />

                <main className="flex-1 overflow-y-auto px-6 sm:px-12 lg:px-20 py-10">
                    <div className="max-w-5xl mx-auto space-y-10">
                        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-8">Profile</h1>

                        {/* Profile Photo and Basic Info */}
                        <section className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl border border-gray-300 shadow-md text-center">
                            <div className="flex flex-col items-center">
                                <img
                                    src={user.profile_photo_path || 'https://img.freepik.com/premium-vector/man-avatar-profile-picture-isolated-background-avatar-profile-picture-man_1293239-4866.jpg'}
                                    alt="Avatar"
                                    className="w-28 h-28 rounded-full object-cover border-4 border-blue-600 shadow-sm"
                                />
                                <h2 className="text-3xl font-semibold mt-5 text-gray-900">{user.firstname} {user.lastname}</h2>
                                <p className="text-gray-600 mt-1">{user.email}</p>
                                <p className="text-gray-500 mt-0.5">{user.phone}</p>
                                <button
                                    onClick={() => setModalOpen(true)}
                                    className="mt-6 bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-2.5 px-8 rounded-full shadow"
                                >
                                    Edit Profile
                                </button>
                            </div>
                        </section>

                        {/* Account Information */}
                        <section className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl border border-gray-300 shadow-md">
                            <div className="flex items-center gap-3 mb-6">
                                <User className="text-blue-600" size={28} />
                                <h2 className="text-2xl font-semibold text-gray-900">Account Information</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-700 text-sm">
                                <div>
                                    <label className="block mb-1 font-medium">Email Verified</label>
                                    <p>{user.email_verified ? "Verified" : "Not Verified"}</p>
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Country</label>
                                    <p>{user.country}</p>
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Referral Code</label>
                                    <p>{user.ref_code}</p>
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Referred By</label>
                                    <p>{user.referral || "None"}</p>
                                </div>
                            </div>
                        </section>

                        {/* Financials */}
                        <section className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl border border-gray-300 shadow-md">
                            <div className="flex items-center gap-3 mb-6">
                                <DollarSign className="text-green-600" size={28} />
                                <h2 className="text-2xl font-semibold text-gray-900">Financials</h2>
                            </div>
                            <div className="grid grid-cols-2 gap-8 text-center text-gray-700">
                                <div>
                                    <label className="block mb-1 font-medium">Balance</label>
                                    <p className="text-3xl font-bold">${user.balance.toLocaleString()}</p>
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Earnings</label>
                                    <p className="text-3xl font-bold">${user.earning.toLocaleString()}</p>
                                </div>
                            </div>
                        </section>

                        {/* Security */}
                        <section className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl border border-gray-300 shadow-md">
                            <div className="flex items-center gap-3 mb-6">
                                <Shield className="text-yellow-600" size={28} />
                                <h2 className="text-2xl font-semibold text-gray-900">Security</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-700 text-sm">
                                <div>
                                    <label className="block mb-1 font-medium">Telegram ID</label>
                                    <p>{user.telegram_id || "Not Connected"}</p>
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Telegram Verified</label>
                                    <p>{user.telegram_verified ? "Verified" : "Not Verified"}</p>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block mb-1 font-medium">Wallet Address (BEP)</label>
                                    <p className="break-words">{user.bep_address}</p>
                                </div>
                            </div>
                        </section>
                    </div>
                </main>
            </div>

            {/* Modal for Editing Profile */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-20 z-30 flex justify-center items-center px-4">
                    <div className="bg-white text-gray-900 w-full max-w-lg p-8 rounded-2xl shadow-lg max-h-[90vh] overflow-auto">
                        <h2 className="text-3xl font-semibold mb-6 text-gray-900">Edit Profile</h2>
                        <form className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium mb-1">First Name</label>
                                <input type="text" defaultValue={user.firstname} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Last Name</label>
                                <input type="text" defaultValue={user.lastname} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Email</label>
                                <input type="email" defaultValue={user.email} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Phone Number</label>
                                <input type="text" defaultValue={user.phone} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" />
                            </div>
                            <div className="flex justify-end gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={handleProfileUpdate}
                                    className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-full font-semibold transition"
                                >
                                    Save Changes
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setModalOpen(false)}
                                    className="bg-gray-400 hover:bg-gray-500 text-white py-3 px-8 rounded-full font-semibold transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
