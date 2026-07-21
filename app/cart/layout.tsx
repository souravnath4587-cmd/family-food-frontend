import Navbar from "../components/Navbar";

type LayoutProps = {
  children: React.ReactNode;
};

const CartLayoutPage = ({ children }: LayoutProps) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default CartLayoutPage;
