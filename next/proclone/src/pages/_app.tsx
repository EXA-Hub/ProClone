import "../app/globals.css";
import "./app.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";

import RouterLoading from "../components/RouterLoading";
import { LoadingProvider } from "../context/LoadingContext"; // Optional

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LoadingProvider>
      <Layout>
        <RouterLoading />
        <Component {...pageProps} />
      </Layout>
    </LoadingProvider>
  );
}

export default MyApp;
