import React from "react";
import Navbar from "../components/Navbar";

type LayoutProps = {
  children: React.ReactNode;
};

const AuthLayoutPage = ({ children }: LayoutProps) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default AuthLayoutPage;
