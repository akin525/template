import { JSX, useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
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
    ChevronDown,
    ChevronRight,
    Bell,
    Search,
    Sparkles,
    TrendingUp,
    Shield,
    Gift,
    HelpCircle,
    Moon,
    Sun,
    Zap,
    Activity,
    ArrowUpRight,
    ArrowDownLeft,
    Network,
    Star,
    Award,
    Plus,
    Filter
} from "lucide-react";
import pic1 from "@/assets/solanasvg.webp";
import {useUser} from "@/context/UserContext.tsx";

export default function Sidebar({
                                    isOpen,
                                    onClose,
                                }: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(isOpen);
    const [expandedSections, setExpandedSections] = useState<string[]>(['main']);
    const [darkMode, setDarkMode] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const location = useLocation();
    const { user } = useUser() as any;

    useEffect(() => {
        setSidebarOpen(isOpen);
    }, [isOpen]);

    const toggleSection = (section: string) => {
        setExpandedSections(prev =>
            prev.includes(section)
                ? prev.filter(s => s !== section)
                : [...prev, section]
        );
    };

    const menuSections = [
        {
            id: 'main',
            title: 'Dashboard',
            icon: LayoutDashboard,
            color: 'blue',
            items: [
                { to: '/dashboard', icon: LayoutDashboard, label: 'Overview', badge: null, color: 'blue' },
                { to: '/wallet', icon: Wallet, label: 'Wallet', badge: '2', color: 'green' },
                { to: '/history', icon: Activity, label: 'Transaction History', badge: null, color: 'purple' },
            ]
        },
        {
            id: 'trading',
            title: 'Trading Hub',
            icon: TrendingUp,
            color: 'orange',
            items: [
                { to: '/investments', icon: Network, label: 'Smart Nodes', badge: 'Hot', color: 'red' },
                { to: '/ask', icon: ArrowUpRight, label: 'Ask Orders', badge: null, color: 'emerald' },
                { to: '/bid', icon: ArrowDownLeft, label: 'Bid Orders', badge: null, color: 'blue' },
            ]
        },
        {
            id: 'social',
            title: 'Community',
            icon: Users,
            color: 'pink',
            items: [
                { to: '/referral', icon: Gift, label: 'Referral Program', badge: '10%', color: 'yellow' },
                { to: '/support', icon: MessageSquare, label: 'Support Center', badge: null, color: 'indigo' },
            ]
        },
        {
            id: 'account',
            title: 'My Account',
            icon: User,
            color: 'gray',
            items: [
                { to: '/profile', icon: User, label: 'Profile Settings', badge: null, color: 'slate' },
                { to: '/settings', icon: Settings, label: 'Preferences', badge: null, color: 'gray' },
            ]
        }
    ];

    const filteredSections = menuSections.map(section => ({
        ...section,
        items: section.items.filter(item =>
            item.label.toLowerCase().includes(searchQuery.toLowerCase())
        )
    })).filter(section => section.items.length > 0);

    const getColorClasses = (color: string, variant: 'bg' | 'text' | 'border' | 'hover') => {
        const colorMap = {
            blue: {
                bg: 'bg-blue-50',
                text: 'text-blue-600',
                border: 'border-blue-200',
                hover: 'hover:bg-blue-100'
            },
            green: {
                bg: 'bg-green-50',
                text: 'text-green-600',
                border: 'border-green-200',
                hover: 'hover:bg-green-100'
            },
            purple: {
                bg: 'bg-purple-50',
                text: 'text-purple-600',
                border: 'border-purple-200',
                hover: 'hover:bg-purple-100'
            },
            orange: {
                bg: 'bg-orange-50',
                text: 'text-orange-600',
                border: 'border-orange-200',
                hover: 'hover:bg-orange-100'
            },
            red: {
                bg: 'bg-red-50',
                text: 'text-red-600',
                border: 'border-red-200',
                hover: 'hover:bg-red-100'
            },
            emerald: {
                bg: 'bg-emerald-50',
                text: 'text-emerald-600',
                border: 'border-emerald-200',
                hover: 'hover:bg-emerald-100'
            },
            pink: {
                bg: 'bg-pink-50',
                text: 'text-pink-600',
                border: 'border-pink-200',
                hover: 'hover:bg-pink-100'
            },
            yellow: {
                bg: 'bg-yellow-50',
                text: 'text-yellow-600',
                border: 'border-yellow-200',
                hover: 'hover:bg-yellow-100'
            },
            indigo: {
                bg: 'bg-indigo-50',
                text: 'text-indigo-600',
                border: 'border-indigo-200',
                hover: 'hover:bg-indigo-100'
            },
            slate: {
                bg: 'bg-slate-50',
                text: 'text-slate-600',
                border: 'border-slate-200',
                hover: 'hover:bg-slate-100'
            },
            gray: {
                bg: 'bg-gray-50',
                text: 'text-gray-600',
                border: 'border-gray-200',
                hover: 'hover:bg-gray-100'
            }
        };
        return colorMap[color as keyof typeof colorMap]?.[variant] || colorMap.blue[variant];
    };

    return (
        <>
            {/* Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-full w-80 bg-white shadow-xl z-50 transform transition-all duration-300 ease-in-out border-r border-gray-200
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:shadow-lg`}
            >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-100 via-purple-50 to-transparent rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-orange-100 via-yellow-50 to-transparent rounded-full blur-2xl"></div>
                </div>

                {/* Scrollable Container */}
                <div className="flex flex-col h-full overflow-hidden relative z-10">
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-white/80 backdrop-blur-sm">
                        <Link to="/" className="flex items-center gap-3 group">
                            <div className="relative">
                                <div className="w-11 h-11 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                    <img src={pic1} alt="Logo" className="w-6 h-6" />
                                </div>
                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                                    <Sparkles className="w-2.5 h-2.5 text-white" />
                                </div>
                            </div>
                            <div>
                                <h1 className="text-lg font-black text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                                    SOLANAP2PCONNECT
                                </h1>
                                <p className="text-xs text-blue-500 font-bold tracking-wide">P2P CIRCLE</p>
                            </div>
                        </Link>

                        <div className="flex items-center gap-2">
                            {/* Quick Actions */}
                            <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300">
                                <Plus className="w-5 h-5" />
                            </button>

                            {/* Notifications */}
                            <button className="relative p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300">
                                <Bell className="w-5 h-5" />
                                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-xs font-bold">3</span>
                </span>
                            </button>

                            {/* Close Button */}
                            <button
                                onClick={() => setSidebarOpen(false)}
                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-300 lg:hidden"
                                aria-label="Close sidebar"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="px-6 py-4 bg-gray-50/50">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search features..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-11 pr-10 py-3 bg-white border border-gray-200 rounded-2xl text-gray-700 placeholder-gray-400 focus:border-blue-300 focus:ring-4 focus:ring-blue-50 transition-all duration-300 focus:outline-none shadow-sm"
                            />
                            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-blue-600 transition-colors duration-300">
                                <Filter className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="px-6 py-4 border-b border-gray-100">
                        <div className="grid grid-cols-2 gap-3">
                            <div className="relative overflow-hidden p-4 bg-gradient-to-br from-green-50 to-emerald-100 border border-green-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                        <span className="text-xs text-green-700 font-bold">Balance</span>
                                    </div>
                                    <TrendingUp className="w-4 h-4 text-green-600" />
                                </div>
                                <p className="text-gray-800 font-black text-lg">{`${user?.balance || 0} USDT`}</p>
                                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-200/50 rounded-full"></div>
                            </div>

                            <div className="relative overflow-hidden p-4 bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <Zap className="w-3 h-3 text-blue-600" />
                                        <span className="text-xs text-blue-700 font-bold">Earnings</span>
                                    </div>
                                    <Award className="w-4 h-4 text-blue-600" />
                                </div>
                                <p className="text-gray-800 font-black text-lg">+{`${user?.earning || 0} USDT`}</p>
                                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-200/50 rounded-full"></div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 py-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                        <div className="space-y-3">
                            {filteredSections.map((section) => (
                                <div key={section.id} className="space-y-1">
                                    {/* Section Header */}
                                    <button
                                        onClick={() => toggleSection(section.id)}
                                        className={`w-full flex items-center justify-between px-4 py-3 text-gray-600 hover:text-gray-800 rounded-2xl transition-all duration-300 group ${getColorClasses(section.color, 'hover')} border border-transparent hover:border-gray-200 hover:shadow-sm`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-xl ${getColorClasses(section.color, 'bg')} ${getColorClasses(section.color, 'text')} group-hover:scale-110 transition-transform duration-300`}>
                                                <section.icon className="w-4 h-4" />
                                            </div>
                                            <span className="text-sm font-bold">{section.title}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 text-xs font-bold rounded-full ${getColorClasses(section.color, 'bg')} ${getColorClasses(section.color, 'text')}`}>
                        {section.items.length}
                      </span>
                                            {expandedSections.includes(section.id) ? (
                                                <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-all duration-300" />
                                            ) : (
                                                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-all duration-300" />
                                            )}
                                        </div>
                                    </button>

                                    {/* Section Items */}
                                    {expandedSections.includes(section.id) && (
                                        <div className="ml-6 space-y-1 animate-in slide-in-from-top-2 duration-200">
                                            {section.items.map((item) => (
                                                <SidebarLink
                                                    key={item.to}
                                                    to={item.to}
                                                    icon={<item.icon className="w-4 h-4" />}
                                                    isActive={location.pathname === item.to}
                                                    badge={item.badge}
                                                    color={item.color}
                                                >
                                                    {item.label}
                                                </SidebarLink>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </nav>

                    {/* User Profile Section */}
                    <div className="border-t border-gray-100 p-4 bg-gray-50/50">
                        <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all duration-300 cursor-pointer group">
                            <div className="relative">
                                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                                    <User className="w-6 h-6 text-white" />
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-gray-800 font-bold text-sm truncate">{user?.firstname} {user?.lastname}</p>
                                <p className="text-gray-500 text-xs truncate">Premium Member</p>
                                <div className="flex items-center gap-1 mt-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`w-3 h-3 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <button
                                    onClick={() => setDarkMode(!darkMode)}
                                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300"
                                >
                                    {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="border-t border-gray-100 p-4 space-y-2 bg-white">
                        <SidebarLink
                            to="/help"
                            icon={<HelpCircle className="w-4 h-4" />}
                            isActive={false}
                            color="indigo"
                        >
                            Help & Support
                        </SidebarLink>

                        <button
                            onClick={() => {
                                // Handle logout
                                window.location.href = '/login';
                            }}
                            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-2xl transition-all duration-300 group border border-transparent hover:border-red-200"
                        >
                            <div className="p-2 bg-red-50 text-red-500 rounded-xl group-hover:bg-red-100 transition-all duration-300">
                                <LogOut className="w-4 h-4" />
                            </div>
                            <span className="font-bold text-sm">Sign Out</span>
                        </button>
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
                         isActive = false,
                         badge = null,
                         color = 'blue',
                     }: {
    to: string;
    icon: JSX.Element;
    children: React.ReactNode;
    isActive?: boolean;
    badge?: string | null;
    color?: string;
}) {
    const getColorClasses = (color: string, variant: 'bg' | 'text' | 'border' | 'hover') => {
        const colorMap = {
            blue: {
                bg: 'bg-blue-50',
                text: 'text-blue-600',
                border: 'border-blue-200',
                hover: 'hover:bg-blue-100'
            },
            green: {
                bg: 'bg-green-50',
                text: 'text-green-600',
                border: 'border-green-200',
                hover: 'hover:bg-green-100'
            },
            purple: {
                bg: 'bg-purple-50',
                text: 'text-purple-600',
                border: 'border-purple-200',
                hover: 'hover:bg-purple-100'
            },
            red: {
                bg: 'bg-red-50',
                text: 'text-red-600',
                border: 'border-red-200',
                hover: 'hover:bg-red-100'
            },
            emerald: {
                bg: 'bg-emerald-50',
                text: 'text-emerald-600',
                border: 'border-emerald-200',
                hover: 'hover:bg-emerald-100'
            },
            yellow: {
                bg: 'bg-yellow-50',
                text: 'text-yellow-600',
                border: 'border-yellow-200',
                hover: 'hover:bg-yellow-100'
            },
            indigo: {
                bg: 'bg-indigo-50',
                text: 'text-indigo-600',
                border: 'border-indigo-200',
                hover: 'hover:bg-indigo-100'
            },
            slate: {
                bg: 'bg-slate-50',
                text: 'text-slate-600',
                border: 'border-slate-200',
                hover: 'hover:bg-slate-100'
            },
            gray: {
                bg: 'bg-gray-50',
                text: 'text-gray-600',
                border: 'border-gray-200',
                hover: 'hover:bg-gray-100'
            }
        };
        return colorMap[color as keyof typeof colorMap]?.[variant] || colorMap.blue[variant];
    };

    return (
        <Link
            to={to}
            className={`flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-300 group border ${
                isActive
                    ? `${getColorClasses(color, 'bg')} ${getColorClasses(color, 'border')} ${getColorClasses(color, 'text')} shadow-md font-bold`
                    : `text-gray-600 hover:text-gray-800 border-transparent ${getColorClasses(color, 'hover')} hover:border-gray-200 hover:shadow-sm`
            }`}
        >
            <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl transition-all duration-300 ${
                    isActive
                        ? `${getColorClasses(color, 'text')} bg-white shadow-sm`
                        : `${getColorClasses(color, 'bg')} ${getColorClasses(color, 'text')} group-hover:scale-110`
                }`}>
                    {icon}
                </div>
                <span className="font-semibold text-sm">{children}</span>
            </div>

            {badge && (
                <span className={`px-2.5 py-1 text-xs font-bold rounded-full shadow-sm ${
                    badge === 'Hot' || badge === 'New'
                        ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white'
                        : badge.includes('%')
                            ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white'
                            : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                }`}>
          {badge}
        </span>
            )}
        </Link>
    );
}
