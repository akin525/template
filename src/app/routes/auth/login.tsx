import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Mail,
  Lock,
  Shield,
  Zap,
  CheckCircle,
  Sparkles,
  Globe,
  Users,
  TrendingUp
} from "lucide-react";
import { toast } from "react-toastify";
import pic1 from "@/assets/solanasvg.webp";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const getDeviceName = () => {
  const ua = navigator.userAgent;
  const platform = navigator.platform;
  const browser = (() => {
    if (ua.includes("Firefox")) return "Firefox";
    if (ua.includes("Chrome")) return "Chrome";
    if (ua.includes("Safari")) return "Safari";
    if (ua.includes("Edg")) return "Edge";
    return "Unknown";
  })();
  return `${platform} ${browser}`;
};

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [siteName, setSiteName] = useState("SOLANAP2PCONNECT");
  const [loginEnabled, setLoginEnabled] = useState(true);
  const [focusedField, setFocusedField] = useState("");

  const device_name = getDeviceName();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchSystemConfig = async () => {
      try {
        const res = await fetch(`${baseUrl}system-config`);
        const result = await res.json();
        if (result.success) {
          setSiteName(result.data.sitename || "SOLANAP2PCONNECT");
          setLoginEnabled(result.data.login === 1);
        } else {
          toast.error("Failed to load system config.");
        }
      } catch {
        toast.error("System config error.");
      }
    };
    fetchSystemConfig();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!loginEnabled) return toast.error("Login is currently disabled by admin.");
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, device_name }),
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Login failed");

      if (data.success) {
        const token = data.token;
        rememberMe
            ? localStorage.setItem("authToken", token)
            : sessionStorage.setItem("authToken", token);
        toast.success(data.message || "Login successful");
        window.location.href = "/dashboard";
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      toast.error(error.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const features = [
    { icon: Shield, text: "100% Secure & Decentralized" },
    { icon: Zap, text: "Lightning Fast Transactions" },
    { icon: Globe, text: "Global P2P Network" },
    { icon: TrendingUp, text: "Guaranteed Returns" }
  ];

  const stats = [
    { value: "10K+", label: "Active Users" },
    { value: "99.9%", label: "Uptime" },
    { value: "$2M+", label: "Traded Volume" }
  ];

  return (
      <div className="min-h-screen flex relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900"></div>
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full blur-3xl"></div>

        {/* Left Section - Branding & Features */}
        <div className="hidden lg:flex lg:w-1/2 relative z-10 flex-col justify-center px-12 xl:px-20">
          {/* Back Button */}
          <div className="absolute top-8 left-8">
            <Link
                to="/"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>

          {/* Main Content */}
          <div className="space-y-12">
            {/* Logo & Branding */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center">
                  <img src={pic1} alt="Logo" className="w-10 h-10" />
                </div>
                <div>
                  <h5 className="font-black text-white">
                    {siteName?.toUpperCase()}
                  </h5>
                  <p className="text-blue-300 font-semibold">P2P CIRCLE</p>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl xl:text-3xl font-black text-white leading-tight">
                  Welcome Back to the
                  <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  Future of Trading
                </span>
                </h2>
                <p className="text-xl text-gray-300 leading-relaxed">
                  Join thousands of traders in our secure, decentralized P2P ecosystem.
                  Your financial freedom starts here.
                </p>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                Why Choose Us?
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-lg flex items-center justify-center">
                        <feature.icon className="w-5 h-5 text-blue-400" />
                      </div>
                      <span className="text-white font-medium text-sm">{feature.text}</span>
                    </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-8">
              {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-black text-yellow-400">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section - Login Form */}
        <div className="w-full lg:w-1/2 relative z-10 flex items-center justify-center p-8">
          {/* Mobile Back Button */}
          <div className="lg:hidden absolute top-6 left-6">
            <Link
                to="/"
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
                {siteName?.toUpperCase()} <span className="text-yellow-400">P2P</span>
              </h1>
            </div>

            {/* Login Card */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
                <p className="text-gray-300">Sign in to access your dashboard</p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
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
                        placeholder="Enter your email"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-semibold text-gray-200">Password</label>
                    <Link
                        to="/forgot-password"
                        className="text-sm text-blue-400 hover:text-blue-300 transition-colors duration-300"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className={`w-5 h-5 transition-colors duration-300 ${
                          focusedField === 'password' ? 'text-blue-400' : 'text-gray-400'
                      }`} />
                    </div>
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setFocusedField('password')}
                        onBlur={() => setFocusedField('')}
                        required
                        className="w-full pl-12 pr-12 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-blue-400 focus:bg-white/10 transition-all duration-300 focus:outline-none"
                        placeholder="Enter your password"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors duration-300"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <div className="relative">
                      <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded border-2 transition-all duration-300 ${
                          rememberMe
                              ? 'bg-blue-500 border-blue-500'
                              : 'border-gray-400 bg-transparent'
                      }`}>
                        {rememberMe && (
                            <CheckCircle className="w-5 h-5 text-white absolute -top-0.5 -left-0.5" />
                        )}
                      </div>
                    </div>
                    <span className="text-sm text-gray-300">Remember me</span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading || !loginEnabled}
                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                        loading || !loginEnabled
                            ? "bg-gray-600 cursor-not-allowed text-gray-400"
                            : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02]"
                    }`}
                >
                  {loading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Signing in...
                      </div>
                  ) : (
                      "Sign In to Dashboard"
                  )}
                </button>
              </form>

              {/* Bottom Links */}
              <div className="mt-8 text-center">
                <p className="text-gray-300">
                  Don't have an account?{" "}
                  <Link
                      to="/register"
                      className="text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-300"
                  >
                    Create one now
                  </Link>
                </p>
              </div>

              {/* Security Badge */}
              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">
                <Shield className="w-4 h-4" />
                <span>Secured with 256-bit SSL encryption</span>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
