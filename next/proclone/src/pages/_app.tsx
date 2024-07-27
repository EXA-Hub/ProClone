import "../app/globals.css";
import "@/styles/app.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import Spinner from "@/components/Loading";
import RouterLoading from "../components/RouterLoading";
import { LoadingProvider } from "../context/LoadingContext"; // Optional

import { apiClient } from "@/utils/apiClient";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const [loggedin, setLog] = useState<"logging" | "loged" | "notloged">(
    "logging"
  );

  useEffect(() => {
    apiClient("/backend/status", "get")
      .then((res) => {
        if (res.success) {
          (res.data.loged as string).startsWith("I know you")
            ? setLog("loged")
            : setLog("notloged");
        } else {
          setLog("notloged");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <LoadingProvider>
      <Layout>
        {(() => {
          switch (loggedin) {
            case "loged":
              return (
                <>
                  <RouterLoading />
                  <Component {...pageProps} />
                </>
              );
            case "notloged":
              return (
                <div className="tw-fixed tw-top-0 tw-left-0 tw-w-full tw-h-full tw-z-50 tw-flex tw-items-center tw-justify-center tw-bg-black tw-bg-opacity-50">
                  <h1>You Didn&apos;t log in.</h1>
                </div>
              );
            case "logging":
              return (
                <div className="tw-fixed tw-top-0 tw-left-0 tw-w-full tw-h-full tw-z-50 tw-flex tw-items-center tw-justify-center tw-bg-black tw-bg-opacity-50">
                  <Spinner />
                </div>
              );
          }
        })()}
      </Layout>
    </LoadingProvider>
  );
}

export default MyApp;
