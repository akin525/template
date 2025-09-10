import { useState } from "react";
import { Link } from "react-router";
import {
    Mail,
    ArrowLeft,
    Shield,
    Clock,
    CheckCircle,
    AlertCircle,
    Sparkles,
    Lock,
    RefreshCw
} from "lucide-react";
import { toast } from "react-toastify";
import pic1 from "@/assets/solanasvg.webp";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export default function ResetPasswordRequest() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState("request"); // "request" | "sent"
    const [focusedField, setFocusedField] = useState("");

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
            });

            const data = await response.json();

            if (data.success === true) {
                toast.success(data.message);
                setStep("sent");
                setMessage("✅ Reset code sent to your email.");
                // Redirect after a delay to show success state
                setTimeout(() => {
                    window.location.href = "/set-password";
                }, 2000);
            } else {
                toast.error(data.message);
                setMessage("❌ Failed to send reset code. Please try again.");
            }
        } catch (err: any) {
            toast.error(err.message || "Network error occurred");
            setMessage("❌ Failed to send reset code. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const securityFeatures = [
        { icon: Shield, text: "Secure 6-digit verification code" },
        { icon: Clock, text: "Code expires in 15 minutes" },
        { icon: Lock, text: "Your account remains protected" }
    ];

    return (
        <div className="min-h-screen flex relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900"></div>
            <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full blur-3xl"></div>

            {/* Left Section - Branding & Info */}
            <div className="hidden lg:flex lg:w-1/2 relative z-10 flex-col justify-center px-12 xl:px-20">
                {/* Back Button */}
                <div className="absolute top-8 left-8">
                    <Link
                        to="/login"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Login
                    </Link>
                </div>

                {/* Main Content */}
                <div className="space-y-12">
                    {/* Logo & Branding */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center">
                                <img src={pic1} alt="Logo" className="w-10 h-10" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-black text-white">SOLANAP2P</h1>
                                <p className="text-blue-300 font-semibold">P2P CIRCLE</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-4xl xl:text-5xl font-black text-white leading-tight">
                                Secure Account
                                <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  Recovery
                </span>
                            </h2>
                            <p className="text-xl text-gray-300 leading-relaxed">
                                Don't worry! It happens to the best of us. We'll help you regain access to your account securely and quickly.
                            </p>
                        </div>
                    </div>

                    {/* Security Features */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-yellow-400" />
                            How It Works
                        </h3>
                        <div className="space-y-4">
                            {securityFeatures.map((feature, index) => (
                                <div key={index} className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
                                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-lg flex items-center justify-center">
                                        <feature.icon className="w-5 h-5 text-blue-400" />
                                    </div>
                                    <span className="text-white font-medium">{feature.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Help Text */}
                    <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
                        <h4 className="text-white font-semibold mb-2">Need Help?</h4>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            If you don't receive the reset code within a few minutes, check your spam folder or contact our support team for assistance.
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Section - Reset Form */}
            <div className="w-full lg:w-1/2 relative z-10 flex items-center justify-center p-8">
                {/* Mobile Back Button */}
                <div className="lg:hidden absolute top-6 left-6">
                    <Link
                        to="/login"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </Link>
                </div>

                <div className="w-full max-w-md">
                    {/* Mobile Logo */}
                    <div className="lg:hidden text-center mb-8 mt-16">
                        <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <img src={pic1} alt="Logo" className="w-10 h-10" />
                        </div>
                        <h1 className="text-2xl font-black text-white">
                            SOLANAP2P <span className="text-yellow-400">P2P</span>
                        </h1>
                    </div>

                    {/* Reset Card */}
                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
                        {step === "request" ? (
                            <>
                                {/* Header */}
                                <div className="text-center mb-8">
                                    <div className="w-16 h-16 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <RefreshCw className="w-8 h-8 text-orange-400" />
                                    </div>
                                    <h2 className="text-3xl font-bold text-white mb-2">Forgot Password?</h2>
                                    <p className="text-gray-300">
                                        No worries! Enter your email address and we'll send you a reset code.
                                    </p>
                                </div>

                                {/* Form */}
                                <form onSubmit={handleRequest} className="space-y-6">
                                    {/* Email Field */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-200">Email Address</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <Mail className={`w-5 h-5 transition-colors duration-300 ${
                                                    focusedField === 'email' ? 'text-blue-400' : 'text-gray-400'
                                                }`} />
                                            </div>
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                onFocus={() => setFocusedField('email')}
                                                onBlur={() => setFocusedField('')}
                                                required
                                                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-blue-400 focus:bg-white/10 transition-all duration-300 focus:outline-none"
                                                placeholder="Enter your registered email"
                                            />
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                                            loading
                                                ? "bg-gray-600 cursor-not-allowed text-gray-400"
                                                : "bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-[1.02]"
                                        }`}
                                    >
                                        {loading ? (
                                            <div className="flex items-center justify-center gap-2">
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                Sending Reset Code...
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-center gap-2">
                                                <Mail className="w-5 h-5" />
                                                Send Reset Code
                                            </div>
                                        )}
                                    </button>

                                    {/* Error Message */}
                                    {message && message.includes("❌") && (
                                        <div className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                                            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                                            <p className="text-red-300 text-sm">{message.replace("❌ ", "")}</p>
                                        </div>
                                    )}
                                </form>
                            </>
                        ) : (
                            <>
                                {/* Success State */}
                                <div className="text-center space-y-6">
                                    <div className="w-20 h-20 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center mx-auto">
                                        <CheckCircle className="w-10 h-10 text-green-400" />
                                    </div>

                                    <div className="space-y-3">
                                        <h2 className="text-3xl font-bold text-white">Check Your Email!</h2>
                                        <p className="text-gray-300 leading-relaxed">
                                            We've sent a 6-digit verification code to
                                        </p>
                                        <p className="text-blue-400 font-semibold text-lg">{email}</p>
                                    </div>

                                    <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                                        <p className="text-blue-300 text-sm">
                                            Redirecting you to the password reset page...
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                                        <Clock className="w-4 h-4" />
                                        <span>Code expires in 15 minutes</span>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Bottom Links */}
                        <div className="mt-8 text-center space-y-4">
                            <p className="text-gray-300">
                                Remember your password?{" "}
                                <Link
                                    to="/login"
                                    className="text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-300"
                                >
                                    Sign in here
                                </Link>
                            </p>

                            <div className="text-xs text-gray-400">
                                <p>
                                    Don't have an account?{" "}
                                    <Link
                                        to="/register"
                                        className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
                                    >
                                        Create one
                                    </Link>
                                </p>
                            </div>
                        </div>

                        {/* Security Badge */}
                        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">
                            <Shield className="w-4 h-4" />
                            <span>Secure password recovery process</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
