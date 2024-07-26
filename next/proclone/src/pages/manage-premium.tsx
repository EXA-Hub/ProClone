import React from "react";
import "./manage-premium.css";
import Link from "next/link";

const Premium: React.FC = () => {
  return (
    <section className="dashboard-container ">
      <div className="component">
        <div className="component-container">
          <div style={{ opacity: 1 }}>
            <div className="pricing-switcher-container center mb-25">
              <div className="fieldset">
                <input
                  type="radio"
                  name="duration-1"
                  id="subscriptions-1"
                  defaultValue="subscriptions"
                />
                <label className="manage" htmlFor="subscriptions-1">
                  Subscriptions
                </label>
                <input
                  type="radio"
                  name="duration-1"
                  id="billing-1"
                  defaultValue="billing"
                />
                <label htmlFor="billing-1">Billing</label>
                <span className="switch left" />
              </div>
            </div>
            <div className="style_container__f18GI style_info__WFpBB full-width mb-20">
              <span>
                <i className="iconify style_icon__eq_V8 style_icon-info__n6Hpu fas fa-info-circle" />
                You have to invite the premium bot to get access to premium
                features
              </span>
            </div>
            <div className="d-flex align-items-center">
              <h3 className="flex-1 mb-0">Subscriptions</h3>
              <div />
            </div>
            <Link className="mt-3 btn btn-lg btn-primary" href="/premium">
              <i className="fa-solid fa-cart-shopping" /> New Subscription
            </Link>
          </div>
          <div style={{ height: "100px" }} />
        </div>
      </div>
    </section>
  );
};

export default Premium;
