import { useState } from "react";
const baseUrl = import.meta.env.VITE_API_BASE_URL;
import { toast } from "react-toastify";

export default function ResetPasswordRequest() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRequest = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const response = await fetch(`${baseUrl}reset_password_code`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            })
            setMessage("✅ Reset code sent to your email.");
            const data = await response.json();
            if (data.success ===true){
                toast.success(data.message);
                window.location.href = "/set-password";
            }else {
                toast.error(data.message);
            }
        } catch (err: any) {
            toast.error(err);
            setMessage("❌ Failed to send reset code. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-24 p-8 border rounded-2xl shadow-lg bg-white">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
                Forgot Password?
            </h2>
            <p className="text-gray-600 text-center mb-6">
                Enter your registered email to receive a password reset code.
            </p>
            <form onSubmit={handleRequest}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full flex items-center justify-center gap-2 bg-blue-600 text-white p-3 rounded-lg transition hover:bg-blue-700 ${
                        loading ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                >
                    {loading && (
                        <svg
                            className="w-5 h-5 animate-spin text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                            ></path>
                        </svg>
                    )}
                    {loading ? "Sending..." : "Send Reset Code"}
                </button>
                {message && (
                    <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
                )}
            </form>
        </div>
    );
}
