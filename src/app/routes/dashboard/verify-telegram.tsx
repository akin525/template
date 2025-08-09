import {useEffect, useState} from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import {getAuthToken} from "@/utils/auth.tsx";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export default function VerifyTelegramPage() {
    const [telegramId, setTelegramId] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const token = getAuthToken();
    // const [siteName, setSiteName] = useState("SOLANAP2P");
    const [siteBot, setSiteBot] = useState("");

    useEffect(() => {
        const fetchSystemConfig = async () => {
            try {
                const res = await fetch(`${baseUrl}system-config`);
                const result = await res.json();

                if (result.success) {
                    setSiteBot(result.data.telegram);
                } else {
                    toast.error("Failed to load system config.");
                }
            } catch (err) {
                toast.error("System config error.");
            }
        };

        fetchSystemConfig();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`${baseUrl}verify-telegram`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ telegram_id: telegramId }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                toast.success(data.message || "OTP sent successfully");
                navigate("/verify-otp");
            } else {
                toast.error(data.message || "Verification failed");
            }
        } catch (err: any) {
            toast.error(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#050A1A] text-white px-4 py-10">
            <form
                onSubmit={handleSubmit}
                className="bg-[#070D20] p-6 sm:p-8 rounded-xl w-full max-w-lg space-y-6 border border-gray-700 shadow-md"
            >
                <div className="space-y-3">
                    <h2 className="text-2xl sm:text-3xl font-bold text-center">
                        Verify Your Telegram ID
                    </h2>
                    <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                        🔷 <strong>Get Your Telegram Chat ID:</strong> <br />
                        1. Open Telegram and search for{" "}
                            {siteBot}
                        <br />
                        2. Click Start or Send /start <br />
                        3. Select Get Chat ID<br/>
                        4. Copy the chat id and fill in the input box to complete your verification!<br/>
                        {/*5. Start the bot <br />*/}

                    </p>
                </div>

                <input
                    type="text"
                    placeholder="Enter your Telegram Chat ID"
                    value={telegramId}
                    onChange={(e) => setTelegramId(e.target.value)}
                    className="w-full px-4 py-3 bg-[#0A1128] text-white border border-gray-700 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-primary text-black py-3 rounded-lg font-semibold hover:bg-yellow-500 transition"
                    disabled={loading}
                >
                    {loading ? "Sending..." : "Send OTP"}
                </button>
            </form>
        </div>
    );
}
