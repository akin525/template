import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  Eye,
  EyeOff,
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Wallet,
  Lock,
  UserPlus,
  Shield,
  CheckCircle,
  Sparkles,
  TrendingUp,
  Gift,
  Zap
} from "lucide-react";
import { toast } from "react-toastify";
import pic1 from "@/assets/SOLANA-P2P-LOGO.png";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

type RegisterFormFields = {
  firstName: string;
  lastName: string;
  username: string;
  bep_address: string;
  country: string;
  email: string;
  phone: string;
  referralCode: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
};

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

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loginEnabled, setLoginEnabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [focusedField, setFocusedField] = useState("");
  const [formData, setFormData] = useState<RegisterFormFields>({
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;
    const checked = target.checked;

    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

  const benefits = [
    { icon: Shield, text: "100% Secure & Decentralized", color: "text-blue-400" },
    { icon: Zap, text: "10-Day Fast Cycles", color: "text-yellow-400" },
    { icon: TrendingUp, text: "200% Returns Guaranteed", color: "text-green-400" },
    { icon: Gift, text: "10% Referral Bonus", color: "text-purple-400" }
  ];

  const stats = [
    { value: "15K+", label: "Active Members" },
    { value: "$5M+", label: "Total Volume" },
    { value: "99.9%", label: "Success Rate" }
  ];

  const formFields = [
    {
      id: "firstName",
      label: "First Name",
      type: "text",
      placeholder: "Enter your first name",
      icon: User,
      step: 1
    },
    {
      id: "lastName",
      label: "Last Name",
      type: "text",
      placeholder: "Enter your last name",
      icon: User,
      step: 1
    },
    {
      id: "username",
      label: "Username",
      type: "text",
      placeholder: "Choose a unique username",
      icon: UserPlus,
      step: 1
    },
    {
      id: "email",
      label: "Email Address",
      type: "email",
      placeholder: "Enter your email address",
      icon: Mail,
      step: 1
    },
    {
      id: "phone",
      label: "Phone Number",
      type: "tel",
      placeholder: "Enter your phone number",
      icon: Phone,
      step: 2
    },
    {
      id: "country",
      label: "Country",
      type: "text",
      placeholder: "Enter your country",
      icon: MapPin,
      step: 2
    },
    {
      id: "bep_address",
      label: "USDT Wallet Address(SPL) ",
      type: "text",
      placeholder: "Enter your  wallet SPL address",
      icon: Wallet,
      step: 2
    },
    {
      id: "referralCode",
      label: "Referral Code (Optional)",
      type: "text",
      placeholder: "Enter referral code if you have one",
      icon: Gift,
      step: 2
    },
  ];

  const getStepFields = (step: number) => formFields.filter(field => field.step === step);

  return (
      <div className="min-h-screen flex relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900"></div>
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full blur-3xl"></div>

        {/* Left Section - Branding & Benefits */}
        <div className="hidden lg:flex lg:w-2/5 relative z-10 flex-col justify-center px-12 xl:px-16">
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
                <div className="w-5 h-5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center">
                  <img src={pic1} alt="Logo" className="w-10 h-10" />
                </div>
                <div>
                  <h5 className="font-black text-white">SOLANAP2PCONNECT</h5>
                  {/*<p className="text-blue-300 font-semibold">P2P CIRCLE</p>*/}
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl xl:text-3xl font-black text-white leading-tight">
                  Join the Future of
                  <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  Decentralized Trading
                </span>
                </h2>
                <p className="text-xl text-gray-300 leading-relaxed">
                  Create your account and start earning with our secure, transparent P2P ecosystem.
                  Your financial freedom journey begins here.
                </p>
              </div>
            </div>

            {/* Benefits */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                Why Join Us?
              </h3>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-xl flex items-center justify-center">
                        <benefit.icon className={`w-6 h-6 ${benefit.color}`} />
                      </div>
                      <span className="text-white font-medium">{benefit.text}</span>
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

        {/* Right Section - Registration Form */}
        <div className="w-full lg:w-3/5 relative z-10 flex items-center justify-center p-8">
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

          <div className="w-full max-w-2xl">
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-8 mt-16">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <img src={pic1} alt="Logo" className="w-10 h-10" />
              </div>
              <h1 className="text-2xl font-black text-white">
                SOLANAP2P <span className="text-yellow-400">P2P</span>
              </h1>
            </div>

            {/* Registration Card */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Create Your Account</h2>
                <p className="text-gray-300">Join thousands of successful traders today</p>
              </div>

              {/* Progress Steps */}
              <div className="flex items-center justify-center mb-8">
                <div className="flex items-center gap-4">
                  {[1, 2, 3].map((step) => (
                      <React.Fragment key={step}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                            currentStep >= step
                                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                                : 'bg-white/10 text-gray-400'
                        }`}>
                          {currentStep > step ? <CheckCircle className="w-5 h-5" /> : step}
                        </div>
                        {step < 3 && (
                            <div className={`w-12 h-1 rounded-full transition-all duration-300 ${
                                currentStep > step ? 'bg-gradient-to-r from-blue-500 to-purple-600' : 'bg-white/20'
                            }`}></div>
                        )}
                      </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-white mb-4">Personal Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {getStepFields(1).map((field) => {
                          const IconComponent = field.icon;
                          return (
                              <div key={field.id} className="space-y-2">
                                <label className="text-sm font-semibold text-gray-200">{field.label}</label>
                                <div className="relative">
                                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <IconComponent className={`w-5 h-5 transition-colors duration-300 ${
                                        focusedField === field.id ? 'text-blue-400' : 'text-gray-400'
                                    }`} />
                                  </div>
                                  <input
                                      type={field.type}
                                      name={field.id}
                                      value={formData[field.id as keyof typeof formData] as string}
                                      onChange={handleChange}
                                      onFocus={() => setFocusedField(field.id)}
                                      onBlur={() => setFocusedField('')}
                                      required
                                      className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-blue-400 focus:bg-white/10 transition-all duration-300 focus:outline-none"
                                      placeholder={field.placeholder}
                                  />
                                </div>
                              </div>
                          );
                        })}
                      </div>
                      <button
                          type="button"
                          onClick={() => setCurrentStep(2)}
                          className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                      >
                        Continue to Step 2
                      </button>
                    </div>
                )}

                {/* Step 2: Contact & Wallet Information */}
                {currentStep === 2 && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-white mb-4">Contact & Wallet Details</h3>
                      <div className="grid grid-cols-1 gap-6">
                        {getStepFields(2).map((field) => {
                          const IconComponent = field.icon;
                          return (
                              <div key={field.id} className="space-y-2">
                                <label className="text-sm font-semibold text-gray-200">{field.label}</label>
                                <div className="relative">
                                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <IconComponent className={`w-5 h-5 transition-colors duration-300 ${
                                        focusedField === field.id ? 'text-blue-400' : 'text-gray-400'
                                    }`} />
                                  </div>
                                  <input
                                      type={field.type}
                                      name={field.id}
                                      value={formData[field.id as keyof typeof formData] as string}
                                      onChange={handleChange}
                                      onFocus={() => setFocusedField(field.id)}
                                      onBlur={() => setFocusedField('')}
                                      required={field.id !== "referralCode"}
                                      className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-blue-400 focus:bg-white/10 transition-all duration-300 focus:outline-none"
                                      placeholder={field.placeholder}
                                  />
                                </div>
                              </div>
                          );
                        })}
                      </div>
                      <div className="flex gap-4">
                        <button
                            type="button"
                            onClick={() => setCurrentStep(1)}
                            className="flex-1 py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-all duration-300"
                        >
                          Back
                        </button>
                        <button
                            type="button"
                            onClick={() => setCurrentStep(3)}
                            className="flex-1 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                        >
                          Continue to Step 3
                        </button>
                      </div>
                    </div>
                )}

                {/* Step 3: Security & Terms */}
                {currentStep === 3 && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-white mb-4">Security & Agreement</h3>

                      {/* Password Fields */}
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-200">Password</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                              <Lock className={`w-5 h-5 transition-colors duration-300 ${
                                  focusedField === 'password' ? 'text-blue-400' : 'text-gray-400'
                              }`} />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                onFocus={() => setFocusedField('password')}
                                onBlur={() => setFocusedField('')}
                                required
                                className="w-full pl-12 pr-12 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-blue-400 focus:bg-white/10 transition-all duration-300 focus:outline-none"
                                placeholder="Create a strong password"
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

                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-200">Confirm Password</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                              <Lock className={`w-5 h-5 transition-colors duration-300 ${
                                  focusedField === 'confirmPassword' ? 'text-blue-400' : 'text-gray-400'
                              }`} />
                            </div>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                onFocus={() => setFocusedField('confirmPassword')}
                                onBlur={() => setFocusedField('')}
                                required
                                className="w-full pl-12 pr-12 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-blue-400 focus:bg-white/10 transition-all duration-300 focus:outline-none"
                                placeholder="Confirm your password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors duration-300"
                            >
                              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Terms Agreement */}
                      <div className="space-y-4">
                        <label className="flex items-start gap-3 cursor-pointer">
                          <div className="relative mt-1">
                            <input
                                type="checkbox"
                                name="agreeTerms"
                                checked={formData.agreeTerms}
                                onChange={handleChange}
                                required
                                className="sr-only"
                            />
                            <div className={`w-5 h-5 rounded border-2 transition-all duration-300 ${
                                formData.agreeTerms
                                    ? 'bg-blue-500 border-blue-500'
                                    : 'border-gray-400 bg-transparent'
                            }`}>
                              {formData.agreeTerms && (
                                  <CheckCircle className="w-5 h-5 text-white absolute -top-0.5 -left-0.5" />
                              )}
                            </div>
                          </div>
                          <span className="text-sm text-gray-300 leading-relaxed">
                        I agree to the{" "}
                            <Link to="/terms" className="text-blue-400 hover:text-blue-300 underline">
                          Terms of Service
                        </Link>{" "}
                            and{" "}
                            <Link to="/privacy" className="text-blue-400 hover:text-blue-300 underline">
                          Privacy Policy
                        </Link>
                      </span>
                        </label>
                      </div>

                      {/* Submit Buttons */}
                      <div className="flex gap-4">
                        <button
                            type="button"
                            onClick={() => setCurrentStep(2)}
                            className="flex-1 py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-all duration-300"
                        >
                          Back
                        </button>
                        <button
                            type="submit"
                            disabled={loading || !loginEnabled || !formData.agreeTerms}
                            className={`flex-1 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                                loading || !loginEnabled || !formData.agreeTerms
                                    ? "bg-gray-600 cursor-not-allowed text-gray-400"
                                    : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg shadow-green-500/25 hover:shadow-green-500/40 hover:scale-[1.02]"
                            }`}
                        >
                          {loading ? (
                              <div className="flex items-center justify-center gap-2">
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                Creating Account...
                              </div>
                          ) : (
                              "Create My Account"
                          )}
                        </button>
                      </div>
                    </div>
                )}
              </form>

              {/* Bottom Links */}
              <div className="mt-8 text-center">
                <p className="text-gray-300">
                  Already have an account?{" "}
                  <Link
                      to="/login"
                      className="text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-300"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>

              {/* Security Badge */}
              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">
                <Shield className="w-4 h-4" />
                <span>Your data is protected with enterprise-grade security</span>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
