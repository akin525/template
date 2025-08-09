import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
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

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const referral = searchParams.get("ref");
    if (referral) {
      setFormData(prev => ({ ...prev, referralCode: referral }));
    }
  }, []);

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
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
      <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white">
        {/* Left: Visual or Banner */}
        <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-blue-600 to-[#00b1ed]">
          <div className="text-center max-w-md">
            <h1 className="text-4xl font-bold mb-4 text-white">Join the Future of P2P</h1>
            <p className="text-lg text-white">Decentralized. Transparent. Rewarding.</p>
            <img
                src={pic1}
                alt="Crypto Illustration"
                className="mt-10 max-w-full"
            />
          </div>
        </div>

        {/* Right: Form */}
        <div className="flex flex-col justify-center px-6 py-12 sm:px-12">
        <Link to="/" className="inline-flex items-center text-gray-700 hover:text-primary mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>

          <div className="max-w-3xl mx-auto w-full">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Create Your Account</h2>
              <p className="text-gray-600">Start your journey with SMARTP2P today</p>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {formFields.map(({ id, label, type, placeholder }) => (
                  <div key={id}>
                    <label htmlFor={id} className="block text-sm font-medium text-gray-800 mb-1">
                      {label}
                    </label>
                    <input
                        id={id}
                        name={id}
                        type={type}
                        value={formData[id]}
                        onChange={handleChange}
                        placeholder={placeholder}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        required={id !== "referralCode"}
                    />
                  </div>
              ))}

              {/* Password */}
              <div className="md:col-span-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-800 mb-1">Password</label>
                <div className="relative">
                  <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg pr-10"
                      required
                      placeholder="Enter password"
                  />
                  <button type="button" onClick={() => setShowPassword(p => !p)} className="absolute right-3 top-3">
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="md:col-span-2">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-800 mb-1">Confirm Password</label>
                <div className="relative">
                  <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg pr-10"
                      required
                      placeholder="Confirm password"
                  />
                  <button type="button" onClick={() => setShowConfirmPassword(p => !p)} className="absolute right-3 top-3">
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Agree to Terms */}
              <div className="md:col-span-2 flex items-start space-x-2">
                <input
                    id="agreeTerms"
                    name="agreeTerms"
                    type="checkbox"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    className="h-4 w-4 mt-1"
                    required
                />
                <label htmlFor="agreeTerms" className="text-sm text-gray-700">
                  I agree to the{" "}
                  <Link to="/terms" className="text-primary underline">Terms of Service</Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-primary underline">Privacy Policy</Link>
                </label>
              </div>

              {/* Submit */}
              <div className="md:col-span-2">
                <button
                    type="submit"
                    disabled={loading || !loginEnabled}
                    className={`w-full py-3 rounded-lg text-white font-semibold ${
                        loading || !loginEnabled
                            ? "bg-blue-400 cursor-not-allowed"
                            : "bg-secondary hover:bg-blue-500"
                    }`}
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </button>
              </div>
            </form>

            <p className="text-center text-gray-600 mt-6">
              Already registered?{" "}
              <Link to="/login" className="text-primary font-medium hover:underline">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
  );
}
