import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import {ArrowLeft, Eye, EyeOff} from "lucide-react";
import { toast } from "react-toastify";
import pic1 from "@/assets/solanasvg.webp"

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
  const [siteName, setSiteName] = useState("SOLANAP2P");
  const [loginEnabled, setLoginEnabled] = useState(true);

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
          setSiteName(result.data.sitename || "SOLANAP2P");
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

  const handleSubmit = async (e: React.FormEvent) => {
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
    } catch (error: any) {
      toast.error(error.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
        {/* Left Image Section */}
        <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-blue-600 to-[#00b1ed]">
          <img
              src={pic1} // Replace with your own image
              alt="Welcome Illustration"
              className="w-4/5 max-w-md"
          />
        </div>

        {/* Right Login Form */}
        <div className="flex items-center justify-center bg-white px-6 py-12">
          <div className="w-full max-w-md">
            <div className="container mx-auto px-4 py-4">
              <Link to="/" className="inline-flex items-center text-gray-700 hover:text-primary transition">
                <ArrowLeft className="h-4 w-4 mr-2"/>
                Back to Home
              </Link>
            </div>
            {/* Branding */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-extrabold text-gray-900">
                {siteName?.toUpperCase()} <span className="text-[#00b1ed]">P2P CIRCLE</span>
              </h2>
              <p className="mt-2 text-gray-600">Sign in to your account</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:outline-none"
                    placeholder="you@example.com"
                />
              </div>

              {/* Password */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:outline-none pr-10"
                      placeholder="Enter password"
                  />
                  <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5"/> : <Eye className="w-5 h-5"/>}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center">
                <input
                    id="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="remember-me" className="ml-2 text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              {/* Submit */}
              <button
                  type="submit"
                  disabled={loading || !loginEnabled}
                  className={`w-full py-3 rounded-lg font-semibold text-white transition duration-300 ${
                      loading || !loginEnabled
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700"
                  }`}
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            {/* Bottom Link */}
            <div className="text-center mt-6">
              <p className="text-sm text-gray-700">
                Don't have an account?{" "}
                <Link to="/register" className="text-blue-600 hover:underline font-medium">
                  Create one
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
  );
}
