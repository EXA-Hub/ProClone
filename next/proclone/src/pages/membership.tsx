import React from "react";
import Image from "next/image";
import "./Membership.css";

const Memberships: React.FC = () => {
  return (
    <section className="dashboard-container ">
      <div className="component">
        <div className="component-container">
          <div style={{ opacity: 1 }}>
            <main className="component-container">
              <header className="userPremium_header__YAEQz tw-gap-2">
                <h3 className="userPremium_header__title__vDQtS tw-text-center sm:tw-text-3xl">
                  Ready to get started
                </h3>
                <p className="userPremium_header__description___roxn">
                  Choose a plan tailored to your needs
                </p>
              </header>
              <div className="userPremium_plan_converter__9as3B ">
                <span
                // status="in-active"
                >
                  Monthly
                </span>
                <div
                  className=" "
                  style={{
                    position: "relative",
                    display: "inline-block",
                    textAlign: "left",
                    opacity: 1,
                    direction: "ltr",
                    borderRadius: "16px",
                    transition: "opacity 0.25s ease 0s",
                    touchAction: "none",
                    WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                    userSelect: "none",
                  }}
                >
                  <div
                    className="react-switch-bg"
                    style={{
                      height: "32px",
                      width: "60px",
                      margin: "0px",
                      position: "relative",
                      background: "rgb(31, 31, 37)",
                      borderRadius: "16px",
                      cursor: "pointer",
                      transition: "background 0.25s ease 0s",
                    }}
                  />
                  <div
                    className="react-switch-handle"
                    style={{
                      height: "19px",
                      width: "19px",
                      background: "rgb(255, 255, 255)",
                      display: "inline-block",
                      cursor: "pointer",
                      borderRadius: "50%",
                      position: "absolute",
                      transform: "translateX(34.5px)",
                      top: "6.5px",
                      outline: "0px",
                      boxShadow: "rgba(0, 0, 0, 0.6) 0px 1px 5px",
                      border: "0px",
                      transition:
                        "background-color 0.25s ease 0s, transform 0.25s ease 0s, box-shadow 0.15s ease 0s",
                    }}
                  />
                  <input
                    type="checkbox"
                    role="switch"
                    aria-checked="true"
                    id="material-switch"
                    defaultChecked
                    style={{
                      border: "0px",
                      clip: "rect(0px, 0px, 0px, 0px)",
                      height: "1px",
                      margin: "-1px",
                      overflow: "hidden",
                      padding: "0px",
                      position: "absolute",
                      width: "1px",
                    }}
                  />
                </div>
                <span
                  discount-amount="50% OFF"
                  // status="active"
                >
                  Yearly
                </span>
              </div>
              <div className="userPremium_plans_container__hLMu5">
                <div
                  className="userPremium_plan_item__zOcoK "
                  special-background-image="false"
                >
                  <Image
                    src="/images/icons/diamond.svg"
                    alt="Diamond Membership"
                    width={40} // specify width
                    height={45} // specify height
                    style={{ width: "100%" }}
                  />
                  <div className="tw-flex tw-h-full tw-flex-col tw-justify-between">
                    <div className="userPremium_plan_item__body__p7uVb">
                      <h3>Diamond Membership</h3>
                      <div className="userPremium_amount__wrapper__ridmM">
                        <span className="userPremium_amount__eTT1s">180$</span>
                        <span className="userPremium_amount__period__QlSBd">
                          /Yearly
                        </span>
                      </div>
                      <p className="tw-text-sm">
                        Unlock exclusive benefits and take your experience to
                        the next level with our Diamond Membership
                      </p>
                    </div>
                    <div className="userPremium_plan_item__actions__3TGZV">
                      <button className="userPremium_membership__button__tP_gx  ">
                        Subscribe
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  className="userPremium_plan_item__zOcoK "
                  special-background-image="false"
                >
                  <Image
                    width={40} // specify width
                    height={45} // specify height
                    src="/images/icons/gold.svg"
                    alt="Gold Membership"
                    style={{ width: "100%" }}
                  />
                  <div className="tw-flex tw-h-full tw-flex-col tw-justify-between">
                    <div className="userPremium_plan_item__body__p7uVb">
                      <h3>Gold Membership</h3>
                      <div className="userPremium_amount__wrapper__ridmM">
                        <span className="userPremium_amount__eTT1s">60$</span>
                        <span className="userPremium_amount__period__QlSBd">
                          /Yearly
                        </span>
                      </div>
                      <p className="tw-text-sm">
                        Boost your productivity and workflow with our Gold
                        Membership
                      </p>
                    </div>
                    <div className="userPremium_plan_item__actions__3TGZV">
                      <button className="userPremium_membership__button__tP_gx  ">
                        Subscribe
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  className="userPremium_plan_item__zOcoK "
                  special-background-image="false"
                >
                  <Image
                    width={40} // specify width
                    height={45} // specify height
                    src="/images/icons/silver.svg"
                    alt="Silver Membership"
                    style={{ width: "100%" }}
                  />
                  <div className="tw-flex tw-h-full tw-flex-col tw-justify-between">
                    <div className="userPremium_plan_item__body__p7uVb">
                      <h3>Silver Membership</h3>
                      <div className="userPremium_amount__wrapper__ridmM">
                        <span className="userPremium_amount__eTT1s">30$</span>
                        <span className="userPremium_amount__period__QlSBd">
                          /Yearly
                        </span>
                      </div>
                      <p className="tw-text-sm">
                        Get more done for less with our Silver Membership
                      </p>
                    </div>
                    <div className="userPremium_plan_item__actions__3TGZV">
                      <button className="userPremium_membership__button__tP_gx  ">
                        Subscribe
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <footer className="userPremium_footer__K18xy">
                <ul className="userPremium_table_header__Po9dE">
                  <li>tier</li>
                  <li className="flex gap-1 align-items-center">
                    <Image
                      width={40} // specify width
                      height={45} // specify height
                      alt="silver"
                      loading="lazy"
                      decoding="async"
                      data-nimg={1}
                      className="userPremium_tableIcon__qa3Aq"
                      src="/static/silver.svg"
                      style={{ color: "transparent" }}
                    />
                    <span className="sm:tw-hidden">Silver</span>
                  </li>
                  <li className="flex gap-1 align-items-center">
                    <Image
                      width={40} // specify width
                      height={45} // specify height
                      alt="gold"
                      loading="lazy"
                      decoding="async"
                      data-nimg={1}
                      className="userPremium_tableIcon__qa3Aq"
                      src="/static/gold.svg"
                      style={{ color: "transparent" }}
                    />
                    <span className="sm:tw-hidden">Gold</span>
                  </li>
                  <li className="flex gap-1 align-items-center">
                    <Image
                      width={40} // specify width
                      height={45} // specify height
                      alt="diamond"
                      loading="lazy"
                      decoding="async"
                      data-nimg={1}
                      className="userPremium_tableIcon__qa3Aq"
                      src="/static/diamond.svg"
                      style={{ color: "transparent" }}
                    />
                    <span className="sm:tw-hidden">Diamond</span>
                  </li>
                </ul>
                <ul className="userPremium_table_body__HlxFt">
                  <li>
                    <span className="tw-text-sm">Double the daily</span>
                    <span className="tw-text-sm">(x3) up to 10k credits</span>
                    <span className="tw-text-sm">(x5) up to 25k credits</span>
                    <span className="tw-text-sm">(x10) up to 50k credits</span>
                  </li>
                  <li>
                    <span className="tw-text-sm">Daily Reps</span>
                    <span className="tw-text-sm">5 reps per day</span>
                    <span className="tw-text-sm">10 reps per day</span>
                    <span className="tw-text-sm">30 reps per day</span>
                  </li>
                  <li>
                    <span className="tw-text-sm">Daily on Discord</span>
                    <span className="tw-text-sm">-</span>
                    <span className="tw-text-sm">✓</span>
                    <span className="tw-text-sm">✓</span>
                  </li>
                  <li>
                    <span className="tw-text-sm">Prioritized Support</span>
                    <span className="tw-text-sm">✓</span>
                    <span className="tw-text-sm">✓</span>
                    <span className="tw-text-sm">✓</span>
                  </li>
                  <li>
                    <span className="tw-text-sm">Change Background</span>
                    <span className="tw-text-sm">✓</span>
                    <span className="tw-text-sm">✓</span>
                    <span className="tw-text-sm">✓</span>
                  </li>
                  <li>
                    <span className="tw-text-sm">Transfers Per Month</span>
                    <span className="tw-text-sm">-</span>
                    <span className="tw-text-sm">✓</span>
                    <span className="tw-text-sm">✓</span>
                  </li>
                </ul>
                <div className="userPremium_faq__section__geK04">
                  <h3>Frequently Asked Questions</h3>
                  <p className="text-center">
                    For further questions, contact our team at{" "}
                    <span>
                      <a
                        target="_blank"
                        href="https://discord.gg/ProBot"
                        className="link__server"
                      >
                        discord.gg/ProBot
                      </a>
                    </span>
                  </p>
                  <div className="faq__main mt-20">
                    <div className=" tw-bg-grey-4 tw-mt-2 tw-flex tw-flex-col tw-rounded tw-transition-all tw-duration-200 tw-cursor-pointer hover:tw-bg-[#232329]">
                      <div className="tw-outline-none tw-flex tw-p-6 tw-flex-row tw-justify-between tw-border-b-2 tw-border-grey-text2">
                        <span className="tw-text-base">
                          What is Membership feature?
                        </span>
                        <span className="faq__arrow">
                          <i className="fas fa-chevron-down" />
                        </span>
                      </div>
                      <span className="tw-px-6 tw-pb-6 tw-text-grey-text2 tw-hidden">
                        Membership feature provides users with exclusive
                        benefits and privileges that are not available to
                        non-members. Users are typically required to pay a fee
                        to access these benefits, which can be a monthly or
                        yearly subscription.
                      </span>
                    </div>
                    <div className=" tw-bg-grey-4 tw-mt-2 tw-flex tw-flex-col tw-rounded tw-transition-all tw-duration-200 tw-cursor-pointer hover:tw-bg-[#232329]">
                      <div className="tw-outline-none tw-flex tw-p-6 tw-flex-row tw-justify-between tw-border-b-2 tw-border-grey-text2">
                        <span className="tw-text-base">
                          Can I transfer my old account data to a new account?
                        </span>
                        <span className="faq__arrow">
                          <i className="fas fa-chevron-down" />
                        </span>
                      </div>
                      <span className="tw-px-6 tw-pb-6 tw-text-grey-text2 tw-hidden">
                        Yes, the Transfer Per Month feature allows users to
                        transfer their old account data, including their level
                        and credits, once per month. Please note that the
                        Transfer Per Month feature is only available for Gold
                        and Diamond tiers.
                      </span>
                    </div>
                    <div className=" tw-bg-grey-4 tw-mt-2 tw-flex tw-flex-col tw-rounded tw-transition-all tw-duration-200 tw-cursor-pointer hover:tw-bg-[#232329]">
                      <div className="tw-outline-none tw-flex tw-p-6 tw-flex-row tw-justify-between tw-border-b-2 tw-border-grey-text2">
                        <span className="tw-text-base">
                          What types of files are supported for customizing the
                          background?
                        </span>
                        <span className="faq__arrow">
                          <i className="fas fa-chevron-down" />
                        </span>
                      </div>
                      <span className="tw-px-6 tw-pb-6 tw-text-grey-text2 tw-hidden">
                        Supported file types for customizing the background are
                        png, jpeg, and images should not exceed 3MB in size.
                      </span>
                    </div>
                    <div className=" tw-bg-grey-4 tw-mt-2 tw-flex tw-flex-col tw-rounded tw-transition-all tw-duration-200 tw-cursor-pointer hover:tw-bg-[#232329]">
                      <div className="tw-outline-none tw-flex tw-p-6 tw-flex-row tw-justify-between tw-border-b-2 tw-border-grey-text2">
                        <span className="tw-text-base">
                          What payment methods do you accept for membership
                          subscriptions?
                        </span>
                        <span className="faq__arrow">
                          <i className="fas fa-chevron-down" />
                        </span>
                      </div>
                      <span className="tw-px-6 tw-pb-6 tw-text-grey-text2 tw-hidden">
                        We accept all major credit and debit cards, including
                        Visa, Mastercard, American Express, and Discover.
                      </span>
                    </div>
                    <div className=" tw-bg-grey-4 tw-mt-2 tw-flex tw-flex-col tw-rounded tw-transition-all tw-duration-200 tw-cursor-pointer hover:tw-bg-[#232329]">
                      <div className="tw-outline-none tw-flex tw-p-6 tw-flex-row tw-justify-between tw-border-b-2 tw-border-grey-text2">
                        <span className="tw-text-base">
                          Can I get a refund for my ProBot membership
                          subscription?
                        </span>
                        <span className="faq__arrow">
                          <i className="fas fa-chevron-down" />
                        </span>
                      </div>
                      <span className="tw-px-6 tw-pb-6 tw-text-grey-text2 tw-hidden">
                        Yes, refunds are available for ProBot membership
                        subscriptions under certain conditions. Refunds are only
                        available if you have not used any feature beyond the
                        daily credits. If you have used any other feature of
                        your membership, you will not be eligible for a refund.
                        Additionally, refunds can only be requested within 7
                        days of the initial subscription purchase date.
                      </span>
                    </div>
                  </div>
                </div>
              </footer>
            </main>
          </div>
          <div style={{ height: "100px" }} />
        </div>
      </div>
    </section>
  );
};

export default Memberships;
