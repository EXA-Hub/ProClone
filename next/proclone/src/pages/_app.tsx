import "../app/globals.css";
import "@/styles/app.css";

import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import Spinner from "@/components/Loading";
import RouterLoading from "../components/RouterLoading";
import { LoadingProvider } from "../context/LoadingContext"; // Optional

import { apiClient } from "@/utils/apiClient";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const [loggedin, setLog] = useState<"logging" | "loged" | "notloged">(
    "logging"
  );
  const [serverData, setServerData] = useState<any>(null); // Replace `any` with your server data type
  const [loadingServerData, setLoadingServerData] = useState<boolean>(true);
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    // Check login status
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

    // Fetch server data if on a /server page
    if (router.pathname.startsWith("/server")) {
      const fetchServerData = async () => {
        try {
          const response = await apiClient(
            `/backend/api/guild?guildId=${router.query.id}`,
            "get"
          );
          if (response.success) {
            setServerData(response.data);
            setShowSidebar(true);
          } else {
            setServerData(null);
            setShowSidebar(false);
          }
        } catch (error) {
          console.error("Error fetching server data:", error);
          setServerData(null);
          setShowSidebar(false);
        } finally {
          setLoadingServerData(false);
        }
      };
      fetchServerData();
    } else {
      setShowSidebar(true); // Show sidebar if not on /server page
      setLoadingServerData(false); // No server data to load
    }
  }, [router]);

  return (
    <LoadingProvider>
      <Layout showSidebar={showSidebar}>
        {(() => {
          if (loadingServerData) {
            return (
              <div className="tw-fixed tw-top-0 tw-left-0 tw-w-full tw-h-full tw-z-50 tw-flex tw-items-center tw-justify-center tw-bg-black tw-bg-opacity-50">
                <Spinner />
              </div>
            );
          }

          switch (loggedin) {
            case "loged":
              return (
                <>
                  <RouterLoading />
                  {!(
                    router.pathname.includes("/server") &&
                    !(serverData && router.query.id)
                  ) ? (
                    <Component {...pageProps} />
                  ) : (
                    <section className="dashboard-container no-guild">
                      <div className="component">
                        <div className="component-container">
                          <div className="mt-50 invite_div center sidebar_guild-not-in__bRVgo ">
                            <h2 style={{ fontWeight: 700 }}>
                              This server requires setup.
                            </h2>
                            <div>
                              <a className="btn btn-primary btn-icon btn-rounded btn-lg inviteBtn">
                                <i className="fab fa-discord btn-discord-logo" />
                                Continue to Discord
                              </a>
                            </div>
                          </div>
                          <div style={{ height: "100px" }} />
                        </div>
                      </div>
                    </section>
                  )}
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
