import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router";
import Home from "./routes/site/home";
import { NotFound } from "./not-found";
import RegisterPage from "./routes/auth/register";
import LoginPage from "./routes/auth/login";
import Dashboard from "./routes/dashboard/dashboard";
import Wallet from "./routes/dashboard/wallet";
import Bid from "./routes/dashboard/bid";
import P2p from "./routes/dashboard/p2p";
import { ProtectedRoute } from "./../components/ProtectedRoute";
import VerifyTelegram from "@/app/routes/dashboard/verify-telegram.tsx";
import VerifyOtpPage from "@/app/routes/dashboard/verify-otp.tsx";
import BidAskHistory from "@/app/routes/dashboard/BidAskHistory.tsx";
import AskPage from "@/app/routes/dashboard/ask.tsx";
import Settings from "@/app/routes/dashboard/settings.tsx";
import Profile from "@/app/routes/dashboard/profile.tsx";
import SupportPage from "@/app/routes/dashboard/support.tsx";
import BidDetail from "@/app/routes/dashboard/BidDetail.tsx";
import AskDetail from "@/app/routes/dashboard/AskDetail.tsx";
import ReferralPage from "@/app/routes/dashboard/Referral.tsx";
import BidStatusSearch from "@/app/routes/dashboard/BidStatusSearch.tsx";
import InvestmentsPage from "@/app/routes/dashboard/InvestmentsPage.tsx";
import InvestmentDetails from "@/app/routes/dashboard/InvestmentDetails.tsx";
import Maintenance from "@/app/routes/dashboard/Maintenance.tsx";
import ResetPasswordRequest from "@/app/routes/auth/ResetPasswordRequest.tsx";
import SetNewPassword from "@/app/routes/auth/SetNewPassword.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
    {
    path: "/forgot-password",
    Component: ResetPasswordRequest,
  },
    {
    path: "/set-password",
    Component: SetNewPassword,
  },
    {
    path: "/maintenance",
    Component: Maintenance,
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/register",
    Component: RegisterPage,
  },
  {
    path: "/dashboard",
      Component: () => (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
      ),

  },
    {
        path: "/check-status",
        Component: () => (
            <ProtectedRoute>
                <BidStatusSearch/>
            </ProtectedRoute>
        ),
    },
    {
    path: "/investments",
      Component: () => (
          <ProtectedRoute>
            <InvestmentsPage />
          </ProtectedRoute>
      ),

  },
  {
    path: "/wallet",
    Component: () => (
        <ProtectedRoute>
          <Wallet />
        </ProtectedRoute>
    ),
  },
  {
    path: "/bid",
    Component: () => (
        <ProtectedRoute>
          <Bid />
        </ProtectedRoute>
    ),
  },
  {
    path: "/p2p",
    Component: () => (
        <ProtectedRoute>
          <P2p />
        </ProtectedRoute>
    ),
  },
  {
    path: "*",
    Component: NotFound,
  },
  {
    path: "/verify-telegram",
    Component: VerifyTelegram,
  },
  {
    path: "/verify-otp",
    Component: VerifyOtpPage,
  },
  {

    path: "/history",
    Component: () => (
        <ProtectedRoute>
          <BidAskHistory/>
        </ProtectedRoute>
    ),
  },
    {

    path: "/bids/:id",
    Component: () => (
        <ProtectedRoute>
          <BidDetail/>
        </ProtectedRoute>
    ),
  },
    {

    path: "/investments/:id",
    Component: () => (
        <ProtectedRoute>
          <InvestmentDetails/>
        </ProtectedRoute>
    ),
  },
    {

    path: "/asks/:id",
    Component: () => (
        <ProtectedRoute>
          <AskDetail/>
        </ProtectedRoute>
    ),
  },
  {

    path: "/ask",
    Component: () => (
        <ProtectedRoute>
          <AskPage/>
        </ProtectedRoute>
    ),
  },
  {

    path: "/settings",
    Component: () => (
        <ProtectedRoute>
          <Settings/>
        </ProtectedRoute>
    ),
  },
    {

    path: "/referral",
    Component: () => (
        <ProtectedRoute>
          <ReferralPage/>
        </ProtectedRoute>
    ),
  },
  {

    path: "/profile",
    Component: () => (
        <ProtectedRoute>
          <Profile/>
        </ProtectedRoute>
    ),
  },
  {

    path: "/support",
    Component: () => (
        <ProtectedRoute>
          <SupportPage/>
        </ProtectedRoute>
    ),
  },
]);
export function AppRouter() {
  return <RouterProvider router={router} />;
}
