// src/components/RouterLoading.tsx

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Spinner from "./Loading";

const RouterLoading = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  if (!loading) return null;
  return (
    <div className="tw-fixed tw-top-0 tw-left-0 tw-w-full tw-h-full tw-z-50 tw-flex tw-items-center tw-justify-center tw-bg-black tw-bg-opacity-50">
      <Spinner />
    </div>
  );
};

export default RouterLoading;
