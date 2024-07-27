import React, { useEffect, useState } from "react";
import "@/styles/Dashboard.css"; // Import the regular CSS file
import { apiClient } from "@/utils/apiClient";

// Basic inline styles and CSS-in-JS
const inlineStyles = {
  component: {
    padding: "16px",
    backgroundColor: "var(--gray-3)",
    transition: "all 0.4s",
  },
  componentContainer: {
    maxWidth: "1200px",
    margin: "0 auto",
  },
  dashboardContainer: {
    marginInlineStart: "23.3rem",
    paddingTop: "3.3rem",
    transition: "all 0.5s",
  },
  cardDiv: {
    display: "flex",
    alignItems: "center",
  },
  cardIcon: {
    marginRight: "8px",
  },
};

import Loading from "@/components/Loading";

const Dashboard: React.FC = () => {
  const [data, setData] = useState<
    | undefined
    | {
        Credits: number;
        level: number;
        rank: number;
        rep: number;
      }
  >(undefined);

  useEffect(() => {
    apiClient("/backend/api/user", "GET").then((res) => {
      setData(res.data);
    });
  }, []);

  if (!data) return <Loading />;
  return (
    <section style={inlineStyles.dashboardContainer}>
      <div style={inlineStyles.component}>
        <div style={inlineStyles.componentContainer}>
          <div style={{ opacity: 1 }}>
            <div className="overview-container">
              <div className="row ms-1 me-1 mb-3 gap-3">
                <div className="overview-card overview-credits col-md">
                  <div style={inlineStyles.cardDiv}>
                    <i
                      className="fas fa-cedi-sign"
                      style={inlineStyles.cardIcon}
                    ></i>
                    <div>
                      <h5>Credits</h5>
                    </div>
                  </div>
                  <h3>{data.Credits}</h3>
                </div>
                <div className="overview-card overview-level col-md">
                  <div style={inlineStyles.cardDiv}>
                    <i
                      className="fas fa-star"
                      style={inlineStyles.cardIcon}
                    ></i>
                    <div>
                      <h5>Level</h5>
                    </div>
                  </div>
                  <h3>{data.level}</h3>
                </div>
                <div className="overview-card overview-rank col-md">
                  <div style={inlineStyles.cardDiv}>
                    <i
                      className="fas fa-medal"
                      style={inlineStyles.cardIcon}
                    ></i>
                    <div>
                      <h5>Rank</h5>
                    </div>
                  </div>
                  <h3>{data.rank}</h3>
                </div>
                <div className="overview-card overview-reputation col-md">
                  <div style={inlineStyles.cardDiv}>
                    <i
                      className="fas fa-star"
                      style={inlineStyles.cardIcon}
                    ></i>
                    <div>
                      <h5>Reputation</h5>
                    </div>
                  </div>
                  <h3>{data.rep}</h3>
                </div>
              </div>
            </div>
          </div>
          <div style={{ height: "100px" }}></div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
