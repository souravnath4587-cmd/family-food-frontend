import Navbar from "../components/Navbar";

type LayoutProps = {
  children: React.ReactNode;
};

const ProductLayoutPage = ({ children }: LayoutProps) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default ProductLayoutPage;
