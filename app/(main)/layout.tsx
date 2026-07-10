import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};

const MainLayoutPage = ({ children }: LayoutProps) => {
  return <div>{children}</div>;
};

export default MainLayoutPage;
