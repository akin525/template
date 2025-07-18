import { useEffect, useState } from "react";
import { Link } from "react-router";
import {
    X,
    LayoutDashboard,
    Wallet,
    CreditCard,
    PieChart,
    Users,
    User,
    Settings,
    MessageSquare,
    LogOut,
} from "lucide-react";

export default function Sidebar({
                                    isOpen,
                                    onClose,
                                }: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(isOpen);

    useEffect(() => {
        setSidebarOpen(isOpen);
    }, [isOpen]);

    return (
        <>
            {/* Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/30 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-full w-72 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:shadow-none`}
            >
                {/* Scrollable Container */}
                <div className="flex flex-col h-full overflow-y-auto scroll-smooth scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">

                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-6 border-b border-gray-200">
                        <Link to="/" className="text-2xl font-extrabold text-indigo-700 tracking-wide">
                            P2P ENERGY
                        </Link>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="text-gray-500 hover:text-gray-700 lg:hidden"
                            aria-label="Close sidebar"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="mt-6 px-5 flex-1">
                        <Section title="Main">
                            <SidebarLink to="/dashboard" icon={<LayoutDashboard size={18} />}>Dashboard</SidebarLink>
                            <SidebarLink to="/wallet" icon={<Wallet size={18} />}>Wallet</SidebarLink>
                            <SidebarLink to="/history" icon={<CreditCard size={18} />}>History</SidebarLink>
                            <SidebarLink to="/investments" icon={<CreditCard size={18} />}>Energy Node</SidebarLink>
                            <SidebarLink to="/ask" icon={<PieChart size={18} />}>Ask</SidebarLink>
                            <SidebarLink to="/bid" icon={<PieChart size={18} />}>Bid</SidebarLink>
                            <SidebarLink to="/referral" icon={<Users size={18} />}>Referral</SidebarLink>
                        </Section>

                        <Section title="Account" className="mt-10">
                            <SidebarLink to="/profile" icon={<User size={18} />}>Profile</SidebarLink>
                            <SidebarLink to="/settings" icon={<Settings size={18} />}>Settings</SidebarLink>
                            <SidebarLink to="/support" icon={<MessageSquare size={18} />}>Support</SidebarLink>
                        </Section>
                    </nav>

                    {/* Footer */}
                    <div className="border-t border-gray-200 px-5 py-5 bg-gray-50">
                        <SidebarLink to="/login" icon={<LogOut size={18} />}>Sign Out</SidebarLink>
                    </div>
                </div>
            </aside>
        </>
    );
}

function SidebarLink({
                         to,
                         icon,
                         children,
                     }: {
    to: string;
    icon: JSX.Element;
    children: React.ReactNode;
}) {
    return (
        <Link
            to={to}
            className="flex items-center gap-4 px-4 py-3 rounded-lg text-gray-700 hover:bg-indigo-100 hover:text-indigo-600 transition-all duration-200 font-medium"
        >
            <div className="p-2 bg-indigo-50 text-indigo-500 rounded-lg flex items-center justify-center">
                {icon}
            </div>
            <span>{children}</span>
        </Link>
    );
}

function Section({
                     title,
                     children,
                     className = "",
                 }: {
    title: string;
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={className}>
            <h4 className="text-xs font-semibold uppercase text-gray-400 tracking-wider mb-4 select-none">
                {title}
            </h4>
            <div className="space-y-2">{children}</div>
        </div>
    );
}
