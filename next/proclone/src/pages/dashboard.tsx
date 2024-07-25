import React from "react";

// Basic inline styles and CSS-in-JS
const styles = {
  component: {
    padding: "16px",
    backgroundColor: "var(--gray-3)",
    transition: "all 0.4s",
  },
  overviewContainer: {
    padding: "10px",
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

const Dashboard: React.FC = () => {
  return (
    <section style={styles.dashboardContainer}>
      <div style={styles.component}>
        <div style={styles.componentContainer}>
          <div style={{ opacity: 1 }}>
            <div style={styles.overviewContainer}>
              <div className="row ms-1 me-1 mb-3 gap-3">
                <div
                  style={{
                    border: "1px solid var(--gray-1)",
                    borderRadius: "24px",
                    padding: "24px",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: "1rem",
                  }}
                  className="overview_card__MsjbH col-md"
                >
                  <div style={styles.cardDiv}>
                    <i className="fas fa-cedi-sign" style={styles.cardIcon}></i>
                    <div>
                      <h5>Credits</h5>
                    </div>
                  </div>
                  <h3>3,412,700</h3>
                </div>
                <div
                  style={{
                    border: "1px solid var(--gray-1)",
                    borderRadius: "24px",
                    padding: "24px",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: "1rem",
                  }}
                  className="overview_card__MsjbH col-md"
                >
                  <div style={styles.cardDiv}>
                    <i className="fas fa-star" style={styles.cardIcon}></i>
                    <div>
                      <h5>Level</h5>
                    </div>
                  </div>
                  <h3>66</h3>
                </div>
                <div
                  style={{
                    border: "1px solid var(--gray-1)",
                    borderRadius: "24px",
                    padding: "24px",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: "1rem",
                  }}
                  className="overview_card__MsjbH col-md"
                >
                  <div style={styles.cardDiv}>
                    <i className="fas fa-medal" style={styles.cardIcon}></i>
                    <div>
                      <h5>Rank</h5>
                    </div>
                  </div>
                  <h3>202,038</h3>
                </div>
                <div
                  style={{
                    border: "1px solid var(--gray-1)",
                    borderRadius: "24px",
                    padding: "24px",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: "1rem",
                  }}
                  className="overview_card__MsjbH col-md"
                >
                  <div style={styles.cardDiv}>
                    <i className="fas fa-star" style={styles.cardIcon}></i>
                    <div>
                      <h5>Reputation</h5>
                    </div>
                  </div>
                  <h3>90</h3>
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
