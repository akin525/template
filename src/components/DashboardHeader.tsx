import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { Menu, ChevronDown, Search, Moon, Sun } from "lucide-react";
import { useUser } from "@/context/UserContext.tsx";

export default function DashboardHeader({
                                          setSidebarOpen,
                                        }: {
  setSidebarOpen: (open: boolean) => void;
}) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(() =>
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
  );

  const { user } = useUser();
  const navigate = useNavigate();

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

  return (
      <header className="border-b bg-white dark:bg-gray-900 shadow-sm transition-colors">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Sidebar Toggle */}
            <div className="lg:hidden">
              <button
                  onClick={() => setSidebarOpen(true)}
                  className="p-2 text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md transition"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>

            {/* Search */}
            <div className="flex-1 flex justify-center lg:justify-end">
              <div className="w-full max-w-md">
                <div className="relative text-gray-700 dark:text-gray-200">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                      id="search"
                      type="search"
                      placeholder="Search transactions, wallets..."
                      className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>
              </div>
            </div>

            {/* Profile + Theme Toggle */}
            <div className="ml-4 flex items-center space-x-4">
              {/* Toggle */}
              <button
                  onClick={() => setIsDark(!isDark)}
                  className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition hover:scale-105 shadow"
                  title="Toggle Theme"
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full px-3 py-1 transition text-gray-800 dark:text-gray-100"
                >
                  <div className="h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs uppercase font-bold">
                    {user?.firstname?.[0] || "U"}
                  </div>
                  <div className="hidden sm:flex flex-col items-start text-left">
                  <span className="text-sm font-medium">
                    {user?.firstname} {user?.lastname}
                  </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                    <img
                        src={`https://flagcdn.com/w20/${countryCode}.png`}
                        alt=""
                        className="h-3 w-5 mr-1 rounded-sm object-cover"
                    />
                      {user?.country || "Unknown"}
                  </span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-300 hidden sm:block" />
                </button>

                {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white dark:bg-gray-800 shadow-xl ring-1 ring-gray-200 dark:ring-gray-600 z-50 overflow-hidden">
                      <div className="py-2 text-sm text-gray-700 dark:text-gray-200">
                        <Link
                            to="/profile"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          Your Profile
                        </Link>
                        <Link
                            to="/settings"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          Settings
                        </Link>
                        <Link
                            to="/dashboard/support"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          Support
                        </Link>
                        <div className="border-t border-gray-200 dark:border-gray-700 my-2" />
                        <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          Sign out
                        </button>
                      </div>
                    </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
  );
}
