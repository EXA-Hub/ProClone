import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Head from "next/head";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          data-href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&amp;display=swap"
        />
        <link
          rel="stylesheet"
          data-href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700&amp;display=swap"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/brands.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
        />
      </Head>

      <div className="tw-h-screen tw-flex tw-flex-col">
        <Header />
        <div className="tw-flex tw-flex-1 tw-overflow-hidden">
          <Sidebar />
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
