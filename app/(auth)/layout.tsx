import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};

const AuthLayoutPage = ({ children }: LayoutProps) => {
  return <div>{children}</div>;
};

export default AuthLayoutPage;
