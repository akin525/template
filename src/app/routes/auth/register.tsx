import type React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";

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

const formFields = [
  { id: "firstName", label: "First Name", type: "text", placeholder: "Enter your first name" },
  { id: "lastName", label: "Last Name", type: "text", placeholder: "Enter your last name" },
  { id: "username", label: "Username", type: "text", placeholder: "Choose a username" },
  { id: "bep_address", label: "USDT Wallet Address (BEP20)", type: "text", placeholder: "Enter wallet address" },
  { id: "country", label: "Country", type: "text", placeholder: "Enter your country" },
  { id: "email", label: "Email Address", type: "email", placeholder: "Enter your email" },
  { id: "phone", label: "Phone Number", type: "tel", placeholder: "Enter your phone number" },
  { id: "referralCode", label: "Referral Code (Optional)", type: "text", placeholder: "Enter referral code" },
];

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loginEnabled, setLoginEnabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    bep_address: "",
    country: "",
    email: "",
    phone: "",
    referralCode: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  // Pre-fill referral from URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const referral = searchParams.get("ref");
    if (referral) {
      setFormData(prev => ({ ...prev, referralCode: referral }));
    }
  }, []);

  // Get system config
  useEffect(() => {
    const fetchSystemConfig = async () => {
      try {
        const res = await fetch(`${baseUrl}system-config`);
        const result = await res.json();
        if (result.success) {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    const payload = {
      firstname: formData.firstName,
      lastname: formData.lastName,
      email: formData.email,
      username: formData.username,
      phone: formData.phone,
      password: formData.password,
      bep_address: formData.bep_address,
      country: formData.country,
      referral: formData.referralCode || "",
      device_name: getDeviceName(),
    };

    try {
      const res = await fetch(`${baseUrl}register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        sessionStorage.setItem("authToken", data.token);
        toast.success(data.message || "Account created successfully");
        window.location.href = "/dashboard";
      } else {
        toast.error(data.message || "Registration failed");
      }
    } catch {
      toast.error("Network error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="min-h-screen bg-white flex flex-col">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="inline-flex items-center text-gray-700 hover:text-primary transition">
            <ArrowLeft className="h-4 w-4 mr-2"/>
            Back to Home
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-4xl">
            <div className="text-center mb-8">
              <Link to="/" className="inline-block">
                <h4 className="text-center font-gothic text-gray-900">
                  SMART <span className="text-primary font-gothic">P2P</span> CIRCLE
                </h4>
              </Link>
              <h1 className="text-2xl font-bold mt-6 mb-2 text-gray-900">Create Your Account</h1>
              <p className="text-gray-600">
                Join SMARTP2PCIRCLE Trading and start trading cryptocurrencies
              </p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-md">
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {formFields.map(({id, label, type, placeholder}) => (
                    <div key={id} className="space-y-2">
                      <label htmlFor={id} className="block text-sm font-medium text-gray-800">{label}</label>
                      <input
                          id={id}
                          name={id}
                          type={type}
                          value={formData[id as keyof typeof formData] as string}
                          onChange={handleChange}
                          placeholder={placeholder}
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-gray-900"
                          required={id !== "referralCode"}
                      />
                    </div>
                ))}

                {/* Password Field */}
                <div className="space-y-2 md:col-span-3">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-800">Password</label>
                  <div className="relative">
                    <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 pr-10"
                        placeholder="Create a password"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(prev => !prev)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-800"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5"/> : <Eye className="h-5 w-5"/>}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Must be at least 8 characters with uppercase, lowercase, and number.
                  </p>
                </div>

                {/* Confirm Password */}
                <div className="space-y-2 md:col-span-3">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-800">Confirm
                    Password</label>
                  <div className="relative">
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 pr-10"
                        placeholder="Confirm your password"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(prev => !prev)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-800"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5"/> : <Eye className="h-5 w-5"/>}
                    </button>
                  </div>
                </div>

                {/* Terms Agreement */}
                <div className="md:col-span-3">
                  <div className="flex items-start">
                    <input
                        id="agreeTerms"
                        name="agreeTerms"
                        type="checkbox"
                        checked={formData.agreeTerms}
                        onChange={handleChange}
                        className="h-4 w-4 rounded border-gray-300 bg-white text-primary focus:ring-primary"
                        required
                    />
                    <label htmlFor="agreeTerms" className="ml-3 text-sm text-gray-700">
                      I agree to the <Link to="/terms" className="text-primary hover:underline">Terms of
                      Service</Link> and <Link to="/privacy" className="text-primary hover:underline">Privacy
                      Policy</Link>
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="md:col-span-3">
                  <button
                      type="submit"
                      disabled={loading || !loginEnabled}
                      className={`w-full px-4 py-3 rounded-lg font-medium transition ${
                          loading || !loginEnabled
                              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                              : "bg-primary hover:bg-yellow-500 text-white"
                      }`}
                  >
                    {loading ? "Creating..." : "Create Account"}
                  </button>
                </div>
              </form>
            </div>

            {/* Footer */}
            <div className="text-center mt-8">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="text-primary hover:underline">Sign in</Link>
              </p>
            </div>
          </div>
        </div>
      </div>

  );
}
