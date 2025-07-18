import { useEffect, useState } from "react";
import { HandHeart } from "lucide-react";
import DashboardHeader from "../../../components/DashboardHeader";
import Sidebar from "../../../components/Sidebar";
import { getAuthToken } from "@/utils/auth";
import { toast } from "react-toastify";
import { useUser } from "@/context/UserContext.tsx";

interface Plan {
  id: number;
  name: string;
  minimum: number;
  maximum: number;
  interest: number;
  interest_type: string;
}

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export default function CreateBid() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({ amount: "" });
  const [plan, setPlan] = useState<Plan | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { user } = useUser();
  const token = getAuthToken();

  useEffect(() => {
    if (!token || !baseUrl) return;

    const fetchPlan = async () => {
      try {
        const response = await fetch(`${baseUrl}plans`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (response.ok) {
          setPlan(data.data[0]);
        } else {
          throw new Error(data.message || "Failed to fetch plan");
        }
      } catch (err) {
        console.error("Failed to fetch plan", err);
        toast.error("Failed to load plan.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlan();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAmountSelect = (amount: number) => {
    setFormData({ amount: String(amount) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      toast.error("Please enter a valid amount.");
      return;
    }

    if (!plan) {
      toast.error("No active plan available.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(`${baseUrl}bid`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          plan_id: plan.id,
          amount: parseFloat(formData.amount),
        }),
      });
      const data = await response.json();

      if (response.ok && data.success) {
        toast.success(data.message || "Bid Successful");
        setFormData({ amount: "" });
      } else {
        toast.error(data.message || "Failed to submit bid.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during bidding.");
    } finally {
      setSubmitting(false);
    }
  };

  const generateAmountOptions = () => Array.from({ length: 15 }, (_, i) => (i + 1) * 10);

  return (
      <div className="min-h-screen flex text-gray-800 bg-gradient-to-b from-[#f0f4f8] to-[#e2e8f0]">
        {sidebarOpen && (
            <div
                className="fixed inset-0 bg-black bg-opacity-40 z-30 lg:hidden"
                onClick={() => setSidebarOpen(false)}
            />
        )}

        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)}/>

        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardHeader setSidebarOpen={setSidebarOpen}/>

          <main className="flex-1 overflow-y-auto py-12 px-6 lg:px-12 max-w-4xl mx-auto">
            <section className="bg-white rounded-3xl p-10 shadow-xl border border-gray-200 flex flex-col gap-8">
              <header className="flex items-center gap-4">
                <HandHeart className="w-8 h-8 text-teal-500"/>
                <h1 className="text-3xl font-bold tracking-wide text-teal-600">
                  Create Donation Bid
                </h1>
              </header>

              {loading ? (
                  <p className="text-gray-500 text-center text-lg font-medium">Loading plan...</p>
              ) : plan ? (
                  <article
                      className="bg-gradient-to-tr from-white to-gray-50 p-6 rounded-2xl border border-teal-200 shadow-md">
                    <h2 className="text-2xl font-semibold text-teal-600 mb-6">{plan.name}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      {[
                        {label: "Minimum", value: `${plan.minimum} USDT`},
                        {label: "Maximum", value: `${plan.maximum} USDT`},
                        {label: "Return", value: `${plan.interest}% ${plan.interest_type}`},
                      ].map(({label, value}) => (
                          <div
                              key={label}
                              className="bg-white p-5 rounded-xl border border-teal-100 shadow-sm"
                          >
                            <p className="text-sm text-teal-500 font-medium mb-1">{label}</p>
                            <p className="text-lg font-semibold text-gray-700">{value}</p>
                          </div>
                      ))}
                    </div>
                  </article>
              ) : (
                  <p className="text-red-500 font-semibold text-center">Failed to load plan details.</p>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {plan && (
                    <fieldset className="space-y-3">
                      <legend className="text-teal-600 text-lg font-semibold">Select Amount</legend>
                      <div className="grid grid-cols-3 gap-4">
                        {generateAmountOptions().map((amount) => (
                            <button
                                key={amount}
                                type="button"
                                onClick={() => handleAmountSelect(amount)}
                                className={`py-3 rounded-xl font-semibold text-sm transition
                    ${
                                    formData.amount === String(amount)
                                        ? "bg-teal-500 text-white shadow-md"
                                        : "bg-gray-100 text-gray-700 border border-teal-200 hover:bg-teal-100"
                                }`}
                            >
                              {amount} USDT
                            </button>
                        ))}
                      </div>
                    </fieldset>
                )}

                <div className="flex flex-col">
                  <label
                      htmlFor="amount"
                      className="mb-2 text-teal-600 font-medium tracking-wide"
                  >
                    Or enter custom amount
                  </label>
                  <input
                      type="number"
                      name="amount"
                      id="amount"
                      min="1"
                      value={formData.amount}
                      onChange={handleChange}
                      required
                      placeholder="Enter amount in USDT"
                      className="px-5 py-3 bg-gray-100 border border-teal-200 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                </div>

                <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 bg-teal-500 rounded-xl font-bold text-white shadow-md hover:bg-teal-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? "Submitting..." : "Submit Bid"}
                </button>
              </form>
            </section>
          </main>
        </div>
      </div>

  );
}
