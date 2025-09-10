import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import {
  Menu,
  ChevronDown,
  Search,
  Moon,
  Sun,
  Bell,
  Settings,
  User,
  LogOut,
  HelpCircle,
  Shield,
  Zap,
  TrendingUp,
  Wallet,
  Filter,
  Command,
  Globe,
  Star,
  Award,
  Gift
} from "lucide-react";
import { useUser } from "@/context/UserContext.tsx";
import pic1 from "@/assets/solanasvg.webp";

export default function DashboardHeader({
                                          setSidebarOpen,
                                        }: {
  setSidebarOpen: (open: boolean) => void;
}) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDark, setIsDark] = useState(() =>
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
  );

  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    navigate("/login");
  };

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setUserMenuOpen(false);
      setNotificationOpen(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const getCountryCode = (countryName: string | undefined) => {
    const countryMap: { [key: string]: string } = {
      "United States": "us",
      Nigeria: "ng",
      "United Kingdom": "gb",
      Canada: "ca",
      Germany: "de",
      France: "fr",
    };
    return countryMap[countryName || ""] || "us";
  };

  const countryCode = getCountryCode(user?.country);

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      type: 'success',
      title: 'Transaction Completed',
      message: 'Your SOL transfer of 2.5 SOL was successful',
      time: '2 min ago',
      unread: true
    },
    {
      id: 2,
      type: 'info',
      title: 'New Referral Bonus',
      message: 'You earned $25 from referral program',
      time: '1 hour ago',
      unread: true
    },
    {
      id: 3,
      type: 'warning',
      title: 'Security Alert',
      message: 'New login from Chrome on Windows',
      time: '3 hours ago',
      unread: false
    }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  // Get page title based on current route
  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('/dashboard')) return 'Dashboard Overview';
    if (path.includes('/wallet')) return 'Wallet Management';
    if (path.includes('/history')) return 'Transaction History';
    if (path.includes('/investments')) return 'Smart Nodes';
    if (path.includes('/ask')) return 'Ask Orders';
    if (path.includes('/bid')) return 'Bid Orders';
    if (path.includes('/referral')) return 'Referral Program';
    if (path.includes('/profile')) return 'Profile Settings';
    if (path.includes('/settings')) return 'Account Settings';
    if (path.includes('/support')) return 'Support Center';
    return 'Dashboard';
  };

  const quickActions = [
    { icon: Wallet, label: 'Quick Transfer', to: '/wallet' },
    { icon: TrendingUp, label: 'Trade Now', to: '/ask' },
    { icon: Gift, label: 'Referrals', to: '/referral' }
  ];

  return (
      <header className="sticky top-0 z-40 border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-sm transition-all duration-300">
        {/* Main Header */}
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left Section */}
            <div className="flex items-center gap-4">
              {/* Sidebar Toggle */}
              <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2.5 text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-all duration-300 hover:scale-105"
              >
                <Menu className="h-5 w-5" />
              </button>

              {/* Page Title & Breadcrumb */}
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  {getPageTitle()}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Welcome back, {user?.firstname}! 👋
                </p>
              </div>
            </div>

            {/* Center Section - Search */}
            <div className="flex-1 max-w-2xl mx-8 hidden md:block">
              <div className="relative">
                <div className={`absolute inset-y-0 left-0 flex items-center pl-4 transition-colors duration-300 ${
                    searchFocused ? 'text-blue-500' : 'text-gray-400'
                }`}>
                  <Search className="h-5 w-5" />
                </div>
                <input
                    type="search"
                    placeholder="Search transactions, wallets, or type a command..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                    className={`w-full pl-12 pr-12 py-3 text-sm bg-gray-50 dark:bg-gray-800 border-2 rounded-2xl placeholder-gray-400 transition-all duration-300 focus:outline-none ${
                        searchFocused
                            ? 'border-blue-500 bg-white dark:bg-gray-700 shadow-lg shadow-blue-500/10'
                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                  <div className="flex items-center gap-2">
                    <kbd className="hidden sm:inline-flex items-center px-2 py-1 text-xs font-medium text-gray-500 bg-gray-100 dark:bg-gray-700 dark:text-gray-400 rounded border">
                      <Command className="w-3 h-3 mr-1" />
                      K
                    </kbd>
                    <button className="p-1 text-gray-400 hover:text-blue-500 transition-colors duration-300">
                      <Filter className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              {/* Quick Actions - Desktop Only */}
              <div className="hidden xl:flex items-center gap-2">
                {quickActions.map((action, index) => (
                    <Link
                        key={index}
                        to={action.to}
                        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 bg-gray-50 dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all duration-300 hover:scale-105"
                    >
                      <action.icon className="w-4 h-4" />
                      <span>{action.label}</span>
                    </Link>
                ))}
              </div>

              {/* Mobile Search Button */}
              <button className="md:hidden p-2.5 text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-all duration-300">
                <Search className="h-5 w-5" />
              </button>

              {/* Theme Toggle */}
              <button
                  onClick={() => setIsDark(!isDark)}
                  className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-105 shadow-sm"
                  title="Toggle Theme"
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>

              {/* Notifications */}
              <div className="relative">
                <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setNotificationOpen(!notificationOpen);
                      setUserMenuOpen(false);
                    }}
                    className="relative p-2.5 text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-all duration-300 hover:scale-105 shadow-sm"
                >
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-xs font-bold">{unreadCount}</span>
                  </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {notificationOpen && (
                    <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">
                      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Notifications</h3>
                          <span className="px-2 py-1 text-xs font-bold bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full">
                        {unreadCount} new
                      </span>
                        </div>
                      </div>
                      <div className="max-h-80 overflow-y-auto">
                        {notifications.map((notification) => (
                            <div
                                key={notification.id}
                                className={`p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-300 ${
                                    notification.unread ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''
                                }`}
                            >
                              <div className="flex items-start gap-3">
                                <div className={`w-2 h-2 rounded-full mt-2 ${
                                    notification.type === 'success' ? 'bg-green-500' :
                                        notification.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                                }`} />
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                    {notification.title}
                                  </p>
                                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                    {notification.message}
                                  </p>
                                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                                    {notification.time}
                                  </p>
                                </div>
                              </div>
                            </div>
                        ))}
                      </div>
                      <div className="p-3 border-t border-gray-200 dark:border-gray-700">
                        <button className="w-full text-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-300">
                          View all notifications
                        </button>
                      </div>
                    </div>
                )}
              </div>

              {/* User Profile Dropdown */}
              <div className="relative">
                <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setUserMenuOpen(!userMenuOpen);
                      setNotificationOpen(false);
                    }}
                    className="flex items-center gap-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-2xl px-3 py-2 transition-all duration-300 hover:shadow-md"
                >
                  <div className="relative">
                    <div className="h-9 w-9 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white flex items-center justify-center text-sm font-bold shadow-lg">
                      {user?.firstname?.[0] || "U"}
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                  </div>

                  <div className="hidden sm:flex flex-col items-start text-left min-w-0">
                  <span className="text-sm font-bold text-gray-900 dark:text-white truncate">
                    {user?.firstname} {user?.lastname}
                  </span>
                    <div className="flex items-center gap-1">
                      <img
                          src={`https://flagcdn.com/w20/${countryCode}.png`}
                          alt=""
                          className="h-3 w-4 rounded-sm object-cover"
                      />
                      <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {user?.country || "Unknown"}
                    </span>
                    </div>
                  </div>

                  <ChevronDown className={`h-4 w-4 text-gray-500 dark:text-gray-400 hidden sm:block transition-transform duration-300 ${
                      userMenuOpen ? 'rotate-180' : ''
                  }`} />
                </button>

                {/* User Dropdown Menu */}
                {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">
                      {/* User Info Header */}
                      <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-700 border-b border-gray-200 dark:border-gray-600">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 text-white flex items-center justify-center text-lg font-bold shadow-lg">
                            {user?.firstname?.[0] || "U"}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                              {user?.firstname} {user?.lastname}
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                              {user?.email}
                            </p>
                            <div className="flex items-center gap-1 mt-1">
                              <Star className="w-3 h-3 text-yellow-500 fill-current" />
                              <span className="text-xs text-gray-500 dark:text-gray-400">Premium Member</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="py-2">
                        <Link
                            to="/profile"
                            className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300"
                        >
                          <div className="p-1.5 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-lg">
                            <User className="w-4 h-4" />
                          </div>
                          <span className="font-medium">Your Profile</span>
                        </Link>

                        <Link
                            to="/settings"
                            className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300"
                        >
                          <div className="p-1.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg">
                            <Settings className="w-4 h-4" />
                          </div>
                          <span className="font-medium">Settings</span>
                        </Link>

                        <Link
                            to="/dashboard/support"
                            className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300"
                        >
                          <div className="p-1.5 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded-lg">
                            <HelpCircle className="w-4 h-4" />
                          </div>
                          <span className="font-medium">Support Center</span>
                        </Link>

                        <div className="border-t border-gray-200 dark:border-gray-600 my-2" />

                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-300"
                        >
                          <div className="p-1.5 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 rounded-lg">
                            <LogOut className="w-4 h-4" />
                          </div>
                          <span className="font-medium">Sign out</span>
                        </button>
                      </div>
                    </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden px-4 pb-3 border-t border-gray-200 dark:border-gray-700">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
                type="search"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
            />
          </div>
        </div>
      </header>
  );
}
