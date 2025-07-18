import { useState } from "react";
import { getAuthToken } from "@/utils/auth";
import { useUser } from "@/context/UserContext.tsx";
import DashboardHeader from "@/components/DashboardHeader";
import Sidebar from "@/components/Sidebar";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const token = getAuthToken();

const generateAmountOptions = () => Array.from({ length: 12 }, (_, i) => (i + 1) * 10);

export default function AskPage() {
  const { user } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [amount, setAmount] = useState(10);
  const [balSource, setBalSource] = useState<"balance" | "earning">("balance");
  const [bepAddress, setBepAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [askSuccess, setAskSuccess] = useState(false);

  const amountOptions = generateAmountOptions();

  const handleAskRequest = async () => {
    if (!bepAddress) {
      toast.warn("Please provide a BEP address.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${baseUrl}ask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ bal_source: balSource, bep_address: bepAddress, amount }),
      });

      const data = await res.json();
      if (data.success) {
        setAskSuccess(true);
        toast.success("Ask request submitted!");
      } else {
        toast.error(data.message || "Failed to submit ask request.");
      }
    } catch (err) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="min-h-screen flex bg-gradient-to-br from-white to-gray-100 text-gray-900">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 flex flex-col">
          <DashboardHeader setSidebarOpen={setSidebarOpen} />

          <main className="flex-1 overflow-y-auto px-6 py-10">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8 shadow-md border border-gray-200">
              <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Create Ask Request</h1>

              {/* Wallet Source Tabs */}
              <div className="flex space-x-4 mb-6 justify-center">
                {["balance", "earning"].map((source) => (
                    <button
                        key={source}
                        className={`px-4 py-2 rounded-lg font-medium border transition-all duration-200 shadow-sm ${
                            balSource === source
                                ? "bg-blue-600 border-blue-600 text-white"
                                : "bg-gray-100 border-gray-300 text-gray-600 hover:bg-blue-100"
                        }`}
                        onClick={() => setBalSource(source as "balance" | "earning")}
                    >
                      {source === "balance" ? "Main Balance" : "Earnings"} ({user?.[source]} USDT)
                    </button>
                ))}
              </div>

              {/* Amount Selector Grid */}
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-700">Select Amount</label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {amountOptions.map((amt) => (
                      <button
                          key={amt}
                          onClick={() => setAmount(amt)}
                          className={`px-3 py-2 rounded-lg font-semibold text-sm border text-center transition-all duration-200 shadow-sm ${
                              amount === amt
                                  ? "bg-blue-600 text-white border-blue-600"
                                  : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
                          }`}
                      >
                        {amt} USDT
                      </button>
                  ))}
                </div>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="mt-4 w-full p-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-800 placeholder:text-gray-400"
                    placeholder="Or enter a custom amount"
                />
              </div>

              {/* BEP Address Input */}
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-700">BEP-20 Wallet Address</label>
                <div className="flex items-center gap-2">
                  <input
                      type="text"
                      value={bepAddress}
                      onChange={(e) => setBepAddress(e.target.value)}
                      className="flex-1 p-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-800"
                      placeholder="Enter BEP address"
                  />
                  <Button
                      onClick={() => {
                        if (user?.bep_address) {
                          setBepAddress(user.bep_address);
                          toast.success("Address auto-filled.");
                        } else {
                          toast.warn("No saved BEP address found.");
                        }
                      }}
                      className="bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Auto Fill
                  </Button>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                  onClick={handleAskRequest}
                  disabled={loading}
                  className="w-full py-3 text-lg font-semibold mt-4 bg-blue-600 hover:bg-blue-700 text-white"
              >
                {loading ? "Submitting..." : "Submit Ask Request"}
              </Button>

              {/* Success Message */}
              {askSuccess && (
                  <p className="text-green-600 mt-5 text-center text-sm">
                    ✅ Your ask request was submitted successfully!
                  </p>
              )}
            </div>
          </main>
        </div>
      </div>
  );
}