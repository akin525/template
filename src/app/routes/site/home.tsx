import {Link, useNavigate} from "react-router";
// import MobileMenu from "@/components/mobile-menu";
import { ReactLenis } from "lenis/react";
import {useEffect} from "react";
import Marquee from "react-fast-marquee";
import AOS from "aos";
import "aos/dist/aos.css";
import pic from "@/assets/psp2.jpg"
import pic1 from "@/assets/psp3.jpg"
import logo from "@/assets/SOLANA-P2P-LOGO.png"
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";

import { Button } from "@/components/ui/button";
// import { DotBackgroundDemo } from "@/components/ui/dot-background";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

import {
  Bitcoin,
  Wallet,
  BarChart3,
  Shield,
  Coins,
  Headphones,
  Zap,
  Menu,
  X,
  Globe,
  TrendingUp,
  ArrowRight,
  Clock,
  Mail,
  MessageCircle,
  ChevronDown,
  Search,
  HelpCircle, Download, Gift, DollarSign, Bot, Sparkles,
} from "lucide-react";
// import {FaArrowCircleUp, FaDownload, FaRobot} from "react-icons/fa";
// import {MdAccessTime, MdAttachMoney} from "react-icons/md";
import axios from "axios";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/', current: true },
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
      <>
        <header
            className={`fixed top-0 z-50 w-full transition-all duration-300 ${
                isScrolled
                    ? 'backdrop-blur-xl bg-white/95 shadow-lg border-b border-gray-200/50'
                    : 'backdrop-blur-md bg-white/80 border-b border-gray-100/50'
            }`}
        >
          <div className="container mx-auto px-4">
            <div className={`flex items-center justify-between transition-all duration-300 ${
                isScrolled ? 'h-16' : 'h-20'
            }`}>

              {/* Logo / Brand - Logo Only Version */}
              <Link to="/" className="flex items-center group">
                <div className="relative">
                  {/* Logo Container */}
                  <div className="w-12 h-12 bg-white rounded-xl shadow-md border border-gray-200 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 overflow-hidden">
                    <img
                        src={logo}
                        alt="SOLANAP2P Logo"
                        className="w-10 h-10 object-contain"
                    />
                  </div>
                  {/* Status Indicator */}
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse border-2 border-white"></div>
                </div>
              </Link>


              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center space-x-1">
                {navItems.map((item) => (
                    <Link
                        key={item.name}
                        to={item.href}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                            item.current
                                ? 'bg-primary/10 text-primary'
                                : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                        }`}
                    >
                      {item.name}
                    </Link>
                ))}
              </nav>

              {/* Desktop Auth Buttons */}
              <div className="hidden md:flex items-center space-x-3">
                <Link to="/login">
                  <Button
                      variant="ghost"
                      className="px-6 py-2 text-gray-700 hover:text-primary hover:bg-primary/5 font-semibold rounded-xl transition-all duration-300"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button
                      className="px-6 py-2 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white font-semibold rounded-xl shadow-lg hover:shadow-primary/25 transform hover:scale-105 transition-all duration-300"
                  >
                    Get Started
                  </Button>
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="md:hidden p-2 rounded-xl text-gray-600 hover:text-primary hover:bg-gray-50 transition-colors duration-300"
              >
                {isMobileMenuOpen ? (
                    <X className="w-6 h-6" />
                ) : (
                    <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`md:hidden transition-all duration-300 overflow-hidden ${
              isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-lg">
              <div className="container mx-auto px-4 py-4 space-y-2">
                {navItems.map((item) => (
                    <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                            item.current
                                ? 'bg-primary/10 text-primary'
                                : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                        }`}
                    >
                      {item.name}
                    </Link>
                ))}

                {/* Mobile Auth Buttons */}
                <div className="pt-4 space-y-3 border-t border-gray-100">
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button
                        variant="outline"
                        className="w-full py-3 text-gray-700 border-gray-200 hover:border-primary hover:text-primary font-semibold rounded-xl"
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button
                        className="w-full py-3 bg-gradient-to-r from-primary to-blue-600 text-white font-semibold rounded-xl shadow-lg"
                    >
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Spacer for fixed header */}
        <div className={`transition-all duration-300 ${isScrolled ? 'h-16' : 'h-20'}`} />
      </>
  );
}

// Alternative MobileMenu component if you prefer to keep it separate
export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
      <div className="relative">
        <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-xl text-gray-600 hover:text-primary hover:bg-gray-50 transition-colors duration-300"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {isOpen && (
            <>
              {/* Backdrop */}
              <div
                  className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                  onClick={() => setIsOpen(false)}
              />

              {/* Menu Panel */}
              <div className="absolute right-0 top-12 w-64 bg-white/95 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-2xl z-50 overflow-hidden">
                <div className="p-4 space-y-2">
                  {navItems.map((item) => (
                      <Link
                          key={item.name}
                          to={item.href}
                          onClick={() => setIsOpen(false)}
                          className="block px-4 py-3 rounded-xl text-gray-600 hover:text-primary hover:bg-gray-50 font-medium transition-colors duration-300"
                      >
                        {item.name}
                      </Link>
                  ))}

                  <div className="pt-4 space-y-3 border-t border-gray-100">
                    <Link to="/login" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full py-2 font-semibold rounded-xl">
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/register" onClick={() => setIsOpen(false)}>
                      <Button className="w-full py-2 bg-gradient-to-r from-primary to-blue-600 text-white font-semibold rounded-xl">
                        Get Started
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </>
        )}
      </div>
  );
}
export default function Home() {
  useEffect(() => {
    AOS.init({ once: true });
    AOS.refresh();
  }, []);

    const navigate = useNavigate();

    useEffect(() => {
        AOS.init({ once: true });
        AOS.refresh();

        // Fetch system config
        axios
            .get(`${baseUrl}system-config`)
            .then((res) => {
                const isMaintenance = res?.data?.data?.maintain === 1;
                if (isMaintenance) {
                    navigate("/maintenance");
                }
            })
            .catch((err) => {
                console.error("System config fetch failed:", err);
            });
    }, [navigate]);

  return (
    <ReactLenis root>
      <div className="">
        {/* Header */}
        <Header />

        <HeroSection />
        <HowItWorksSection/>

        <WhatIsSection />

        <P2PSection />

        {/* Services Section */}
        <ServicesSection />

        {/* Features Section */}
        <FeaturesSection />

        {/* FAQ Section */}
        <FAQSection />

        <SPCUpdateHighlights />

        {/* Footer */}
        <Footer />
      </div>
    </ReactLenis>
  );
}

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: "⚡",
      title: "Lightning Fast",
      description: "5-hour confirmation timer keeps things fast and fair"
    },
    {
      icon: "🛡️",
      title: "Fraud Protection",
      description: "Defaulters who submit fake receipts are blocked instantly"
    },
    // {
    //   icon: "✨",
    //   title: "Clean Exchange",
    //   description: "No drama. Just clean P2P value exchange"
    // },
    {
      icon: "💰",
      title: "Flexible Bidding",
      description: "You can bid from $20 to $3000"
    },
    {
      icon: "🔄",
      title: "2x Returns",
      description: "Rebid the same amount in 30 days to receive 2x"
    },
    {
      icon: "🎯",
      title: "Referral Rewards",
      description: "Earn referral commissions across 3 levels"
    },
    {
      icon: "🌐",
      title: "24/7 Access",
      description: "Bid, Rebid & Ask windows are open 24/7"
    }
  ];

  return (
      <>
        <main className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
          {/* Enhanced Background Elements */}
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]"></div>

          {/* Animated Background Orbs */}
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-primary/30 to-blue-400/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/10 to-blue-400/10 rounded-full blur-3xl"></div>

          {/* Floating Elements */}
          <div className="absolute top-32 right-20 w-4 h-4 bg-primary rounded-full animate-bounce delay-300"></div>
          <div className="absolute top-48 left-32 w-3 h-3 bg-blue-400 rounded-full animate-bounce delay-700"></div>
          <div className="absolute bottom-32 left-20 w-5 h-5 bg-purple-400 rounded-full animate-bounce delay-1000"></div>

          <div className="relative container mx-auto px-6 md:px-10 pt-32 pb-20">
            {/* Hero Content */}
            <div className={`text-center space-y-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>

              {/* Badge */}
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary/10 to-blue-500/10 backdrop-blur-sm border border-primary/20 rounded-full shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <span className="text-primary font-semibold text-sm tracking-wide">LIVE ON SOLANA</span>
                </div>
                <span className="text-2xl">🚀</span>
                <span className="text-gray-700 font-medium text-sm">Join The Future of P2P Finance</span>
              </div>

              {/* Main Heading */}
              <div className="space-y-4">
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-tight">
                <span className="block bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                  Welcome to
                </span>
                {/*  <span className="block bg-gradient-to-r from-primary via-blue-500 to-primary bg-clip-text text-transparent animate-gradient">*/}
                {/*  SMART*/}
                {/*</span>*/}
                  <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 bg-clip-text text-transparent">
                  SC
                </span>
                </h1>

                <p className="text-xl md:text-2xl text-gray-600 font-medium">
                  Solana P2P Connect
                </p>
              </div>

              {/* Description */}
              <div className="max-w-4xl mx-auto">
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                  The world's first <span className="font-bold text-primary">community-driven</span> Bid, Rebid & Ask system
                  powered by <span className="font-bold text-blue-600">Web3</span> and secured by
                  <span className="font-bold text-green-600"> USDT SPL</span> on the Solana Network.
                </p>
              </div>

              {/* Enhanced CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12">
                <Link to="/register" className="group">
                  <Button
                      size="lg"
                      className="h-16 px-12 text-lg font-bold rounded-2xl bg-gradient-to-r from-primary via-blue-500 to-blue-600 text-white shadow-2xl hover:shadow-primary/25 transform hover:scale-105 transition-all duration-300 border-0"
                  >
                  <span className="flex items-center gap-3">
                    Start Earning Now
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                  </Button>
                </Link>

                <Link to="/login" className="group">
                  <Button
                      variant="outline"
                      size="lg"
                      className="h-16 px-12 text-lg font-bold rounded-2xl border-2 border-gray-300 hover:border-primary hover:bg-primary/5 transform hover:scale-105 transition-all duration-300"
                  >
                  <span className="flex items-center gap-3">
                    Sign In
                    <svg className="w-5 h-5 group-hover:rotate-45 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                  </span>
                  </Button>
                </Link>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
                {[
                  { number: "200%", label: "Return Rate" },
                  { number: "24/7", label: "Availability" },
                  { number: "$20-$3K", label: "Bid Range" },
                  { number: "5hrs", label: "Confirmation" }
                ].map((stat, index) => (
                    <div key={index} className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/40 shadow-lg">
                      <div className="text-2xl md:text-3xl font-black text-primary">{stat.number}</div>
                      <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                    </div>
                ))}
              </div>
            </div>

            {/* Enhanced Features Grid */}
            <div className={`mt-20 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose SC?</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-primary to-blue-500 mx-auto rounded-full"></div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {features.map((feature, idx) => (
                    <div
                        key={idx}
                        className="group p-6 bg-white/80 backdrop-blur-sm border border-white/60 rounded-3xl shadow-lg hover:shadow-2xl hover:shadow-primary/10 transform hover:-translate-y-2 transition-all duration-300"
                    >
                      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                        {feature.icon}
                      </div>
                      <h3 className="font-bold text-gray-900 mb-2 text-lg">{feature.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                    </div>
                ))}
              </div>
            </div>
          </div>
        </main>

        {/* Enhanced Marquee Banner */}
        <div className="relative bg-gradient-to-r from-primary via-blue-500 to-primary bg-[length:200%_100%] animate-gradient h-16 flex items-center text-white font-bold text-base border-t-4 border-white/20 shadow-2xl">
          <div className="absolute inset-0 bg-black/10"></div>
          <Marquee speed={50} gradient={false} className="relative z-10">
            {Array.from({ length: 6 }).map((_, i) => (
                <span key={i} className="mx-8 flex items-center gap-3">
              <span className="text-2xl animate-pulse">🔥</span>
              <span>No Recommitment</span>
              <span className="text-yellow-300">•</span>
              <span>100% Transparency</span>
              <span className="text-yellow-300">•</span>
              <span className="text-yellow-300 font-black">200% Return in 10 Days</span>
              <span className="text-2xl animate-pulse">🔥</span>
            </span>
            ))}
          </Marquee>
        </div>

        {/* Custom CSS for animations */}
          <style>
            {`
    @keyframes gradient {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    .animate-gradient {
      background-size: 200% 200%;
      animation: gradient 3s ease infinite;
    }
  `}
          </style>

        </>
  );
};

const WhatIsSection = () => {
  const features = [
    {
      icon: <Shield className="w-5 h-5" />,
      text: "100% Decentralized"
    },
    {
      icon: <Zap className="w-5 h-5" />,
      text: "AI-Powered Platform"
    },
    {
      icon: <Globe className="w-5 h-5" />,
      text: "Global Adoption Ready"
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      text: "200% Return in 10 Days"
    }
  ];

  const stats = [
    { number: "2017", label: "Founded" },
    { number: "100%", label: "Decentralized" },
    { number: "30", label: "Days ROI" },
    { number: "24/7", label: "Active" }
  ];

  return (
      <section className="py-20 md:py-32 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-r from-primary/10 to-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-r from-purple-400/5 to-pink-400/5 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Text Section */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">!</span>
                </div>
                <span className="text-primary text-sm font-semibold tracking-wide">
                ABOUT SOLANA P2P CONNECT
              </span>
              </div>

              {/* Main Heading */}
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
                  <span className="block text-gray-900">The First Ever</span>
                  <span className="block bg-gradient-to-r from-primary via-blue-500 to-primary bg-clip-text text-transparent">
                  Decentralized
                </span>
                  <span className="block text-2xl md:text-3xl lg:text-4xl text-gray-700 font-bold">
                  Web3 & AI-Powered Platform
                </span>
                </h2>

                <div className="w-20 h-1 bg-gradient-to-r from-primary to-blue-500 rounded-full"></div>
              </div>

              {/* Description Cards */}
              <div className="space-y-6">
                <div className="p-6 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">About Solana Blockchain</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Solana is a blockchain platform designed to host decentralized and scalable applications.
                    Founded in 2017 by <span className="font-semibold text-primary">Anatoly Yakovenko</span> and
                    his team at Solana Labs, it was created to overcome the limitations of existing platforms
                    like Ethereum, particularly in terms of <span className="font-semibold text-blue-600">scalability and transaction speed</span>.
                  </p>
                </div>

                <div className="p-6 bg-gradient-to-r from-primary/5 to-blue-500/5 border border-primary/20 rounded-2xl">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">SolanaP2PConnect Platform</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Designed for global adoption of Solana with a <span className="font-semibold text-primary">100% decentralized P2P system</span>
                    with no central authority or central system account, making it highly secured and resistant to scams or hacking.
                    Members can <span className="font-semibold text-green-600">Bid, Rebid, and Ask to Get 100% Returns in 30 Days</span>.
                  </p>
                </div>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-4">
                {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 bg-white/60 border border-gray-200 rounded-xl hover:bg-white/80 transition-colors duration-300">
                      <div className="text-primary">
                        {feature.icon}
                      </div>
                      <span className="text-gray-700 font-medium text-sm">{feature.text}</span>
                    </div>
                ))}
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                    <div key={index} className="text-center p-4 bg-white/60 border border-gray-200 rounded-xl">
                      <div className="text-2xl font-black text-primary">{stat.number}</div>
                      <div className="text-xs text-gray-600 font-medium">{stat.label}</div>
                    </div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/dashboard">
                  <Button
                      size="lg"
                      className="group px-8 py-4 bg-gradient-to-r from-primary to-blue-500 text-white font-bold rounded-2xl hover:shadow-lg hover:shadow-primary/25 transform hover:scale-105 transition-all duration-300"
                  >
                  <span className="flex items-center gap-2">
                    BID NOW
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                  </Button>
                </Link>

                <Button
                    variant="outline"
                    size="lg"
                    className="px-8 py-4 border-2 border-gray-300 hover:border-primary hover:bg-primary/5 font-bold rounded-2xl transition-all duration-300"
                >
                  Learn More
                </Button>
              </div>
            </div>

            {/* Image Section */}
            <div className="relative">
              <div className="relative group">
                {/* Floating Elements */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/20 rounded-2xl blur-xl animate-pulse"></div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-500/20 rounded-2xl blur-xl animate-pulse delay-1000"></div>

                {/* Main Image Container */}
                <div className="relative overflow-hidden rounded-3xl bg-white/20 backdrop-blur-sm border border-white/30 p-3 shadow-2xl">
                  <div className="overflow-hidden rounded-2xl">
                    <img
                        src={pic}
                        alt="SC Illustration"
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>

                  {/* Overlay Stats */}
                  <div className="absolute top-8 left-8 px-4 py-2 bg-black/50 backdrop-blur-sm rounded-xl border border-white/20">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-white text-sm font-medium">Live on Solana</span>
                    </div>
                  </div>

                  <div className="absolute bottom-8 right-8 px-4 py-2 bg-primary/20 backdrop-blur-sm rounded-xl border border-primary/30">
                    <span className="text-primary text-sm font-bold">Ethereum Killer</span>
                  </div>

                  <div className="absolute top-1/2 left-8 transform -translate-y-1/2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200">
                    <div className="text-center">
                      <div className="text-lg font-black text-primary">100%</div>
                      <div className="text-xs text-gray-600">Decentralized</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Highlight Banner */}
          <div className="mt-20 p-8 bg-gradient-to-r from-primary/10 via-blue-500/10 to-primary/10 border border-primary/20 rounded-3xl text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Why Solana is Called the "Ethereum Killer"
            </h3>
            <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
              With its revolutionary consensus mechanism and ability to process thousands of transactions per second
              at a fraction of the cost, Solana has positioned itself as the next-generation blockchain platform
              that addresses Ethereum's scalability challenges.
            </p>
          </div>
        </div>
      </section>
  );
};
const P2PSection = () => {
  return (
      <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="absolute top-20 right-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

        <div className="relative container mx-auto px-4 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Content Section */}
            <div className="order-2 lg:order-1 space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className="text-primary text-sm font-medium tracking-wide">
                SolanaP2PConnect
              </span>
              </div>

              {/* Main Heading */}
              <div className="space-y-6">
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                  World's First
                </span>
                  <br />
                  <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                  Community-Driven
                </span>
                  <br />
                  <span className="text-white">P2P System</span>
                </h1>

                <div className="w-20 h-1 bg-gradient-to-r from-primary to-blue-400 rounded-full"></div>
              </div>

              {/* Description Cards */}
              <div className="space-y-4">
                <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
                  <p className="text-gray-300 leading-relaxed">
                    <span className="text-primary font-semibold">SC (Solana P2P Connect)</span> introduces
                    the revolutionary Bid, Rebid & Ask system powered by Web3 and the reliability of
                    <span className="text-blue-400 font-medium"> USDT SPL on Solana Network</span>.
                  </p>
                </div>

                <div className="p-6 bg-gradient-to-r from-primary/10 to-blue-500/10 backdrop-blur-sm border border-primary/20 rounded-2xl">
                  <p className="text-gray-300 leading-relaxed">
                    In a world filled with broken promises and endless cycles, SC offers you a
                    <span className="text-white font-semibold"> transparent, decentralized, and profitable</span> alternative.
                    <span className="text-primary"> No hidden rules. Just clean, smart earning.</span>
                  </p>
                </div>
              </div>

              {/* Features List */}
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: "🔒", text: "Transparent & Secure" },
                  { icon: "🌐", text: "Decentralized System" },
                  { icon: "⚡", text: "Solana Powered" },
                  { icon: "💰", text: "Smart Earning" }
                ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10">
                      <span className="text-2xl">{feature.icon}</span>
                      <span className="text-gray-300 font-medium">{feature.text}</span>
                    </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                    to="#learn-more"
                    className="group px-8 py-4 bg-gradient-to-r from-primary to-blue-500 text-white font-semibold rounded-2xl hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Learn More
                  <svg
                      className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>

                <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                  Watch Demo
                </button>
              </div>
            </div>

            {/* Image Section */}
            <div className="order-1 lg:order-2 relative">
              <div className="relative group">
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-2xl blur-xl animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-500/20 rounded-2xl blur-xl animate-pulse delay-1000"></div>

                {/* Main Image Container */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 p-2">
                  <div className="overflow-hidden rounded-2xl">
                    <img
                        src={pic1}
                        alt="SC Illustration"
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>

                  {/* Overlay Stats */}
                  <div className="absolute top-6 left-6 px-4 py-2 bg-black/50 backdrop-blur-sm rounded-xl border border-white/20">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-white text-sm font-medium">Live on Solana</span>
                    </div>
                  </div>

                  <div className="absolute bottom-6 right-6 px-4 py-2 bg-primary/20 backdrop-blur-sm rounded-xl border border-primary/30">
                    <span className="text-primary text-sm font-bold">Web3 Powered</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
};


function ServicesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const services = [
    {
      icon: <Bitcoin className="w-8 h-8" />,
      title: "P2P Cryptocurrency Trading",
      description: "Trade Bitcoin, Ethereum, and other cryptocurrencies directly with other users through our secure peer-to-peer platform.",
      features: ["Direct Trading", "Secure Transactions", "Multiple Cryptos"],
      color: "orange"
    },
    {
      icon: <Wallet className="w-8 h-8" />,
      title: "Secure Wallet Services",
      description: "Store your digital assets safely with our state-of-the-art wallet technology featuring advanced encryption and multi-signature protection.",
      features: ["Advanced Encryption", "Multi-Signature", "Cold Storage"],
      color: "blue"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Market Analysis Tools",
      description: "Access real-time market data, price charts, and analytical tools to make informed trading decisions.",
      features: ["Real-time Data", "Price Charts", "Analytics"],
      color: "green"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Escrow Protection",
      description: "Trade with confidence using our escrow service that protects both buyers and sellers throughout the transaction process.",
      features: ["Buyer Protection", "Seller Security", "Dispute Resolution"],
      color: "purple"
    },
    {
      icon: <Coins className="w-8 h-8" />,
      title: "Multi-Currency Support",
      description: "Trade a wide variety of cryptocurrencies and digital assets on our platform with competitive rates and low fees.",
      features: ["100+ Currencies", "Low Fees", "Competitive Rates"],
      color: "pink"
    },
    {
      icon: <Headphones className="w-8 h-8" />,
      title: "24/7 Customer Support",
      description: "Get assistance anytime with our dedicated customer support team available 24/7 via live chat, email, and phone.",
      features: ["Live Chat", "Email Support", "Phone Support"],
      color: "indigo"
    },
  ];

  // Define proper types for better type safety
  type ColorType = 'orange' | 'blue' | 'green' | 'purple' | 'pink' | 'indigo';

  interface ColorClasses {
    icon: string;
    bg: string;
    border: string;
    hoverBg: string;
    dot: string;
    button: string;
  }

  const getColorClasses = (color: ColorType): ColorClasses => {
    const colorMap: Record<ColorType, ColorClasses> = {
      orange: {
        icon: 'text-orange-600',
        bg: 'bg-orange-50',
        border: 'border-orange-200',
        hoverBg: 'hover:bg-orange-100',
        dot: 'bg-orange-500',
        button: 'bg-orange-600 hover:bg-orange-700'
      },
      blue: {
        icon: 'text-blue-600',
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        hoverBg: 'hover:bg-blue-100',
        dot: 'bg-blue-500',
        button: 'bg-blue-600 hover:bg-blue-700'
      },
      green: {
        icon: 'text-green-600',
        bg: 'bg-green-50',
        border: 'border-green-200',
        hoverBg: 'hover:bg-green-100',
        dot: 'bg-green-500',
        button: 'bg-green-600 hover:bg-green-700'
      },
      purple: {
        icon: 'text-purple-600',
        bg: 'bg-purple-50',
        border: 'border-purple-200',
        hoverBg: 'hover:bg-purple-100',
        dot: 'bg-purple-500',
        button: 'bg-purple-600 hover:bg-purple-700'
      },
      pink: {
        icon: 'text-pink-600',
        bg: 'bg-pink-50',
        border: 'border-pink-200',
        hoverBg: 'hover:bg-pink-100',
        dot: 'bg-pink-500',
        button: 'bg-pink-600 hover:bg-pink-700'
      },
      indigo: {
        icon: 'text-indigo-600',
        bg: 'bg-indigo-50',
        border: 'border-indigo-200',
        hoverBg: 'hover:bg-indigo-100',
        dot: 'bg-indigo-500',
        button: 'bg-indigo-600 hover:bg-indigo-700'
      }
    };

    return colorMap[color] || colorMap.blue;
  };

  return (
      <section id="services" className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <div className="text-center mb-16 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 border border-gray-200 rounded-full">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-primary text-sm font-semibold tracking-wide">OUR SERVICES</span>
            </div>

            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-gray-900">
                Comprehensive
                <br />
                <span className="text-primary">Trading Solutions</span>
              </h2>

              <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
            </div>

            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              SOLANAP2P Trading offers a comprehensive suite of services designed to meet
              all your cryptocurrency trading needs with <span className="font-semibold text-primary">security</span>,
              <span className="font-semibold text-blue-600"> reliability</span>, and
              <span className="font-semibold text-green-600"> innovation</span>.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const colors = getColorClasses(service.color as ColorType);
              return (
                  <div
                      key={index}
                      className={`base-classes ${hoveredIndex === index ? 'hover-effect' : ''}`}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                  >
                    {/* Icon Container */}
                    <div className={`mb-6 w-16 h-16 ${colors.bg} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <div className={colors.icon}>
                        {service.icon}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-base leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Features List */}
                    <div className="space-y-3 mb-6">
                      {service.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${colors.dot}`}></div>
                            <span className="text-sm font-medium text-gray-700">{feature}</span>
                          </div>
                      ))}
                    </div>

                    {/* Learn More Button */}
                    <div className={`opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300`}>
                      <button className={`w-full py-3 px-4 ${colors.button} text-white font-semibold rounded-xl transition-colors duration-300`}>
                        Learn More
                      </button>
                    </div>

                    {/* Hover Border Effect */}
                    <div className={`absolute inset-0 rounded-3xl border-2 ${colors.border} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}></div>
                  </div>
              );
            })}
          </div>

          {/* Bottom CTA Section */}
          <div className="mt-20 text-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-6 p-8 bg-gray-50 border border-gray-200 rounded-3xl">
              <div className="text-center sm:text-left">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Ready to Get Started?</h3>
                <p className="text-gray-600">Join thousands of traders already using our platform</p>
              </div>
              <button className="px-8 py-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-2xl hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                Start Trading Now
              </button>
            </div>
          </div>
        </div>
      </section>
  );
}

