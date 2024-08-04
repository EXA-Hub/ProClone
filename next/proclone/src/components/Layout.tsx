import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Head from "next/head";

interface LayoutProps {
  children: React.ReactNode;
  showSidebar: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, showSidebar }) => {
  return (
    <>
      <Head>
        <title>ZAMPX</title>
      </Head>

      <div className="tw-h-screen tw-flex tw-flex-col">
        <Header />
        <div className="tw-flex tw-flex-1 tw-overflow-hidden">
          <Sidebar showSidebar={showSidebar} />
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
