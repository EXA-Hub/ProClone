import React, { useEffect } from "react";
import { useRouter } from "next/router";

const Logout: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect the user when the component is mounted
    router.push("/backend/user/logout");
  }, [router]);

  return (
    <h6
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh", // Full viewport height
        width: "100%", // Full viewport width
        textAlign: "center",
        fontSize: "100px",
      }}
    >
      Redirecting...
    </h6>
  ); // Optional message while redirecting
};

export default Logout;
