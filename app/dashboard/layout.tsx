import Navbar from "../components/Navbar";

type LayoutProps = {
  children: React.ReactNode;
};

const DashboardLayoutPage = ({ children }: LayoutProps) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default DashboardLayoutPage;