import  { useState } from 'react';
import { CheckCircle } from 'lucide-react';

function FeaturesSection() {
  const features = [
    "Secure P2P Trading",
    "Low Transaction Fees",
    "Multi-Currency Support",
    "Advanced Encryption",
    "Real-time Market Data",
    "Mobile Trading App",
    "Escrow Protection",
    "24/7 Customer Support",
    "Fast Transaction Processing",
    "Two-Factor Authentication",
    "User-Friendly Interface",
    "Global Accessibility",
  ];

  return (
      <section
          id="features"
          className="py-20 md:py-32 bg-white"
      >
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className="text-primary text-sm font-semibold tracking-wide">
                PLATFORM FEATURES
              </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-black leading-tight text-gray-900">
                Why Choose SOLANAP2P Trading Platform
              </h2>

              <p className="text-lg text-gray-600 leading-relaxed">
                Our platform is designed with security, efficiency, and user experience in mind.
                We provide the tools and features you need to trade cryptocurrencies with confidence.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300">
                      <CheckCircle className="text-primary h-5 w-5 flex-shrink-0" />
                      <span className="font-medium text-gray-700">{feature}</span>
                    </div>
                ))}
              </div>
            </div>

            {/* Right Content */}
            <div className="relative">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-blue-500/20 rounded-3xl border border-primary/30 flex items-center justify-center">
                <div className="text-center p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Advanced Trading Platform
                  </h3>
                  <p className="text-gray-600">
                    Experience the future of cryptocurrency trading
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}


function FAQSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openItems, setOpenItems] = useState(new Set());
  const [selectedCategory, setSelectedCategory] = useState('all');
  // Removed: const [hoveredCard, setHoveredCard] = useState(null);

  const faqs = [
    {
      question: "What is SolanaP2PConnect and Who Owns it?",
      answer: "SolanaP2PConnect (SC) is a fully decentralised, peer-to-peer (P2P) Web3 ecosystem built on BLOCKCHAIN TECHNOLOGY. It operates transparently on the blockchain and is entirely owned and controlled by its members.",
      category: "platform",
      popular: true
    },
    {
      question: "Is the SC platform secure and scam-proof?",
      answer: "Yes, SC is designed as a 100% decentralised P2P system with no central authority and no central system account, making it highly secure and resistant to scams or hacking.",
      category: "security",
      popular: true
    },
    {
      question: "What is the minimum and maximum bid allowed?",
      answer: "Minimum bid: $10 USDT. Maximum bid: $300 USDT.",
      category: "trading",
      popular: true
    },
    {
      question: "What are the bidding and rebidding times?",
      answer: "Bidding, rebidding, and asking are open twice daily: 10:00 – 10:30 AM CET and 10:00 – 10:30 PM CET.",
      category: "trading",
      popular: false
    },
    {
      question: "Is proof of payment required after bidding?",
      answer: "Yes. After making a bid, you must upload a valid proof of payment (e.g., transaction hash ID) for verification.",
      category: "payments",
      popular: false
    },
    {
      question: "What happens if the person I paid does not confirm my payment?",
      answer: "You have a 3-hour timer on your dashboard. If the recipient fails to confirm your payment within this window, the system will automatically verify and confirm your transaction, provided the uploaded proof is genuine and verifiable on the blockchain.",
      category: "payments",
      popular: false
    },
    {
      question: "What if someone assigned to pay me fails to do so within 3 hours?",
      answer: "If the assigned person doesn't complete the payment within the 3-hour countdown, the system will automatically block them and assign a new bidder to you.",
      category: "payments",
      popular: false
    },
    {
      question: "Do I need to contact the person I'm paying before making the payment?",
      answer: "No, direct contact is not required. Our AI telegram bot will notify the person automatically. Simply make the payment and upload your proof. The recipient will confirm upon receiving the funds.",
      category: "payments",
      popular: false
    },
    {
      question: "Will SC be sustainable in the long term?",
      answer: "Yes. The rebid and ask mechanism ensures the continued sustainability of the ecosystem.",
      category: "platform",
      popular: false
    },
    {
      question: "How long does it take for my bid to mature and yield returns?",
      answer: "Each bid matures in 10 days for full returns.",
      category: "trading",
      popular: true
    },
    {
      question: "How does the rebid policy work?",
      answer: "Participants are required to rebid 100% of their capital on the maturity date before requesting a withdrawal of 200%. Note: Do not rebid before your funds have fully matured.",
      category: "trading",
      popular: false
    },
    {
      question: "What if I rebid before the maturity date?",
      answer: "Rebidding early resets your cycle. It becomes a new bid, and the 10-day maturity period starts afresh.",
      category: "trading",
      popular: false
    },
    {
      question: "Do I have to refer others to earn, and what is the referral bonus?",
      answer: "Referring others is optional. However, you earn a 10% referral bonus from the bids made by your direct referrals.",
      category: "referrals",
      popular: true
    },
    {
      question: "Can I start with a small bid and increase later?",
      answer: "Yes. You can begin with any amount within the allowed range (minimum of $10) and increase in subsequent cycles.",
      category: "trading",
      popular: false
    },
    {
      question: "What is the minimum withdrawal amount?",
      answer: "The minimum amount you can withdraw is $20.",
      category: "withdrawals",
      popular: false
    },
    {
      question: "Are there generational or multi-level bonuses?",
      answer: "No. SC offers only a direct referral bonus of 10%. There are no multi-level or generational bonuses.",
      category: "referrals",
      popular: false
    },
    {
      question: "Does SC have a technical support team?",
      answer: "Yes, our support team operates 24/7. Send all inquiries and complaints to our support telegram bot or via email to support@SolanaP2PConnect.com.",
      category: "support",
      popular: false
    }
  ];

  const categories = [
    { id: 'all', name: 'All Questions', count: faqs.length },
    { id: 'platform', name: 'Platform', count: faqs.filter(f => f.category === 'platform').length },
    { id: 'security', name: 'Security', count: faqs.filter(f => f.category === 'security').length },
    { id: 'trading', name: 'Trading', count: faqs.filter(f => f.category === 'trading').length },
    { id: 'payments', name: 'Payments', count: faqs.filter(f => f.category === 'payments').length },
    { id: 'referrals', name: 'Referrals', count: faqs.filter(f => f.category === 'referrals').length },
    { id: 'withdrawals', name: 'Withdrawals', count: faqs.filter(f => f.category === 'withdrawals').length },
    { id: 'support', name: 'Support', count: faqs.filter(f => f.category === 'support').length }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const popularFaqs = faqs.filter(faq => faq.popular);

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  return (
      <section id="faqs" className="py-20 md:py-32 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-r from-primary/10 to-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-r from-purple-400/5 to-pink-400/5 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
              <HelpCircle className="w-4 h-4 text-primary" />
              <span className="text-primary text-sm font-semibold tracking-wide">
              FREQUENTLY ASKED QUESTIONS
            </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6">
              <span className="text-gray-900">Got Questions?</span>
              <br />
              <span className="bg-gradient-to-r from-primary via-blue-500 to-primary bg-clip-text text-transparent">
              We've Got Answers
            </span>
            </h2>

            <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8">
              Find answers to the most common questions about SolanaP2PConnect (SC) and how our
              decentralized trading platform works. Can't find what you're looking for?
              <span className="font-semibold text-primary"> Contact our 24/7 support team</span>.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                    type="text"
                    placeholder="Search for answers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:border-primary focus:outline-none transition-colors duration-300 text-gray-700"
                />
              </div>
            </div>
          </div>

          {/* Popular Questions */}
          {!searchTerm && selectedCategory === 'all' && (
              <div className="mb-16">
                <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                  🔥 Most Popular Questions
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
                  {popularFaqs.map((faq, index) => (
                      <div
                          key={`popular-${index}`}
                          className="p-6 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl hover:shadow-lg transition-all duration-300 cursor-pointer group"
                          onClick={() => {
                            const originalIndex = faqs.findIndex(f => f.question === faq.question);
                            toggleItem(originalIndex);
                          }}
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <HelpCircle className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 group-hover:text-primary transition-colors duration-300 text-sm leading-tight">
                              {faq.question}
                            </h4>
                          </div>
                        </div>
                      </div>
                  ))}
                </div>
              </div>
          )}

          {/* Category Filter */}
          <div className="mb-12">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                  <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                          selectedCategory === category.id
                              ? 'bg-primary text-white shadow-lg shadow-primary/25'
                              : 'bg-white/80 text-gray-600 hover:bg-primary/10 hover:text-primary border border-gray-200'
                      }`}
                  >
                    {category.name}
                    <span className="ml-2 text-xs opacity-75">({category.count})</span>
                  </button>
              ))}
            </div>
          </div>

          {/* FAQ List */}
          <div className="max-w-4xl mx-auto">
            {filteredFaqs.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">No Results Found</h3>
                  <p className="text-gray-600 mb-8">
                    We couldn't find any questions matching your search. Try different keywords or browse by category.
                  </p>
                  <button
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedCategory('all');
                      }}
                      className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors duration-300"
                  >
                    Clear Search
                  </button>
                </div>
            ) : (
                <div className="space-y-4">
                  {filteredFaqs.map((faq) => {
                    const originalIndex = faqs.findIndex(f => f.question === faq.question);
                    const isOpen = openItems.has(originalIndex);

                    return (
                        <div
                            key={originalIndex}
                            className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300"
                        >
                          <button
                              onClick={() => toggleItem(originalIndex)}
                              className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-50/50 transition-colors duration-300"
                          >
                            <div className="flex items-start gap-4 flex-1">
                              {faq.popular && (
                                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-3 flex-shrink-0"></div>
                              )}
                              <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                                {faq.question}
                              </h3>
                            </div>
                            <ChevronDown
                                className={`w-6 h-6 text-gray-400 transition-transform duration-300 flex-shrink-0 ml-4 ${
                                    isOpen ? 'rotate-180' : ''
                                }`}
                            />
                          </button>

                          <div
                              className={`transition-all duration-300 overflow-hidden ${
                                  isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                              }`}
                          >
                            <div className="px-6 pb-6">
                              <div className="pl-6 border-l-2 border-primary/20">
                                <p className="text-gray-600 leading-relaxed">
                                  {faq.answer}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                    );
                  })}
                </div>
            )}
          </div>

          {/* Support Section */}
          <div className="mt-20 text-center">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold text-gray-900 mb-8">
                Still Need Help?
              </h3>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Telegram Support */}
                <div className="p-8 bg-gradient-to-br from-blue-50 to-primary/10 border border-blue-200 rounded-3xl">
                  <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <MessageCircle className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4">Telegram Support Bot</h4>
                  <p className="text-gray-600 mb-6">
                    Get instant help from our AI-powered support bot available 24/7
                  </p>
                  <a href="https://t.me/+9N9excf1Jpg4N2Q8" className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors duration-300 font-semibold">
                    Open Telegram Bot
                  </a>
                </div>

                {/* Email Support */}
                <div className="p-8 bg-gradient-to-br from-green-50 to-emerald-100 border border-green-200 rounded-3xl">
                  <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4">Email Support</h4>
                  <p className="text-gray-600 mb-6">
                    Send detailed inquiries to our support team for comprehensive assistance
                  </p>
                  <a
                      href="mailto:support@SolanaP2PConnect.com"
                      className="inline-block px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors duration-300 font-semibold"
                  >
                    Send Email
                  </a>
                </div>
              </div>

              {/* Response Time */}
              <div className="mt-8 flex items-center justify-center gap-2 text-gray-600">
                <Clock className="w-5 h-5" />
                <span className="font-medium">Average response time: Under 30 minutes</span>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}



function SPCUpdateHighlights() {
  // Fix: Include both the state value and setter function with proper typing
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const updates = [
    {
      icon: Clock,
      title: "Faster Cycle Duration",
      description: "Bidding cycle now lasts 10 days instead of 14 days.",
      oldValue: "14 days",
      newValue: "10 days",
      color: "blue",
      improvement: "40% faster",
      badge: "Speed Boost"
    },
    {
      icon: TrendingUp,
      title: "Higher Referral Commission",
      description: "Earn 10% on every direct referral, increased from 7.5%.",
      oldValue: "7.5%",
      newValue: "10%",
      color: "green",
      improvement: "+2.5%",
      badge: "Earnings Up"
    },
    {
      icon: DollarSign,
      title: "Updated Minimum Withdrawal",
      description: "You can now withdraw from as little as $20 (was $10).",
      oldValue: "$10",
      newValue: "$20",
      color: "purple",
      improvement: "Better Control",
      badge: "Policy Update"
    },
    {
      icon: Bot,
      title: "AI Telegram Bot Support",
      description: "Instant help through our automated Telegram support bot.",
      oldValue: "Manual Support",
      newValue: "AI Bot",
      color: "pink",
      improvement: "24/7 Available",
      badge: "New Feature"
    },
  ];

  type ColorType = 'blue' | 'green' | 'purple' | 'pink';

  interface ColorClasses {
    bg: string;
    border: string;
    icon: string;
    badge: string;
    glow: string;
  }

  const getColorClasses = (color: string): ColorClasses => {
    const colorMap: Record<ColorType, ColorClasses> = {
      blue: {
        bg: 'from-blue-500/20 to-blue-600/20',
        border: 'border-blue-400/30',
        icon: 'text-blue-400',
        badge: 'bg-blue-500/20 text-blue-300 border-blue-400/30',
        glow: 'shadow-blue-500/20'
      },
      green: {
        bg: 'from-green-500/20 to-emerald-600/20',
        border: 'border-green-400/30',
        icon: 'text-green-400',
        badge: 'bg-green-500/20 text-green-300 border-green-400/30',
        glow: 'shadow-green-500/20'
      },
      purple: {
        bg: 'from-purple-500/20 to-violet-600/20',
        border: 'border-purple-400/30',
        icon: 'text-purple-400',
        badge: 'bg-purple-500/20 text-purple-300 border-purple-400/30',
        glow: 'shadow-purple-500/20'
      },
      pink: {
        bg: 'from-pink-500/20 to-rose-600/20',
        border: 'border-pink-400/30',
        icon: 'text-pink-400',
        badge: 'bg-pink-500/20 text-pink-300 border-pink-400/30',
        glow: 'shadow-pink-500/20'
      }
    };

    // Return the color if it exists, otherwise default to blue
    return colorMap[color as ColorType] || colorMap.blue;
  };

  const stats = [
    { label: "Platform Updates", value: "4+" },
    { label: "User Experience", value: "Enhanced" },
    { label: "Support Response", value: "Instant" },
    { label: "System Reliability", value: "99.9%" }
  ];

  return (
      <section className="py-20 md:py-32 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-yellow-400/10 to-orange-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-blue-500/10 to-purple-600/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/5 to-yellow-400/5 rounded-full blur-3xl"></div>
        </div>

        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Header Section */}
          <div className="text-center mb-20">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 border border-yellow-400/30 rounded-full mb-8">
              <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
              <span className="text-yellow-300 font-semibold tracking-wide">
              SYSTEM UPDATES
            </span>
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
            </div>

            {/* Main Heading */}
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-8">
              <span className="text-white">Latest SC</span>
              <br />
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 bg-clip-text text-transparent">
              System Updates
            </span>
            </h2>

            <p className="text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto mb-12">
              Your SC platform just got even better. More powerful earnings, smarter tools,
              and clearer systems for <span className="text-yellow-400 font-semibold">maximum benefit</span>.
            </p>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                  <div key={index} className="text-center p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
                    <div className="text-2xl md:text-3xl font-black text-yellow-400 mb-2">{stat.value}</div>
                    <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
                  </div>
              ))}
            </div>
          </div>

          {/* Updates Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {updates.map((item, index) => {
              const colors = getColorClasses(item.color);
              const IconComponent = item.icon;
              const isHovered = hoveredCard === index;

              return (
                  <div
                      key={index}
                      className={`group relative p-8 bg-gradient-to-br ${colors.bg} backdrop-blur-sm border ${colors.border} rounded-3xl transition-all duration-500 hover:scale-105 hover:shadow-2xl ${colors.glow} cursor-pointer ${
                          isHovered ? 'scale-105 shadow-2xl' : ''
                      }`}
                      onMouseEnter={() => setHoveredCard(index)}
                      onMouseLeave={() => setHoveredCard(null)}
                  >
                    {/* Badge */}
                    <div className={`absolute -top-3 -right-3 px-3 py-1 ${colors.badge} border rounded-full text-xs font-bold`}>
                      {item.badge}
                    </div>

                    {/* Icon */}
                    <div className={`w-16 h-16 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ${
                        isHovered ? 'scale-110' : ''
                    }`}>
                      <IconComponent className={`w-8 h-8 ${colors.icon}`} />
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                      <h4 className="text-xl font-bold text-white group-hover:text-gray-100 transition-colors duration-300">
                        {item.title}
                      </h4>

                      <p className="text-sm text-gray-300 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Before/After */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-400">Before:</span>
                          <span className="text-red-400 line-through">{item.oldValue}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-400">Now:</span>
                          <span className={`${colors.icon} font-bold`}>{item.newValue}</span>
                        </div>
                      </div>

                      {/* Improvement Badge */}
                      <div className="flex items-center gap-2 pt-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-xs text-green-400 font-semibold">{item.improvement}</span>
                      </div>
                    </div>

                    {/* Hover Effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`}></div>
                  </div>
              );
            })}
          </div>

          {/* Download Section */}
          <div className="text-center">
            <div className="max-w-4xl mx-auto p-12 bg-gradient-to-r from-yellow-400/10 via-orange-500/10 to-yellow-400/10 backdrop-blur-sm border border-yellow-400/20 rounded-3xl">
              {/* Icon */}
              <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-8">
                <Gift className="w-10 h-10 text-black" />
              </div>

              <h3 className="text-3xl font-bold text-white mb-4">
                Get Your Marketing Resources
              </h3>

              <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                Download our complete marketing toolkit including SC videos, flyers, and promotional PDFs
                to help you succeed with your referrals.
              </p>

              {/* Features List */}
              <div className="grid md:grid-cols-3 gap-4 mb-8 max-w-3xl mx-auto">
                {[
                  { icon: Zap, text: "High-Quality Videos" },
                  { icon: Download, text: "Professional Flyers" },
                  { icon: Sparkles, text: "Promo Materials" }
                ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 bg-white/5 rounded-xl">
                      <feature.icon className="w-5 h-5 text-yellow-400" />
                      <span className="text-white font-medium">{feature.text}</span>
                    </div>
                ))}
              </div>

              {/* Download Button */}
              <a
                  href="https://SolanaP2PConnect.com/media/sp2pc.zip"
                  className="group inline-flex items-center gap-4 px-10 py-5 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold rounded-2xl text-lg shadow-2xl shadow-yellow-400/25 hover:shadow-yellow-400/40 transition-all duration-300 hover:scale-105"
                  download
              >
                <Download className="w-6 h-6 group-hover:animate-bounce" />
                Download Marketing Resources
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
              </a>

              <p className="text-sm text-gray-400 mt-4">
                Free download • Instant access • Updated regularly
              </p>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-20 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-full">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-gray-300 font-medium">All updates are live and ready to use</span>
            </div>
          </div>
        </div>
      </section>
  );
}
const footerData = {
  companyInfo: {
    description:
      "Solanap2pconnect is an affiliate program that offers referral bonus from level 1 to level 3.",
  },
  quickLinks: [
    { label: "Home", href: "#" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Services", href: "#services" },
    { label: "Features", href: "#features" },
    { label: "FAQs", href: "#faqs" },
    { label: "Contact Us", href: "#" },
  ],
  legalLinks: [
    "Terms of Service",
    "Privacy Policy",
    "Cookie Policy",
    "Risk Disclosure",
    "AML Policy",
  ],
  newsletter: {
    description:
      "Subscribe to our newsletter to receive updates and news about our platform.",
    placeholder: "Your email address",
    buttonText: "Subscribe",
  },
  footerBottom: {
    copyright: `© ${new Date().getFullYear()} SOLANAP2P Trading. All rights reserved.`,
    additionalLinks: ["Support", "Security", "Careers"],
  },
};

function Footer() {
  return (
    <footer className="bg-background pt-16 pb-8 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:place-items-center place-content-center lg:grid-cols-3 gap-8 mb-12">
          {/* Company Info */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center">
              <p className="font-bold text-3xl">SOLANAP2P</p>
            </div>
            <p className="text-gray-400 mb-4 max-w-sm">
              {footerData.companyInfo.description}
            </p>
          </div>

          {/* Quick Links */}
          {/* <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {footerData.quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-primary transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div> */}

          {/* Legal */}
          {/* <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerData.legalLinks.map((item, index) => (
                <li key={index}>
                  <Link
                    to="#"
                    className="text-gray-400 hover:text-primary transition"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div> */}
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between lg:items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              {footerData.footerBottom.copyright}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

const HowItWorksSection = () => {
  const steps = [
    {
      title: "Register Your Account",
      description:
          "Register using the referral link of your sponsor or visit SolanaP2PConnect.com",
      icon: "📝",
    },
    {
      title: "Min bid is $20 Max bid is $3000 Usdt SPL",
      description:
          "Once you register, you can bid –Starting from $20 to $3000 using Solana blockchain Usdt SPL",
      icon: "🔄",
    },
    {
      title: "Telegram Bot",
      description:
          "Smart AI Telegram bot keeps you in control 24/7",
      icon: "🤖",
    },
    {
      title: "Paired To Receive",
      description:
          "In 30 days, you REBID the same amount, then ASK to receive double your bid (100%)",
      icon: "💰",
    },
    {
      title: "Bidding & Rebidding",
      description:
          "Bidding and Rebidding is open 24/7",
      icon: "🕒",
    },
    {
      title: "Commission",
      description:
          "Earn referral commissions from Level 1 to Level 3 every time your referrals rebid",
      icon: "📈",
    },
    {
      title: "Minimum Withdrawal",
      description:
          "$10 minimum withdrawal threshold",
      icon: "💸",
    },
  ];

  return (
      <section className="py-20 bg-white text-gray-800" id="how-it-works">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">How It Works</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Getting started with SolanaP2pConnect is quick, secure, and designed for your success.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {steps.map((step, index) => (
                <div
                    key={index}
                    className="bg-white p-6 rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition duration-300"
                >
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-2xl mb-4">
                    {step.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">
                    {index + 1}. {step.title}
                  </h3>
                  <p className="text-gray-600 whitespace-pre-line text-sm">{step.description}</p>
                </div>
            ))}
          </div>
        </div>
      </section>
  );
};

