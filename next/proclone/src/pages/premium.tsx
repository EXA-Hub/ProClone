import React from "react";
import "@/styles/manage-premium.css";

const Premium: React.FC = () => {
  return (
    <section className="dashboard-container ">
      <div className="component">
        <div className="component-container">
          <div style={{ opacity: 1 }}>
            <div className="component-container mt-30">
              <div className="center mb-30">
                <h1 className="weight-700 pricing-title">
                  Take ProBot to a New Adventure 😉
                </h1>
                <p className="txt-grey pricing-description">
                  Imagine your current Discord server, Just 10 times clear and
                  easier for members to interact, Socialize and play.
                </p>
              </div>
              <div className="pricing-switcher-container center mb-25">
                <div className="fieldset">
                  <input
                    type="radio"
                    name="duration-1"
                    id="monthly-1"
                    defaultValue="monthly"
                  />
                  <label htmlFor="monthly-1">Monthly</label>
                  <input
                    type="radio"
                    name="duration-1"
                    id="yearly-1"
                    defaultValue="yearly"
                  />
                  <label htmlFor="yearly-1">Yearly</label>
                  <span className="switch right" />
                </div>
              </div>
              <div className="pricing-container">
                <div className="pricing-card">
                  <div className="pricing-card-header">
                    <span className="pricing-card-type capitalize-font">
                      Premium Tier 1
                    </span>
                    <span className="pricing-card-price">40$</span>
                    <small className="mb-15">/ Yearly</small>
                  </div>
                  <div>
                    <p>
                      For decent sized servers where member interaction is the
                      key.
                    </p>
                  </div>
                  <div className="pricing-card-features ml-25 mr-25">
                    <ul>
                      <li>
                        <i className="fas fa-check-circle" /> Advanced
                        Protection
                      </li>
                      <li>
                        <i className="fas fa-check-circle" /> More Variables
                      </li>
                      <li>
                        <i className="fas fa-check-circle" /> Executioner in
                        logs
                      </li>
                      <li>
                        <i className="fas fa-check-circle" /> Unban everyone
                      </li>
                    </ul>
                  </div>
                  <div className="pricing-card-footer">
                    <a className="false">Subscribe</a>
                  </div>
                </div>
                <div className="pricing-card pricing-card-featured">
                  <div className="pricing-card-header">
                    <span className="pricing-card-type capitalize-font">
                      Premium Tier 2
                    </span>
                    <span className="pricing-card-price">80$</span>
                    <small className="mb-15">/ Yearly</small>
                  </div>
                  <div>
                    <p>For big servers where ProBot Anti-Raid is important.</p>
                  </div>
                  <div className="pricing-card-features ml-25 mr-25">
                    <ul>
                      <li>
                        <i className="fas fa-check-circle" /> Advanced
                        Protection
                      </li>
                      <li>
                        <i className="fas fa-check-circle" /> More Variables
                      </li>
                      <li>
                        <i className="fas fa-check-circle" /> Custom Bot
                      </li>
                      <li>
                        <i className="fas fa-check-circle" /> Transfer Bot
                        Ownership
                      </li>
                    </ul>
                  </div>
                  <div className="pricing-card-footer">
                    <a className="false">Subscribe</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ height: "100px" }} />
        </div>
      </div>
    </section>
  );
};

export default Premium;
