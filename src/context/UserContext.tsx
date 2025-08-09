import { createContext, useContext, useState } from "react";

interface Transaction {
  id: number;
  user_id: number;
  plan_id: number;
  amount: string;
  amount_to_pair: string;
  paired_amount: string;
  invest_id: number | null;
  trx: string;
  status: "pending" | "completed" | "failed"; // assuming all lowercased
  created_at: string;
  updated_at: string;
}


interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  balance: string;
  earning: string;
  runningInvest: string | 0;
  telegram_id: string;
  telegramchannel: string;
  telegramgroup: string;
  sitebot: string;
  telegram_verified: 1 | 0;
  email_verified: 1 | 0;
  country: string;
  profile_photo_path: string | null;
  ref_code: string;
  referral: string;
  timeopening: string;
  timeclosing: string;
  status: string;
  bep_address: string | null;
  telegram_otp?: string;
  online?: string | null;
  created_at?: string;
  updated_at?: string;
  recentBids?: Transaction[];
  recentAsks?: Transaction[];

  [key: string]: string | boolean | number | string[] | Transaction[] | null | undefined;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User) => void;
  siteBot: string | null;
  setSiteBot: (bot: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [siteBot, setSiteBot] = useState<string | null>(null);

  return (
      <UserContext.Provider value={{ user, setUser, siteBot, setSiteBot }}>
        {children}
      </UserContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
};
