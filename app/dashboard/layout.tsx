"use client";
import DashboardSideBar from "../components/dashboard/DashboardSideBar";
import Navbar from "../components/Navbar";
import { authClient } from "../lib/auth-client";

type LayoutProps = {
  children: React.ReactNode;
};

const DashboardLayoutPage = ({ children }: LayoutProps) => {
  const { data: session } = authClient.useSession();
  const user = {
    ...session?.user,
  };
  console.log(user);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black text-white flex flex-row">
        <DashboardSideBar user={user} />
        <main className="w-full">{children}</main>
      </div>
    </>
  );
};

export default DashboardLayoutPage;
