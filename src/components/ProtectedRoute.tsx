import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getAuthToken } from "../utils/auth";
import { toast } from "react-toastify";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader.tsx";
import { useUser } from "@/context/UserContext.tsx";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const [isValid, setIsValid] = useState<boolean | null>(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const { setUser } = useUser();

    useEffect(() => {
        const verifyToken = async () => {
            const token = getAuthToken();

            if (!token) {
                navigate("/login");
                return;
            }

            try {
                // 1. Validate user session
                const response = await fetch(`${baseUrl}dashboard`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                const data = await response.json();

                if (response.ok) {
                    if (data.message === "Telegram Id Verification Required.") {
                        navigate("/verify-telegram");
                        return;
                    }

                    if (data.success === true) {
                        // 2. Fetch system settings
                        const settingsResponse = await fetch(`${baseUrl}system-config`, {
                            method: "GET",
                            headers: {
                                Authorization: `Bearer ${token}`,
                                "Content-Type": "application/json",
                            },
                        });

                        const settingsData = await settingsResponse.json();
                        console.log("Settings:", settingsData);

                        const isMaintenance = settingsData?.data?.maintain === 1;
                        if (isMaintenance) {
                            navigate("/maintenance");
                        }
                        // 3. Merge user data with settings
                        setUser({
                            ...data.data.user,
                            recentBids: data.data.recentBids || [],
                            recentAsks: data.data.recentAsks || [],
                            runningInvest: data.data.runningInvest,
                            sitebot: data.data.siteBot,
                            telegramchannel: settingsData?.data?.telegram_channel || null,
                            telegramgroup: settingsData?.data?.telegram_group || null,
                            timeopening: settingsData?.data?.opening_time || null,
                            timeclosing: settingsData?.data?.closing_time || null,
                        });

                        setIsValid(true);
                        return;
                    }
                }

                throw new Error(data.message || "Unauthorized");
            } catch (error: any) {
                localStorage.removeItem("authToken");
                sessionStorage.removeItem("authToken");
                toast.error(error.message || "Session expired. Please login again.");
                navigate("/login");
            }
        };

        verifyToken();
    }, [navigate, setUser]);


    if (isValid === null) {
        return (
            <div className="min-h-screen flex text-gray-900 bg-gray-100">
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/30 z-20 lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    ></div>
                )}

                <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)}/>

                <div className="flex-1 flex flex-col overflow-hidden">
                    <DashboardHeader setSidebarOpen={setSidebarOpen}/>

                    {/* Modern Loader */}
                    <div className="flex-1 flex items-center justify-center bg-gray-200">
                        <div className="relative w-20 h-20">
                            {/* Glowing ring */}
                            <div className="absolute inset-0 rounded-full border-4 border-blue-300 animate-ping"></div>
                            {/* Spinning border */}
                            <div
                                className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin shadow-lg"></div>
                            {/* Center dot */}
                            <div
                                className="absolute top-1/2 left-1/2 w-4 h-4 bg-blue-600 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-md"></div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
    return <>{children}</>;
}
